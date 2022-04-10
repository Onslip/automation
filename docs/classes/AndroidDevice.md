[@onslip/automation](../README.md) / AndroidDevice

# Class: AndroidDevice

This class manages Android devices and applications.

## Hierarchy

- [`Device`](Device.md)

  ↳ **`AndroidDevice`**

## Table of contents

### Properties

- [id](AndroidDevice.md#id)
- [type](AndroidDevice.md#type)

### Methods

- [bindWebView](AndroidDevice.md#bindwebview)
- [collectLogs](AndroidDevice.md#collectlogs)
- [deviceName](AndroidDevice.md#devicename)
- [findWebViews](AndroidDevice.md#findwebviews)
- [install](AndroidDevice.md#install)
- [osVersion](AndroidDevice.md#osversion)
- [readLogs](AndroidDevice.md#readlogs)
- [shell](AndroidDevice.md#shell)
- [start](AndroidDevice.md#start)
- [stop](AndroidDevice.md#stop)
- [toString](AndroidDevice.md#tostring)
- [uninstall](AndroidDevice.md#uninstall)
- [findDevice](AndroidDevice.md#finddevice)
- [findDevices](AndroidDevice.md#finddevices)

## Properties

### id

• **id**: `string`

#### Inherited from

[Device](Device.md).[id](Device.md#id)

___

### type

• **type**: ``"android"`` \| ``"ios"``

#### Inherited from

[Device](Device.md).[type](Device.md#type)

## Methods

### bindWebView

▸ **bindWebView**(`webview`, `port`): `Promise`<{ `host`: `string` = 'localhost'; `port`: `number`  }\>

Binds a web view to the specified port on `localhost`.

For additional information, see the subclass documentation of this method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `webview` | `string` |
| `port` | `number` |

#### Returns

`Promise`<{ `host`: `string` = 'localhost'; `port`: `number`  }\>

#### Overrides

[Device](Device.md).[bindWebView](Device.md#bindwebview)

#### Defined in

[src/android-device.ts:100](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L100)

___

### collectLogs

▸ **collectLogs**(`options?`): `Promise`<() => `Promise`<`string`[]\>\>

Begins collecting and buffering logs from the device. When the returned function is called, all lines are
returned as an array.

By default, this method adds a LF to each collected line, making the array suitable to be dumped to disk as-is.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Omit`<[`AndroidLogOptions`](../interfaces/AndroidLogOptions.md), ``"stopSignal"``\> |

#### Returns

`Promise`<() => `Promise`<`string`[]\>\>

#### Overrides

[Device](Device.md).[collectLogs](Device.md#collectlogs)

#### Defined in

[src/android-device.ts:91](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L91)

___

### deviceName

▸ **deviceName**(): `Promise`<`string`\>

Returns the name of the device.

#### Returns

`Promise`<`string`\>

#### Overrides

[Device](Device.md).[deviceName](Device.md#devicename)

#### Defined in

[src/android-device.ts:52](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L52)

___

### findWebViews

▸ **findWebViews**(): `Promise`<`string`[]\>

Finds all debuggable web views on the device.

For additional information, see the subclass documentation of this method.

#### Returns

`Promise`<`string`[]\>

#### Overrides

[Device](Device.md).[findWebViews](Device.md#findwebviews)

#### Defined in

[src/android-device.ts:95](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L95)

___

### install

▸ **install**(`archive`, `options?`): `Promise`<`void`\>

Installs an application onto the device.

#### Parameters

| Name | Type |
| :------ | :------ |
| `archive` | `string` |
| `options?` | `string`[] |

#### Returns

`Promise`<`void`\>

#### Overrides

[Device](Device.md).[install](Device.md#install)

#### Defined in

[src/android-device.ts:56](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L56)

___

### osVersion

▸ **osVersion**(): `Promise`<`string`\>

Returns the Android/iOS version number.

#### Returns

`Promise`<`string`\>

#### Overrides

[Device](Device.md).[osVersion](Device.md#osversion)

#### Defined in

[src/android-device.ts:48](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L48)

___

### readLogs

▸ **readLogs**(`options?`): `AsyncGenerator`<`string`, `any`, `unknown`\>

Reads log lines from the device.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`AndroidLogOptions`](../interfaces/AndroidLogOptions.md) |

#### Returns

`AsyncGenerator`<`string`, `any`, `unknown`\>

#### Overrides

[Device](Device.md).[readLogs](Device.md#readlogs)

#### Defined in

[src/android-device.ts:74](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L74)

▸ **readLogs**(`options?`, `timeout?`): `AsyncGenerator`<`undefined` \| `string`, `any`, `unknown`\>

Reads log lines from the device, with heartbeats.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`AndroidLogOptions`](../interfaces/AndroidLogOptions.md) |
| `timeout?` | `number` |

#### Returns

`AsyncGenerator`<`undefined` \| `string`, `any`, `unknown`\>

#### Overrides

[Device](Device.md).[readLogs](Device.md#readlogs)

#### Defined in

[src/android-device.ts:75](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L75)

___

### shell

▸ **shell**(`command`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/android-device.ts:108](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L108)

___

### start

▸ **start**(`app`, `options?`): `Promise`<`void`\>

Launches an application/activity on the device.

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `string` |
| `options?` | [`StartOptions`](../interfaces/StartOptions.md) |

#### Returns

`Promise`<`void`\>

#### Overrides

[Device](Device.md).[start](Device.md#start)

#### Defined in

[src/android-device.ts:60](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L60)

___

### stop

▸ **stop**(`app`): `Promise`<`void`\>

Kills an application on the device.

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `string` |

#### Returns

`Promise`<`void`\>

#### Overrides

[Device](Device.md).[stop](Device.md#stop)

#### Defined in

[src/android-device.ts:64](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L64)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/android-device.ts:44](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L44)

___

### uninstall

▸ **uninstall**(`app`): `Promise`<`void`\>

Uninstalls an application from the device.

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `string` |

#### Returns

`Promise`<`void`\>

#### Overrides

[Device](Device.md).[uninstall](Device.md#uninstall)

#### Defined in

[src/android-device.ts:69](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L69)

___

### findDevice

▸ `Static` **findDevice**(`deviceId`, `options?`): `Promise`<`undefined` \| [`Device`](Device.md)\>

Finds a single device, given a device ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceId` | `string` | The device ID to find. |
| `options?` | [`DeviceOptions`](../interfaces/DeviceOptions.md) | Device manager options. |

#### Returns

`Promise`<`undefined` \| [`Device`](Device.md)\>

The device, if found, else `undefined`.

#### Inherited from

[Device](Device.md).[findDevice](Device.md#finddevice)

#### Defined in

[src/device.ts:49](https://github.com/Onslip/automation/blob/b6606b0/src/device.ts#L49)

___

### findDevices

▸ `Static` **findDevices**(`options?`): `Promise`<[`AndroidDevice`](AndroidDevice.md)[]\>

Finds all connected Android devices by executing `adb devices`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`DeviceOptions`](../interfaces/DeviceOptions.md) | Device manager options. |

#### Returns

`Promise`<[`AndroidDevice`](AndroidDevice.md)[]\>

A list of detected iOS devices.

#### Overrides

[Device](Device.md).[findDevices](Device.md#finddevices)

#### Defined in

[src/android-device.ts:23](https://github.com/Onslip/automation/blob/b6606b0/src/android-device.ts#L23)
