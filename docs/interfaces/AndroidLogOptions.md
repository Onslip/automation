[@onslip/automation](../README.md) / AndroidLogOptions

# Interface: AndroidLogOptions

## Hierarchy

- [`ReaderOptions`](ReaderOptions.md)

  ↳ **`AndroidLogOptions`**

## Table of contents

### Properties

- [buffers](AndroidLogOptions.md#buffers)
- [clear](AndroidLogOptions.md#clear)
- [filterspecs](AndroidLogOptions.md#filterspecs)
- [format](AndroidLogOptions.md#format)
- [historic](AndroidLogOptions.md#historic)
- [modifiers](AndroidLogOptions.md#modifiers)
- [separator](AndroidLogOptions.md#separator)
- [stopSignal](AndroidLogOptions.md#stopsignal)

## Properties

### buffers

• `Optional` **buffers**: (``"main"`` \| ``"system"`` \| ``"radio"`` \| ``"events"`` \| ``"crash"``)[]

#### Defined in

[src/android-device.ts:9](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L9)

___

### clear

• `Optional` **clear**: `boolean`

#### Defined in

[src/android-device.ts:5](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L5)

___

### filterspecs

• `Optional` **filterspecs**: `string`[]

#### Defined in

[src/android-device.ts:10](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L10)

___

### format

• `Optional` **format**: ``"brief"`` \| ``"process"`` \| ``"tag"`` \| ``"thread"`` \| ``"raw"`` \| ``"time"`` \| ``"threadtime"`` \| ``"long"``

#### Defined in

[src/android-device.ts:7](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L7)

___

### historic

• `Optional` **historic**: `boolean`

#### Defined in

[src/android-device.ts:6](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L6)

___

### modifiers

• `Optional` **modifiers**: (``"color"`` \| ``"descriptive"`` \| ``"epoch"`` \| ``"monotonic"`` \| ``"printable"`` \| ``"uid"`` \| ``"usec"`` \| ``"UTC"`` \| ``"year"`` \| ``"zone"``)[]

#### Defined in

[src/android-device.ts:8](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L8)

___

### separator

• `Optional` **separator**: `string`

A line separator to add to each generated line.

#### Inherited from

[ReaderOptions](ReaderOptions.md).[separator](ReaderOptions.md#separator)

#### Defined in

[src/utils.ts:36](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L36)

___

### stopSignal

• `Optional` **stopSignal**: `Signal`<`boolean`\>

A signal to check. Reading will stop when signal is `true.`

#### Inherited from

[ReaderOptions](ReaderOptions.md).[stopSignal](ReaderOptions.md#stopsignal)

#### Defined in

[src/utils.ts:33](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L33)
