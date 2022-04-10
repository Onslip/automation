import { get } from 'http';
import { AutomationOptions } from './automation';
import { Device, DeviceOptions, StartOptions } from './device';
import { collectLines, execFile, readCommandOutput, ReaderOptions, sleep } from './utils';

// Good sources of information:
//
// * https://github.com/libimobiledevice/libimobiledevice
// * https://github.com/troybowman/ios_instruments_client

interface IWDPDevice {
    deviceId:        string;
    deviceName:      string;
    deviceOSVersion: string;
    url:             string;
}

interface IWDPContext {
    devtoolsFrontendUrl:  string;
    faviconUrl:           string;
    thumbnailUrl:         string;
    title:                string;
    url:                  string;
    webSocketDebuggerUrl: string;
    appId:                string;
}

async function getJSON<T extends object>(url: string): Promise<T> {
    const chunks: Buffer[] = [];

    await new Promise((resolve, reject) => {
        get(url, (res) => res.on('data', (chunk) => chunks.push(chunk)).on('end', resolve)).on('error', reject);
    });

    return JSON.parse(Buffer.concat(chunks).toString());
}

export interface iOSLogOptions extends ReaderOptions {
    /** Only include log lines that contain this string. */
    match?:   string;

    /** Processes to include. */
    include?: string[];

    /** Processes to exclude. */
    exclude?: string[];

    /** If true, execludes a predefined set of noisy processes in addition to those specified via the [[exclude]] option. */
    quiet?:   boolean;
}

/**
 * This class manages iOS devices and applications.
 */
export class iOSDevice extends Device {
    /**
     * Finds all connected iOS devices by querying the `ios_webkit_debug_proxy` HTTP server.
     *
     * @param options  Device manager options.
     * @returns        A list of detected iOS devices.
     */
    static override async findDevices(options: DeviceOptions = {}) {
        const iwdpPort = options.iwdpPort === null ? null : options?.iwdpPort ?? 9221;
        const iwdpJSON = `http://localhost:${iwdpPort}/json`;

        try {
            return iwdpPort === null ? [] :
                (await getJSON<IWDPDevice[]>(iwdpJSON))
                    .map((iwdpDevice) => new iOSDevice(iwdpDevice, iwdpPort, options));
        } catch (err) {
            if (!options.iwdpPort) {
                return []; // User did not specify port; fail silently
            } else {
                throw new Error(`Request to ${iwdpJSON} failed; verify that ios_webkit_debug_proxy is running`);
            }
        }
    }

    private constructor(private _iwdpDevice: IWDPDevice, private _iwdpPort: number, private _options: DeviceOptions) {
        super(_iwdpDevice.deviceId, 'ios');
    }

    override toString() {
        return `[iOSDevice ${this.id} «${this._iwdpDevice.deviceName}»]`;
    }

    override async osVersion() {
        return this._iwdpDevice.deviceOSVersion;
    }

    override async deviceName() {
        return this._iwdpDevice.deviceName;
    }

    override async install(archive: string) {
        await execFile(this._options.ideviceinstaller ?? 'ideviceinstaller', ['-i', archive]);
    }

    override async start(app: string, options?: StartOptions) {
        if (options?.restart || await this._getPID(app) === null) {
            await execFile(this._options.ios_instruments_client ?? 'ios_instruments_client', [
                '-d', this.id, 'launch', app,
            ]);

            while (options?.wait && !await this._getPID(app)) {
                // Keep waiting
            }
        }
    }

    override async stop(app: string) {
        const pid = await this._getPID(app);

        if (pid !== null) {
            await execFile(this._options.ios_instruments_client ?? 'ios_instruments_client', [
                '-d', this.id, 'kill', pid
            ]);
        }
    }

    override async uninstall(app: string) {
        await execFile(this._options.ideviceinstaller ?? 'ideviceinstaller', ['-U', app]);
    }

    readLogs(options?: iOSLogOptions): AsyncGenerator<string>;
    readLogs(options?: iOSLogOptions, timeout?: number): AsyncGenerator<string | undefined>;
    override async *readLogs(options?: iOSLogOptions, timeout?: number): AsyncGenerator<string | undefined> {
        const quiet = options?.quiet ?? !options?.include;

        return yield* readCommandOutput(this._options.idevicesyslog ?? 'idevicesyslog', [
            '-u', this.id,
            ...(options?.match    ? ['-m', options.match]              : []),
            ...(options?.include  ? ['-p', options.include.join('|') ] : []),
            ...(options?.exclude  ? ['-e', options.exclude.join('|') ] : []),
            ...(quiet             ? ['-q']                             : []),
        ], options, timeout);
    }

    override async collectLogs(options?: Omit<iOSLogOptions, 'stopSignal'>) {
        return collectLines((stopSignal) => this.readLogs({ separator: '\n', ...options, stopSignal }, 100));
    }

    /**
     * Finds all debuggable web views on the device.
     *
     * For iOS devices, this method is optional. [[findWebViewContexts]] and [[openWebView]] can access contexts from
     * all iOS web views if not restricted by [[AutomationOptions.appId]].
     *
     * @returns  An array of all debuggable web view indentifiers.
     */
    override async findWebViews() {
        const [ host, port ] = this._iwdpDevice.url.split(':');

        return (await getJSON<IWDPContext[]>(`http://${host}:${port}/json`))
            .filter((context) => !!context.url) // Skip JSContext
            .map((context) => context.appId)
            .filter((value, index, array) => array.indexOf(value) === index);
    }

    /**
     * Returns options to be passed to [[findWebViewContexts]] and [[openWebView]]. Unlike [[AndroidDevice]], no
     * `localhost` port is actually opened and the (optional) `webview` parameter is just used to set the
     * [[AutomationOptions.appId]] option to restrict contexts to the specified web view.
     *
     * @param webview  The web view identifier target.
     * @returns        Options suitable to pass to [[findWebViewContexts]] or [[openWebView]].
     */
    override async bindWebView(webview?: string): Promise<AutomationOptions> {
        const [ host, port ] = this._iwdpDevice.url.split(':');

        return { host, port: Number(port), appId: webview };
    }

    // MARK: - iOS-specific methods

    private async _getPID(app: string): Promise<string | null> {
        // Wow this sucks. The process list shows ExecutableName, not CFBundleIdentifier.
        let appInfo: Record<string, string> | undefined;
        const applist = await execFile(this._options.ios_instruments_client ?? 'ios_instruments_client', ['-d', this.id, 'applist'], { maxBuffer: 100e6 });
        for (const line of applist.stdout.split('\n')) {
            if (line === '{') {
                appInfo = {};
            } else if (line === '}' && appInfo?.['CFBundleIdentifier'] === `"${app}"`) {
                break;
            } else if (appInfo) {
                const [, key, value ] = /^\s+([^\s]+)\s*=\s*(.*);$/.exec(line) ?? [];
                key && (appInfo[key] = value);
            }
        }

        const procName = appInfo?.['ExecutableName'];
        const procList = await execFile(this._options.ios_instruments_client ?? 'ios_instruments_client', ['-d', this.id, 'proclist']);
        const procInfo = procList.stdout
            .split('\n')
            .map((line) => /^\s*(\d+)\s+(.*)/.exec(line))
            .filter((match) => match?.[2] === procName);

        if (procInfo.length > 1) {
            throw new Error(`App '${app}' with executable name '${procName}' matched multiple processes: ${procInfo.map((match) => match?.[1])}` )
        }

        return procInfo[0]?.[1] ?? null;
    }
}
