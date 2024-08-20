[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [index](../README.md) / resolveWebViewContext

# Function: resolveWebViewContext()

> **resolveWebViewContext**(`contextPath`, `port`, `deviceOptions`?, `timeout`?): `Promise`\<[`ResolvedContextPath`](../interfaces/ResolvedContextPath.md)\>

Binds a device's web view to a local port and then locates one of its contexts, based on a context path.

The context path is a string that uniquely identifies the device, web view and context, using the following format:
`<deviceId>[/<webviewId>[/<ctxId>]]`. The device ID is is required, but the web view name and context ID are
optional. You may use `$n` to match the n:th web view or context found (starting at 1).

This is a convenience function that uses [Device.findDevice](../classes/Device.md#finddevice) and [Device.findWebViews](../classes/Device.md#findwebviews) to find a web
view, binds it to a local port with [Device.bindWebView](../classes/Device.md#bindwebview) and then finally calls [findWebViewContexts](findWebViewContexts.md) to
resolve to a web view context.

## Parameters

• **contextPath**: `string`

Specify what device, web view and context to use.

• **port**: `number`

The port to bind the web view to. See [Device.bindWebView](../classes/Device.md#bindwebview).

• **deviceOptions?**: [`DeviceOptions`](../interfaces/DeviceOptions.md)

Additional options to pass to [Device.findDevice](../classes/Device.md#finddevice).

• **timeout?**: `number`

If specified, the method will wait for the device, web view and context to appear this many
                     milliseconds (0 means forever).

## Returns

`Promise`\<[`ResolvedContextPath`](../interfaces/ResolvedContextPath.md)\>

A [ResolvedContextPath](../interfaces/ResolvedContextPath.md) object containing [AutomationOptions](../interfaces/AutomationOptions.md), ready to be passed to
                     [openWebView](openWebView.md), the web view id and the [Device](../classes/Device.md) on which the web view is running.

## Throws

TypeError    If the context path or the port is invalid.

## Throws

Error        If the device, web view or context could not be found, or if the context path is ambiguous.

## Defined in

[src/api.ts:61](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/api.ts#L61)
