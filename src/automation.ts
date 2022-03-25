import CDP, { Client, Options, Protocol, VersionResult } from 'chrome-remote-interface';
import { readFileSync } from 'fs';
import Jimp from 'jimp';
import { resolve } from 'path';
import { isDeepStrictEqual } from 'util';
import { AutomationOptions } from './adb';
import { Page } from './api';
import P11 from './protocol-1.1.json';
import P12 from './protocol-1.2.json';
import P13 from './protocol-1.3.json';
import { sleep } from './utils';

const RuntimeSupport = readFileSync(resolve(__dirname, '../automation-runtime.js'));

type ObjectResult = Awaited<ReturnType<Client['Runtime']['evaluate']>> & { wasThrown?: boolean };
type RemoteObject = Awaited<ReturnType<Client['Runtime']['evaluate']>>['result']

export interface Rectangle {
    x:      number;
    y:      number;
    width:  number;
    height: number;
}

export interface ElementInfo {
    attributes?:   [ name: string, value: string ][];
    boundingBox?:  Rectangle;
    innerHTML?:    string;
    innerText?:    string;
    inputValue?:   string;
    isConnected?:  boolean;
    isEditable?:   boolean;
    isEnabled?:    boolean;
    isStable?:     boolean;
    isTarget?:     boolean;
    isVisible?:    boolean;
    namespaceURI?: string | null;
    nodeName?:     string;
    textContent?:  string | null;
}

export type ElementConstraints = {
    [K in keyof ElementInfo]?: ElementInfo[K] | undefined;
}

export interface AutomationConfig {
    timeout: number;
    debug:   boolean;
}

export class Automation {
    private _options: Options;
    private _client!: Client
    private _version!: VersionResult & { 'Android-Package'?: string };
    private _runtime!: RemoteObject;
    private _objGroup = String(Date.now() + Math.random());

    constructor(options: AutomationOptions) {
        const protocol =
            options.protocol === '1.1' ? P11 as Protocol :
            options.protocol === '1.2' ? P12 as Protocol :
            options.protocol === '1.3' ? P13 as Protocol :
            options.protocol === 'latest' ? undefined : options.protocol;

        this._options = { ...options, protocol, local: protocol === undefined };
    }

    async initialize(): Promise<this> {
        this._client = await CDP(this._options);
        this._version = await CDP.Version({ port: this._options.port });

        this._runtime = await this.unwrap(false, false, await this._client.Runtime.evaluate({
            expression: `(function () { ${RuntimeSupport}; return new RuntimeSupport(); })()`,
            objectGroup: this._objGroup,
        }));

        return this;
    }

    async close(): Promise<this> {
        await this._client.Runtime.releaseObjectGroup({ objectGroup: this._objGroup });
        await this._client.close();
        return this;
    }

    page(): Page {
        return new Page(this);
    }

    async element(selectors: string[], constraints: ElementConstraints, options: { debug: boolean, timeout: number }): Promise<ElementInfo> {
        const expires = Date.now() + options.timeout;
        const description = `«${selectors.join(' → ')}»`;

        constraints = { nodeName: undefined, attributes: undefined, ...constraints };
        const asHTML = ((el: ElementInfo) => `<${el.nodeName} ${el.attributes?.map((a) => `${a[0]}="${a[1]}"`).join(' ')}>`);

        while (Date.now() < expires) {
            const keys = Object.keys(constraints) as (keyof ElementInfo)[];
            const result = await this.resolveSelectors(selectors, keys);

            if (result.length > 1) {
                throw new Error(`Unexpected: ${description} matched ${result.length} nodes: ${result.map(asHTML)}`);
            } else {
                const info = result[0] ?? { isConnected: false };

                if (constraints.isStable !== undefined) {
                    await this.waitForRepaint();
                    info.isStable = isDeepStrictEqual(await this.resolveSelectors(selectors, keys), result);
                }

                // Check all constraints
                if (keys.every((key) => constraints[key] === undefined || info[key] === constraints[key])) {
                    return info;
                }

                options.debug && console.debug(`${description} is not ready yet:`,
                    keys.filter((key) => constraints[key] !== undefined && info[key] !== undefined && info[key] !== constraints[key])
                        .map((key) => `${key}=${info[key]}`));
            }

            await sleep(1000); // Wait. And repeat.
        }

        throw new Error(`Timeout: ${description} was not ready within ${options.timeout} ms`);
    }

    async screenshot(clip: Rectangle, format: 'png' | 'jpeg' = 'png', quality?: number): Promise<Buffer> {
        if (this._version['Protocol-Version'] === '1.1' || this._version['Protocol-Version'] === '1.2') {
            const { data } = await this._client.Page.captureScreenshot({ format: 'png' });
            const image = await Jimp.read(Buffer.from(data, 'base64'));
            const ratio = (await this._client.Runtime.evaluate({ expression: 'window.devicePixelRatio', returnByValue: true }))?.result?.value ?? 1;
            const frame = image.crop(clip.x * ratio, clip.y * ratio, clip.width * ratio, clip.height * ratio );

            if (format === 'png') {
                return await frame.getBufferAsync(Jimp.MIME_PNG);
            } else if (format === 'jpeg') {
                return await (quality !== undefined ? frame.quality(quality) : frame).getBufferAsync(Jimp.MIME_JPEG);
            } else {
                throw new Error(`Invalid format: ${format}`);
            }
        } else {
            const { data } = await this._client.Page.captureScreenshot({
                clip: { scale: 1, ...clip }, format, quality,
            });

            return Buffer.from(data, 'base64');
        }
    }

    async click(x: number, y: number) {
        await this.callMethod(true, true, this._runtime, 'click', x, y);
    }

    async tap(x: number, y: number) {
        if (this._version['Protocol-Version'] === '1.1') {
            await this._client.Input.dispatchTouchEvent({
                type: 'touchStart',
                touchPoints: [{ state: 'touchPressed', x, y, id: 0, } as any],
                modifiers: 0,
                timestamp: Date.now(),
            });

            await this._client.Input.dispatchTouchEvent({
                type: 'touchEnd',
                touchPoints: [{ state: 'touchReleased', x, y, id: 0, } as any],
                modifiers: 0,
                timestamp: Date.now(),
            });
        } else {
           await this.callMethod(true, true, this._runtime, 'tap', x, y);
        }
    }

    async evaluatePageFunction(expr: string | Function, arg: unknown): Promise<RemoteObject> {
        return await this.callMethod(true, true, this._runtime, 'evaluatePageFunction', String(expr), arg);
    }

    async evaluateAll(selectors: string[], func: string | Function, arg: unknown): Promise<RemoteObject> {
        return await this.callMethod(true, true, this._runtime, 'evaluateAll', selectors, String(func), arg);
    }

    async resolveSelectors(selectors: string[], props: (keyof ElementInfo)[]): Promise<ElementInfo[]> {
        return (await this.callMethod(false, true, this._runtime, 'resolveSelectors', selectors, props)).value;
    }

    async waitForRepaint(): Promise<void> {
        await this.callMethod(true, true, this._runtime, 'waitForRepaint');
    }

    private async callMethod(awaitPromise: boolean, returnByValue: boolean, object: RemoteObject, name: string, ...args: unknown[]): Promise<RemoteObject> {
        // console.log('callMethod', awaitPromise, returnByValue, object, name, ...args);
        return this.unwrap(awaitPromise, returnByValue, await this._client.Runtime.callFunctionOn({
            objectId: object.objectId,
            functionDeclaration: `function () { return this['${name}'].apply(this, arguments); }`,
            arguments: args.map((arg) => ({ value: arg })),
            returnByValue: !awaitPromise && returnByValue,
            objectGroup: this._objGroup,
        }));
    }

    private async getProperty(awaitPromise: boolean, returnByValue: boolean, object: RemoteObject, name: string): Promise<RemoteObject> {
        // console.log('getProperty', awaitPromise, returnByValue, object, name);
        return this.unwrap(awaitPromise, returnByValue, await this._client.Runtime.callFunctionOn({
            objectId: object.objectId,
            functionDeclaration: `function () { return this['${name}']; }`,
            returnByValue: !awaitPromise && returnByValue,
            objectGroup: this._objGroup,
        }));
    }

    private async unwrap(awaitPromise: boolean, returnByValue: boolean, result: ObjectResult): Promise<RemoteObject> {
        // console.log('unwrap', awaitPromise, returnByValue, result);

        if (result.exceptionDetails || result.wasThrown) {
            throw new EvalError(result.exceptionDetails?.exception?.description ?? result.exceptionDetails?.text ?? result.result.description);
        }

        if (awaitPromise && result.result.objectId) {
            const promiseState = await this.unwrap(false, false, await this._client.Runtime.callFunctionOn({
                objectId: result.result.objectId,
                functionDeclaration: (function (this: Promise<unknown>) {
                    let value: unknown, error: unknown, result = {
                        done:  false,
                        value: () => { if (error) { throw error } else { return value } },
                    };

                    Promise.resolve(this).then(
                        (resolved) => { value = resolved, result.done = true },
                        (rejected) => { error = rejected, result.done = true },
                    );

                    return result;
                }).toString(),
                objectGroup: this._objGroup,
            }));

            while (!(await this.getProperty(false, true, promiseState, 'done')).value) {
                // Keep trying
            }

            return await this.callMethod(false, returnByValue, promiseState, 'value');
        } else {
            return result.result;
        }
    }
}
