[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [index](../README.md) / ReaderOptions

# Interface: ReaderOptions

## Extended by

- [`AndroidLogOptions`](AndroidLogOptions.md)
- [`iOSLogOptions`](iOSLogOptions.md)

## Properties

### separator?

> `optional` **separator**: `string`

A line separator to add to each generated line.

#### Defined in

[src/utils.ts:36](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/utils.ts#L36)

***

### stopSignal?

> `optional` **stopSignal**: `Signal`\<`boolean`\>

A signal to check. Reading will stop when signal is `true.`

#### Defined in

[src/utils.ts:33](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/utils.ts#L33)
