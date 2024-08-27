[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [index](../README.md) / iOSDevice

# Class: iOSDevice

This class manages iOS devices and applications.

## Extends

- [`Device`](Device.md)

## Properties

### id

> **id**: `string`

#### Inherited from

[`Device`](Device.md).[`id`](Device.md#id)

#### Defined in

[src/device.ts:86](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/device.ts#L86)

***

### type

> **type**: `"android"` \| `"ios"`

#### Inherited from

[`Device`](Device.md).[`type`](Device.md#type)

#### Defined in

[src/device.ts:86](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/device.ts#L86)

## Methods

### bindWebView()

> **bindWebView**(`webviewId`?): `Promise`\<[`AutomationOptions`](../interfaces/AutomationOptions.md)\>

Returns options to be passed to [findWebViewContexts](../functions/findWebViewContexts.md) and [openWebView](../functions/openWebView.md). Unlike
[AndroidDevice](AndroidDevice.md), no `localhost` port is actually opened and the (optional) webviewId parameter is
just used to set the [AutomationOptions.appId](../interfaces/AutomationOptions.md#appid) option to restrict contexts to the specified web view.

#### Parameters

• **webviewId?**: `string`

The web view identifier target.

#### Returns

`Promise`\<[`AutomationOptions`](../interfaces/AutomationOptions.md)\>

Options suitable to pass to [findWebViewContexts](../functions/findWebViewContexts.md) or [openWebView](../functions/openWebView.md).

#### Overrides

[`Device`](Device.md).[`bindWebView`](Device.md#bindwebview)

#### Defined in

[src/ios-device.ts:176](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/ios-device.ts#L176)

***

### collectLogs()

> **collectLogs**(`options`?): `Promise`\<() => `Promise`\<`string`[]\>\>

Begins collecting and buffering logs from the device. When the returned function is called, all lines are
returned as an array.

By default, this method adds a LF to each collected line, making the array suitable to be dumped to disk as-is.

#### Parameters

• **options?**: `Omit`\<[`iOSLogOptions`](../interfaces/iOSLogOptions.md), `"stopSignal"`\>

Reader options. For device-specific options, see the subclass method.

#### Returns

`Promise`\<() => `Promise`\<`string`[]\>\>

A function that, when invoked, stops logging and returns all collected lines.

#### Overrides

[`Device`](Device.md).[`collectLogs`](Device.md#collectlogs)

#### Defined in

[src/ios-device.ts:147](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/ios-device.ts#L147)

***

### deviceName()

> **deviceName**(): `Promise`\<`string`\>

Returns the name of the device.

#### Returns

`Promise`\<`string`\>

The device name.

#### Overrides

[`Device`](Device.md).[`deviceName`](Device.md#devicename)

#### Defined in

[src/ios-device.ts:93](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/ios-device.ts#L93)

***

### findWebViews()

> **findWebViews**(): `Promise`\<`string`[]\>

Finds all debuggable web views on the device.

For iOS devices, this method is optional. [findWebViewContexts](../functions/findWebViewContexts.md) and [openWebView](../functions/openWebView.md) can access contexts
from all iOS web views if not restricted by [AutomationOptions.appId](../interfaces/AutomationOptions.md#appid).

#### Returns

`Promise`\<`string`[]\>

An array of all debuggable web view identifiers.

#### Overrides

[`Device`](Device.md).[`findWebViews`](Device.md#findwebviews)

#### Defined in

[src/ios-device.ts:159](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/ios-device.ts#L159)

***

### install()

> **install**(`archive`): `Promise`\<`void`\>

Installs an application onto the device.

#### Parameters

• **archive**: `string`

The path to the application to install (APK/IPA/directory).

#### Returns

`Promise`\<`void`\>

#### Overrides

[`Device`](Device.md).[`install`](Device.md#install)

#### Defined in

[src/ios-device.ts:97](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/ios-device.ts#L97)

***

### osVersion()

> **osVersion**(): `Promise`\<`string`\>

Returns the Android/iOS version number.

#### Returns

`Promise`\<`string`\>

The version number.

#### Overrides

[`Device`](Device.md).[`osVersion`](Device.md#osversion)

#### Defined in

[src/ios-device.ts:89](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/ios-device.ts#L89)

***

### readLogs()

#### readLogs(options)

> **readLogs**(`options`?): `AsyncGenerator`\<`string`, `any`, `unknown`\>

Reads log lines from the device.

##### Parameters

• **options?**: [`iOSLogOptions`](../interfaces/iOSLogOptions.md)

Reader options. For device-specific options, see the subclass method.

##### Returns

`AsyncGenerator`\<`string`, `any`, `unknown`\>

An async iterator generating one line at a time.

##### Overrides

[`Device`](Device.md).[`readLogs`](Device.md#readlogs)

##### Defined in

[src/ios-device.ts:133](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/ios-device.ts#L133)

#### readLogs(options, timeout)

> **readLogs**(`options`?, `timeout`?): `AsyncGenerator`\<`undefined` \| `string`, `any`, `unknown`\>

Reads log lines from the device.

##### Parameters

• **options?**: [`iOSLogOptions`](../interfaces/iOSLogOptions.md)

Reader options. For device-specific options, see the subclass method.

• **timeout?**: `number`

##### Returns

`AsyncGenerator`\<`undefined` \| `string`, `any`, `unknown`\>

An async iterator generating one line at a time.

##### Overrides

[`Device`](Device.md).[`readLogs`](Device.md#readlogs)

##### Defined in

[src/ios-device.ts:134](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/ios-device.ts#L134)

***

### start()

> **start**(`app`, `options`?): `Promise`\<`void`\>

Launches an application/activity on the device.

#### Parameters

• **app**: `string`

The package/activity identifier or application bundle identifier to launch.

• **options?**: [`StartOptions`](../interfaces/StartOptions.md)

Optional start options.

#### Returns

`Promise`\<`void`\>

#### Overrides

[`Device`](Device.md).[`start`](Device.md#start)

#### Defined in

[src/ios-device.ts:104](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/ios-device.ts#L104)

***

### stop()

> **stop**(`app`): `Promise`\<`void`\>

Kills an application on the device.

#### Parameters

• **app**: `string`

The package/activity identifier or application bundle identifier to stop.

#### Returns

`Promise`\<`void`\>

#### Overrides

[`Device`](Device.md).[`stop`](Device.md#stop)

#### Defined in

[src/ios-device.ts:116](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/ios-device.ts#L116)

***

### toString()

> **toString**(): `string`

Returns a string representation of an object.

#### Returns

`string`

#### Defined in

[src/ios-device.ts:85](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/ios-device.ts#L85)

***

### uninstall()

> **uninstall**(`app`): `Promise`\<`void`\>

Uninstalls an application from the device.

#### Parameters

• **app**: `string`

The package/bundle identifier to uninstall.

#### Returns

`Promise`\<`void`\>

#### Overrides

[`Device`](Device.md).[`uninstall`](Device.md#uninstall)

#### Defined in

[src/ios-device.ts:126](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/ios-device.ts#L126)

***

### findDevice()

> `static` **findDevice**(`deviceId`, `options`?, `timeout`?): `Promise`\<`undefined` \| [`Device`](Device.md)\>

Finds a single device, given a device ID.

#### Parameters

• **deviceId**: `string`

The device ID to find.

• **options?**: [`DeviceOptions`](../interfaces/DeviceOptions.md)

Device manager options.

• **timeout?**: `number`

If specified, the method will wait for the device to appear this many milliseconds (0 means
                 forever).

#### Returns

`Promise`\<`undefined` \| [`Device`](Device.md)\>

The device, if found, else `undefined`.

#### Inherited from

[`Device`](Device.md).[`findDevice`](Device.md#finddevice)

#### Defined in

[src/device.ts:56](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/device.ts#L56)

***

### findDevices()

> `static` **findDevices**(`options`): `Promise`\<[`iOSDevice`](iOSDevice.md)[]\>

Finds all connected iOS devices by querying the `ios_webkit_debug_proxy` HTTP server.

#### Parameters

• **options**: [`DeviceOptions`](../interfaces/DeviceOptions.md) = `{}`

Device manager options.

#### Returns

`Promise`\<[`iOSDevice`](iOSDevice.md)[]\>

A list of detected iOS devices.

#### Overrides

[`Device`](Device.md).[`findDevices`](Device.md#finddevices)

#### Defined in

[src/ios-device.ts:64](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/ios-device.ts#L64)
