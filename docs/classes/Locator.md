[**@onslip/automation**](../README.md) • **Docs**

***

[@onslip/automation](../README.md) / Locator

# Class: Locator

## Methods

### boundingBox()

> **boundingBox**(`options`?): `Promise`\<`null` \| `object`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`null` \| `object`\>

#### Defined in

[src/api.ts:194](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L194)

***

### click()

> **click**(`options`?): `Promise`\<`void`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/api.ts:272](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L272)

***

### count()

> **count**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

[src/api.ts:189](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L189)

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

[src/api.ts:229](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L229)

***

### evaluateAll()

> **evaluateAll**(`pageFunction`, `arg`?): `Promise`\<`unknown`\>

#### Parameters

• **pageFunction**: `string` \| `Function`

• **arg?**: `unknown`

#### Returns

`Promise`\<`unknown`\>

#### Defined in

[src/api.ts:236](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L236)

***

### fill()

> **fill**(`value`, `options`?): `Promise`\<`void`\>

#### Parameters

• **value**: `string`

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/api.ts:306](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L306)

***

### first()

> **first**(): [`Locator`](Locator.md)

#### Returns

[`Locator`](Locator.md)

#### Defined in

[src/api.ts:173](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L173)

***

### getAttribute()

> **getAttribute**(`name`, `options`?): `Promise`\<`null` \| `string`\>

#### Parameters

• **name**: `string`

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`null` \| `string`\>

#### Defined in

[src/api.ts:201](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L201)

***

### innerHTML()

> **innerHTML**(`options`?): `Promise`\<`string`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/api.ts:208](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L208)

***

### innerText()

> **innerText**(`options`?): `Promise`\<`string`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/api.ts:215](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L215)

***

### inputValue()

> **inputValue**(`options`?): `Promise`\<`string`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/api.ts:222](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L222)

***

### last()

> **last**(): [`Locator`](Locator.md)

#### Returns

[`Locator`](Locator.md)

#### Defined in

[src/api.ts:177](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L177)

***

### locator()

> **locator**(`selector`, `options`?): [`Locator`](Locator.md)

#### Parameters

• **selector**: `string`

• **options?**: [`LocatorOptions`](../interfaces/LocatorOptions.md)

#### Returns

[`Locator`](Locator.md)

#### Defined in

[src/api.ts:185](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L185)

***

### nth()

> **nth**(`index`): [`Locator`](Locator.md)

#### Parameters

• **index**: `number`

#### Returns

[`Locator`](Locator.md)

#### Defined in

[src/api.ts:181](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L181)

***

### screenshot()

> **screenshot**(`options`?): `Promise`\<`Buffer`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md) & `object`

#### Returns

`Promise`\<`Buffer`\>

#### Defined in

[src/api.ts:255](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L255)

***

### scrollIntoViewIfNeeded()

> **scrollIntoViewIfNeeded**(`options`?): `Promise`\<`void`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/api.ts:240](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L240)

***

### tap()

> **tap**(`options`?): `Promise`\<`void`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/api.ts:289](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L289)

***

### toString()

> **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/api.ts:169](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L169)

***

### waitFor()

> **waitFor**(`options`?): `Promise`\<`void`\>

#### Parameters

• **options?**: [`SelectorOptions`](../interfaces/SelectorOptions.md) & `object`

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/api.ts:317](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L317)
