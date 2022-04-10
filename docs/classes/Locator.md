[@onslip/automation](../README.md) / Locator

# Class: Locator

## Table of contents

### Methods

- [boundingBox](Locator.md#boundingbox)
- [click](Locator.md#click)
- [count](Locator.md#count)
- [evaluate](Locator.md#evaluate)
- [evaluateAll](Locator.md#evaluateall)
- [fill](Locator.md#fill)
- [first](Locator.md#first)
- [getAttribute](Locator.md#getattribute)
- [innerHTML](Locator.md#innerhtml)
- [innerText](Locator.md#innertext)
- [inputValue](Locator.md#inputvalue)
- [last](Locator.md#last)
- [locator](Locator.md#locator)
- [nth](Locator.md#nth)
- [screenshot](Locator.md#screenshot)
- [scrollIntoViewIfNeeded](Locator.md#scrollintoviewifneeded)
- [tap](Locator.md#tap)
- [toString](Locator.md#tostring)
- [waitFor](Locator.md#waitfor)

## Methods

### boundingBox

▸ **boundingBox**(`options?`): `Promise`<``null`` \| { `height`: `number` ; `width`: `number` ; `x`: `number` ; `y`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`SelectorOptions`](../interfaces/SelectorOptions.md) |

#### Returns

`Promise`<``null`` \| { `height`: `number` ; `width`: `number` ; `x`: `number` ; `y`: `number`  }\>

#### Defined in

[src/api.ts:194](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L194)

___

### click

▸ **click**(`options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`SelectorOptions`](../interfaces/SelectorOptions.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/api.ts:272](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L272)

___

### count

▸ **count**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Defined in

[src/api.ts:189](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L189)

___

### evaluate

▸ **evaluate**(`pageFunction`, `arg?`, `options?`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pageFunction` | `string` \| `Function` |
| `arg?` | `unknown` |
| `options?` | [`SelectorOptions`](../interfaces/SelectorOptions.md) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/api.ts:229](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L229)

___

### evaluateAll

▸ **evaluateAll**(`pageFunction`, `arg?`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pageFunction` | `string` \| `Function` |
| `arg?` | `unknown` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/api.ts:236](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L236)

___

### fill

▸ **fill**(`value`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `options?` | [`SelectorOptions`](../interfaces/SelectorOptions.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/api.ts:306](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L306)

___

### first

▸ **first**(): [`Locator`](Locator.md)

#### Returns

[`Locator`](Locator.md)

#### Defined in

[src/api.ts:173](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L173)

___

### getAttribute

▸ **getAttribute**(`name`, `options?`): `Promise`<``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options?` | [`SelectorOptions`](../interfaces/SelectorOptions.md) |

#### Returns

`Promise`<``null`` \| `string`\>

#### Defined in

[src/api.ts:201](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L201)

___

### innerHTML

▸ **innerHTML**(`options?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`SelectorOptions`](../interfaces/SelectorOptions.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/api.ts:208](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L208)

___

### innerText

▸ **innerText**(`options?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`SelectorOptions`](../interfaces/SelectorOptions.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/api.ts:215](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L215)

___

### inputValue

▸ **inputValue**(`options?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`SelectorOptions`](../interfaces/SelectorOptions.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/api.ts:222](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L222)

___

### last

▸ **last**(): [`Locator`](Locator.md)

#### Returns

[`Locator`](Locator.md)

#### Defined in

[src/api.ts:177](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L177)

___

### locator

▸ **locator**(`selector`, `options?`): [`Locator`](Locator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `string` |
| `options?` | [`LocatorOptions`](../interfaces/LocatorOptions.md) |

#### Returns

[`Locator`](Locator.md)

#### Defined in

[src/api.ts:185](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L185)

___

### nth

▸ **nth**(`index`): [`Locator`](Locator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

[`Locator`](Locator.md)

#### Defined in

[src/api.ts:181](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L181)

___

### screenshot

▸ **screenshot**(`options?`): `Promise`<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`SelectorOptions`](../interfaces/SelectorOptions.md) & { `format?`: ``"png"`` \| ``"jpeg"`` ; `path?`: `string` ; `quality?`: `number`  } |

#### Returns

`Promise`<`Buffer`\>

#### Defined in

[src/api.ts:255](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L255)

___

### scrollIntoViewIfNeeded

▸ **scrollIntoViewIfNeeded**(`options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`SelectorOptions`](../interfaces/SelectorOptions.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/api.ts:240](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L240)

___

### tap

▸ **tap**(`options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`SelectorOptions`](../interfaces/SelectorOptions.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/api.ts:289](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L289)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/api.ts:169](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L169)

___

### waitFor

▸ **waitFor**(`options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`SelectorOptions`](../interfaces/SelectorOptions.md) & { `state?`: ``"attached"`` \| ``"detached"`` \| ``"visible"`` \| ``"hidden"``  } |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/api.ts:317](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L317)
