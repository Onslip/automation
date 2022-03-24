import { Automation, AutomationConfig, ElementConstraints } from './automation';
import { throwError, writeFile } from './utils';

const ACTIONABLE: ElementConstraints = {
    isConnected: true,
    isEnabled:   true,
    isStable:    true,
    isTarget:    true,
    isVisible:   true,
}

export interface SelectorOptions {
    timeout?: number;
    trial?:   boolean;
}

export class Page {
    private _config: AutomationConfig = { timeout: 30_000, debug: false };
    readonly touchscreen: Touchscreen;

    constructor(private _automation: Automation) {
        this.touchscreen = new Touchscreen(this._automation);
    }

    locator(selector: string): Locator {
        return new Locator(this._automation, this._config, selector);
    }

    setDebug(debug: boolean) {
        this._config.debug = debug;
    }

    setDefaultTimeout(timeout: number): void {
        this._config.timeout = timeout;
    }

    async close() {
        await this._automation.close();
    }
}

export class Touchscreen {
    constructor(private _automation: Automation) {
    }

    async tap(x: number, y: number) {
        await this._automation.tap(x, y)
    }
}

export class Locator {
    private _selectors: string[];

    constructor(private _automation: Automation, private _config: AutomationConfig, selector: string, parent?: Locator) {
        if (selector.startsWith('//') || selector.startsWith('..')) {
            selector = 'xpath=' + selector;
        } else if (!/^[a-z]+=/.test(selector)) {
            selector = 'css=' + selector;
        }

        this._selectors = [ ...parent?._selectors ?? [], selector ];
    }

    toString() {
        return `«${this._selectors.join(' >> ')}»`;
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

    locator(selector: string) {
        return new Locator(this._automation, this._config, selector, this);
    }

    async count(): Promise<number> {
        const { length } = await this._automation.resolveSelectors(this._selectors, []);

        this._config.debug && console.log(`Counted ${this}: ${length} matches`)
        return length;
    }

    async boundingBox(options?: SelectorOptions): Promise<{ x: number, y: number, width: number, height: number } | null> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { boundingBox: undefined, isVisible: undefined }, opts);

        return info.isVisible ? info.boundingBox ?? null : null;
    }

    async getAttribute(name: string, options?: SelectorOptions): Promise<string | null> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { attributes: undefined }, opts);

        return info.attributes?.find((attrib) => attrib[0] === name)?.[1] ?? null;
    }

    async innerHTML(options?: SelectorOptions): Promise<string> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { innerHTML: undefined }, opts);

        return info.innerHTML!;
    }

    async innerText(options?: SelectorOptions): Promise<string> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { innerText: undefined }, opts);

        return info.innerText!;
    }

    async inputValue(options?: SelectorOptions): Promise<string> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { inputValue: undefined }, opts);

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

    async screenshot(options?: SelectorOptions & { path?: string, format?: 'png' | 'jpeg', quality?: number }): Promise<Buffer> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { isConnected: true, isVisible: true, isStable: true, boundingBox: undefined }, opts);
        const bbox = info.boundingBox!;

        const result = await this._automation.screenshot(bbox, options?.format ?? options?.path?.split('.').pop() as 'png', options?.quality);

        if (options?.path) {
            await writeFile(options.path, result);
        }

        return result;
    }

    async click(options?: SelectorOptions): Promise<void> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { ...ACTIONABLE, boundingBox: undefined }, opts);
        const bbox = info.boundingBox!;

        if (options?.trial !== true) {
            const x = Math.floor(bbox.x + bbox.width / 2);
            const y = Math.floor(bbox.y + bbox.height / 2);

            this._config.debug && console.debug(`Clicking ${this} at (${x}, ${y})`);
            await this._automation.click(x, y);
            await this._automation.waitForRepaint();
        }
    }

    async tap(options?: SelectorOptions): Promise<void> {
        const opts = { ...this._config, ...options };
        const info = await this._automation.element(this._selectors, { ...ACTIONABLE, boundingBox: undefined }, opts);
        const bbox = info.boundingBox!;

        if (options?.trial !== true) {
            const x = Math.floor(bbox.x + bbox.width / 2);
            const y = Math.floor(bbox.y + bbox.height / 2);

            this._config.debug && console.debug(`Tapping ${this} at (${x}, ${y})`);
            await this._automation.tap(x, y);
            await this._automation.waitForRepaint();
        }
    }

    async waitFor(options?: SelectorOptions & { state?: 'attached' | 'detached' | 'visible' | 'hidden' }): Promise<void> {
        const opts = { ...this._config, state: 'visible', ...options };

        this._config.debug && console.debug(`Waiting for ${this}`);
        await this._automation.element(this._selectors, {
            isConnected: opts.state === 'attached' ? true : opts.state === 'detached' ? false : true,
            isVisible:   opts.state === 'visible'  ? true : opts.state === 'hidden'   ? false : undefined,
        }, opts);
    }
}
