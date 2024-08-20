[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [index](../README.md) / readCommandOutput

# Function: readCommandOutput()

## readCommandOutput(command, args, options)

> **readCommandOutput**(`command`, `args`, `options`?): `AsyncGenerator`\<`string`\>

Spawns a command and reads its standard output line by line.

### Parameters

• **command**: `string`

The command to executed.

• **args**: `string`[]

Command arguments.

• **options?**: [`ReaderOptions`](../interfaces/ReaderOptions.md)

Reader options.

### Returns

`AsyncGenerator`\<`string`\>

An async iterator generating one line at a time.

### Defined in

[src/utils.ts:47](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/utils.ts#L47)

## readCommandOutput(command, args, options, timeout)

> **readCommandOutput**(`command`, `args`, `options`?, `timeout`?): `AsyncGenerator`\<`string` \| `undefined`\>

Spawns a command and reads its standard output line by line, with heartbeats.

### Parameters

• **command**: `string`

The command to executed.

• **args**: `string`[]

Command arguments.

• **options?**: [`ReaderOptions`](../interfaces/ReaderOptions.md)

Reader options.

• **timeout?**: `number`

The timeout, in milliseconds. If no lines has been produced within this time, an `undefined` value is
                generated instead of a string.

### Returns

`AsyncGenerator`\<`string` \| `undefined`\>

An async iterator generating one line at a time, or `undefined` on timeouts.

### Defined in

[src/utils.ts:59](https://github.com/Onslip/automation/blob/aed87d3401609cf5df05adc6d1563b1b99f345fe/src/utils.ts#L59)
