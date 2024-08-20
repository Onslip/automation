import { WorkerInfo } from '@playwright/test';
import { execFile } from '../src';
import { DeviceWorkerLauncher, DeviceWorkerLauncherOptions } from '../src/test';

export interface iOSLauncherOptions extends DeviceWorkerLauncherOptions {
    emulator?: {
        name:   (worker: number) => string,
        system: string,
        device: string,
    },
}

export class iOSLauncher extends DeviceWorkerLauncher<iOSLauncherOptions> {
    private simulators: (string | undefined)[] = [];

    override async setup(worker: number, headless: boolean, workerInfo: WorkerInfo) {
        const dwConfig = this.deviceWorkerConfig(workerInfo);

        if (this.options?.emulator) {
            dwConfig?.console?.info?.(`⚙️  Creating simulator ${this.options.emulator.name(worker)}`);
            const deviceId = this.simulators[worker] = (await execFile('xcrun', [
                'simctl', 'create',
                this.options.emulator.name(worker),
                this.options.emulator.device,
                this.options.emulator.system
            ])).stdout.trim();

            dwConfig?.console?.info?.(`⚙️  Starting simulator ${this.options.emulator.name(worker)} as device ${deviceId}`);
            await execFile('xcrun', ['simctl', 'boot', deviceId]);

            if (!headless) {
                dwConfig?.console?.info?.(`⚙️  Opening simulator UI for device ${deviceId}`);
                await execFile('open', ['-a', 'Simulator', `--args`, `-CurrentDeviceUDID`, deviceId]).catch(dwConfig?.console?.error ?? console.error);
            }

            dwConfig?.console?.error?.(`⚙️  The web inspector socket is at ${await this.simulatorSocket(deviceId)},`);
            dwConfig?.console?.error?.(`⚙️  but since ios_webkit_debug_proxy doesn't detects iOS simulators properly, this is not really going to work ...`);

            return deviceId;
        } else {
            return super.setup(worker, headless, workerInfo);
        }
    }

    override async teardown(worker: number, workerInfo: WorkerInfo) {
        const dwConfig = this.deviceWorkerConfig(workerInfo);

        if (this.options?.emulator) {
            const deviceId = this.simulators[worker] ?? this.options.emulator.name(worker);

            dwConfig?.console?.info?.(`⚙️  Stopping simulator ${deviceId}`);
            await execFile('xcrun', ['simctl', 'shutdown', deviceId]).catch(dwConfig?.console?.error ?? console.error);

            dwConfig?.console?.info?.(`⚙️  Deleting simulator ${deviceId}`);
            await execFile('xcrun', ['simctl', 'delete', deviceId]);
        }
    }

    private async simulatorSocket(deviceId: string) {
        const lsof = (await execFile('lsof', ['-aUc', 'launchd_sim'])).stdout.split('\n');
        const proc = lsof.find((line) => RegExp(`com\.apple\.CoreSimulator\.SimDevice\.${deviceId}`).test(line))?.split(/\s+/)[1];
        const sock = lsof.find((line) => RegExp(`^[^ ]+\\s+${proc}\\s.*com\.apple\.webinspectord_sim\.socket`).test(line))?.split(/\s+/)[7];

        // Example lsof output:
        //     launchd_s 88333   mb    4u  unix 0xda3c088bc3fdbaf0      0t0      /tmp/com.apple.CoreSimulator.SimDevice.5B7EBC7F-6778-42E7-8CCC-56ACDC3C9ED0/syslogsock
        //     launchd_s 88333   mb    5u  unix  0x360627c6ecf0e28      0t0      /private/tmp/com.apple.launchd.VNtrfJseJr/com.apple.webinspectord_sim.socket

        if (!sock) {
            throw new Error(`Failed to find web inspector socket for simulator ${deviceId}`);
        }

        return sock;
    }
}
