import CDP, { BaseOptions, Client, VersionResult } from 'chrome-remote-interface';
import { readFileSync } from 'fs';
import Jimp from 'jimp';
import { resolve } from 'path';
import { isDeepStrictEqual } from 'util';
import { Page } from './api';
import { sleep, throwError } from './utils';

const RuntimeSupport = readFileSync(resolve(__dirname, '../automation-runtime.js'));

// Good sources of information:
//
// * https://github.com/cyrus-and/chrome-remote-interface
// * https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter
// * https://chromedevtools.github.io/devtools-protocol/
// * https://github.com/ChromeDevTools/devtools-protocol/tree/master/json
// * https://trac.webkit.org/browser/trunk/Source/JavaScriptCore/inspector/protocol

type TargetCreatedEvent = Parameters<Parameters<Client['Target.targetCreated']>[0]>[0];
type ReceivedMessageFromTargetEvent = Parameters<Parameters<Client['Target.receivedMessageFromTarget']>[0]>[0];

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
    isChecked?:    boolean;
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

interface Sender {
    send: Client['send'];
}

class ProtocolError extends Error {
    constructor(message: string, public request: object, public response: object) {
        super(message);
    }
}

export interface AutomationOptions extends BaseOptions {
    /** Only include contexts owned by this iOS process. */
    appId?: string;

    /** The {@link AutomationContext.id} to use. */
    ctxId?: string;
}

export interface AutomationContext {
    /** iOS process owning this context. */
    appId?:                string;

    /** Context description */
    description?:          string;

    /** URL to a DevTools session for this context. */
    devtoolsFrontendUrl:   string;

    /** URL of favicon image. */
    faviconUrl?:           string;

    /** Context ID. */
    id:                    string;

    /** URL of thumbnail image. */
    thumbnailUrl?:         string;

    /** The title of the page loaded in this context. */
    title:                 string;

    /** Type of context. */
    type?:                 string;

    /** The URL of the page loaded in this context. */
    url:                   string;

    /** The URL where the debugger is running. */
    webSocketDebuggerUrl:  string;
}

export class Automation implements Sender {
    private _client!: Client
    private _version!: Partial<VersionResult> & { 'Android-Package'?: string };
    private _runtime!: RemoteObject;
    private _objGroup = String(Date.now() + Math.random());

    private _target?:  string;
    private _messages: ((v: any) => void)[] = [];

    static async findContexts(options: AutomationOptions): Promise<AutomationContext[]> {
        const contexts = await CDP.List({ ...options }) as AutomationContext[];

        return contexts
            .map((context) => ({ ...context, id: context.id ?? context.webSocketDebuggerUrl.split('/').pop() }))
            .filter((context) => !!context.url && // Skip JSContext
                (options.appId === undefined || context.appId === options.appId) &&
                (options.ctxId === undefined || context.id    === options.ctxId)
            );
    }

    constructor(private _options: AutomationOptions) {
    }

    async initialize(): Promise<this> {
        const contexts = await Automation.findContexts(this._options);

        if (!contexts.length) {
            throw new Error(`No context found`);
        } else if (contexts.length > 1) {
            throw new Error(`Multiple contexts found: ${contexts.map((context) => context.id)}`);
        }

        const target = (targets: CDP.Target[]) => targets.findIndex((context) => context.webSocketDebuggerUrl === contexts[0].webSocketDebuggerUrl);
        this._client = await CDP({ ...this._options, local: true, target });
        this._client.on('event', (event) => {
            if (event.method === 'Target.targetCreated') {
                const params = event.params as TargetCreatedEvent;
                this._target = params.targetInfo.targetId;
            } else if (event.method === 'Target.dispatchMessageFromTarget') {
                const params = event.params as ReceivedMessageFromTargetEvent;
                const message = JSON.parse(params.message);
                this._messages[message.id]?.(message);
                delete this._messages[message.id];
            } else {
                console.error('Unexpected CDP event', event);
            }
        });

        this._version = await CDP.Version({ port: this._options.port }).catch(() => ({}));

        // Ensure document is ready (and iOS target is connected) before continuing
        while (!await this.documentIsReady()) {
            await sleep(10);
        }

        this._runtime = await this.unwrap(false, false, await this.send('Runtime.evaluate', {
            expression: `(function () { ${RuntimeSupport}; return new RuntimeSupport(); })()`,
            objectGroup: this._objGroup,
        }));

        return this;
    }

    async close(): Promise<this> {
        await this.send('Runtime.releaseObjectGroup', { objectGroup: this._objGroup });
        await this._client.close();
        return this;
    }

    send: Client['send'] = async function(this: Automation, method, params) {
        if (this._target) {
            const response = await new Promise<any>((resolve) => {
                const id = this._messages.push(resolve) - 1;
                this._client.Target.sendMessageToTarget({ targetId: this._target, message: JSON.stringify({ id, method, params }) });
            });

            return response.result ?? throwError(new ProtocolError(response.error.message, { method, params }, response.error));
        } else {
            return await this._client.send(method, params);
        }
    }

    page(): Page {
        return Page['create'](this);
    }

    async element(selectors: string[], constraints: ElementConstraints, options: { debug: boolean, timeout: number }): Promise<ElementInfo> {
        let lastDebug = Date.now();
        const expires = Date.now() + (options.timeout || 1_000_000_000_000);
        const description = `«${selectors.join(' → ')}»`;

        constraints = { nodeName: undefined, attributes: undefined, ...constraints };

        while (Date.now() < expires) {
            const keys = Object.keys(constraints) as (keyof ElementInfo)[];
            const info = await this.resolveSelector(selectors, keys);

            if (constraints.isStable !== undefined) {
                await this.waitForRepaint();
                info.isStable = isDeepStrictEqual(await this.resolveSelector(selectors, keys), info);
            }

            // Check all constraints
            if (keys.every((key) => constraints[key] === undefined || info[key] === constraints[key])) {
                return info;
            }

            if (options.debug && Date.now() - lastDebug > 1000) {
                lastDebug = Date.now();

                console.debug(`💤 ${description} is not ready yet (${Math.floor((expires - Date.now()) / 1000)})`,
                    keys.filter((key) => constraints[key] !== undefined && info[key] !== undefined && info[key] !== constraints[key])
                        .map((key) => `${key}=${info[key]}`));
            }

            await sleep(50); // Wait. And repeat.
        }

        throw new Error(`Timeout: ${description} was not ready within ${options.timeout} ms`);
    }

    async screenshot(clip: Rectangle, format: 'png' | 'jpeg' = 'png', quality?: number): Promise<Buffer> {
        const toBuffer = async (image: Jimp) => {
            if (format === 'png') {
                return await image.getBufferAsync(Jimp.MIME_PNG);
            } else if (format === 'jpeg') {
                return await (quality !== undefined ? image.quality(quality) : image).getBufferAsync(Jimp.MIME_JPEG);
            } else {
                throw new Error(`Invalid format: ${format}`);
            }
        }

        if (this._version['Protocol-Version'] === '1.1' || this._version['Protocol-Version'] === '1.2') {
            const { data } = await this.send('Page.captureScreenshot', { format: 'png' });
            const image = await Jimp.read(Buffer.from(data, 'base64'));
            const ratio = (await this.send('Runtime.evaluate', { expression: 'window.devicePixelRatio', returnByValue: true }))?.result?.value ?? 1;
            const frame = image.crop(clip.x * ratio, clip.y * ratio, clip.width * ratio, clip.height * ratio );

            return toBuffer(frame);
        } else if (this._version['Protocol-Version']) {
            const { data } = await this.send('Page.captureScreenshot', {
                clip: { scale: 1, ...clip }, format, quality,
            });

            return Buffer.from(data, 'base64');
        } else {
            const snapshot = await this.send('Page.snapshotRect' as any, { ...clip, coordinateSystem: 'Viewport' });
            const dataURL: string = snapshot.dataURL;
            const [, type, encoding, data ] = /^data:([^;]*);([^,]*),(.*)/.exec(dataURL) ?? ['', '', '', ''];
            const buffer = Buffer.from(data, encoding as BufferEncoding);

            if (type === 'image/png' && format === 'png') {
                return buffer;
            } else {
                return toBuffer(await Jimp.read(buffer));
            }
        }
    }

    async click(x: number, y: number) {
        await this.callMethod(true, true, this._runtime, 'click', x, y);
    }

    async tap(x: number, y: number) {
        if (this._version['Protocol-Version'] === '1.1') {
            await this.send('Input.dispatchTouchEvent', {
                type: 'touchStart',
                touchPoints: [{ state: 'touchPressed', x, y, id: 0, } as any],
                modifiers: 0,
                timestamp: Date.now(),
            });

            await this.send('Input.dispatchTouchEvent', {
                type: 'touchEnd',
                touchPoints: [{ state: 'touchReleased', x, y, id: 0, } as any],
                modifiers: 0,
                timestamp: Date.now(),
            });
        } else {
           await this.callMethod(true, true, this._runtime, 'tap', x, y);
        }
    }

    async fill(selectors: string[], value: string) {
        await this.callMethod(true, true, this._runtime, 'fill', selectors, value);
    }

    async evaluatePageFunction(expr: string | Function, arg: unknown): Promise<RemoteObject> {
        return await this.callMethod(true, true, this._runtime, 'evaluatePageFunction', String(expr), arg);
    }

    async evaluateAll(selectors: string[], func: string | Function, arg: unknown): Promise<RemoteObject> {
        return await this.callMethod(true, true, this._runtime, 'evaluateAll', selectors, String(func), arg);
    }

    async resolveSelector(selectors: string[], props: (keyof ElementInfo)[]): Promise<ElementInfo> {
        const result = await this.resolveSelectors(selectors, props);

        if (result.length > 1) {
            const asHTML = ((el: ElementInfo) => `<${el.nodeName} ${el.attributes?.map((a) => `${a[0]}="${a[1]}"`).join(' ')}>`);
            throw new Error(`Unexpected: «${selectors.join(' → ')}» matched ${result.length} nodes: ${result.map(asHTML)}`);
        } else {
            return result[0] ?? { isConnected: false };
        }
    }

    async resolveSelectors(selectors: string[], props: (keyof ElementInfo)[]): Promise<ElementInfo[]> {
        return (await this.callMethod(false, true, this._runtime, 'resolveSelectors', selectors, props)).value;
    }

    async waitForRepaint(): Promise<void> {
        await this.callMethod(true, true, this._runtime, 'waitForRepaint');
    }

    private async documentIsReady(): Promise<boolean | undefined> {
        return (await this.send('Runtime.evaluate', {
            expression:    `location.href !== 'about:blank' && document.readyState && document.readyState !== 'loading'`,
            returnByValue: true
        }).catch(() => null))?.result.value;
    }

    private async callMethod(awaitPromise: boolean, returnByValue: boolean, object: RemoteObject, name: string, ...args: unknown[]): Promise<RemoteObject> {
        // console.log('callMethod', awaitPromise, returnByValue, object, name, ...args);
        return this.unwrap(awaitPromise, returnByValue, await this.send('Runtime.callFunctionOn', {
            objectId: object.objectId,
            functionDeclaration: `function () { return this['${name}'].apply(this, arguments); }`,
            arguments: args.map((arg) => ({ value: arg })),
            returnByValue: !awaitPromise && returnByValue,
            objectGroup: this._objGroup,
        }));
    }

    private async getProperty(awaitPromise: boolean, returnByValue: boolean, object: RemoteObject, name: string): Promise<RemoteObject> {
        // console.log('getProperty', awaitPromise, returnByValue, object, name);
        return this.unwrap(awaitPromise, returnByValue, await this.send('Runtime.callFunctionOn', {
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
            const promiseState = await this.unwrap(false, false, await this.send('Runtime.callFunctionOn', {
                objectId: result.result.objectId,
                functionDeclaration: (function(this: Promise<unknown>) { // This function should be ES5 compatible!
                    var value: unknown, error: unknown, result = {
                        promise: this,
                        done:  false,
                        value: function() { if (error) { throw error } else { return value } },
                    };

                    Promise.resolve(this).then(
                        function(resolved) { value = resolved; result.done = true; },
                        function(rejected) { error = rejected; result.done = true; },
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
