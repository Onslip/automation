# The Onslip Automation Library

*Remote-control any old Android or iOS WebView in a Playwright-inspired way*

[![npm version](https://badge.fury.io/js/%40onslip%2Fautomation.svg)](https://badge.fury.io/js/%40onslip%2Fautomation)
[![Explore changelog](https://img.shields.io/badge/changelog-explore-brightgreen)](https://changelogs.xyz/@onslip/automation)

## What it is

This is a small Node.js library that helps you to E2E test/automate/remote-control Android and iOS WebViews, including
[Capacitor]- or [Cordova]-based hybrid applications.

The [Onslip Automation API](docs/index/README.md) is heavily inspired by the [Playwright Library] and the aim is to
provide a small but still very usable subset of that API. We strive to be as API compatible as we can for the subset
that is supported, but since this is a completely separate code base, *full* compatibility can never be guaranteed.

Now, unlike Playwright's Android support — which requires version 87 or greater of the WebView — this library works with
almost *any* version of the WebView, at least all the way down to the last [Crosswalk] release (which was based on
Chromium 53)[^1]. We use it to automate Crosswalk on Android 4.1 and 6.0 devices, the default system WebView in Android
8 as well as iOS devices running iOS 12.4 and 15.4.

Additionally, we now also provide [fixtures and matchers](docs/test/README.md) for [Playwright Test](#playwright-test),
enabling integration/E2E testing of hybrid applications too.

## How to use it

First, add this library as a dependency using your favorite package manager:

```sh
$ npm install -D @onslip/automation
$ pnpm add -D @onslip/automation
$ yarn add -D @onslip/automation
```

Second, ensure these dependencies are available:

* Android support requires the [adb] command to be installed and available in the path.
* iOS support needs [ios_webkit_debug_proxy] to be running and listening on port 9221. The iOS device management support
  uses
  * [ideviceinstaller] to install/uninstall apps;
  * [idevicesyslog] to read device logs; and
  * [ios_instruments_client] to start and stop iOS processes.

The first three iOS dependencies can be installed and activated from *Homebrew* with the following commands.
`ios_instruments_client` must be compiled and copied to the path manually.

```sh
$ brew install ios-webkit-debug-proxy libimobiledevice ideviceinstaller
$ ios_webkit_debug_proxy
```

Finally, try this small example—or keep reading to see how to integrate with [Playwright Test](#playwright-test).

```js
const { Device, AndroidDevice, findWebViewContexts, openWebView, pipeline } = require('@onslip/automation');
const { createWriteStream } = require('fs');
const { Readable } = require('stream');

const PROXY_PORT = 8885;

async function main(prog, deviceId) {
    const device = await Device.findDevice(deviceId);

    if (!device) {
        const devices = await Device.findDevices();
        throw `Usage: ${prog} ${devices.map((d) => d.id).join('|') || '<device>'}`;
    }

    console.log(`Checking for debuggable web view on device ${device}`);
    const [ webviewId ] = await device.findWebViews();

    console.log(`Found web view ${webviewId}; opening proxy port ${PROXY_PORT}`);
    const options = await device.bindWebView(webviewId, PROXY_PORT);

    console.log(`Looking for contexts`);
    const [ context ] = await findWebViewContexts(options);

    console.info(`Opening CDP connection via port ${options.port} to context ${context.id} <${context.url}>`);
    const page = await openWebView({...options, ctxId: context.id });

    console.info(`Starting automation of ${webviewId} on device ${device}`);
    page.setDebug(true);

    try {
        const lollipop = parseInt(await device.osVersion()) >= 5;
        const logLines = device instanceof AndroidDevice
            ? await device.collectLogs({ clear: !lollipop, historic: !lollipop, filterspecs: ['*:D'] })
            : await device.collectLogs();

        const divs = await page.locator('div').count();
        console.log(`There are ${divs} DIV elements in the web view!`);

        await page.locator('body').screenshot({ path: `${deviceId}.png` });
        console.log(`Saved a screenshot to ${deviceId}.png`);

        await pipeline(Readable.from(await logLines()), createWriteStream(`${deviceId}.log`));
        console.log(`Saved device logs to ${deviceId}.log`);
    } finally {
        await page.close();
    }
}

main(...process.argv.slice(1)).catch((err) => (console.error(err), 70)).then(process.exit);
```

## Playwright Test

[Playwright Test] (or `@playwright/test`) a testing framework that uses the [Playwright Library] for end-to-end testing
of web sites and web applications. Thanks to the [fixtures and matchers](docs/test/README.md) provided by the Onslip
Automation Library, you can now use Playwright Test to test your hybrid applications as well—on real devices or on
emulators. Just import `test` and `expect` from `@onslip/automation/test` instead of `@playwright/test` and you're good
to go.

```ts
import { test, expect } from '@onslip/automation/test';

test('has title', async ({ webApp }) => {
    // Expect a title "to contain" a substring.
    await expect(webApp.locator('title')).toHaveText(/Capacitor/);
});

test('get started link', async ({ webApp }) => {
    // Expect the "get started" button to link to https://capacitorjs.com.
    await expect(webApp.locator('.button', { hasText: 'Read more' })).toHaveAttribute('href', 'https://capacitorjs.com');
});
```

Please have a look at [the included demo project](tests/) for an example of how to launch an Android emulator, install a
Capacitor hybrid app, and run tests on it.

[Capacitor]:              https://capacitorjs.com/
[Cordova]:                https://cordova.apache.org/
[Crosswalk]:              https://github.com/crosswalk-project
[Playwright Library]:     https://playwright.dev/docs/library
[Playwright Test]:        https://playwright.dev/docs/intro

[adb]:                    https://developer.android.com/studio/command-line/adb
[ios_webkit_debug_proxy]: https://github.com/google/ios-webkit-debug-proxy
[ideviceinstaller]:       https://github.com/libimobiledevice/ideviceinstaller
[idevicesyslog]:          https://github.com/libimobiledevice/libimobiledevice
[ios_instruments_client]: https://github.com/troybowman/ios_instruments_client

[^1]: Using our [fork of Capacitor](https://github.com/Onslip/capacitor-android-v16) together with Crosswalk, it's
      possible to run (and now automate or test) hybrid applications even on ancient devices running Android 4.1 from
      2012.
