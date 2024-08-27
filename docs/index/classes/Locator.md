[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [index](../README.md) / Locator

# Class: Locator

## Methods

### boundingBox()

> **boundingBox**(`options`?): `Promise`\<`null` \| `object`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`null` \| `object`\>

#### Defined in

[src/api.ts:282](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L282)

***

### click()

> **click**(`options`?): `Promise`\<`void`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/api.ts:402](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L402)

***

### count()

> **count**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[src/api.ts:277](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L277)

***

### evaluate()

> **evaluate**(`pageFunction`, `arg`?, `options`?): `Promise`\<`unknown`\>

#### Parameters

• **pageFunction**: `string` \| `Function`

• **arg?**: `unknown`

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`unknown`\>

#### Defined in

[src/api.ts:359](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L359)

***

### evaluateAll()

> **evaluateAll**(`pageFunction`, `arg`?): `Promise`\<`unknown`\>

#### Parameters

• **pageFunction**: `string` \| `Function`

• **arg?**: `unknown`

#### Returns

`Promise`\<`unknown`\>

#### Defined in

[src/api.ts:366](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L366)

***

### fill()

> **fill**(`value`, `options`?): `Promise`\<`void`\>

#### Parameters

• **value**: `string`

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/api.ts:436](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L436)

***

### first()

> **first**(): [`Locator`](Locator.md)

#### Returns

[`Locator`](Locator.md)

#### Defined in

[src/api.ts:261](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L261)

***

### getAttribute()

> **getAttribute**(`name`, `options`?): `Promise`\<`null` \| `string`\>

#### Parameters

• **name**: `string`

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`null` \| `string`\>

#### Defined in

[src/api.ts:289](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L289)

***

### innerHTML()

> **innerHTML**(`options`?): `Promise`\<`string`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/api.ts:296](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L296)

***

### innerText()

> **innerText**(`options`?): `Promise`\<`string`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/api.ts:303](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L303)

***

### inputValue()

> **inputValue**(`options`?): `Promise`\<`string`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/api.ts:317](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L317)

***

### isChecked()

> **isChecked**(`options`?): `Promise`\<`boolean`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/api.ts:324](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L324)

***

### isDisabled()

> **isDisabled**(`options`?): `Promise`\<`boolean`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/api.ts:331](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L331)

***

### isEditable()

> **isEditable**(`options`?): `Promise`\<`boolean`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/api.ts:342](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L342)

***

### isEnabled()

> **isEnabled**(`options`?): `Promise`\<`boolean`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/api.ts:335](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L335)

***

### isHidden()

> **isHidden**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/api.ts:349](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L349)

***

### isVisible()

> **isVisible**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/api.ts:353](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L353)

***

### last()

> **last**(): [`Locator`](Locator.md)

#### Returns

[`Locator`](Locator.md)

#### Defined in

[src/api.ts:265](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L265)

***

### locator()

> **locator**(`selector`, `options`?): [`Locator`](Locator.md)

#### Parameters

• **selector**: `string`

• **options?**: [`LocatorOptions`](../interfaces/LocatorOptions.md)

#### Returns

[`Locator`](Locator.md)

#### Defined in

[src/api.ts:273](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L273)

***

### nth()

> **nth**(`index`): [`Locator`](Locator.md)

#### Parameters

• **index**: `number`

#### Returns

[`Locator`](Locator.md)

#### Defined in

[src/api.ts:269](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L269)

***

### screenshot()

> **screenshot**(`options`?): `Promise`\<`Buffer`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md) & `object`

#### Returns

`Promise`\<`Buffer`\>

#### Defined in

[src/api.ts:385](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L385)

***

### scrollIntoViewIfNeeded()

> **scrollIntoViewIfNeeded**(`options`?): `Promise`\<`void`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/api.ts:370](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L370)

***

### tap()

> **tap**(`options`?): `Promise`\<`void`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/api.ts:419](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L419)

***

### textContent()

> **textContent**(`options`?): `Promise`\<`string`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/api.ts:310](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L310)

***

### toString()

> **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/api.ts:257](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L257)

***

### waitFor()

> **waitFor**(`options`?): `Promise`\<`void`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md) & `object`

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/api.ts:448](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L448)
