[**@onslip/automation**](../README.md) • **Docs**

***

[@onslip/automation](../README.md) / Page

# Class: Page

The Page object represents the connection to a remote web view.

## Properties

### mouse

> `readonly` **mouse**: [`Mouse`](Mouse.md)

A referece to Mouse instance.

#### Defined in

[src/api.ts:57](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/api.ts#L57)

***

### touchscreen

> `readonly` **touchscreen**: [`Touchscreen`](Touchscreen.md)

A referece to Touchscreen instance.

#### Defined in

[src/api.ts:60](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/api.ts#L60)

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Closes the connection to the web view and deallocates all held resources.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/api.ts:114](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/api.ts#L114)

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

[src/api.ts:89](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/api.ts#L89)

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

[src/api.ts:78](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/api.ts#L78)

***

### setDebug()

> **setDebug**(`debug`): `void`

Enables to disables debug output from this library.

#### Parameters

• **debug**: `boolean`

Set to `true` to enable debugging and `false` to disable.

#### Returns

`void`

#### Defined in

[src/api.ts:98](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/api.ts#L98)

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

[src/api.ts:107](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/api.ts#L107)
