[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [index](../README.md) / collectLines

# Function: collectLines()

> **collectLines**(`stream`): () => `Promise`\<`string`[]\>

Begins collecting and buffering lines from an async iterator, like the one returned by [readCommandOutput](readCommandOutput.md).
When the returned function is called, all lines are returned as an array.

## Parameters

• **stream**

A callback that should create the async iterator and stop generating lines when the provided signal
                becomes true.

## Returns

`Function`

A function that, when invoked, stops reading and returns all collected lines as an array.

### Returns

`Promise`\<`string`[]\>

## Defined in

[src/utils.ts:119](https://github.com/Onslip/automation/blob/55b36c4eed89afe82661a6ac79a41de9a854a3d0/src/utils.ts#L119)
