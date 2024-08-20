[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [index](../README.md) / DeviceOptions

# Interface: DeviceOptions

Device manager configuration.

## Properties

### adb?

> `optional` **adb**: `null` \| `string`

Where to find the `adb` command. `undefined` means Android support is optional (enabled if `adb` is in the path) and
`null` disables Android support completely.

#### Defined in

[src/device.ts:14](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/device.ts#L14)

***

### ideviceinstaller?

> `optional` **ideviceinstaller**: `string`

Where to find the `ideviceinstaller` command. Used by [iOSDevice.install](../classes/iOSDevice.md#install)/[iOSDevice.uninstall](../classes/iOSDevice.md#uninstall).

#### Defined in

[src/device.ts:17](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/device.ts#L17)

***

### idevicesyslog?

> `optional` **idevicesyslog**: `string`

Where to find the `idevicesyslog` command. Used by [iOSDevice.readLogs](../classes/iOSDevice.md#readlogs)/[iOSDevice.collectLogs](../classes/iOSDevice.md#collectlogs).

#### Defined in

[src/device.ts:20](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/device.ts#L20)

***

### ios\_instruments\_client?

> `optional` **ios\_instruments\_client**: `string`

Where to find the `ios_instruments_client` command. Used by [iOSDevice.start](../classes/iOSDevice.md#start)/[iOSDevice.stop](../classes/iOSDevice.md#stop).

#### Defined in

[src/device.ts:23](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/device.ts#L23)

***

### iwdpPort?

> `optional` **iwdpPort**: `null` \| `number`

What port `ios_webkit_debug_proxy` is listening on. `undefined` means iOS support is optional (enabled if
`ios_webkit_debug_proxy` is listening on port 9221) and `null` disables iOS support completely.

#### Defined in

[src/device.ts:29](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/device.ts#L29)
