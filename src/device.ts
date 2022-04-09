import { AutomationOptions } from './automation';
import { ReaderOptions } from './utils';

export interface DeviceOptions {
    adb?:                    string | null;
    ideviceinstaller?:       string;
    idevicesyslog?:          string;
    ios_instruments_client?: string;
    iwdpPort?:               number | null;
}

export interface StartOptions {
    restart?: boolean;
    wait?:    boolean;
}

export abstract class Device {
    static async findDevice(deviceId: string, options?: DeviceOptions): Promise<Device | undefined> {
        return (await Device.findDevices(options)).find((device) => device.id === deviceId);
    }

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

    abstract osVersion(): Promise<string>;
    abstract deviceName(): Promise<string>;

    abstract install(archive: string, options?: string[]): Promise<void>;
    abstract start(app: string, options?: StartOptions): Promise<void>;
    abstract stop(app: string): Promise<void>;
    abstract uninstall(app: string): Promise<void>;

    abstract readLogs(options?: ReaderOptions): AsyncGenerator<string>;
    abstract readLogs(options?: ReaderOptions, timeout?: number): AsyncGenerator<string | undefined>;
    abstract collectLogs(options?: ReaderOptions): Promise<() => Promise<string[]>>;

    abstract findWebViews(): Promise<string[]>;
    abstract bindWebView(webview: string, port: number): Promise<AutomationOptions>;
}
