[**@onslip/automation**](../README.md) • **Docs**

***

[@onslip/automation](../README.md) / AndroidLogOptions

# Interface: AndroidLogOptions

## Extends

- [`ReaderOptions`](ReaderOptions.md)

## Properties

### buffers?

> `optional` **buffers**: (`"system"` \| `"main"` \| `"radio"` \| `"events"` \| `"crash"`)[]

#### Defined in

[src/android-device.ts:9](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L9)

***

### clear?

> `optional` **clear**: `boolean`

#### Defined in

[src/android-device.ts:5](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L5)

***

### filterspecs?

> `optional` **filterspecs**: `string`[]

#### Defined in

[src/android-device.ts:10](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L10)

***

### format?

> `optional` **format**: `"raw"` \| `"long"` \| `"brief"` \| `"process"` \| `"tag"` \| `"thread"` \| `"time"` \| `"threadtime"`

#### Defined in

[src/android-device.ts:7](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L7)

***

### historic?

> `optional` **historic**: `boolean`

#### Defined in

[src/android-device.ts:6](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L6)

***

### modifiers?

> `optional` **modifiers**: (`"year"` \| `"color"` \| `"descriptive"` \| `"epoch"` \| `"monotonic"` \| `"printable"` \| `"uid"` \| `"usec"` \| `"UTC"` \| `"zone"`)[]

#### Defined in

[src/android-device.ts:8](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L8)

***

### separator?

> `optional` **separator**: `string`

A line separator to add to each generated line.

#### Inherited from

[`ReaderOptions`](ReaderOptions.md).[`separator`](ReaderOptions.md#separator)

#### Defined in

[src/utils.ts:36](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/utils.ts#L36)

***

### stopSignal?

> `optional` **stopSignal**: `Signal`\<`boolean`\>

A signal to check. Reading will stop when signal is `true.`

#### Inherited from

[`ReaderOptions`](ReaderOptions.md).[`stopSignal`](ReaderOptions.md#stopsignal)

#### Defined in

[src/utils.ts:33](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/utils.ts#L33)
