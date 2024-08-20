[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [index](../README.md) / Page

# Class: Page

The Page object represents the connection to a remote web view.

## Properties

### mouse

> `readonly` **mouse**: [`Mouse`](Mouse.md)

A reference to Mouse instance.

#### Defined in

[src/api.ts:145](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/api.ts#L145)

***

### touchscreen

> `readonly` **touchscreen**: [`Touchscreen`](Touchscreen.md)

A reference to Touchscreen instance.

#### Defined in

[src/api.ts:148](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/api.ts#L148)

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Closes the connection to the web view and deallocates all held resources.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/api.ts:202](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/api.ts#L202)

***

### evaluate()

> **evaluate**(`pageFunction`, `arg`?): `Promise`\<`unknown`\>

Invokes a custom JavaScript function inside the web view context.

#### Parameters

• **pageFunction**: `string` \| `Function`

A function to call inside the web view context.

• **arg?**: `unknown`

An optional argument to pass to the function. Must be JSON serializable.

#### Returns

`Promise`\<`unknown`\>

The value returned from the function. Must be JSON serializable.

#### Defined in

[src/api.ts:177](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/api.ts#L177)

***

### locator()

> **locator**(`selector`, `options`?): [`Locator`](Locator.md)

Creates and returns a new Locator.

#### Parameters

• **selector**: `string`

The selectors to match.

• **options?**: [`LocatorOptions`](../interfaces/LocatorOptions.md)

Additional options.

#### Returns

[`Locator`](Locator.md)

A new Locator.

#### Defined in

[src/api.ts:166](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/api.ts#L166)

***

### setDebug()

> **setDebug**(`debug`): `void`

Enables to disables debug output from this library.

#### Parameters

• **debug**: `null` \| `boolean` \| `Partial`\<`Console`\>

Use this `Console` for debugging, or set to `true` to use `console` and `false`/`null` to disable,

#### Returns

`void`

#### Defined in

[src/api.ts:186](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/api.ts#L186)

***

### setDefaultTimeout()

> **setDefaultTimeout**(`timeout`): `void`

Specifies the default timeout when waiting for Locators to be actionable.

#### Parameters

• **timeout**: `number`

The new default timeout, in milliseconds.

#### Returns

`void`

#### Defined in

[src/api.ts:195](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/api.ts#L195)
