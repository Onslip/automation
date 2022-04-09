import { Device, DeviceOptions, StartOptions } from './device';
import { collectLines, execFile, readCommandOutput, ReaderOptions } from './utils';

export interface AndroidLogOptions extends ReaderOptions {
    clear?:       boolean;
    historic?:    boolean;
    format?:      'brief' | 'process' | 'tag' | 'thread' | 'raw' | 'time' | 'threadtime' | 'long';
    modifiers?:   ('color' | 'descriptive' | 'epoch' | 'monotonic' | 'printable' | 'uid' | 'usec' | 'UTC' | 'year' | 'zone')[];
    buffers?:     ('main' | 'system' | 'radio' | 'events' | 'crash')[];
    filterspecs?: string[];
}

export class AndroidDevice extends Device {
    static override async findDevices(options: DeviceOptions = {}): Promise<AndroidDevice[]> {
        const adb = options.adb === null ? null : options?.adb ?? 'adb';

        try {
            return adb === null ? [] :
                (await execFile(adb, ['devices'])).stdout.split('\n')
                    .map((line) => /(^[^\s]+)\s+device$/.exec(line)?.[1]!).filter(Boolean)
                    .map((id) => new AndroidDevice(id, adb, options));
        } catch (err) {
            if (!options.adb) {
                return []; // User did not specify adb path; fail silently
            } else {
                throw new Error(`Failed to invoke ${options.adb}; verify that the command is installed and available`);
            }
        }
    }

    constructor(id: string, private _adb: string, private _options: DeviceOptions) {
        super(id, 'android');
    }

    override toString() {
        return `[AndroidDevice ${this.id}]`;
    }

    override async osVersion() {
        return this.shell(`getprop ro.build.version.release`);
    }

    override async deviceName() {
        return this.shell(`getprop ro.product.model`);
    }

    override async install(archive: string, options?: string[]) {
        await execFile(this._adb, ['install', ...options ?? ['-r'], archive]);
    }

    override async start(app: string, options?: StartOptions) {
        await this.shell(`am start ${options?.restart ? '-S' : ''} ${options?.wait ? '-W' : ''} -a android.intent.action.MAIN -n "${app}"`);
    }

    override async stop(app: string) {
        const pkg = app.split('/')[0];
        await this.shell(`am force-stop "${pkg}"`);
    }

    override async uninstall(app: string) {
        const pkg = app.split('/')[0];
        await execFile(this._adb, ['uninstall', pkg]);
    }

    override async *readLogs(options?: AndroidLogOptions, timeout?: number) {
        const buffer = options?.buffers ? ['-b', options?.buffers?.join(',')] : [];
        const recent = options?.historic ? [] : ['-T', '1'];

        if (options?.clear) {
            await execFile(this._adb, ['-s', this.id, 'logcat', '-c', ...buffer]);
        }

        return yield* readCommandOutput(this._adb, [
            '-s', this.id, 'logcat',
            '-v', [options?.format ?? 'threadtime', ...(options?.modifiers ?? [])].join(','),
            ...recent, ...buffer, ...(options?.filterspecs ?? [])
        ], options, timeout);
    }

    override async collectLogs(options?: Omit<AndroidLogOptions, 'stopSignal'>) {
        return collectLines((stopSignal) => this.readLogs({ separator: '\n', ...options, stopSignal }, 100));
    }

    override async findWebViews() {
        return (await this.shell('cat /proc/net/unix')).split('\n')
            .map((line) => /@(.*devtools_remote.*)/.exec(line)?.[1]!).filter(Boolean);
    }

    override async bindWebView(webview: string, port: number) {
        await execFile(this._adb, ['-s', this.id, 'forward', `tcp:${port}`, `localabstract:${webview}`]);

        return { host: 'localhost', port }
    }

    // MARK: - Android-specific methods

    async shell(command: string) {
        return (await execFile(this._adb, ['-s', this.id, 'shell', command])).stdout;
    }
}
