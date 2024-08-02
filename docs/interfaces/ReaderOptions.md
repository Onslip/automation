[**@onslip/automation**](../README.md) • **Docs**

***

[@onslip/automation](../README.md) / ReaderOptions

# Interface: ReaderOptions

## Extended by

- [`AndroidLogOptions`](AndroidLogOptions.md)
- [`iOSLogOptions`](iOSLogOptions.md)

## Properties

### separator?

> `optional` **separator**: `string`

A line separator to add to each generated line.

#### Defined in

[src/utils.ts:36](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/utils.ts#L36)

***

### stopSignal?

> `optional` **stopSignal**: `Signal`\<`boolean`\>

A signal to check. Reading will stop when signal is `true.`

#### Defined in

[src/utils.ts:33](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/utils.ts#L33)
