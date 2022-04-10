import { Automation, AutomationConfig, AutomationOptions, AutomationContext, ElementConstraints } from './automation';
import { throwError, writeFile } from './utils';

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

/**
 * Finds and returns a description of all matching web contexts.
 *
 * Useful to find out what [[AutomationOptions.ctxId]] value to specify when calling [[openWebView]].
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
 * @returns       A new Page object which can be used to interact with the web page.
 */
export async function openWebView(options: AutomationOptions): Promise<Page> {
    return (await new Automation(options).initialize()).page();
}

/**
 * The Page object represents the connection to a remote web view.
 */
export class Page {
    private _config: AutomationConfig = { timeout: 30_000, debug: false };

    /** A referece to Mouse instance. */
    readonly mouse: Mouse;

    /** A referece to Touchscreen instance. */
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

    async inputValue(options?: SelectorOptions): Promise<string> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { isConnected: true, inputValue: undefined }, opts);

        return info.inputValue ?? throwError(new EvalError(`${this} is a non-input element`));
    }

    async evaluate(pageFunction: string | Function, arg?: unknown, options?: SelectorOptions): Promise<unknown> {
        const opts = { ...this._config, ...options };
        await this._automation.element(this._selectors, { isConnected: true }, opts);

        return (await this._automation.evaluateAll(this._selectors, `(arr, arg) => (${pageFunction})(arr[0], arg)`, arg)).value;
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
            await this.evaluate((el: any) => el.scrollIntoView());
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
            this._automation.fill(this._selectors, value);
        }
    }

    async waitFor(options?: SelectorOptions & { state?: 'attached' | 'detached' | 'visible' | 'hidden' }): Promise<void> {
        const opts = { ...this._config, state: 'visible', ...options };

        this._config.debug && console.debug(`⏱  Waiting for ${this}`);
        await this._automation.element(this._selectors, {
            isConnected: opts.state === 'attached' ? true : opts.state === 'detached' ? false : true,
            isVisible:   opts.state === 'visible'  ? true : opts.state === 'hidden'   ? false : undefined,
        }, opts);
    }
}
