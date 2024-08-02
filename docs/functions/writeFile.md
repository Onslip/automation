[**@onslip/automation**](../README.md) • **Docs**

***

[@onslip/automation](../README.md) / writeFile

# Function: writeFile()

> **writeFile**(`path`, `data`, `options`?): `Promise`\<`void`\>

Asynchronously writes data to a file, replacing the file if it already exists.

## Parameters

• **path**: `PathOrFileDescriptor`

A path to a file. If a URL is provided, it must use the `file:` protocol.
URL support is _experimental_.
If a file descriptor is provided, the underlying file will _not_ be closed automatically.

• **data**: `string` \| `ArrayBufferView`

The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.

• **options?**: `WriteFileOptions`

Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
If `encoding` is not supplied, the default of `'utf8'` is used.
If `mode` is not supplied, the default of `0o666` is used.
If `mode` is a string, it is parsed as an octal integer.
If `flag` is not supplied, the default of `'w'` is used.

## Returns

`Promise`\<`void`\>

## Defined in

[src/utils.ts:10](https://github.com/Onslip/automation/blob/46ae3f7777169fc144f11183d062aad108b665a5/src/utils.ts#L10)
