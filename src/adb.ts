import { Queue, Signal } from '@divine/synchronization';
import { spawn } from 'child_process';
import { BaseOptions, Options } from 'chrome-remote-interface';
import { Page } from './api';
import { Automation } from './automation';
import { execFile } from './utils';

export interface AndroidLogOptions {
    stopSignal?:  Signal<boolean>;
    separator?:   string;
    clear?:       boolean;
    historic?:    boolean;
    format?:      'brief' | 'process' | 'tag' | 'thread' | 'raw' | 'time' | 'threadtime' | 'long';
    modifiers?:   ('color' | 'descriptive' | 'epoch' | 'monotonic' | 'printable' | 'uid' | 'usec' | 'UTC' | 'year' | 'zone')[];
    buffers?:     ('main' | 'system' | 'radio' | 'events' | 'crash')[];
    filterspecs?: string[];
}

export interface AutomationOptions extends BaseOptions {
    target?:   Options['target'];
}

export async function findAndroidDevices(): Promise<string[]> {
    return (await execFile('adb', ['devices'])).stdout.split('\n')
        .map(line => /(^[^\s]+)\s+device$/.exec(line)?.[1]!).filter(Boolean);
}

export async function executeAndroidShellCommand(device: string, command: string): Promise<string> {
    return (await execFile('adb', [ '-s', device, 'shell', command ])).stdout;
}

export async function startAndroidActivity(device: string, activity: string, options?: { restart?: boolean, wait?: boolean }) {
    await executeAndroidShellCommand(device,
        `am start ${options?.restart ? '-S' : ''} ${options?.wait ? '-W' : ''} -a android.intent.action.MAIN -n "${activity}"`);
}

export async function stopAndroidApplication(device: string, packageName: string) {
    await executeAndroidShellCommand(device, `am force-stop "${packageName}"`);
}

export async function findAndroidWebViews(device: string): Promise<string[]> {
    return (await executeAndroidShellCommand(device, 'cat /proc/net/unix')).split('\n')
        .map(line => /@(.*devtools_remote.*)/.exec(line)?.[1]!).filter(Boolean);
}

export async function forwardAndroidWebView(device: string, webview: string, port: number): Promise<void> {
    await execFile('adb', ['-s', device, 'forward', `tcp:${port}`, `localabstract:${webview}`]);
}

export function readAndroidLogs(device: string, options?: AndroidLogOptions): AsyncGenerator<string>;
export function readAndroidLogs(device: string, options?: AndroidLogOptions, timeout?: number): AsyncGenerator<string | undefined>;
export async function* readAndroidLogs(device: string, options?: AndroidLogOptions, timeout?: number): AsyncGenerator<string | undefined> {
    const mqueue = new Queue<string | null | Error | number>();
    const buffer = options?.buffers ? ['-b', options?.buffers?.join(',')] : [];
    const recent = options?.historic ? [] : [ '-T', '1' ];

    const checkStopSignal = (stop: boolean): unknown => stop ? mqueue.push(null) : options?.stopSignal?.wait().then(checkStopSignal);
    checkStopSignal(false);

    if (options?.clear) {
        await execFile('adb', ['-s', device, 'logcat', '-c', ...buffer]);
    }

    const logcat = spawn('adb', ['-s', device, 'logcat',
        '-v', [options?.format ?? 'threadtime', ...(options?.modifiers ?? [])].join(','),
        ...recent, ...buffer, ...(options?.filterspecs ?? [])
    ]);

    logcat.on('exit',         (ecode) => mqueue.push(ecode ?? -1));
    logcat.on('error',        (error) => mqueue.push(error));
    logcat.stdout.on('error', (error) => mqueue.push(error));
    logcat.stdout.on('data',  (chunk) => mqueue.push(String(chunk)));

    try {
        const separator = options?.separator ?? '';
        let partialLine = '';

        while (true) {
            const event = await mqueue.shiftOrWait(timeout);

            if (event === 0 || event === null) {
                break;
            } else if (typeof event === 'number') {
                throw new Error(`Failed to run '${logcat.spawnargs.join(' ')}': Exit code ${event}`);
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
        logcat.kill();
    }
}

export function collectAndroidLogs(device: string, options?: Omit<AndroidLogOptions, 'stopSignal'>): () => Promise<string[]> {
    const stopSignal = new Signal<boolean>();
    const lines = (async () => {
        const lines: string[] = [];

        for await (const line of readAndroidLogs(device, { ...options, stopSignal }, 100)) {
            if (typeof line === 'string') {
                lines.push(line);
            }
        }

        return lines;
    })();

    return () => (stopSignal.notifyAll(true), lines);
}

export async function openRemoteWebView(options: AutomationOptions): Promise<Page> {
    return (await new Automation(options).initialize()).page();
}
