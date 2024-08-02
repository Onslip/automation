[**@onslip/automation**](../README.md) • **Docs**

***

[@onslip/automation](../README.md) / pipeline

# Function: pipeline()

## pipeline(source, destination, options)

> **pipeline**\<`A`, `B`\>(`source`, `destination`, `options`?): `PipelinePromise`\<`B`\>

### Type Parameters

• **A** *extends* `PipelineSource`\<`any`\>

• **B** *extends* `WritableStream` \| `PipelineDestinationIterableFunction`\<`string` \| `Buffer`\> \| `PipelineDestinationPromiseFunction`\<`string` \| `Buffer`, `any`\> \| `PipelineDestinationIterableFunction`\<`any`\> \| `PipelineDestinationPromiseFunction`\<`any`, `any`\>

### Parameters

• **source**: `A`

• **destination**: `B`

• **options?**: `PipelineOptions`

### Returns

`PipelinePromise`\<`B`\>

### Defined in

[src/utils.ts:9](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/utils.ts#L9)

## pipeline(source, transform1, destination, options)

> **pipeline**\<`A`, `T1`, `B`\>(`source`, `transform1`, `destination`, `options`?): `PipelinePromise`\<`B`\>

### Type Parameters

• **A** *extends* `PipelineSource`\<`any`\>

• **T1** *extends* `PipelineTransform`\<`A`, `any`\>

• **B** *extends* `WritableStream` \| `PipelineDestinationIterableFunction`\<`string` \| `Buffer`\> \| `PipelineDestinationPromiseFunction`\<`string` \| `Buffer`, `any`\> \| `PipelineDestinationIterableFunction`\<`any`\> \| `PipelineDestinationPromiseFunction`\<`any`, `any`\>

### Parameters

• **source**: `A`

• **transform1**: `T1`

• **destination**: `B`

• **options?**: `PipelineOptions`

### Returns

`PipelinePromise`\<`B`\>

### Defined in

[src/utils.ts:9](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/utils.ts#L9)

## pipeline(source, transform1, transform2, destination, options)

> **pipeline**\<`A`, `T1`, `T2`, `B`\>(`source`, `transform1`, `transform2`, `destination`, `options`?): `PipelinePromise`\<`B`\>

### Type Parameters

• **A** *extends* `PipelineSource`\<`any`\>

• **T1** *extends* `PipelineTransform`\<`A`, `any`\>

• **T2** *extends* `PipelineTransform`\<`T1`, `any`\>

• **B** *extends* `WritableStream` \| `PipelineDestinationIterableFunction`\<`string` \| `Buffer`\> \| `PipelineDestinationPromiseFunction`\<`string` \| `Buffer`, `any`\> \| `PipelineDestinationIterableFunction`\<`any`\> \| `PipelineDestinationPromiseFunction`\<`any`, `any`\>

### Parameters

• **source**: `A`

• **transform1**: `T1`

• **transform2**: `T2`

• **destination**: `B`

• **options?**: `PipelineOptions`

### Returns

`PipelinePromise`\<`B`\>

### Defined in

[src/utils.ts:9](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/utils.ts#L9)

## pipeline(source, transform1, transform2, transform3, destination, options)

> **pipeline**\<`A`, `T1`, `T2`, `T3`, `B`\>(`source`, `transform1`, `transform2`, `transform3`, `destination`, `options`?): `PipelinePromise`\<`B`\>

### Type Parameters

• **A** *extends* `PipelineSource`\<`any`\>

• **T1** *extends* `PipelineTransform`\<`A`, `any`\>

• **T2** *extends* `PipelineTransform`\<`T1`, `any`\>

• **T3** *extends* `PipelineTransform`\<`T2`, `any`\>

• **B** *extends* `WritableStream` \| `PipelineDestinationIterableFunction`\<`string` \| `Buffer`\> \| `PipelineDestinationPromiseFunction`\<`string` \| `Buffer`, `any`\> \| `PipelineDestinationIterableFunction`\<`any`\> \| `PipelineDestinationPromiseFunction`\<`any`, `any`\>

### Parameters

• **source**: `A`

• **transform1**: `T1`

• **transform2**: `T2`

• **transform3**: `T3`

• **destination**: `B`

• **options?**: `PipelineOptions`

### Returns

`PipelinePromise`\<`B`\>

### Defined in

[src/utils.ts:9](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/utils.ts#L9)

## pipeline(source, transform1, transform2, transform3, transform4, destination, options)

> **pipeline**\<`A`, `T1`, `T2`, `T3`, `T4`, `B`\>(`source`, `transform1`, `transform2`, `transform3`, `transform4`, `destination`, `options`?): `PipelinePromise`\<`B`\>

### Type Parameters

• **A** *extends* `PipelineSource`\<`any`\>

• **T1** *extends* `PipelineTransform`\<`A`, `any`\>

• **T2** *extends* `PipelineTransform`\<`T1`, `any`\>

• **T3** *extends* `PipelineTransform`\<`T2`, `any`\>

• **T4** *extends* `PipelineTransform`\<`T3`, `any`\>

• **B** *extends* `WritableStream` \| `PipelineDestinationIterableFunction`\<`string` \| `Buffer`\> \| `PipelineDestinationPromiseFunction`\<`string` \| `Buffer`, `any`\> \| `PipelineDestinationIterableFunction`\<`any`\> \| `PipelineDestinationPromiseFunction`\<`any`, `any`\>

### Parameters

• **source**: `A`

• **transform1**: `T1`

• **transform2**: `T2`

• **transform3**: `T3`

• **transform4**: `T4`

• **destination**: `B`

• **options?**: `PipelineOptions`

### Returns

`PipelinePromise`\<`B`\>

### Defined in

[src/utils.ts:9](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/utils.ts#L9)

## pipeline(streams, options)

> **pipeline**(`streams`, `options`?): `Promise`\<`void`\>

### Parameters

• **streams**: readonly (`ReadableStream` \| `WritableStream` \| `ReadWriteStream`)[]

• **options?**: `PipelineOptions`

### Returns

`Promise`\<`void`\>

### Defined in

[src/utils.ts:9](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/utils.ts#L9)

## pipeline(stream1, stream2, streams)

> **pipeline**(`stream1`, `stream2`, ...`streams`): `Promise`\<`void`\>

### Parameters

• **stream1**: `ReadableStream`

• **stream2**: `WritableStream` \| `ReadWriteStream`

• ...**streams**: (`WritableStream` \| `ReadWriteStream` \| `PipelineOptions`)[]

### Returns

`Promise`\<`void`\>

### Defined in

[src/utils.ts:9](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/utils.ts#L9)
