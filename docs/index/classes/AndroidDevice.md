[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [index](../README.md) / AndroidDevice

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

[src/device.ts:86](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/device.ts#L86)

***

### type

> **type**: `"android"` \| `"ios"`

#### Inherited from

[`Device`](Device.md).[`type`](Device.md#type)

#### Defined in

[src/device.ts:86](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/device.ts#L86)

## Methods

### bindWebView()

> **bindWebView**(`webviewId`, `port`): `Promise`\<[`AutomationOptions`](../interfaces/AutomationOptions.md)\>

Binds a web view to the specified port on `localhost`.

For additional information, see the subclass documentation of this method.

#### Parameters

• **webviewId**: `string`

The web view identifier to bind.

• **port**: `number`

The port to bind the web view to.

#### Returns

`Promise`\<[`AutomationOptions`](../interfaces/AutomationOptions.md)\>

Options suitable to pass to [findWebViewContexts](../functions/findWebViewContexts.md) or [openWebView](../functions/openWebView.md).

#### Overrides

[`Device`](Device.md).[`bindWebView`](Device.md#bindwebview)

#### Defined in

[src/android-device.ts:103](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/android-device.ts#L103)

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

[src/android-device.ts:94](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/android-device.ts#L94)

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

[src/android-device.ts:53](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/android-device.ts#L53)

***

### findWebViews()

> **findWebViews**(): `Promise`\<`string`[]\>

Finds all debuggable web views on the device.

For additional information, see the subclass documentation of this method.

#### Returns

`Promise`\<`string`[]\>

An array of all debuggable web view identifiers.

#### Overrides

[`Device`](Device.md).[`findWebViews`](Device.md#findwebviews)

#### Defined in

[src/android-device.ts:98](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/android-device.ts#L98)

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

[src/android-device.ts:57](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/android-device.ts#L57)

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

[src/android-device.ts:49](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/android-device.ts#L49)

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

[src/android-device.ts:77](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/android-device.ts#L77)

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

[src/android-device.ts:78](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/android-device.ts#L78)

***

### shell()

> **shell**(`command`): `Promise`\<`string`\>

#### Parameters

• **command**: `string`

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/android-device.ts:111](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/android-device.ts#L111)

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

[src/android-device.ts:62](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/android-device.ts#L62)

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

[src/android-device.ts:67](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/android-device.ts#L67)

***

### toString()

> **toString**(): `string`

Returns a string representation of an object.

#### Returns

`string`

#### Defined in

[src/android-device.ts:45](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/android-device.ts#L45)

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

[src/android-device.ts:72](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/android-device.ts#L72)

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

[src/device.ts:56](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/device.ts#L56)

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

[src/android-device.ts:24](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/android-device.ts#L24)
