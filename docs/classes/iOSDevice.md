[@onslip/automation](../README.md) / iOSDevice

# Class: iOSDevice

This class manages iOS devices and applications.

## Hierarchy

- [`Device`](Device.md)

  ↳ **`iOSDevice`**

## Table of contents

### Properties

- [id](iOSDevice.md#id)
- [type](iOSDevice.md#type)

### Methods

- [bindWebView](iOSDevice.md#bindwebview)
- [collectLogs](iOSDevice.md#collectlogs)
- [deviceName](iOSDevice.md#devicename)
- [findWebViews](iOSDevice.md#findwebviews)
- [install](iOSDevice.md#install)
- [osVersion](iOSDevice.md#osversion)
- [readLogs](iOSDevice.md#readlogs)
- [start](iOSDevice.md#start)
- [stop](iOSDevice.md#stop)
- [toString](iOSDevice.md#tostring)
- [uninstall](iOSDevice.md#uninstall)
- [findDevice](iOSDevice.md#finddevice)
- [findDevices](iOSDevice.md#finddevices)

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

▸ **bindWebView**(`webview?`): `Promise`<[`AutomationOptions`](../interfaces/AutomationOptions.md)\>

Returns options to be passed to [findWebViewContexts](../README.md#findwebviewcontexts) and [openWebView](../README.md#openwebview). Unlike [AndroidDevice](AndroidDevice.md), no
`localhost` port is actually opened and the (optional) `webview` parameter is just used to set the
[AutomationOptions.appId](../interfaces/AutomationOptions.md#appid) option to restrict contexts to the specified web view.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `webview?` | `string` | The web view identifier target. |

#### Returns

`Promise`<[`AutomationOptions`](../interfaces/AutomationOptions.md)\>

Options suitable to pass to [findWebViewContexts](../README.md#findwebviewcontexts) or [openWebView](../README.md#openwebview).

#### Overrides

[Device](Device.md).[bindWebView](Device.md#bindwebview)

#### Defined in

[src/ios-device.ts:168](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L168)

___

### collectLogs

▸ **collectLogs**(`options?`): `Promise`<() => `Promise`<`string`[]\>\>

Begins collecting and buffering logs from the device. When the returned function is called, all lines are
returned as an array.

By default, this method adds a LF to each collected line, making the array suitable to be dumped to disk as-is.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Omit`<[`iOSLogOptions`](../interfaces/iOSLogOptions.md), ``"stopSignal"``\> |

#### Returns

`Promise`<() => `Promise`<`string`[]\>\>

A function that, when invoked, stops logging and returns all collected lines.

#### Overrides

[Device](Device.md).[collectLogs](Device.md#collectlogs)

#### Defined in

[src/ios-device.ts:139](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L139)

___

### deviceName

▸ **deviceName**(): `Promise`<`string`\>

Returns the name of the device.

#### Returns

`Promise`<`string`\>

The device name.

#### Overrides

[Device](Device.md).[deviceName](Device.md#devicename)

#### Defined in

[src/ios-device.ts:91](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L91)

___

### findWebViews

▸ **findWebViews**(): `Promise`<`string`[]\>

Finds all debuggable web views on the device.

For iOS devices, this method is optional. [findWebViewContexts](../README.md#findwebviewcontexts) and [openWebView](../README.md#openwebview) can access contexts from
all iOS web views if not restricted by [AutomationOptions.appId](../interfaces/AutomationOptions.md#appid).

#### Returns

`Promise`<`string`[]\>

An array of all debuggable web view indentifiers.

#### Overrides

[Device](Device.md).[findWebViews](Device.md#findwebviews)

#### Defined in

[src/ios-device.ts:151](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L151)

___

### install

▸ **install**(`archive`): `Promise`<`void`\>

Installs an application onto the device.

#### Parameters

| Name | Type |
| :------ | :------ |
| `archive` | `string` |

#### Returns

`Promise`<`void`\>

#### Overrides

[Device](Device.md).[install](Device.md#install)

#### Defined in

[src/ios-device.ts:95](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L95)

___

### osVersion

▸ **osVersion**(): `Promise`<`string`\>

Returns the Android/iOS version number.

#### Returns

`Promise`<`string`\>

The version number.

#### Overrides

[Device](Device.md).[osVersion](Device.md#osversion)

#### Defined in

[src/ios-device.ts:87](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L87)

___

### readLogs

▸ **readLogs**(`options?`): `AsyncGenerator`<`string`, `any`, `unknown`\>

Reads log lines from the device.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`iOSLogOptions`](../interfaces/iOSLogOptions.md) |

#### Returns

`AsyncGenerator`<`string`, `any`, `unknown`\>

An async iterator generating one line at a time.

#### Overrides

[Device](Device.md).[readLogs](Device.md#readlogs)

#### Defined in

[src/ios-device.ts:125](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L125)

▸ **readLogs**(`options?`, `timeout?`): `AsyncGenerator`<`undefined` \| `string`, `any`, `unknown`\>

Reads log lines from the device, with heartbeats.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`iOSLogOptions`](../interfaces/iOSLogOptions.md) |
| `timeout?` | `number` |

#### Returns

`AsyncGenerator`<`undefined` \| `string`, `any`, `unknown`\>

An async iterator generating one line at a time, or `undefined` on timeouts.

#### Overrides

[Device](Device.md).[readLogs](Device.md#readlogs)

#### Defined in

[src/ios-device.ts:126](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L126)

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

[src/ios-device.ts:99](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L99)

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

[src/ios-device.ts:111](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L111)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/ios-device.ts:83](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L83)

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

[src/ios-device.ts:121](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L121)

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

▸ `Static` **findDevices**(`options?`): `Promise`<[`iOSDevice`](iOSDevice.md)[]\>

Finds all connected iOS devices by querying the `ios_webkit_debug_proxy` HTTP server.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`DeviceOptions`](../interfaces/DeviceOptions.md) | Device manager options. |

#### Returns

`Promise`<[`iOSDevice`](iOSDevice.md)[]\>

A list of detected iOS devices.

#### Overrides

[Device](Device.md).[findDevices](Device.md#finddevices)

#### Defined in

[src/ios-device.ts:62](https://github.com/Onslip/automation/blob/b6606b0/src/ios-device.ts#L62)
