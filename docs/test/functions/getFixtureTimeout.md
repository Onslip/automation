[**@onslip/automation**](../../README.md) • **Docs**

***

[@onslip/automation](../../README.md) / [test](../README.md) / getFixtureTimeout

# Function: getFixtureTimeout()

> **getFixtureTimeout**(`fixture`): `number` \| `undefined`

Returns the timeout for a device worker fixture.

## Parameters

• **fixture**: keyof [`DeviceWorkerFixtures`](../interfaces/DeviceWorkerFixtures.md)

The fixture to get the timeout for.

## Returns

`number` \| `undefined`

The timeout in milliseconds, or `undefined` if no specific fixture timeout has been set.

## Defined in

[src/test.ts:171](https://github.com/Onslip/automation/blob/13befc40996d96bb2935315b372b921212adc8b4/src/test.ts#L171)
