import { Automation, AutomationConfig, AutomationContext, AutomationOptions, ElementConstraints } from './automation';
import { Device, DeviceOptions } from './device';
import { sleep, throwError, writeFile } from './utils';

const ACTIONABLE: ElementConstraints = {
    isConnected: true,
    isEnabled:   true,
    isStable:    true,
    isTarget:    true,
    isVisible:   true,
}

export interface SelectorOptions {
    /** How long, in milliseconds, to wait for the target to be actionable. */
    timeout?: number;

    /** It true, don't actually perform the action requested. */
    trial?:   boolean;
}

export interface LocatorOptions {
    /** Only match if this Location also matches. */
    has?:     Locator;

    /** Only match if this text Locator also matches. */
    hasText?: string | RegExp;
}

export interface ResolvedContextPath {
    /** What device to use. */
    device:  Device;

    /** What web view to use. */
    webview: string;

    /** Options describing what web view context to use. */
    options: AutomationOptions;
}

/**
 * Binds a device's web view to a local port and then locates one of its contexts, based on a context path.
 *
 * The context path is a string that uniquely identifies the device, web view and context, using the following format:
 * `<deviceId>[/<webviewId>[/<ctxId>]]`. The device ID is is required, but the web view name and context ID are
 * optional. You may use `$n` to match the n:th web view or context found (starting at 1).
 *
 * This is a convenience function that uses {@link Device.findDevice} and {@link Device.findWebViews} to find a web
 * view, binds it to a local port with {@link Device.bindWebView} and then finally calls {@link findWebViewContexts} to
 * resolve to a web view context.
 *
 * @param contextPath   Specify what device, web view and context to use.
 * @param port          The port to bind the web view to. See {@link Device.bindWebView}.
 * @param deviceOptions Additional options to pass to {@link Device.findDevice}.
 * @param timeout       If specified, the method will wait for the device, web view and context to appear this many
 *                      milliseconds (0 means forever).
 * @returns             A {@link ResolvedContextPath} object containing {@link AutomationOptions}, ready to be passed to
 *                      {@link openWebView}, the web view id and the {@link Device} on which the web view is running.
 * @throws TypeError    If the context path or the port is invalid.
 * @throws Error        If the device, web view or context could not be found, or if the context path is ambiguous.
 */
export async function resolveWebViewContext(contextPath: string, port: number, deviceOptions?: DeviceOptions, timeout?: number): Promise<ResolvedContextPath> {
    const [ deviceId, webviewId, ctxId, ...rest ] = contextPath.split('/');
    const expires = timeout === undefined ? 1000 : Date.now() + (timeout || 1_000_000_000_000);

    if (typeof port !== 'number' || !isFinite(port)) {
        throw new TypeError(`Missing port number`);
    } else if (isNaN(expires)) {
        throw new TypeError(`Invalid timeout`);
    } else if (rest.length) {
        throw new TypeError(`Context path format must match '<deviceId>[/<webview>[/<ctxId>]]'`);
    }

    const matches = (value: string, index: number, expected: string) => {
        return !expected || expected === value || expected === `$${index + 1}`;
    }

    const device = await Device.findDevice(deviceId, deviceOptions, expires - Date.now()) ?? throwError(new Error(`Device ${deviceId} not found`));
    let webviews: string[];

    while (true) {
        webviews = (await device.findWebViews()).filter((id, index) => matches(id, index, webviewId));

        if (webviews.length === 1) {
            break;
        } else if (Date.now() > expires) {
            throw new Error(webviews.length > 1
                ? `${contextPath} matched more than one web view: ${webviews}`
                : `${contextPath} matched no web views`
            );
        } else {
            await sleep(100);
        }
    }

    const options = await device.bindWebView(webviews[0], port);
    let contexts: AutomationContext[];

    while (true) {
        contexts = (await findWebViewContexts(options)).filter((context, index) => matches(context.id, index, ctxId));

        if (contexts.length === 1) {
            break;
        } else if (Date.now() > expires) {
            throw new Error(contexts.length > 1
                ? `${contextPath} matched more than one context in web view ${webviews[0]}: ${contexts.map((context) => context.id)}`
                : `${contextPath} matched no contexts in web view ${webviews[0]}`
            );
        } else {
            await sleep(100);
        }
    }

    return { device, webview: webviews[0], options: { ...options, ctxId: contexts[0].id} };
}

/**
 * Finds and returns a description of all matching web contexts.
 *
 * Useful to find out what {@link AutomationOptions.ctxId} value to specify when calling {@link openWebView}.
 *
 * @param options Where to look for contexts.
 * @returns       A list of matching contexts.
 */
export async function findWebViewContexts(options: AutomationOptions): Promise<AutomationContext[]> {
    return Automation.findContexts(options);
}

/**
 * Connects to a web context and return a Page.
 *
 * @param options Specify what context to use.
 * @returns       A new {@link Page} object which can be used to interact with the web page.
 */
export async function openWebView(options: AutomationOptions): Promise<Page> {
    return (await new Automation(options).initialize()).page();
}

/**
 * The Page object represents the connection to a remote web view.
 */
export class Page {
    private _config: AutomationConfig = { timeout: 0, debug: false };

    /** A reference to Mouse instance. */
    readonly mouse: Mouse;

    /** A reference to Touchscreen instance. */
    readonly touchscreen: Touchscreen;

    private static create(_automation: Automation) {
        return new Page(_automation);
    }

    private constructor(private _automation: Automation) {
        this.mouse = Mouse['create'](this._automation);
        this.touchscreen = Touchscreen['create'](this._automation);
    }

    /**
     * Creates and returns a new Locator.
     *
     * @param selector  The selectors to match.
     * @param options   Additional options.
     * @returns         A new Locator.
     */
    locator(selector: string, options?: LocatorOptions): Locator {
        return Locator['create'](this._automation, this._config, selector, undefined, options);
    }

    /**
     * Invokes a custom JavaScript function inside the web view context.
     *
     * @param pageFunction A function to call inside the web view context.
     * @param arg          An optional argument to pass to the function. Must be JSON serializable.
     * @returns            The value returned from the function. Must be JSON serializable.
     */
    async evaluate(pageFunction: string | Function, arg?: unknown): Promise<unknown> {
        return (await this._automation.evaluatePageFunction(pageFunction, arg)).value;
    }

    /**
     * Enables to disables debug output from this library.
     *
     * @param debug  Set to `true` to enable debugging and `false` to disable.
     */
    setDebug(debug: boolean) {
        this._config.debug = debug;
    }

    /**
     * Specifies the default timeout when waiting for Locators to be actionable.
     *
     * @param timeout  The new default timeout, in milliseconds.
     */
    setDefaultTimeout(timeout: number): void {
        this._config.timeout = timeout;
    }

    /**
     * Closes the connection to the web view and deallocates all held resources.
     */
    async close() {
        await this._automation.close();
    }
}

export class Mouse {
    private static create(_automation: Automation) {
        return new Mouse(_automation);
    }

    private constructor(private _automation: Automation) {
    }

    async click(x: number, y: number) {
        await this._automation.click(x, y);
    }
}

export class Touchscreen {
    private static create(_automation: Automation) {
        return new Touchscreen(_automation);
    }

    private constructor(private _automation: Automation) {
    }

    async tap(x: number, y: number) {
        await this._automation.tap(x, y)
    }
}

export class Locator {
    private _selectors: string[];

    private static create(_automation: Automation, _config: AutomationConfig, selector: string, parent?: Locator, options?: LocatorOptions) {
        return new Locator(_automation, _config, selector, parent, options);
    }

    private constructor(private _automation: Automation, private _config: AutomationConfig, selector: string, parent?: Locator, options?: LocatorOptions) {
        if (selector.startsWith('//') || selector.startsWith('..')) {
            selector = 'xpath=' + selector;
        } else if ((selector[0] === `'` || selector[0] === `"`) && selector[0] === selector[selector.length - 1]) {
            selector = 'text=' + selector;
        } else if (!/^[a-z]+=/.test(selector)) {
            selector = 'css=' + selector;
        }

        const hasSelectors =
            options?.has     ? [ `has=${JSON.stringify(options.has._selectors)}`      ] :
            options?.hasText ? [ `has=${JSON.stringify([`text=${options.hasText}`])}` ] :
            [];

        this._selectors = [ ...parent?._selectors ?? [], selector, ...hasSelectors ];
    }

    toString() {
        return `«${this._selectors.join(' → ')}»`;
    }

    first() {
        return this.nth(0);
    }

    last() {
        return this.nth(-1);
    }

    nth(index: number) {
        return this.locator(`nth=${index}`);
    }

    locator(selector: string, options?: LocatorOptions) {
        return new Locator(this._automation, this._config, selector, this, options);
    }

    async count(): Promise<number> {
        const { length } = await this._automation.resolveSelectors(this._selectors, []);
        return length;
    }

    async boundingBox(options?: SelectorOptions): Promise<{ x: number, y: number, width: number, height: number } | null> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { isConnected: true, boundingBox: undefined, isVisible: undefined }, opts);

        return info.isVisible ? info.boundingBox ?? null : null;
    }

    async getAttribute(name: string, options?: SelectorOptions): Promise<string | null> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { isConnected: true, attributes: undefined }, opts);

        return info.attributes?.find((attrib) => attrib[0] === name)?.[1] ?? null;
    }

    async innerHTML(options?: SelectorOptions): Promise<string> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { isConnected: true, innerHTML: undefined }, opts);

        return info.innerHTML!;
    }

    async innerText(options?: SelectorOptions): Promise<string> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { isConnected: true, innerText: undefined }, opts);

        return info.innerText!;
    }

    async textContent(options?: SelectorOptions): Promise<string> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { isConnected: true, textContent: undefined }, opts);

        return info.textContent!;
    }

    async inputValue(options?: SelectorOptions): Promise<string> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { isConnected: true, inputValue: undefined }, opts);

        return info.inputValue ?? throwError(new EvalError(`${this} is a non-input element`));
    }

    async isChecked(options?: SelectorOptions): Promise<boolean> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { isConnected: true, isChecked: undefined }, opts);

        return info.isChecked ?? throwError(new EvalError(`${this} is a non-checkbox element`));
    }

    async isDisabled(options?: SelectorOptions): Promise<boolean> {
        return !await this.isEnabled(options);
    }

    async isEnabled(options?: SelectorOptions): Promise<boolean> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { isConnected: true, isEnabled: undefined }, opts);

        return info.isEnabled!;
    }

    async isEditable(options?: SelectorOptions): Promise<boolean> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { isConnected: true, isEditable: undefined }, opts);

        return info.isEditable!;
    }

    async isHidden(): Promise<boolean> {
        return !await this.isVisible();
    }

    async isVisible(): Promise<boolean> {
        const info = await this._automation.resolveSelector(this._selectors, ['isConnected', 'isVisible']);

        return info.isConnected! && info.isVisible!;
    }

    async evaluate(pageFunction: string | Function, arg?: unknown, options?: SelectorOptions): Promise<unknown> {
        const opts = { ...this._config, ...options };
        await this._automation.element(this._selectors, { isConnected: true }, opts);

        return (await this._automation.evaluateAll(this._selectors, `function(arr, arg) { return (${pageFunction})(arr[0], arg) }`, arg)).value;
    }

    async evaluateAll(pageFunction: string | Function, arg?: unknown): Promise<unknown> {
        return (await this._automation.evaluateAll(this._selectors, pageFunction, arg)).value;
    }

    async scrollIntoViewIfNeeded(options?: SelectorOptions): Promise<void> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, {
            isConnected: true,
            isStable:    true,
            isVisible:   true,
            isTarget:    undefined,
         }, opts);

         if (!info.isTarget) {
            this._config.debug && console.debug(`📜 Scrolling ${this} into view`);
            await this.evaluate(`function(el) { el.scrollIntoView() }`);
         }
    }

    async screenshot(options?: SelectorOptions & { path?: string, format?: 'png' | 'jpeg', quality?: number }): Promise<Buffer> {
        await this.scrollIntoViewIfNeeded(options);

        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { isConnected: true, isVisible: true, isStable: true, boundingBox: undefined }, opts);
        const bbox = info.boundingBox!;

        this._config.debug && console.debug(`📺 Taking screenshot of ${this} at (${bbox.x}, ${bbox.y}) [${bbox.width}𐄂${bbox.height}]`);
        const result = await this._automation.screenshot(bbox, options?.format ?? options?.path?.split('.').pop() as 'png', options?.quality);

        if (options?.path) {
            await writeFile(options.path, result);
        }

        return result;
    }

    async click(options?: SelectorOptions): Promise<void> {
        await this.scrollIntoViewIfNeeded(options);

        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { ...ACTIONABLE, boundingBox: undefined }, opts);
        const bbox = info.boundingBox!;

        if (options?.trial !== true) {
            const x = Math.floor(bbox.x + bbox.width / 2);
            const y = Math.floor(bbox.y + bbox.height / 2);

            this._config.debug && console.debug(`🖱  Clicking ${this} at (${x}, ${y})`);
            await this._automation.click(x, y);
            await this._automation.waitForRepaint();
        }
    }

    async tap(options?: SelectorOptions): Promise<void> {
        await this.scrollIntoViewIfNeeded(options);

        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { ...ACTIONABLE, boundingBox: undefined }, opts);
        const bbox = info.boundingBox!;

        if (options?.trial !== true) {
            const x = Math.floor(bbox.x + bbox.width / 2);
            const y = Math.floor(bbox.y + bbox.height / 2);

            this._config.debug && console.debug(`👉 Tapping ${this} at (${x}, ${y})`);
            await this._automation.tap(x, y);
            await this._automation.waitForRepaint();
        }
    }

    async fill(value: string, options?: SelectorOptions): Promise<void> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { isConnected: true, isVisible: true, inputValue: undefined }, opts);

        if (info.inputValue === undefined) {
            throw new EvalError(`${this} is a non-input element`);
        } else {
            this._config.debug && console.debug(`🔤 Filling ${this} with “${value}”`);
            this._automation.fill(this._selectors, value);
        }
    }

    async waitFor(options?: SelectorOptions & { state?: 'attached' | 'detached' | 'visible' | 'hidden' }): Promise<void> {
        const opts = { ...this._config, state: 'visible', ...options };

        this._config.debug && console.debug(`⏰ Waiting for ${this}`);
        await this._automation.element(this._selectors, {
            isConnected: opts.state === 'attached' ? true : opts.state === 'detached' ? false : true,
            isVisible:   opts.state === 'visible'  ? true : opts.state === 'hidden'   ? false : undefined,
        }, opts);
    }
}
