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

    console.log(`Checking for debuggable webview on device ${device}`);
    const [ webview ] = await device.findWebViews();

    console.log(`Found webview ${webview}; opening proxy port ${PROXY_PORT}`);
    const options = await device.bindWebView(webview, PROXY_PORT);

    console.log(`Looking for contexts`);
    const [ context ] = await findWebViewContexts(options);

    console.info(`Opening CDP connection via port ${options.port} to context ${context.id} <${context.url}>`);
    const page = await openWebView({...options, ctxId: context.id });

    console.info(`Starting automation of ${webview} on device ${device}`);
    page.setDebug(true);

    try {
        const lollipop = await device.osVersion() >= "5";
        const logLines = device instanceof AndroidDevice
            ? await device.collectLogs({ clear: !lollipop, historic: !lollipop, filterspecs: ['*:D'] })
            : await device.collectLogs();

        const divs = await page.locator('div').count();
        console.log(`There are ${divs} DIV elements in the webview!`);

        await page.locator('body').screenshot({ path: `${deviceId}.png` });
        console.log(`Saved a screenshot to ${deviceId}.png`);

        await pipeline(Readable.from(await logLines()), createWriteStream(`${deviceId}.log`));
        console.log(`Saved device logs to ${deviceId}.log`);
    } finally {
        await page.close();
    }
}

main(...process.argv.slice(1)).catch((err) => (console.error(err), 70)).then(process.exit);
