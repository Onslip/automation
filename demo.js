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

main(...process.argv.slice(1)).catch((err) => (console.error(String(err)), 70)).then(process.exit);
