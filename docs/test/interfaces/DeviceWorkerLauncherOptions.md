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

[src/test.ts:36](https://github.com/Onslip/automation/blob/2da2b00dbee8df6079d79d0e64badbbab41233bf/src/test.ts#L36)

***

### archive?

> `optional` **archive**: `string`

If specified, path to the application to install on the device

#### Defined in

[src/test.ts:33](https://github.com/Onslip/automation/blob/2da2b00dbee8df6079d79d0e64badbbab41233bf/src/test.ts#L33)

***

### args?

> `optional` **args**: `string`[]

Optional application arguments.

#### Defined in

[src/test.ts:39](https://github.com/Onslip/automation/blob/2da2b00dbee8df6079d79d0e64badbbab41233bf/src/test.ts#L39)

***

### context?

> `optional` **context**: `string`

The web view/context to connect to (the actual device ID will be prepended to form a proper context path).

#### Defined in

[src/test.ts:42](https://github.com/Onslip/automation/blob/2da2b00dbee8df6079d79d0e64badbbab41233bf/src/test.ts#L42)

***

### devices?

> `optional` **devices**: `string`[]

A static list of device IDs to use (must match the number or workers) by default.

#### Defined in

[src/test.ts:45](https://github.com/Onslip/automation/blob/2da2b00dbee8df6079d79d0e64badbbab41233bf/src/test.ts#L45)
