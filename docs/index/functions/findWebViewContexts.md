[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [index](../README.md) / findWebViewContexts

# Function: findWebViewContexts()

> **findWebViewContexts**(`options`): `Promise`\<[`AutomationContext`](../interfaces/AutomationContext.md)[]\>

Finds and returns a description of all matching web contexts.

Useful to find out what [AutomationOptions.ctxId](../interfaces/AutomationOptions.md#ctxid) value to specify when calling [openWebView](openWebView.md).

## Parameters

• **options**: [`AutomationOptions`](../interfaces/AutomationOptions.md)

Where to look for contexts.

## Returns

`Promise`\<[`AutomationContext`](../interfaces/AutomationContext.md)[]\>

A list of matching contexts.

## Defined in

[src/api.ts:124](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/api.ts#L124)
