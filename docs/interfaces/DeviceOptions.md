[**@onslip/automation**](../README.md) • **Docs**

***

[@onslip/automation](../README.md) / DeviceOptions

# Interface: DeviceOptions

Device manager configuration.

## Properties

### adb?

> `optional` **adb**: `null` \| `string`

Where to find the `adb` command. `undefined` means Android support is optional (enabled if `adb` is in the path) and
`null` disables Android support completely.

#### Defined in

[src/device.ts:12](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/device.ts#L12)

***

### ideviceinstaller?

> `optional` **ideviceinstaller**: `string`

Where to find the `ideviceinstaller` command. Used by [[iOSDevice.install]]/[[iOSDevice.uninstall]].

#### Defined in

[src/device.ts:15](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/device.ts#L15)

***

### idevicesyslog?

> `optional` **idevicesyslog**: `string`

Where to find the `idevicesyslog` command. Used by [[iOSDevice.readLogs]]/[[iOSDevice.collectLogs]].

#### Defined in

[src/device.ts:18](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/device.ts#L18)

***

### ios\_instruments\_client?

> `optional` **ios\_instruments\_client**: `string`

Where to find the `ios_instruments_client` command. Used by [[iOSDevice.start]]/[[iOSDevice.stop]].

#### Defined in

[src/device.ts:21](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/device.ts#L21)

***

### iwdpPort?

> `optional` **iwdpPort**: `null` \| `number`

What port `ios_webkit_debug_proxy` is listening on. `undefined` means iOS support is optional (enabled if
`ios_webkit_debug_proxy` is listening on port 9221) and `null` disables iOS support completely.

#### Defined in

[src/device.ts:27](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/device.ts#L27)
