[**@onslip/automation**](../README.md) • **Docs**

***

[@onslip/automation](../README.md) / iOSLogOptions

# Interface: iOSLogOptions

## Extends

- [`ReaderOptions`](ReaderOptions.md)

## Properties

### exclude?

> `optional` **exclude**: `string`[]

Processes to exclude.

#### Defined in

[src/ios-device.ts:46](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/ios-device.ts#L46)

***

### include?

> `optional` **include**: `string`[]

Processes to include.

#### Defined in

[src/ios-device.ts:43](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/ios-device.ts#L43)

***

### match?

> `optional` **match**: `string`

Only include log lines that contain this string.

#### Defined in

[src/ios-device.ts:40](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/ios-device.ts#L40)

***

### quiet?

> `optional` **quiet**: `boolean`

If true, execludes a predefined set of noisy processes in addition to those specified via the [[exclude]] option.

#### Defined in

[src/ios-device.ts:49](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/ios-device.ts#L49)

***

### separator?

> `optional` **separator**: `string`

A line separator to add to each generated line.

#### Inherited from

[`ReaderOptions`](ReaderOptions.md).[`separator`](ReaderOptions.md#separator)

#### Defined in

[src/utils.ts:36](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/utils.ts#L36)

***

### stopSignal?

> `optional` **stopSignal**: `Signal`\<`boolean`\>

A signal to check. Reading will stop when signal is `true.`

#### Inherited from

[`ReaderOptions`](ReaderOptions.md).[`stopSignal`](ReaderOptions.md#stopsignal)

#### Defined in

[src/utils.ts:33](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/utils.ts#L33)
