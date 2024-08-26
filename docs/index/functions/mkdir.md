[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [index](../README.md) / mkdir

# Function: mkdir()

## mkdir(path, options)

> **mkdir**(`path`, `options`): `Promise`\<`string` \| `undefined`\>

Asynchronous mkdir(2) - create a directory.

### Parameters

• **path**: `PathLike`

A path to a file. If a URL is provided, it must use the `file:` protocol.

• **options**: `MakeDirectoryOptions` & `object`

Either the file mode, or an object optionally specifying the file mode and whether parent folders
should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.

### Returns

`Promise`\<`string` \| `undefined`\>

### Defined in

[src/utils.ts:8](https://github.com/Onslip/automation/blob/2da2b00dbee8df6079d79d0e64badbbab41233bf/src/utils.ts#L8)

## mkdir(path, options)

> **mkdir**(`path`, `options`?): `Promise`\<`void`\>

Asynchronous mkdir(2) - create a directory.

### Parameters

• **path**: `PathLike`

A path to a file. If a URL is provided, it must use the `file:` protocol.

• **options?**: `null` \| `Mode` \| `MakeDirectoryOptions` & `object`

Either the file mode, or an object optionally specifying the file mode and whether parent folders
should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.

### Returns

`Promise`\<`void`\>

### Defined in

[src/utils.ts:8](https://github.com/Onslip/automation/blob/2da2b00dbee8df6079d79d0e64badbbab41233bf/src/utils.ts#L8)

## mkdir(path, options)

> **mkdir**(`path`, `options`?): `Promise`\<`string` \| `undefined`\>

Asynchronous mkdir(2) - create a directory.

### Parameters

• **path**: `PathLike`

A path to a file. If a URL is provided, it must use the `file:` protocol.

• **options?**: `null` \| `Mode` \| `MakeDirectoryOptions`

Either the file mode, or an object optionally specifying the file mode and whether parent folders
should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.

### Returns

`Promise`\<`string` \| `undefined`\>

### Defined in

[src/utils.ts:8](https://github.com/Onslip/automation/blob/2da2b00dbee8df6079d79d0e64badbbab41233bf/src/utils.ts#L8)
