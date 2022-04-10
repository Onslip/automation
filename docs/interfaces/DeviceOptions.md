[@onslip/automation](../README.md) / DeviceOptions

# Interface: DeviceOptions

Device manager configuration.

## Table of contents

### Properties

- [adb](DeviceOptions.md#adb)
- [ideviceinstaller](DeviceOptions.md#ideviceinstaller)
- [idevicesyslog](DeviceOptions.md#idevicesyslog)
- [ios\_instruments\_client](DeviceOptions.md#ios_instruments_client)
- [iwdpPort](DeviceOptions.md#iwdpport)

## Properties

### adb

• `Optional` **adb**: ``null`` \| `string`

Where to find the `adb` command. `undefined` means Android support is optional (enabled if `adb` is in the path) and
`null` disables Android support completely.

#### Defined in

[src/device.ts:12](https://github.com/Onslip/automation/blob/b6606b0/src/device.ts#L12)

___

### ideviceinstaller

• `Optional` **ideviceinstaller**: `string`

Where to find the `ideviceinstaller` command. Used by [iOSDevice.install](../classes/iOSDevice.md#install)/[iOSDevice.uninstall](../classes/iOSDevice.md#uninstall).

#### Defined in

[src/device.ts:15](https://github.com/Onslip/automation/blob/b6606b0/src/device.ts#L15)

___

### idevicesyslog

• `Optional` **idevicesyslog**: `string`

Where to find the `idevicesyslog` command. Used by [iOSDevice.readLogs](../classes/iOSDevice.md#readlogs)/[iOSDevice.collectLogs](../classes/iOSDevice.md#collectlogs).

#### Defined in

[src/device.ts:18](https://github.com/Onslip/automation/blob/b6606b0/src/device.ts#L18)

___

### ios\_instruments\_client

• `Optional` **ios\_instruments\_client**: `string`

Where to find the `ios_instruments_client` command. Used by [iOSDevice.start](../classes/iOSDevice.md#start)/[iOSDevice.stop](../classes/iOSDevice.md#stop).

#### Defined in

[src/device.ts:21](https://github.com/Onslip/automation/blob/b6606b0/src/device.ts#L21)

___

### iwdpPort

• `Optional` **iwdpPort**: ``null`` \| `number`

What port `ios_webkit_debug_proxy` is listening on. `undefined` means iOS support is optional (enabled if
`ios_webkit_debug_proxy` is listening on port 9221) and `null` disables iOS support completely.

#### Defined in

[src/device.ts:27](https://github.com/Onslip/automation/blob/b6606b0/src/device.ts#L27)
