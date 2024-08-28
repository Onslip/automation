[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [test](../README.md) / DeviceWorkerLauncherOptions

# Interface: DeviceWorkerLauncherOptions

[DeviceWorkerLauncher](../classes/DeviceWorkerLauncher.md) options.

## Properties

### app?

> `optional` **app**: `string`

If specified, the package/activity identifier or application bundle identifier to launch.

#### Defined in

[src/test.ts:37](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/test.ts#L37)

***

### archive?

> `optional` **archive**: `string`

If specified, path to the application to install on the device

#### Defined in

[src/test.ts:34](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/test.ts#L34)

***

### args?

> `optional` **args**: `string`[]

Optional application arguments.

#### Defined in

[src/test.ts:40](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/test.ts#L40)

***

### context?

> `optional` **context**: `string`

The web view/context to connect to (the actual device ID will be prepended to form a proper context path).

#### Defined in

[src/test.ts:43](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/test.ts#L43)

***

### devices?

> `optional` **devices**: `string`[]

A static list of device IDs to use (must match the number or workers) by default.

#### Defined in

[src/test.ts:46](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/test.ts#L46)
