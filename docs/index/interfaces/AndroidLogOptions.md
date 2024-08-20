[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [index](../README.md) / AndroidLogOptions

# Interface: AndroidLogOptions

## Extends

- [`ReaderOptions`](ReaderOptions.md)

## Properties

### buffers?

> `optional` **buffers**: (`"main"` \| `"system"` \| `"radio"` \| `"events"` \| `"crash"`)[]

#### Defined in

[src/android-device.ts:10](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/android-device.ts#L10)

***

### clear?

> `optional` **clear**: `boolean`

#### Defined in

[src/android-device.ts:6](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/android-device.ts#L6)

***

### filterspecs?

> `optional` **filterspecs**: `string`[]

#### Defined in

[src/android-device.ts:11](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/android-device.ts#L11)

***

### format?

> `optional` **format**: `"raw"` \| `"long"` \| `"time"` \| `"brief"` \| `"process"` \| `"tag"` \| `"thread"` \| `"threadtime"`

#### Defined in

[src/android-device.ts:8](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/android-device.ts#L8)

***

### historic?

> `optional` **historic**: `boolean`

#### Defined in

[src/android-device.ts:7](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/android-device.ts#L7)

***

### modifiers?

> `optional` **modifiers**: (`"color"` \| `"year"` \| `"descriptive"` \| `"epoch"` \| `"monotonic"` \| `"printable"` \| `"uid"` \| `"usec"` \| `"UTC"` \| `"zone"`)[]

#### Defined in

[src/android-device.ts:9](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/android-device.ts#L9)

***

### separator?

> `optional` **separator**: `string`

A line separator to add to each generated line.

#### Inherited from

[`ReaderOptions`](ReaderOptions.md).[`separator`](ReaderOptions.md#separator)

#### Defined in

[src/utils.ts:36](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/utils.ts#L36)

***

### stopSignal?

> `optional` **stopSignal**: `Signal`\<`boolean`\>

A signal to check. Reading will stop when signal is `true.`

#### Inherited from

[`ReaderOptions`](ReaderOptions.md).[`stopSignal`](ReaderOptions.md#stopsignal)

#### Defined in

[src/utils.ts:33](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/utils.ts#L33)
