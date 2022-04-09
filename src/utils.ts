import { Queue, Signal } from '@divine/synchronization';
import { execFile as _execFile, spawn } from 'child_process';
import { mkdir as _mkdir, writeFile as _writeFile } from 'fs';
import { pipeline as _pipeline } from 'stream';
import { promisify } from 'util';

export const execFile = promisify(_execFile);
export const mkdir = promisify(_mkdir);
export const pipeline = promisify(_pipeline);
export const writeFile = promisify(_writeFile);

export function throwError(error: Error): never {
    throw error;
}

export function sleep(timeout: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}

export interface ReaderOptions {
    stopSignal?: Signal<boolean>;
    separator?:  string;
}

export function readCommandOutput(command: string, args: string[], options?: ReaderOptions, timeout?: number): AsyncGenerator<string>;
export function readCommandOutput(command: string, args: string[], options?: ReaderOptions, timeout?: number): AsyncGenerator<string | undefined>;
export async function* readCommandOutput(command: string, args: string[], options?: ReaderOptions, timeout?: number): AsyncGenerator<string | undefined> {
    const mqueue = new Queue<string | null | Error | number>();
    const bgproc = spawn(command, args);

    const checkStopSignal = (stop: boolean): unknown => stop ? mqueue.push(null) : options?.stopSignal?.wait().then(checkStopSignal);
    checkStopSignal(false);

    bgproc.on('exit',         (ecode) => mqueue.push(ecode ?? -1));
    bgproc.on('error',        (error) => mqueue.push(error));
    bgproc.stdout.on('error', (error) => mqueue.push(error));
    bgproc.stdout.on('data',  (chunk) => mqueue.push(String(chunk)));

    try {
        const separator = options?.separator ?? '';
        let partialLine = '';

        while (true) {
            const event = await mqueue.shiftOrWait(timeout);

            if (event === 0 || event === null) {
                break;
            } else if (typeof event === 'number') {
                throw new Error(`Failed to run '${bgproc.spawnargs.join(' ')}': Exit code ${event}`);
            } else if (event instanceof Error) {
                throw event;
            } else if (typeof event === 'string') {
                const lines = (partialLine + event).split('\n');
                partialLine = lines.pop() ?? '';

                for (const line of lines) {
                    yield line + separator;
                }
            } else {
                yield undefined;
            }
        }

        if (partialLine !== '') {
            yield partialLine;
        }
    } finally {
        bgproc.kill();
    }
}

export function collectLines(stream: (signal: Signal<boolean>) => AsyncIterable<string | undefined>): () => Promise<string[]> {
    const stopSignal = new Signal<boolean>();
    const lines = (async () => {
        const lines: string[] = [];

        for await (const line of stream(stopSignal)) {
            if (typeof line === 'string') {
                lines.push(line);
            }
        }

        return lines;
    })();

    return () => (stopSignal.notifyAll(true), lines);
}
