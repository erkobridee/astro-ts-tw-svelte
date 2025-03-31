# Energy Use Cases Plan

directory name: `energy-use-case`

## Data Model

```ts
interface TimeSerie {
  /** datetime ISO string */
  startedAt: string;
  /** datetime ISO string */
  endedAt: string;
  /** decimal precision 3 */
  value: number;
}
```

## Use Cases

<!--
  timeseries.ts

  EnergyOverviewChart.svelte
 -->

### Gas

#### Gas Consumption Overview

> display the last 6 months

unit: `m3`

min random amount: `1000`

max random amount: `30000`

files:

- `GasConsumptionOverview.svelte`

- `gas-consumption-overview.astro`

#### Gas Consumption

min aggregation: `1 hour`

- time ranges: `00:00 - 06:00 | 09:00 - 10:00 | 14:00 - 17:00 | 23:00` - lowest consumptions

  - min random amount: `0.1`

  - max random amount: `0.3`

- time ranges: `07:00 - 08:00 | 11:00 - 13:00 | 18:00 - 22:00` - pick consumptions

  - min random amount: `0.3`

  - max random amount: `1`

files:

- `GasConsumption.svelte`

- `gas-consumption.astro`

### Electricity

#### Daily Electricity Usage

> displays the last 7 days and compare it with the 7 days of one week before and also display a line showing the average consumption of the current week

- unit: `kWh`

- min random amount: `2`

- max random amount: `20`

files:

- `DailyElectricityUsage.svelte`

- `daily-electricity-usage.astro`

#### Electricity Consumption Overview

> display the last 6 months

- unit: `kWh`

- min random amount: `10`

- max random amount: `40`

files:

- `ElectricityConsumptionOverview.svelte`

- `electricity-consumption-overview.astro`

#### Electricity Consumption

min aggregation: `15 mins`

- unit: `kW`

- time ranges: `00:00 - 05:45 | 08:30 - 11:15 | 14:00 - 16:30 | 22:45 - 23:45` - lowest consumptions

  - min random amount: `0.1`

  - max random amount: `0.3`

- time ranges: `06:00 - 08:15 | 11:30 - 13:45 | 16:45 - 22:30` - pick consumptions

  - min random amount: `0.3`
  - max random amount: `5`

files:

- `ElectricityConsumption.svelte`

- `electricity-consumption.astro`

#### Electricity Consumption Repartition

> generate a new dataset based on the data generated for the electricity consumption, that should display the mount of energy shared with me and the amount bought from the market

- unit: `kW`

- min random amount: `0`

- max random amount: `( time serie value ) * ( 3 / 5 )`

files:

- `ElectricityConsumptionRepartition.svelte`

- `electricity-consumption-repartition.astro`

#### Electricity Consumption Reference Power

> generate a new dataset based on the data generated for the electricity consumption,
> it should be able to have more than one reference power

- unit: `kW`

refererence power: `( max pick random amount ) * ( 3 / 5 )`

files:

- `ElectricityConsumptionReferencePower.svelte`

- `electricity-consumption-reference-power.astro`

#### Electricity Production Overview

> display the last 6 months

- unit: `kWh`

- min random amount: `1`

- max random amount: `15`

files:

- `ElectricityProductionOverview.svelte`

- `electricity-production-overview.astro`

#### Electricity Production

min aggregation: `15 mins`

- unit: `kW`

> generate a wave pattern starting from `07:00`, pick between `11:00` and `14:00`, and end at `18:00`

- Average peak sun hours: `4.5 hours per day`

- Amount of panels: `15`

- Average panel Wattage: `400 W`

- One Kilo Watt: `1000 W`

- min value: `0` - night time

- pick value: `( ( Amount of panels ) * ( Average panel wattage ) ) / ( One Kilo Watt )`

files:

- `ElectricityProduction.svelte`

- `electricity-production.astro`

#### Electricity Production Repartition

> generate a new dataset based on the data generated for the electricity production, that should display the amount shared and the amount sold to the market

- unit: `kW`

files:

- `ElectricityProductionRepartition.svelte`

- `electricity-production-repartition.astro`
