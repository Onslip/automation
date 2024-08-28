import { defineConfig, devices } from '@playwright/test';
import { DeviceWorkerLauncher, DeviceWorkerOptions, setFixtureTimeout } from '../src/test';
import { AndroidLauncher } from './playwright.android.ts';
import { iOSLauncher } from './playwright.ios.ts';

// Launch an Android emulator and install a test app on it
const androidLauncher = new AndroidLauncher({
    archive:     __dirname + '/testapp/android/app/build/outputs/apk/debug/app-debug.apk',
    app:         'com.onslip.automation.testapp/.MainActivity',

    emulator: {
        name:    (worker) => `automation-${worker}`,
        system:  'system-images;android-34;google_apis;arm64-v8a',
        device:  '10.1in WXGA (Tablet)',
    },
});

// Launch an iOS simulator and install a test app on it (except that it doesn't work)
const iosLauncher = new iOSLauncher({
    archive:     __dirname + '/testapp/ios/App/DerivedData/App/Build/Products/Debug-iphonesimulator/App.app',
    app:         'com.onslip.automation.testapp',

    emulator: {
        name:    (worker) => `automation-${worker}`,
        system:  'com.apple.CoreSimulator.SimRuntime.iOS-17-5',
        device:  'iPad Pro 11-inch (M4)',
    },
});

// Test an app that is already running on an external device (this works with both Android and iOS)
const externalLauncher = new DeviceWorkerLauncher({
    devices:     [ 'feba19fc98c93945dc42dd7f9940d658b5dd211b' ],
})

// Set fixture timeouts so that the launchers have enough time to start up
setFixtureTimeout('device', 120_000);
setFixtureTimeout('webApp', 60_000);

export default defineConfig<{}, DeviceWorkerOptions>({
    webServer: {
        command:                'pnpm -C testapp run preview --port 3000 --strictPort',
        url:                    'http://localhost:3000/',
    },
    use: {
        baseURL:                'http://localhost:3000/',
        headless:               false,
    },
    projects: [{
        name:                   'Desktop Chrome',
        use: {                  ...devices['Desktop Chrome'] },
    }, {
        name:                   'Desktop Firefox',
        use: {                  ...devices['Desktop Firefox'] },
    }, {
        name:                   'Desktop Safari',
        use: {                  ...devices['Desktop Safari'] },
    }, {
        name:                   'Android WebApp',
        testMatch:              '**/*.e2e.ts',
        use: {                  ...devices['Galaxy Tab S4 landscape'],
            deviceWorkerConfig: {
                console,        // Debug launcher & automation
                launcher:       androidLauncher,
            },
        },
    }, {
        name:                   'iPad WebApp',
        testMatch:              '**/*.e2e.ts',
        testIgnore:             '*', // Project disabled!
        use: {                  ...devices['iPad Pro 11 landscape'],
            deviceWorkerConfig: {
                console,        // Debug launcher & automation
                launcher:       iosLauncher,
            }
        },
    }, {
        name:                   'External WebApp',
        testMatch:              '**/*.e2e.ts',
        testIgnore:             '*', // Project disabled!
        use: {                  ...devices['Nexus 10'],
            deviceWorkerConfig: {
                console,        // Debug launcher & automation
                launcher:       externalLauncher,
            }
        },
    }],
});
