[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [test](../README.md) / DeviceWorkerLauncher

# Class: DeviceWorkerLauncher\<Options\>

Device and configuration manager.

## Type Parameters

• **Options** *extends* [`DeviceWorkerLauncherOptions`](../interfaces/DeviceWorkerLauncherOptions.md) = [`DeviceWorkerLauncherOptions`](../interfaces/DeviceWorkerLauncherOptions.md)

## Constructors

### new DeviceWorkerLauncher()

> **new DeviceWorkerLauncher**\<`Options`\>(`options`?): [`DeviceWorkerLauncher`](DeviceWorkerLauncher.md)\<`Options`\>

#### Parameters

• **options?**: `Options`

#### Returns

[`DeviceWorkerLauncher`](DeviceWorkerLauncher.md)\<`Options`\>

#### Defined in

[src/test.ts:62](https://github.com/Onslip/automation/blob/2da2b00dbee8df6079d79d0e64badbbab41233bf/src/test.ts#L62)

## Methods

### setup()

> **setup**(`worker`, `headless`, `workerInfo`): `Promise`\<`string`\>

Setup a device for the specified worker.

The default implementation just returns the device ID from the [DeviceWorkerLauncherOptions#devices](../interfaces/DeviceWorkerLauncherOptions.md#devices) }
array. A subclass might launch an emulator or provision to a physical device, and return its ID.

#### Parameters

• **worker**: `number`

The worker index.

• **headless**: `boolean`

Whether to start the device in headless mode or not.

• **workerInfo**: `WorkerInfo`

The worker information.

#### Returns

`Promise`\<`string`\>

The device ID to use.

#### Defined in

[src/test.ts:86](https://github.com/Onslip/automation/blob/2da2b00dbee8df6079d79d0e64badbbab41233bf/src/test.ts#L86)

***

### start()

> **start**(`worker`, `device`, `workerInfo`): `Promise`\<[`WebAppConfig`](../interfaces/WebAppConfig.md)\>

Launches the configured application on a device and returns information about what web view to connect to.

The default implementation makes a fresh install of the application package, if specified in
[DeviceWorkerLauncherOptions#archive](../interfaces/DeviceWorkerLauncherOptions.md#archive), and then launches the application specified in
[DeviceWorkerLauncherOptions#app](../interfaces/DeviceWorkerLauncherOptions.md#app).

#### Parameters

• **worker**: `number`

The worker index.

• **device**: [`Device`](../../index/classes/Device.md)

The device to start the application on.

• **workerInfo**: `WorkerInfo`

The worker information.

#### Returns

`Promise`\<[`WebAppConfig`](../interfaces/WebAppConfig.md)\>

Information about the web view to connect to.

#### Defined in

[src/test.ts:105](https://github.com/Onslip/automation/blob/2da2b00dbee8df6079d79d0e64badbbab41233bf/src/test.ts#L105)

***

### stop()

> **stop**(`worker`, `device`, `workerInfo`): `Promise`\<`void`\>

Stops the configured application on a device.

#### Parameters

• **worker**: `number`

The worker index.

• **device**: [`Device`](../../index/classes/Device.md)

The device to stop the application on.

• **workerInfo**: `WorkerInfo`

The worker information.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/test.ts:130](https://github.com/Onslip/automation/blob/2da2b00dbee8df6079d79d0e64badbbab41233bf/src/test.ts#L130)

***

### teardown()

> **teardown**(`worker`, `workerInfo`): `Promise`\<`void`\>

Teardown a device for the specified worker.

The default implementation does nothing. A subclass might stop an emulator or release a physical device.

#### Parameters

• **worker**: `number`

The worker index.

• **workerInfo**: `WorkerInfo`

The worker information.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/test.ts:147](https://github.com/Onslip/automation/blob/2da2b00dbee8df6079d79d0e64badbbab41233bf/src/test.ts#L147)
