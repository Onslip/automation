/// <reference lib="DOM" />

import { expect as baseExpect, test as baseTest, ExpectMatcherState, FullProject, MatcherReturnType, WorkerInfo } from '@playwright/test';
import { Device, DeviceOptions, Locator, openWebView, Page, resolveWebViewContext, throwError } from '../src';
import matchers from './matchers.cjs'

/** {@link DeviceWorkerFixtures} configuration. */
export interface DeviceWorkerOptions {
    /** Configuration for the Onslip Automation Library fixtures for Playwright. */
    deviceWorkerConfig: null | {
        /** Lifecycle and configuration management. */
        launcher: DeviceWorkerLauncher;

        /** A {@link Console} to use for debug logging. */
        console?: Partial<Console>;

        /** {@link DeviceOptions} to use. */
        deviceOptions?: DeviceOptions;
    };
}

/** The Onslip Automation Library fixtures for Playwright. */
export interface DeviceWorkerFixtures {
    /** The connected {@link Device}. */
    device: Device;

    /** The web app {@link Page} that is being automated. */
    webApp: Page;
}

/** {@link DeviceWorkerLauncher} options. */
export interface DeviceWorkerLauncherOptions {
    /** If specified, path to the application to install on the device */
    archive?:   string;

    /** If specified, the package/activity identifier or application bundle identifier to launch. */
    app?:       string;

    /** Optional application arguments. */
    args?:      string[];

    /** The web view/context to connect to (the actual device ID will be prepended to form a proper context path). */
    context?:   string;

    /** A static list of device IDs to use (must match the number or workers) by default. */
    devices?:   string[];
}

/** {@link resolveWebViewContext} arguments that should be used to connect to the web app. */
export interface WebAppConfig {
    /** Specify what device, web view and context to use. */
    contextPath: string;

    /** The port to bind the web view to. See {@link Device.bindWebView}. */
    proxyPort: number;
}

/** Device and configuration manager. */
export class DeviceWorkerLauncher<Options extends DeviceWorkerLauncherOptions = DeviceWorkerLauncherOptions> {
    private counter = 0;
    private devices: (number | undefined)[] = [];

    constructor(protected options?: Options) {
    }

    /** Returns the device index for the specified worker. */
    protected deviceIndex(worker: number): number {
        return this.devices[worker] ??= this.counter++;
    }

    /** Returns the device worker configuration from the {@link DeviceWorkerOptions} fixture options. */
    protected deviceWorkerConfig(workerInfo: WorkerInfo) {
        return (workerInfo.project as FullProject<{}, DeviceWorkerOptions>).use.deviceWorkerConfig;
    }

    /**
     * Setup a device for the specified worker.
     *
     * The default implementation just returns the device ID from the {@link DeviceWorkerLauncherOptions#devices} }
     * array. A subclass might launch an emulator or provision to a physical device, and return its ID.
     *
     * @param worker     The worker index.
     * @param headless   Whether to start the device in headless mode or not.
     * @param workerInfo The worker information.
     * @returns          The device ID to use.
    */
    async setup(worker: number, headless: boolean, workerInfo: WorkerInfo): Promise<string> {
        const devIndex = this.deviceIndex(worker);
        const deviceId = this.options?.devices?.[devIndex];

        return deviceId || throwError(new Error(`No device ID specified for index ${devIndex} (worker ${worker})`));
    }

    /**
     * Launches the configured application on a device and returns information about what web view to connect to.
     *
     * The default implementation makes a fresh install of the application package, if specified in
     * {@link DeviceWorkerLauncherOptions#archive}, and then launches the application specified in
     * {@link DeviceWorkerLauncherOptions#app}.
     *
     * @param worker      The worker index.
     * @param device      The device to start the application on.
     * @param workerInfo  The worker information.
     * @returns           Information about the web view to connect to.
     */
    async start(worker: number, device: Device, workerInfo: WorkerInfo): Promise<WebAppConfig> {
        const dwConfig = this.deviceWorkerConfig(workerInfo);
        const proxyPort = 5400 + worker;

        if (this.options?.app) {
            if (this.options.archive) {
                dwConfig?.console?.info?.(`⚙️  Reinstalling ${this.options.archive} on device ${device.id}`);
                await device.uninstall(this.options.app).catch(() => { });
                await device.install(this.options.archive);
            }

            dwConfig?.console?.info?.(`⚙️  Starting ${this.options.app} on device ${device.id}`);
            await device.start(this.options.app, { restart: true, wait: true, args: this.options.args });
        }

        return { contextPath: `${device.id}/${this.options?.context ?? ''}`, proxyPort };
    }

    /**
     * Stops the configured application on a device.
     *
     * @param worker      The worker index.
     * @param device      The device to stop the application on.
     * @param workerInfo  The worker information.
     */
    async stop(worker: number, device: Device, workerInfo: WorkerInfo): Promise<void> {
        const dwConfig = this.deviceWorkerConfig(workerInfo);

        if (this.options?.app) {
            dwConfig?.console?.info?.(`⚙️  Stopping ${this.options.app} on device ${device.id}`);
            await device.stop(this.options.app);
        }
    }

    /**
     * Teardown a device for the specified worker.
     *
     * The default implementation does nothing. A subclass might stop an emulator or release a physical device.
     *
     * @param worker      The worker index.
     * @param workerInfo  The worker information.
     */
    async teardown(worker: number, workerInfo: WorkerInfo): Promise<void> {
        // Do nothing by default
    }
}

const fixtureTimeout: Partial<Record<keyof DeviceWorkerFixtures, number | undefined>> = {};

/**
 * Configure the timeout for a device worker fixture.
 *
 * @param fixture  The fixture to configure.
 * @param timeout  The timeout in milliseconds, or `undefined` for no specific fixture timeout.
 */
export function setFixtureTimeout(fixture: keyof DeviceWorkerFixtures, timeout: number | undefined): void {
    fixtureTimeout[fixture] = timeout;
}

/**
 * Returns the timeout for a device worker fixture.
 *
 * @param fixture  The fixture to get the timeout for.
 * @returns        The timeout in milliseconds, or `undefined` if no specific fixture timeout has been set.
 */
export function getFixtureTimeout(fixture: keyof DeviceWorkerFixtures): number | undefined {
    return fixtureTimeout[fixture];
}

export const test = baseTest.extend<{}, DeviceWorkerOptions & DeviceWorkerFixtures>({
    deviceWorkerConfig: [null, { scope: `worker`, option: true }],

    device: [async ({ deviceWorkerConfig, headless, launchOptions }, use, workerInfo) => {
        const worker = workerInfo.parallelIndex;
        const onExit = () => deviceWorkerConfig?.launcher?.teardown(worker, workerInfo).catch(console.error);

        try {
            process.on('beforeExit', onExit).on('exit', onExit);

            const id = await deviceWorkerConfig?.launcher?.setup(worker, headless, workerInfo)
                    ?? throwError(new TypeError(`No 'deviceWorkerConfig.launcher' configured`));

            const device = await Device.findDevice(id, deviceWorkerConfig?.deviceOptions, launchOptions.timeout ?? 30_000)
                    ?? throwError(new Error(`Device ${id} not found`));

            await use(device);
        } finally {
            process.off('beforeExit', onExit).off('exit', onExit);
            await onExit();
        }
    }, Object.defineProperty({ scope: `worker` }, 'timeout', { enumerable: true, get: () => getFixtureTimeout('device') }) ],

    webApp: [async ({ deviceWorkerConfig, device, launchOptions }, use, workerInfo) => {
        const worker = workerInfo.parallelIndex;
        const onExit = () => deviceWorkerConfig?.launcher?.stop?.(worker, device, workerInfo).catch(console.error);

        try {
            process.on('beforeExit', onExit).on('exit', onExit);

            const wac = await deviceWorkerConfig?.launcher?.start(worker, device, workerInfo)
                ?? throwError(new TypeError(`No 'deviceWorkerConfig.launcher' configured`));

            const { options } = await resolveWebViewContext(wac.contextPath, wac.proxyPort, deviceWorkerConfig?.deviceOptions, launchOptions.timeout ?? 30_000);

            const webApp = await openWebView(options);
            webApp.setDebug(deviceWorkerConfig?.console ?? null);

            await use(webApp);
        } finally {
            process.off('beforeExit', onExit).off('exit', onExit);
            await onExit();
        }
    }, Object.defineProperty({ scope: `worker` }, 'timeout', { enumerable: true, get: () => getFixtureTimeout('webApp') }) ],
});

async function check<T>(state: ExpectMatcherState, options: { timeout?: number } | undefined, name: string, expected: T, fn: (timeout: number) => Promise<T>, mode: 'exact' | 'substring' = 'exact'): Promise<MatcherReturnType> {
    const timeout = options?.timeout ?? state.timeout;
    const expires = Date.now() + timeout;

    let actual = undefined;

    try {
        await baseExpect(async () => {
            actual = await fn(expires - Date.now());

            if (expected instanceof RegExp) {
                expect(String(actual)).toMatch(expected);
            } else if (mode === 'substring') {
                expect(String(actual)).toContain(String(expected));
            } else {
                expect(actual).toBe(expected);
            }
        }).toPass({ timeout });

        return { pass: true, name, message: () => 'OK' };
    } catch (err: any) {
        return { pass: false, name, message: () => err.message, expected, actual };
    }
}

function normalized(text?: string | null) {
    return text?.replace(/\s+/g, ' ').trim() ?? '';
}

export const expect = baseExpect.extend({
    async toBeAttached(locator: Locator, options?: { attached?: boolean, timeout?: number }): Promise<MatcherReturnType> {
        if (locator instanceof Locator === false) {
            return matchers.toBeAttached.call(this, locator, options);
        }

        return check(this, options, 'toBeAttached', options?.attached ?? true, (timeout) =>
            locator.waitFor({ state: 'attached', timeout }).then(() => true));
    },

    async toBeChecked(locator: Locator, options?: { checked?: boolean, timeout?: number }): Promise<MatcherReturnType> {
        if (locator instanceof Locator === false) {
            return matchers.toBeChecked.call(this, locator, options);
        }

        return check(this, options, 'toBeChecked', options?.checked ?? true, (timeout) =>
            locator.isChecked({ timeout }));
    },

    async toBeDisabled(locator: Locator, options?: { enabled?: boolean, timeout?: number }): Promise<MatcherReturnType> {
        if (locator instanceof Locator === false) {
            return matchers.toBeDisabled.call(this, locator, options);
        }

        return check(this, options, 'toBeDisabled', true, (timeout) =>
            locator.isDisabled({ timeout }));
    },

    async toBeEditable(locator: Locator, options?: { editable?: boolean, timeout?: number }): Promise<MatcherReturnType> {
        if (locator instanceof Locator === false) {
            return matchers.toBeEditable.call(this, locator, options);
        }

        return check(this, options, 'toBeEditable', options?.editable ?? true, (timeout) =>
            locator.isEditable({ timeout }));
    },

    // TODO: toBeEmpty

    async toBeEnabled(locator: Locator, options?: { enabled?: boolean, timeout?: number }): Promise<MatcherReturnType> {
        if (locator instanceof Locator === false) {
            return matchers.toBeEnabled.call(this, locator, options);
        }

        return check(this, options, 'toBeEnabled', options?.enabled ?? true, (timeout) =>
            locator.isEnabled({ timeout }));
    },

    // TODO: toBeFocused

    async toBeHidden(locator: Locator, options?: { timeout?: number }): Promise<MatcherReturnType> {
        if (locator instanceof Locator === false) {
            return matchers.toBeHidden.call(this, locator, options);
        }

        return check(this, options, 'toBeHidden', true, (timeout) =>
            locator.isHidden());
    },

    // TODO: toBeInViewport

    async toBeVisible(locator: Locator, options?: { visible?: boolean, timeout?: number }): Promise<MatcherReturnType> {
        if (locator instanceof Locator === false) {
            return matchers.toBeVisible.call(this, locator, options);
        }

        return check(this, options, 'toBeVisible', options?.visible ?? true, (timeout) =>
            locator.isVisible());
    },

    async toContainText(locator: Locator, expected: string | RegExp, options?: { ignoreCase?: boolean, useInnerText?: boolean, timeout?: number }): Promise<MatcherReturnType> {
        if (locator instanceof Locator === false) {
            return matchers.toContainText.call(this, locator, expected, options);
        }

        const normalizer = options?.ignoreCase ? (text: string) => normalized(text.toLowerCase()) : normalized;

        return check(this, options, 'toContainText', typeof expected === 'string' ? normalizer(expected) : expected, (timeout) =>
            locator[options?.useInnerText ? 'innerText' : 'textContent']({ timeout })
                .then((actual) => typeof expected === 'string' ? normalizer(actual) : actual), 'substring');
    },

    // TODO: toHaveAccessibleDescription
    // TODO: toHaveAccessibleName

    async toHaveAttribute(locator: Locator, name: string, expected: string | RegExp | null, options?: { timeout?: number }): Promise<MatcherReturnType> {
        if (locator instanceof Locator === false) {
            return matchers.toHaveAttribute.call(this, locator, name, expected, options);
        }

        return check(this, options, 'toHaveAttribute', expected, (timeout) =>
            locator.getAttribute(name, { timeout }));
    },

    // TODO: toHaveClass

    async toHaveCount(locator: Locator, count: number, options?: { timeout?: number }): Promise<MatcherReturnType> {
        if (locator instanceof Locator === false) {
            return matchers.toHaveCount.call(this, locator, count, options);
        }

        return check(this, options, 'toHaveCount', count, (timeout) =>
            locator.count());
    },

    // TODO: toHaveCSS
    // TODO: toHaveId
    // TODO: toHaveJSProperty
    // TODO: toHaveRole
    // TODO: toHaveScreenshot

    async toHaveText(locator: Locator, expected: string | RegExp, options?: { ignoreCase?: boolean, useInnerText?: boolean, timeout?: number }): Promise<MatcherReturnType> {
        if (locator instanceof Locator === false) {
            return matchers.toHaveText.call(this, locator, expected, options);
        }

        const normalizer = options?.ignoreCase ? (text: string) => normalized(text.toLowerCase()) : normalized;

        return check(this, options, 'toHaveText', typeof expected === 'string' ? normalizer(expected) : expected, (timeout) =>
            locator[options?.useInnerText ? 'innerText' : 'textContent']({ timeout })
                .then((actual) => typeof expected === 'string' ? normalizer(actual) : actual));
    },

    async toHaveValue(locator: Locator, expected: string | RegExp, options?: { timeout?: number }): Promise<MatcherReturnType> {
        if (locator instanceof Locator === false) {
            return matchers.toHaveValue.call(this, locator, expected, options);
        }

        return check(this, options, 'toHaveValue', expected, (timeout) =>
            locator.inputValue({ timeout }));
    },

    // TODO: toHaveValues
});
