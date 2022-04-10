[@onslip/automation](../README.md) / Page

# Class: Page

The Page object represents the connection to a remote web view.

## Table of contents

### Properties

- [mouse](Page.md#mouse)
- [touchscreen](Page.md#touchscreen)

### Methods

- [close](Page.md#close)
- [evaluate](Page.md#evaluate)
- [locator](Page.md#locator)
- [setDebug](Page.md#setdebug)
- [setDefaultTimeout](Page.md#setdefaulttimeout)

## Properties

### mouse

• `Readonly` **mouse**: [`Mouse`](Mouse.md)

A referece to Mouse instance.

#### Defined in

[src/api.ts:57](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L57)

___

### touchscreen

• `Readonly` **touchscreen**: [`Touchscreen`](Touchscreen.md)

A referece to Touchscreen instance.

#### Defined in

[src/api.ts:60](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L60)

## Methods

### close

▸ **close**(): `Promise`<`void`\>

Closes the connection to the web view and deallocates all held resources.

#### Returns

`Promise`<`void`\>

#### Defined in

[src/api.ts:114](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L114)

___

### evaluate

▸ **evaluate**(`pageFunction`, `arg?`): `Promise`<`unknown`\>

Invokes a custom JavaScript function inside the web view context.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageFunction` | `string` \| `Function` | A function to call inside the web view context. |
| `arg?` | `unknown` | An optional argument to pass to the function. Must be JSON serializable. |

#### Returns

`Promise`<`unknown`\>

The value returned from the function. Must be JSON serializable.

#### Defined in

[src/api.ts:89](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L89)

___

### locator

▸ **locator**(`selector`, `options?`): [`Locator`](Locator.md)

Creates and returns a new Locator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selector` | `string` | The selectors to match. |
| `options?` | [`LocatorOptions`](../interfaces/LocatorOptions.md) | Additional options. |

#### Returns

[`Locator`](Locator.md)

A new Locator.

#### Defined in

[src/api.ts:78](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L78)

___

### setDebug

▸ **setDebug**(`debug`): `void`

Enables to disables debug output from this library.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `debug` | `boolean` | Set to `true` to enable debugging and `false` to disable. |

#### Returns

`void`

#### Defined in

[src/api.ts:98](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L98)

___

### setDefaultTimeout

▸ **setDefaultTimeout**(`timeout`): `void`

Specifies the default timeout when waiting for Locators to be actionable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeout` | `number` | The new default timeout, in milliseconds. |

#### Returns

`void`

#### Defined in

[src/api.ts:107](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L107)
