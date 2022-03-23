interface Rectangle {
    x:      number;
    y:      number;
    width:  number;
    height: number;
}

interface ElementInfo {
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

function sleep(timeout: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}

function attributes(el: HTMLElement): ElementInfo['attributes'] {
    if (typeof el.getAttributeNames === 'function') {
        return el.getAttributeNames().map(name => [name, el.getAttribute(name)!])
    } else {
        const result: ElementInfo['attributes'] = [], attrs = el.attributes;

        for (let i = 0; i < attrs.length; ++i) {
            const attr = attrs.item(i)!;
            result.push([attr.name, attr.value]);
        }

        return result;
    }
}

function boundingBox(el: HTMLElement): Rectangle {
    const bb = el.getBoundingClientRect();

    return { x: bb.left, y: bb.top, width: bb.width, height: bb.height };
}

function isTarget(el: HTMLElement): ElementInfo['isTarget'] {
    const bb = boundingBox(el);

    for (let target = document.elementFromPoint(bb.x + bb.width / 2, bb.y + bb.height / 2); el; el = el.parentElement!) {
        if (el === target) {
            return true;
        }
    }

    return false;
}

function isVisible(el: HTMLElement): ElementInfo['isVisible'] {
    const bb = boundingBox(el);

    if (bb.width !== 0 && bb.height !== 0) {
        return window.getComputedStyle(el).visibility !== 'hidden';
    } else {
        return false;
    }
}

class RuntimeSupport {
    click(x: number, y: number) {
        const el = document.elementFromPoint(x, y)!;

        el.dispatchEvent(new MouseEvent('click', {
            bubbles:    true,
            cancelable: true,
            screenX:    x,
            screenY:    y,
            clientX:    x,
            clientY:    y,
        }));
    }

    async tap(x: number, y: number) {
        const el = document.elementFromPoint(x, y)!;
        const tl = [ new Touch({ identifier: 0, target: el, clientX: x, clientY: y, pageX: x, pageY: y, screenX: x, screenY: y }) ];

        el.dispatchEvent(new TouchEvent('touchstart', {
            bubbles:        true,
            cancelable:     true,
            composed:       true,
            changedTouches: tl,
            targetTouches:  tl,
            touches:        tl,
        }));

        el.dispatchEvent(new TouchEvent('touchend', {
            bubbles:        true,
            cancelable:     true,
            composed:       true,
            changedTouches: tl,
        }));
    }

    resolveSelectors(selectors: string[], props: (keyof ElementInfo)[]): ElementInfo[] {
        let elements: HTMLElement[] | undefined;

        for (const selector of selectors) {
            let ctxs = elements, path = '', text: string | null = null, scan = false;

            if (selector.startsWith('nth=')) {
                ctxs ??= [];
                elements = [...ctxs].splice(Number(selector.substring(4)), 1);
            } else if (selector.startsWith('css=')) {
                ctxs ??= [ document.documentElement ];
                elements = [];
                ctxs.forEach((ctx) => ctx.querySelectorAll<HTMLElement>(selector.substring(4)).forEach((el) => elements!.push(el)));
            } else if (selector.startsWith('xpath=')) {
                ctxs ??= [ document.documentElement ];
                path = selector.substring(6);
            } else if (selector.startsWith(`text="`) || selector.startsWith(`text='`)) {
                if (selector[5] !== selector[selector.length - 1]) {
                    throw new EvalError(`No terminating quote in selector «${selector}»`);
                }

                ctxs ??= [ document.body ];
                path = './/text()';
                text = selector.substring(6, selector.length - 1);
                scan = false;
            } else if (selector.startsWith('text=')) {
                ctxs ??= [ document.body ];
                path = './/text()';
                text = selector.substring(5).toLowerCase();
                scan = true;
            } else {
                throw new EvalError('Unknown selector: ' + selector);
            }

            if (path) {
                const nodes: Node[] = [];

                for (const ctx of ctxs) {
                    for (let result = document.evaluate(path, ctx), node = result.iterateNext(); node; node = result.iterateNext()) {
                        nodes.push(node);
                    }
                }

                if (text !== null) {
                    const normalized = (text?: string | null) => text?.replace(/\s+/g, ' ').trim();

                    elements = nodes
                        .filter((tn) => tn.nodeType === Node.TEXT_NODE && tn.parentElement)
                        .filter((tn) => (!scan && normalized(tn.nodeValue) === text || scan && normalized(tn.nodeValue)?.toLowerCase().includes(text!)))
                        .map((tn) => tn.parentElement!);
                } else {
                    elements = nodes.filter(node => node.nodeType === Node.ELEMENT_NODE) as HTMLElement[];
                }
            }
        }

        // Remove dupes
        elements = elements?.filter((element, index, array) => array.indexOf(element) === index) ?? [];

        if (props.indexOf('isStable') >= 0 && props.indexOf('boundingBox') < 0) {
            props.push('boundingBox');
        }

        return elements.map((el: HTMLElement & Partial<HTMLInputElement>) => {
            const info: ElementInfo = {};

            for (const prop of props) {
                switch (prop) {
                    case 'attributes':   info[prop] = attributes(el);       break;
                    case 'boundingBox':  info[prop] = boundingBox(el);      break;
                    case 'innerHTML':    info[prop] = el.innerHTML;         break;
                    case 'innerText':    info[prop] = el.innerText;         break;
                    case 'inputValue':   info[prop] = el.value;             break;
                    case 'isConnected':  info[prop] = el.isConnected;       break;
                    case 'isEditable':   info[prop] = el.isContentEditable; break;
                    case 'isEnabled':    info[prop] = el.disabled !== true; break;
                    case 'isStable':     /* Already handled */;             break;
                    case 'isTarget':     info[prop] = isTarget(el);         break;
                    case 'isVisible':    info[prop] = isVisible(el);        break;
                    case 'namespaceURI': info[prop] = el.namespaceURI;      break;
                    case 'nodeName':     info[prop] = el.nodeName;          break;
                    case 'textContent':  info[prop] = el.textContent;       break;
                }
            }

            return info;
        });
    }

    waitForRepaint(): Promise<void> {
        return new Promise((resolve) => {
            window.requestAnimationFrame(() => window.requestAnimationFrame(() => resolve()));
        })
    }
}
