[@onslip/automation](../README.md) / ReaderOptions

# Interface: ReaderOptions

## Hierarchy

- **`ReaderOptions`**

  ↳ [`AndroidLogOptions`](AndroidLogOptions.md)

  ↳ [`iOSLogOptions`](iOSLogOptions.md)

## Table of contents

### Properties

- [separator](ReaderOptions.md#separator)
- [stopSignal](ReaderOptions.md#stopsignal)

## Properties

### separator

• `Optional` **separator**: `string`

A line separator to add to each generated line.

#### Defined in

[src/utils.ts:36](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L36)

___

### stopSignal

• `Optional` **stopSignal**: `Signal`<`boolean`\>

A signal to check. Reading will stop when signal is `true.`

#### Defined in

[src/utils.ts:33](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L33)
