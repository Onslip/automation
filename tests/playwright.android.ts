import { WorkerInfo } from '@playwright/test';
import { execFile, sleep } from '../src';
import { DeviceWorkerLauncher, DeviceWorkerLauncherOptions } from '../src/test';

export interface AndroidLauncherOptions extends DeviceWorkerLauncherOptions {
    emulator?: {
        name:   (worker: number) => string,
        system: string,
        device: string,
        ports?: number[],
    },
}

export class AndroidLauncher extends DeviceWorkerLauncher<AndroidLauncherOptions> {
    private emulators: (ReturnType<typeof execFile> | undefined)[] = [];

    override async setup(worker: number, headless: boolean, workerInfo: WorkerInfo) {
        const dwConfig = this.deviceWorkerConfig(workerInfo);

        if (this.options?.emulator) {
            const emulatorPort = 5300 + worker * 2;
            const deviceId = `emulator-${emulatorPort}`;

            dwConfig?.console?.info?.(`⚙️  Creating AVD ${this.options.emulator.name(worker)}`);
            await execFile('avdmanager', ['--silent', 'create', 'avd',
                '--force',
                '--name',    this.options.emulator.name(worker),
                '--package', this.options.emulator.system,
                '--device',  this.options.emulator.device,
            ]);

            // Ensure ADB server is running before starting emulator
            await execFile('adb', ['start-server']);

            dwConfig?.console?.info?.(`⚙️  Starting ${headless ? 'headless ' : ''}emulator ${this.options.emulator.name(worker)} as device ${deviceId}`);
            this.emulators[worker]?.child.kill();
            this.emulators[worker] = execFile('emulator', [
                '-avd',         this.options.emulator.name(worker),
                '-port',        `${emulatorPort}`,
                '-no-snapshot',
                ...headless ? [ '-no-window' ] : [],
            ]);

            for (let i = 0; (await execFile('adb', ['-s', deviceId, 'wait-for-device', 'shell', 'getprop', 'sys.boot_completed'])).stdout.trim() !== '1'; ++i) {
                i % 10 || dwConfig?.console?.debug?.(`🐢 Waiting for device ${deviceId} to boot ...`);
                await sleep(1000);
            }

            for (const port of this.options.emulator.ports ?? []) {
                dwConfig?.console?.info?.(`⚙️  Forwarding localhost port ${port} from device ${deviceId} to host`);
                await execFile('adb', ['-s', deviceId, 'reverse', `tcp:${port}`, `tcp:${port}`]);
            }

            return deviceId;
        } else {
            return super.setup(worker, headless, workerInfo);
        }
    }

    override async teardown(worker: number, workerInfo: WorkerInfo) {
        const dwConfig = this.deviceWorkerConfig(workerInfo);

        if (this.options?.emulator) {
            dwConfig?.console?.info?.(`⚙️  Stopping emulator ${this.options.emulator.name(worker)}`);
            this.emulators[worker]?.child.kill();
            await this.emulators[worker]?.catch(dwConfig?.console?.error ?? console.error);

            dwConfig?.console?.info?.(`⚙️  Deleting AVD ${this.options.emulator.name(worker)}`);
            await execFile('avdmanager', ['delete', 'avd', '--name', this.options.emulator.name(worker)]);
        }
    }
}
