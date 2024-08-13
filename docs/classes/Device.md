[**@onslip/automation**](../README.md) • **Docs**

***

[@onslip/automation](../README.md) / Device

# Class: `abstract` Device

This class manages Android and iOS devices and applications.

## Extended by

- [`AndroidDevice`](AndroidDevice.md)
- [`iOSDevice`](iOSDevice.md)

## Properties

### id

> **id**: `string`

#### Defined in

[src/device.ts:69](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L69)

***

### type

> **type**: `"android"` \| `"ios"`

#### Defined in

[src/device.ts:69](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L69)

## Methods

### bindWebView()

> `abstract` **bindWebView**(`webview`, `port`): `Promise`\<[`AutomationOptions`](../interfaces/AutomationOptions.md)\>

Binds a web view to the specified port on `localhost`.

For additional information, see the subclass documentation of this method.

#### Parameters

• **webview**: `string`

The web view identifier to bind.

• **port**: `number`

The port to bind the web view to.

#### Returns

`Promise`\<[`AutomationOptions`](../interfaces/AutomationOptions.md)\>

Options suitable to pass to [[findWebViewContexts]] or [[openWebView]].

#### Defined in

[src/device.ts:163](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L163)

***

### collectLogs()

> `abstract` **collectLogs**(`options`?): `Promise`\<() => `Promise`\<`string`[]\>\>

Begins collecting and buffering logs from the device. When the returned function is called, all lines are
returned as an array.

By default, this method adds a LF to each collected line, making the array suitable to be dumped to disk as-is.

#### Parameters

• **options?**: [`ReaderOptions`](../interfaces/ReaderOptions.md)

Reader options. For device-specific options, see the subclass method.

#### Returns

`Promise`\<() => `Promise`\<`string`[]\>\>

A function that, when invoked, stops logging and returns all collected lines.

#### Defined in

[src/device.ts:143](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L143)

***

### deviceName()

> `abstract` **deviceName**(): `Promise`\<`string`\>

Returns the name of the device.

#### Returns

`Promise`\<`string`\>

The device name.

#### Defined in

[src/device.ts:84](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L84)

***

### findWebViews()

> `abstract` **findWebViews**(): `Promise`\<`string`[]\>

Finds all debuggable web views on the device.

For additional information, see the subclass documentation of this method.

#### Returns

`Promise`\<`string`[]\>

An array of all debuggable web view indentifiers.

#### Defined in

[src/device.ts:152](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L152)

***

### install()

> `abstract` **install**(`archive`, `options`?): `Promise`\<`void`\>

Installs an application onto the device.

#### Parameters

• **archive**: `string`

The path to the application to install (APK/IPA/directory).

• **options?**: `string`[]

Optional installation options, if the subclass supports it.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/device.ts:92](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L92)

***

### osVersion()

> `abstract` **osVersion**(): `Promise`\<`string`\>

Returns the Android/iOS version number.

#### Returns

`Promise`\<`string`\>

The version number.

#### Defined in

[src/device.ts:77](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L77)

***

### readLogs()

#### readLogs(options)

> `abstract` **readLogs**(`options`?): `AsyncGenerator`\<`string`, `any`, `unknown`\>

Reads log lines from the device.

##### Parameters

• **options?**: [`ReaderOptions`](../interfaces/ReaderOptions.md)

Reader options. For device-specific options, see the subclass method.

##### Returns

`AsyncGenerator`\<`string`, `any`, `unknown`\>

An async iterator generating one line at a time.

##### Defined in

[src/device.ts:122](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L122)

#### readLogs(options, timeout)

> `abstract` **readLogs**(`options`?, `timeout`?): `AsyncGenerator`\<`undefined` \| `string`, `any`, `unknown`\>

Reads log lines from the device, with heartbeats.

##### Parameters

• **options?**: [`ReaderOptions`](../interfaces/ReaderOptions.md)

Reader options. For device-specific options, see the subclass method.

• **timeout?**: `number`

The timeout, in milliseconds. If no lines has been produced within this time, an `undefined`
                value is generated instead of a string.

##### Returns

`AsyncGenerator`\<`undefined` \| `string`, `any`, `unknown`\>

An async iterator generating one line at a time, or `undefined` on timeouts.

##### Defined in

[src/device.ts:132](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L132)

***

### start()

> `abstract` **start**(`app`, `options`?): `Promise`\<`void`\>

Launches an application/activity on the device.

#### Parameters

• **app**: `string`

The package/activity identifier or application bundle identifier to launch.

• **options?**: [`StartOptions`](../interfaces/StartOptions.md)

Optional start options.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/device.ts:100](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L100)

***

### stop()

> `abstract` **stop**(`app`): `Promise`\<`void`\>

Kills an application on the device.

#### Parameters

• **app**: `string`

The package/activity identifier or application bundle identifier to stop.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/device.ts:107](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L107)

***

### uninstall()

> `abstract` **uninstall**(`app`): `Promise`\<`void`\>

Uninstalls an application from the device.

#### Parameters

• **app**: `string`

The package/bundle identifier to uninstall.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/device.ts:114](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L114)

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

#### Defined in

[src/device.ts:49](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L49)

***

### findDevices()

> `static` **findDevices**(`options`?): `Promise`\<[`Device`](Device.md)[]\>

Finds all connected Android and iOS devices.

#### Parameters

• **options?**: [`DeviceOptions`](../interfaces/DeviceOptions.md)

Device manager options.

#### Returns

`Promise`\<[`Device`](Device.md)[]\>

A list of detected devices.

#### Defined in

[src/device.ts:59](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/device.ts#L59)
