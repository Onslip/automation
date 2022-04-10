[@onslip/automation](../README.md) / iOSLogOptions

# Interface: iOSLogOptions

## Hierarchy

- [`ReaderOptions`](ReaderOptions.md)

  ↳ **`iOSLogOptions`**

## Table of contents

### Properties

- [exclude](iOSLogOptions.md#exclude)
- [include](iOSLogOptions.md#include)
- [match](iOSLogOptions.md#match)
- [quiet](iOSLogOptions.md#quiet)
- [separator](iOSLogOptions.md#separator)
- [stopSignal](iOSLogOptions.md#stopsignal)

## Properties

### exclude

• `Optional` **exclude**: `string`[]

Processes to exclude.

#### Defined in

[src/ios-device.ts:46](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L46)

___

### include

• `Optional` **include**: `string`[]

Processes to include.

#### Defined in

[src/ios-device.ts:43](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L43)

___

### match

• `Optional` **match**: `string`

Only include log lines that contain this string.

#### Defined in

[src/ios-device.ts:40](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L40)

___

### quiet

• `Optional` **quiet**: `boolean`

If true, execludes a predefined set of noisy processes in addition to those specified via the [exclude](iOSLogOptions.md#exclude) option.

#### Defined in

[src/ios-device.ts:49](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L49)

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
