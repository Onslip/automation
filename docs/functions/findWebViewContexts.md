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

[src/api.ts:36](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/api.ts#L36)
