[**@onslip/automation**](../README.md) • **Docs**

***

[@onslip/automation](../README.md) / findWebViewContexts

# Function: findWebViewContexts()

> **findWebViewContexts**(`options`): `Promise`\<[`AutomationContext`](../interfaces/AutomationContext.md)[]\>

Finds and returns a description of all matching web contexts.

Useful to find out what [[AutomationOptions.ctxId]] value to specify when calling [[openWebView]].

## Parameters

• **options**: [`AutomationOptions`](../interfaces/AutomationOptions.md)

Where to look for contexts.

## Returns

`Promise`\<[`AutomationContext`](../interfaces/AutomationContext.md)[]\>

A list of matching contexts.

## Defined in

[src/api.ts:36](https://github.com/Onslip/automation/blob/47b008bfb3ccb6dbb1859ced61d380ee630ff6ad/src/api.ts#L36)
