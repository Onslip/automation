[**@onslip/automation**](../README.md) • **Docs**

***

[@onslip/automation](../README.md) / AndroidDevice

# Class: AndroidDevice

This class manages Android devices and applications.

## Extends

- [`Device`](Device.md)

## Properties

### id

> **id**: `string`

#### Inherited from

[`Device`](Device.md).[`id`](Device.md#id)

#### Defined in

[src/device.ts:69](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L69)

***

### type

> **type**: `"android"` \| `"ios"`

#### Inherited from

[`Device`](Device.md).[`type`](Device.md#type)

#### Defined in

[src/device.ts:69](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L69)

## Methods

### bindWebView()

> **bindWebView**(`webview`, `port`): `Promise`\<`object`\>

Binds a web view to the specified port on `localhost`.

For additional information, see the subclass documentation of this method.

#### Parameters

• **webview**: `string`

The web view identifier to bind.

• **port**: `number`

The port to bind the web view to.

#### Returns

`Promise`\<`object`\>

Options suitable to pass to [[findWebViewContexts]] or [[openWebView]].

##### host

> **host**: `string` = `'localhost'`

##### port

> **port**: `number`

#### Overrides

[`Device`](Device.md).[`bindWebView`](Device.md#bindwebview)

#### Defined in

[src/android-device.ts:100](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L100)

***

### collectLogs()

> **collectLogs**(`options`?): `Promise`\<() => `Promise`\<`string`[]\>\>

Begins collecting and buffering logs from the device. When the returned function is called, all lines are
returned as an array.

By default, this method adds a LF to each collected line, making the array suitable to be dumped to disk as-is.

#### Parameters

• **options?**: `Omit`\<[`AndroidLogOptions`](../interfaces/AndroidLogOptions.md), `"stopSignal"`\>

Reader options. For device-specific options, see the subclass method.

#### Returns

`Promise`\<() => `Promise`\<`string`[]\>\>

A function that, when invoked, stops logging and returns all collected lines.

#### Overrides

[`Device`](Device.md).[`collectLogs`](Device.md#collectlogs)

#### Defined in

[src/android-device.ts:91](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L91)

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

[src/android-device.ts:52](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L52)

***

### findWebViews()

> **findWebViews**(): `Promise`\<`string`[]\>

Finds all debuggable web views on the device.

For additional information, see the subclass documentation of this method.

#### Returns

`Promise`\<`string`[]\>

An array of all debuggable web view indentifiers.

#### Overrides

[`Device`](Device.md).[`findWebViews`](Device.md#findwebviews)

#### Defined in

[src/android-device.ts:95](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L95)

***

### install()

> **install**(`archive`, `options`?): `Promise`\<`void`\>

Installs an application onto the device.

#### Parameters

• **archive**: `string`

The path to the application to install (APK/IPA/directory).

• **options?**: `string`[]

Optional installation options, if the subclass supports it.

#### Returns

`Promise`\<`void`\>

#### Overrides

[`Device`](Device.md).[`install`](Device.md#install)

#### Defined in

[src/android-device.ts:56](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L56)

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

[src/android-device.ts:48](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L48)

***

### readLogs()

#### readLogs(options)

> **readLogs**(`options`?): `AsyncGenerator`\<`string`, `any`, `unknown`\>

Reads log lines from the device.

##### Parameters

• **options?**: [`AndroidLogOptions`](../interfaces/AndroidLogOptions.md)

Reader options. For device-specific options, see the subclass method.

##### Returns

`AsyncGenerator`\<`string`, `any`, `unknown`\>

An async iterator generating one line at a time.

##### Overrides

[`Device`](Device.md).[`readLogs`](Device.md#readlogs)

##### Defined in

[src/android-device.ts:74](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L74)

#### readLogs(options, timeout)

> **readLogs**(`options`?, `timeout`?): `AsyncGenerator`\<`undefined` \| `string`, `any`, `unknown`\>

Reads log lines from the device.

##### Parameters

• **options?**: [`AndroidLogOptions`](../interfaces/AndroidLogOptions.md)

Reader options. For device-specific options, see the subclass method.

• **timeout?**: `number`

##### Returns

`AsyncGenerator`\<`undefined` \| `string`, `any`, `unknown`\>

An async iterator generating one line at a time.

##### Overrides

[`Device`](Device.md).[`readLogs`](Device.md#readlogs)

##### Defined in

[src/android-device.ts:75](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L75)

***

### shell()

> **shell**(`command`): `Promise`\<`string`\>

#### Parameters

• **command**: `string`

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/android-device.ts:108](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L108)

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

[src/android-device.ts:60](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L60)

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

[src/android-device.ts:64](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L64)

***

### toString()

> **toString**(): `string`

Returns a string representation of an object.

#### Returns

`string`

#### Defined in

[src/android-device.ts:44](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L44)

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

[src/android-device.ts:69](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L69)

***

### findDevice()

> `static` **findDevice**(`deviceId`, `options`?): `Promise`\<`undefined` \| [`Device`](Device.md)\>

Finds a single device, given a device ID.

#### Parameters

• **deviceId**: `string`

The device ID to find.

• **options?**: [`DeviceOptions`](../interfaces/DeviceOptions.md)

Device manager options.

#### Returns

`Promise`\<`undefined` \| [`Device`](Device.md)\>

The device, if found, else `undefined`.

#### Inherited from

[`Device`](Device.md).[`findDevice`](Device.md#finddevice)

#### Defined in

[src/device.ts:49](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L49)

***

### findDevices()

> `static` **findDevices**(`options`): `Promise`\<[`AndroidDevice`](AndroidDevice.md)[]\>

Finds all connected Android devices by executing `adb devices`.

#### Parameters

• **options**: [`DeviceOptions`](../interfaces/DeviceOptions.md) = `{}`

Device manager options.

#### Returns

`Promise`\<[`AndroidDevice`](AndroidDevice.md)[]\>

A list of detected iOS devices.

#### Overrides

[`Device`](Device.md).[`findDevices`](Device.md#finddevices)

#### Defined in

[src/android-device.ts:23](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/android-device.ts#L23)
