# The Onslip Automation Library

*Remote-control any old Android WebView in a Playwright-inspired way*

[![npm version](https://badge.fury.io/js/%40onslip%2Fautomation.svg)](https://badge.fury.io/js/%40onslip%2Fautomation)

## What it is

This is a small library that helps you to E2E test/automate/remote-control Android WebViews, including as [Capacitor]-
or [Cordova]-based applications.

The automation API is heavily inspired by [Playwright] and the aim is to provide a small but still very usable subset of
that API. We strive to be as API compatible as we can for the subset that is supported, but since this is a completely
separate code base, *full* compatibility can never be guaranteed.

Now, unlike Playwright's Android support — which requires version 87 or greater of the WebView — this library works with
almost *any* version of the WebView, at least all the way down to the last [Crosswalk] release (which was based on
Chromium 53)[^1].

## How to use it

First, add this library as a dependency:

```sh
npm install -D @onslip/automation
```

```sh
pnpm add -D @onslip/automation
```

```sh
yarn add -D @onslip/automation
```

Then try this small example:

```js
const { collectAndroidLogs, findAndroidDevices, findAndroidWebViews, forwardAndroidWebView,
        openRemoteWebView, pipeline } = require('@onslip/automation');
const { createWriteStream } = require('fs');
const { Readable } = require('stream');

const PROXY_PORT = 8885;

async function main(prog, device) {
    if (!device) {
        const devices = await findAndroidDevices();
        throw new TypeError(`Usage: ${prog} ${devices.join('|') || '<device>'}`);
    }

    console.log(`Checking for debuggable webview on device ${device}`);
    const [ webview ] = await findAndroidWebViews(device);

    console.log(`Found webview ${webview}; opening proxy port ${PROXY_PORT}`);
    await forwardAndroidWebView(device, webview, PROXY_PORT);

    console.info(`Opening CDP connection via port ${PROXY_PORT}`);
    const page = await openRemoteWebView({ port: PROXY_PORT });

    console.info(`Starting automation of ${webview} on device ${device}`);
    page.setDebug(true);

    try {
        const logLines = collectAndroidLogs(device, {
            clear: true, separator: '\n', filterspecs: ['*:V']
        });

        const divs = await page.locator('div').count();
        console.log(`There are ${divs} DIV elements in the webview!`);

        await page.locator('body').screenshot({ path: `${device}.png` });
        console.log(`Saved a screenshot to ${device}.png`);

        await pipeline(Readable.from(await logLines()), createWriteStream(`${device}.log`));
        console.log(`Saved device logs to ${device}.log`);
    } finally {
        await page.close();
    }
}

main(...process.argv.slice(1)).catch(err => (console.error(String(err)), 70)).then(process.exit);
```

[Capacitor]:  https://capacitorjs.com/
[Cordova]:    https://cordova.apache.org/
[Crosswalk]:  https://github.com/crosswalk-project
[Playwright]: https://playwright.dev/

[^1]: Using our [fork of Capacitor](https://github.com/Onslip/capacitor-android-v16) together with Crosswalk, it's
      possible to run (and now automate) hybrid applications even on ancient devices running Android 4.1 from 2012.
