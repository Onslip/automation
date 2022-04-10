@onslip/automation

# @onslip/automation

## Table of contents

### Classes

- [AndroidDevice](classes/AndroidDevice.md)
- [Device](classes/Device.md)
- [Locator](classes/Locator.md)
- [Mouse](classes/Mouse.md)
- [Page](classes/Page.md)
- [Touchscreen](classes/Touchscreen.md)
- [iOSDevice](classes/iOSDevice.md)

### Interfaces

- [AndroidLogOptions](interfaces/AndroidLogOptions.md)
- [AutomationContext](interfaces/AutomationContext.md)
- [AutomationOptions](interfaces/AutomationOptions.md)
- [DeviceOptions](interfaces/DeviceOptions.md)
- [LocatorOptions](interfaces/LocatorOptions.md)
- [ReaderOptions](interfaces/ReaderOptions.md)
- [SelectorOptions](interfaces/SelectorOptions.md)
- [StartOptions](interfaces/StartOptions.md)
- [iOSLogOptions](interfaces/iOSLogOptions.md)

### Functions

- [collectLines](README.md#collectlines)
- [execFile](README.md#execfile)
- [findWebViewContexts](README.md#findwebviewcontexts)
- [mkdir](README.md#mkdir)
- [openWebView](README.md#openwebview)
- [pipeline](README.md#pipeline)
- [readCommandOutput](README.md#readcommandoutput)
- [sleep](README.md#sleep)
- [throwError](README.md#throwerror)
- [writeFile](README.md#writefile)

## Functions

### collectLines

▸ **collectLines**(`stream`): () => `Promise`<`string`[]\>

Begins collecting and buffering lines from an async iterator, like the one returned by [readCommandOutput](README.md#readcommandoutput). When
the returned function is called, all lines are returned as an array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | (`stopSignal`: `Signal`<`boolean`\>) => `AsyncIterable`<`undefined` \| `string`\> | A callback that should create the async iterator and stop generating lines when the provided signal                 becomes true. |

#### Returns

`fn`

A function that, when invoked, stops reading and returns all collected lines as an array.

▸ (): `Promise`<`string`[]\>

Begins collecting and buffering lines from an async iterator, like the one returned by [readCommandOutput](README.md#readcommandoutput). When
the returned function is called, all lines are returned as an array.

##### Returns

`Promise`<`string`[]\>

A function that, when invoked, stops reading and returns all collected lines as an array.

#### Defined in

[src/utils.ts:115](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L115)

___

### execFile

▸ **execFile**(`file`): `PromiseWithChild`<{ `stderr`: `string` ; `stdout`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `string` |

#### Returns

`PromiseWithChild`<{ `stderr`: `string` ; `stdout`: `string`  }\>

#### Defined in

[src/utils.ts:7](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L7)

▸ **execFile**(`file`, `args`): `PromiseWithChild`<{ `stderr`: `string` ; `stdout`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `string` |
| `args` | `undefined` \| ``null`` \| readonly `string`[] |

#### Returns

`PromiseWithChild`<{ `stderr`: `string` ; `stdout`: `string`  }\>

#### Defined in

[src/utils.ts:7](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L7)

▸ **execFile**(`file`, `options`): `PromiseWithChild`<{ `stderr`: `Buffer` ; `stdout`: `Buffer`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `string` |
| `options` | `ExecFileOptionsWithBufferEncoding` |

#### Returns

`PromiseWithChild`<{ `stderr`: `Buffer` ; `stdout`: `Buffer`  }\>

#### Defined in

[src/utils.ts:7](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L7)

▸ **execFile**(`file`, `args`, `options`): `PromiseWithChild`<{ `stderr`: `Buffer` ; `stdout`: `Buffer`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `string` |
| `args` | `undefined` \| ``null`` \| readonly `string`[] |
| `options` | `ExecFileOptionsWithBufferEncoding` |

#### Returns

`PromiseWithChild`<{ `stderr`: `Buffer` ; `stdout`: `Buffer`  }\>

#### Defined in

[src/utils.ts:7](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L7)

▸ **execFile**(`file`, `options`): `PromiseWithChild`<{ `stderr`: `string` ; `stdout`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `string` |
| `options` | `ExecFileOptionsWithStringEncoding` |

#### Returns

`PromiseWithChild`<{ `stderr`: `string` ; `stdout`: `string`  }\>

#### Defined in

[src/utils.ts:7](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L7)

▸ **execFile**(`file`, `args`, `options`): `PromiseWithChild`<{ `stderr`: `string` ; `stdout`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `string` |
| `args` | `undefined` \| ``null`` \| readonly `string`[] |
| `options` | `ExecFileOptionsWithStringEncoding` |

#### Returns

`PromiseWithChild`<{ `stderr`: `string` ; `stdout`: `string`  }\>

#### Defined in

[src/utils.ts:7](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L7)

▸ **execFile**(`file`, `options`): `PromiseWithChild`<{ `stderr`: `string` \| `Buffer` ; `stdout`: `string` \| `Buffer`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `string` |
| `options` | `ExecFileOptionsWithOtherEncoding` |

#### Returns

`PromiseWithChild`<{ `stderr`: `string` \| `Buffer` ; `stdout`: `string` \| `Buffer`  }\>

#### Defined in

[src/utils.ts:7](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L7)

▸ **execFile**(`file`, `args`, `options`): `PromiseWithChild`<{ `stderr`: `string` \| `Buffer` ; `stdout`: `string` \| `Buffer`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `string` |
| `args` | `undefined` \| ``null`` \| readonly `string`[] |
| `options` | `ExecFileOptionsWithOtherEncoding` |

#### Returns

`PromiseWithChild`<{ `stderr`: `string` \| `Buffer` ; `stdout`: `string` \| `Buffer`  }\>

#### Defined in

[src/utils.ts:7](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L7)

▸ **execFile**(`file`, `options`): `PromiseWithChild`<{ `stderr`: `string` ; `stdout`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `string` |
| `options` | `ExecFileOptions` |

#### Returns

`PromiseWithChild`<{ `stderr`: `string` ; `stdout`: `string`  }\>

#### Defined in

[src/utils.ts:7](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L7)

▸ **execFile**(`file`, `args`, `options`): `PromiseWithChild`<{ `stderr`: `string` ; `stdout`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `string` |
| `args` | `undefined` \| ``null`` \| readonly `string`[] |
| `options` | `ExecFileOptions` |

#### Returns

`PromiseWithChild`<{ `stderr`: `string` ; `stdout`: `string`  }\>

#### Defined in

[src/utils.ts:7](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L7)

▸ **execFile**(`file`, `options`): `PromiseWithChild`<{ `stderr`: `string` \| `Buffer` ; `stdout`: `string` \| `Buffer`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `string` |
| `options` | `undefined` \| ``null`` \| { `encoding?`: ``null`` \| `string`  } & `ExecFileOptions` |

#### Returns

`PromiseWithChild`<{ `stderr`: `string` \| `Buffer` ; `stdout`: `string` \| `Buffer`  }\>

#### Defined in

[src/utils.ts:7](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L7)

▸ **execFile**(`file`, `args`, `options`): `PromiseWithChild`<{ `stderr`: `string` \| `Buffer` ; `stdout`: `string` \| `Buffer`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `string` |
| `args` | `undefined` \| ``null`` \| readonly `string`[] |
| `options` | `undefined` \| ``null`` \| { `encoding?`: ``null`` \| `string`  } & `ExecFileOptions` |

#### Returns

`PromiseWithChild`<{ `stderr`: `string` \| `Buffer` ; `stdout`: `string` \| `Buffer`  }\>

#### Defined in

[src/utils.ts:7](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L7)

___

### findWebViewContexts

▸ **findWebViewContexts**(`options`): `Promise`<[`AutomationContext`](interfaces/AutomationContext.md)[]\>

Finds and returns a description of all matching web contexts.

Useful to find out what [AutomationOptions.ctxId](interfaces/AutomationOptions.md#ctxid) value to specify when calling [openWebView](README.md#openwebview).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`AutomationOptions`](interfaces/AutomationOptions.md) | Where to look for contexts. |

#### Returns

`Promise`<[`AutomationContext`](interfaces/AutomationContext.md)[]\>

A list of matching contexts.

#### Defined in

[src/api.ts:36](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L36)

___

### mkdir

▸ **mkdir**(`path`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathLike` |
| `options?` | ``null`` \| `string` \| `number` \| `MakeDirectoryOptions` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils.ts:8](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L8)

___

### openWebView

▸ **openWebView**(`options`): `Promise`<[`Page`](classes/Page.md)\>

Connects to a web context and return a Page.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`AutomationOptions`](interfaces/AutomationOptions.md) | Specify what context to use. |

#### Returns

`Promise`<[`Page`](classes/Page.md)\>

A new Page object which can be used to interact with the web page.

#### Defined in

[src/api.ts:46](https://github.com/Onslip/automation/blob/b6606b0/src/api.ts#L46)

___

### pipeline

▸ **pipeline**(`stream1`, `stream2`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream1` | `ReadableStream` |
| `stream2` | `WritableStream` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils.ts:9](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L9)

▸ **pipeline**(`stream1`, `stream2`, `stream3`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream1` | `ReadableStream` |
| `stream2` | `ReadWriteStream` |
| `stream3` | `WritableStream` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils.ts:9](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L9)

▸ **pipeline**(`stream1`, `stream2`, `stream3`, `stream4`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream1` | `ReadableStream` |
| `stream2` | `ReadWriteStream` |
| `stream3` | `ReadWriteStream` |
| `stream4` | `WritableStream` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils.ts:9](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L9)

▸ **pipeline**(`stream1`, `stream2`, `stream3`, `stream4`, `stream5`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream1` | `ReadableStream` |
| `stream2` | `ReadWriteStream` |
| `stream3` | `ReadWriteStream` |
| `stream4` | `ReadWriteStream` |
| `stream5` | `WritableStream` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils.ts:9](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L9)

▸ **pipeline**(`streams`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `streams` | readonly (`ReadableStream` \| `WritableStream` \| `ReadWriteStream`)[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils.ts:9](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L9)

▸ **pipeline**(`stream1`, `stream2`, ...`streams`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream1` | `ReadableStream` |
| `stream2` | `WritableStream` \| `ReadWriteStream` |
| `...streams` | (`WritableStream` \| `ReadWriteStream`)[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils.ts:9](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L9)

___

### readCommandOutput

▸ **readCommandOutput**(`command`, `args`, `options?`): `AsyncGenerator`<`string`\>

Spawns a command and reads its standard output line by line.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `command` | `string` | The command to executed. |
| `args` | `string`[] | Command arguments. |
| `options?` | [`ReaderOptions`](interfaces/ReaderOptions.md) | Reader options. |

#### Returns

`AsyncGenerator`<`string`\>

An async iterator generating one line at a time.

#### Defined in

[src/utils.ts:47](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L47)

▸ **readCommandOutput**(`command`, `args`, `options?`, `timeout?`): `AsyncGenerator`<`string` \| `undefined`\>

Spawns a command and reads its standard output line by line, with heartbeats.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `command` | `string` | The command to executed. |
| `args` | `string`[] | Command arguments. |
| `options?` | [`ReaderOptions`](interfaces/ReaderOptions.md) | Reader options. |
| `timeout?` | `number` | The timeout, in milliseconds. If no lines has been produced within this time, an `undefined` value is                 generated instead of a string. |

#### Returns

`AsyncGenerator`<`string` \| `undefined`\>

An async iterator generating one line at a time, or `undefined` on timeouts.

#### Defined in

[src/utils.ts:59](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L59)

___

### sleep

▸ **sleep**(`timeout`): `Promise`<`void`\>

Does nothing for a while.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeout` | `number` | The sleep duration in milliseconds |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils.ts:27](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L27)

___

### throwError

▸ **throwError**(`error`): `never`

Throws an error.

**`throws`** The provided error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `Error` | The error to throw. |

#### Returns

`never`

#### Defined in

[src/utils.ts:18](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L18)

___

### writeFile

▸ **writeFile**(`path`, `data`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `number` \| `PathLike` |
| `data` | `any` |
| `options?` | `WriteFileOptions` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils.ts:10](https://github.com/Onslip/automation/blob/b6606b0/src/utils.ts#L10)
