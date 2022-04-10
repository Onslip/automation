import { AutomationOptions } from './automation';
import { ReaderOptions } from './utils';

/**
 * Device manager configuration.
 */
export interface DeviceOptions {
    /**
     * Where to find the `adb` command. `undefined` means Android support is optional (enabled if `adb` is in the path) and
     * `null` disables Android support completely.
     */
    adb?:                    string | null;

    /** Where to find the `ideviceinstaller` command. Used by [[iOSDevice.install]]/[[iOSDevice.uninstall]]. */
    ideviceinstaller?:       string;

    /** Where to find the `idevicesyslog` command. Used by [[iOSDevice.readLogs]]/[[iOSDevice.collectLogs]]. */
    idevicesyslog?:          string;

    /** Where to find the `ios_instruments_client` command. Used by [[iOSDevice.start]]/[[iOSDevice.stop]]. */
    ios_instruments_client?: string;

    /**
     * What port `ios_webkit_debug_proxy` is listening on. `undefined` means iOS support is optional (enabled if
     * `ios_webkit_debug_proxy` is listening on port 9221) and `null` disables iOS support completely.
     */
    iwdpPort?:               number | null;
}

export interface StartOptions {
    /** Close the application first, if it is already running. */
    restart?: boolean;

    /** Wait for the application to start up before returning. */
    wait?:    boolean;
}

/**
 * This class manages Android and iOS devices and applications.
 */
export abstract class Device {
    /**
     * Finds a single device, given a device ID.
     *
     * @param deviceId  The device ID to find.
     * @param options   Device manager options.
     * @returns         The device, if found, else `undefined`.
     */
    static async findDevice(deviceId: string, options?: DeviceOptions): Promise<Device | undefined> {
        return (await Device.findDevices(options)).find((device) => device.id === deviceId);
    }

    /**
     * Finds all connected Android and iOS devices.
     *
     * @param options  Device manager options.
     * @returns        A list of detected devices.
     */
    static async findDevices(options?: DeviceOptions): Promise<Device[]> {
        const { AndroidDevice } = await import('./android-device');
        const { iOSDevice } = await import('./ios-device');

        return [
            ...await AndroidDevice.findDevices(options),
            ...await iOSDevice.findDevices(options),
        ].sort((a, b) => a.id.localeCompare(b.id));
    }

    protected constructor(public id: string, public type: 'android' | 'ios') {
    }

    /**
     * Returns the Android/iOS version number.
     *
     * @returns  The version number.
     */
    abstract osVersion(): Promise<string>;

    /**
     * Returns the name of the device.
     *
     * @returns  The device name.
     */
    abstract deviceName(): Promise<string>;

    /**
     * Installs an application onto the device.
     *
     * @param archive  The path to the application to install (APK/IPA/directory).
     * @param options  Optional installation options, if the subclass supports it.
     */
    abstract install(archive: string, options?: string[]): Promise<void>;

    /**
     * Launches an application/activity on the device.
     *
     * @param app      The package/activity identifier or application bundle identifier to launch.
     * @param options  Optional start options.
     */
    abstract start(app: string, options?: StartOptions): Promise<void>;

    /**
     * Kills an application on the device.
     *
     * @param app  The package/activity identifier or application bundle identifier to stop.
     */
    abstract stop(app: string): Promise<void>;

    /**
     * Uninstalls an application from the device.
     *
     * @param app  The package/bundle identifier to uninstall.
     */
    abstract uninstall(app: string): Promise<void>;

    /**
     * Reads log lines from the device.
     *
     * @param options  Reader options. For device-specific options, see the subclass method.
     * @returns        An async iterator generating one line at a time.
     */
    abstract readLogs(options?: ReaderOptions): AsyncGenerator<string>;

    /**
     * Reads log lines from the device, with heartbeats.
     *
     * @param options  Reader options. For device-specific options, see the subclass method.
     * @param timeout  The timeout, in milliseconds. If no lines has been produced within this time, an `undefined`
     *                 value is generated instead of a string.
     * @returns        An async iterator generating one line at a time, or `undefined` on timeouts.
     */
    abstract readLogs(options?: ReaderOptions, timeout?: number): AsyncGenerator<string | undefined>;

    /**
     * Begins collecting and buffering logs from the device. When the returned function is called, all lines are
     * returned as an array.
     *
     * By default, this method adds a LF to each collected line, making the array suitable to be dumped to disk as-is.
     *
     * @param options  Reader options. For device-specific options, see the subclass method.
     * @returns        A function that, when invoked, stops logging and returns all collected lines.
     */
    abstract collectLogs(options?: ReaderOptions): Promise<() => Promise<string[]>>;

    /**
     * Finds all debuggable web views on the device.
     *
     * For additional information, see the subclass documentation of this method.
     *
     * @returns  An array of all debuggable web view indentifiers.
     */
    abstract findWebViews(): Promise<string[]>;

    /**
     * Binds a web view to the specified port on `localhost`.
     *
     * For additional information, see the subclass documentation of this method.
     *
     * @param webview  The web view identifier to bind.
     * @param port     The port to bind the web view to.
     * @returns        Options suitable to pass to [[findWebViewContexts]] or [[openWebView]].
     */
    abstract bindWebView(webview: string, port: number): Promise<AutomationOptions>;
}
