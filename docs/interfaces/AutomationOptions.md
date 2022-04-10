[@onslip/automation](../README.md) / AutomationOptions

# Interface: AutomationOptions

## Hierarchy

- `BaseOptions`

  ↳ **`AutomationOptions`**

## Table of contents

### Properties

- [alterPath](AutomationOptions.md#alterpath)
- [appId](AutomationOptions.md#appid)
- [ctxId](AutomationOptions.md#ctxid)
- [host](AutomationOptions.md#host)
- [port](AutomationOptions.md#port)
- [secure](AutomationOptions.md#secure)
- [useHostName](AutomationOptions.md#usehostname)

## Properties

### alterPath

• `Optional` **alterPath**: (`path`: `string`) => `string`

#### Type declaration

▸ (`path`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

##### Returns

`string`

#### Inherited from

BaseOptions.alterPath

#### Defined in

node_modules/.pnpm/@types+chrome-remote-interface@0.31.4/node_modules/@types/chrome-remote-interface/index.d.ts:17

___

### appId

• `Optional` **appId**: `string`

Only include contexts owned by this iOS process.

#### Defined in

[src/automation.ts:70](https://github.com/Onslip/automation/blob/b6606b0/src/automation.ts#L70)

___

### ctxId

• `Optional` **ctxId**: `string`

The [AutomationContext.id](AutomationContext.md#id) to use.

#### Defined in

[src/automation.ts:73](https://github.com/Onslip/automation/blob/b6606b0/src/automation.ts#L73)

___

### host

• `Optional` **host**: `string`

#### Inherited from

BaseOptions.host

#### Defined in

node_modules/.pnpm/@types+chrome-remote-interface@0.31.4/node_modules/@types/chrome-remote-interface/index.d.ts:13

___

### port

• `Optional` **port**: `number`

#### Inherited from

BaseOptions.port

#### Defined in

node_modules/.pnpm/@types+chrome-remote-interface@0.31.4/node_modules/@types/chrome-remote-interface/index.d.ts:14

___

### secure

• `Optional` **secure**: `boolean`

#### Inherited from

BaseOptions.secure

#### Defined in

node_modules/.pnpm/@types+chrome-remote-interface@0.31.4/node_modules/@types/chrome-remote-interface/index.d.ts:15

___

### useHostName

• `Optional` **useHostName**: `boolean`

#### Inherited from

BaseOptions.useHostName

#### Defined in

node_modules/.pnpm/@types+chrome-remote-interface@0.31.4/node_modules/@types/chrome-remote-interface/index.d.ts:16
