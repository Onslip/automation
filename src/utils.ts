import { Queue, Signal } from '@divine/synchronization';
import { execFile as _execFile, spawn } from 'child_process';
import { mkdir as _mkdir, writeFile as _writeFile } from 'fs';
import { pipeline as _pipeline } from 'stream';
import { promisify } from 'util';

export const execFile = promisify(_execFile);
export const mkdir = promisify(_mkdir);
export const pipeline = promisify(_pipeline);
export const writeFile = promisify(_writeFile);

/**
 * Throws an error.
 *
 * @param error  The error to throw.
 * @throws       The provided error.
 */
export function throwError(error: Error): never {
    throw error;
}

/**
 * Does nothing for a while.
 *
 * @param timeout  The sleep duration in milliseconds
 */
export function sleep(timeout: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}

export interface ReaderOptions {
    /** A signal to check. Reading will stop when signal is `true.` */
    stopSignal?: Signal<boolean>;

    /** A line separator to add to each generated line. */
    separator?:  string;
}

/**
 * Spawns a command and reads its standard output line by line.
 *
 * @param command  The command to executed.
 * @param args     Command arguments.
 * @param options  Reader options.
 * @returns        An async iterator generating one line at a time.
 */
export function readCommandOutput(command: string, args: string[], options?: ReaderOptions): AsyncGenerator<string>;

/**
 * Spawns a command and reads its standard output line by line, with heartbeats.
 *
 * @param command  The command to executed.
 * @param args     Command arguments.
 * @param options  Reader options.
 * @param timeout  The timeout, in milliseconds. If no lines has been produced within this time, an `undefined` value is
 *                 generated instead of a string.
 * @returns        An async iterator generating one line at a time, or `undefined` on timeouts.
 */
export function readCommandOutput(command: string, args: string[], options?: ReaderOptions, timeout?: number): AsyncGenerator<string | undefined>;

export async function* readCommandOutput(command: string, args: string[], options?: ReaderOptions, timeout?: number): AsyncGenerator<string | undefined> {
    const mqueue = new Queue<string | null | Error | number>();
    const bgproc = spawn(command, args);

    const killOnExit = () => bgproc.kill();
    bgproc.on('exit',  () => process.off('exit', killOnExit));
    process.on('exit', killOnExit);

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

/**
 * Begins collecting and buffering lines from an async iterator, like the one returned by {@link readCommandOutput}.
 * When the returned function is called, all lines are returned as an array.
 *
 * @param stream   A callback that should create the async iterator and stop generating lines when the provided signal
 *                 becomes true.
 * @returns        A function that, when invoked, stops reading and returns all collected lines as an array.
 */

export function collectLines(stream: (stopSignal: Signal<boolean>) => AsyncIterable<string | undefined>): () => Promise<string[]> {
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
