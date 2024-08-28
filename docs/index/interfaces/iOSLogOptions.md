[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [index](../README.md) / iOSLogOptions

# Interface: iOSLogOptions

## Extends

- [`ReaderOptions`](ReaderOptions.md)

## Properties

### exclude?

> `optional` **exclude**: `string`[]

Processes to exclude.

#### Defined in

[src/ios-device.ts:48](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/ios-device.ts#L48)

***

### include?

> `optional` **include**: `string`[]

Processes to include.

#### Defined in

[src/ios-device.ts:45](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/ios-device.ts#L45)

***

### match?

> `optional` **match**: `string`

Only include log lines that contain this string.

#### Defined in

[src/ios-device.ts:42](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/ios-device.ts#L42)

***

### quiet?

> `optional` **quiet**: `boolean`

If true, excludes a predefined set of noisy processes in addition to those specified via the [exclude](iOSLogOptions.md#exclude) option.

#### Defined in

[src/ios-device.ts:51](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/ios-device.ts#L51)

***

### separator?

> `optional` **separator**: `string`

A line separator to add to each generated line.

#### Inherited from

[`ReaderOptions`](ReaderOptions.md).[`separator`](ReaderOptions.md#separator)

#### Defined in

[src/utils.ts:36](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/utils.ts#L36)

***

### stopSignal?

> `optional` **stopSignal**: `Signal`\<`boolean`\>

A signal to check. Reading will stop when signal is `true.`

#### Inherited from

[`ReaderOptions`](ReaderOptions.md).[`stopSignal`](ReaderOptions.md#stopsignal)

#### Defined in

[src/utils.ts:33](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/utils.ts#L33)
