import dayjs from 'dayjs';

import { getRandomDecimal } from '~/utils/random';

//----------------------------------------------------------------------------//

export interface TimeSerie {
  /** datetime ISO string */
  startedAt: string;
  /** datetime ISO string */
  endedAt: string;
  /** decimal precision 3 */
  value: number;
}

export interface DailyUsage {
  /** related to one week before */
  previous: TimeSerie[];
  /** related to the current week */
  current: TimeSerie[];
}

export interface DayUsage {
  /** related to one week before */
  previous: TimeSerie;
  /** related to the current week */
  current: TimeSerie;
}

//----------------------------------------------------------------------------//
// using const instead of enums
// https://gist.github.com/erkobridee/576bcba33ed5fcf26c68fb0f32efdef3

export const Unit = {
  KW: 'kW',
  KWH: 'kWh',
  M3: 'm³',
  UNDEFINED: ''
} as const satisfies Record<string, string>;

export type UnitKeys = keyof typeof Unit;
export type Units = (typeof Unit)[UnitKeys];

export const Aggregation = {
  MONTH: 'month',
  WEEK: 'week',
  HOUR: 'hour',
  MINUTES: '15_minutes',
  UNDEFINED: ''
} as const satisfies Record<string, string>;

export type AggregationKeys = keyof typeof Aggregation;
export type Aggregations = (typeof Aggregation)[AggregationKeys];

//----------------------------------------------------------------------------//

export enum EnergyType {
  GAS_CONSUMPTION = 'GAS_CONSUMPTION',
  ELECTRICITY_CONSUMPTION = 'ELECTRICITY_CONSUMPTION',
  ELECTRICITY_PRODUCTION = 'ELECTRICITY_PRODUCTION'
}

export const generateOverviewData = (
  energyType: EnergyType = EnergyType.ELECTRICITY_CONSUMPTION,
  amount = 6,
  decimalPrecision = 3
) => {
  let min = 1;
  let max = 10;

  switch (energyType) {
    case EnergyType.GAS_CONSUMPTION:
      min = 1000;
      max = 30000;
      break;
    case EnergyType.ELECTRICITY_PRODUCTION:
      min = 1;
      max = 15;
      break;
    case EnergyType.ELECTRICITY_CONSUMPTION:
    default:
      min = 10;
      max = 40;
      break;
  }

  let timeseries: TimeSerie[] = [];
  let isFistItem = true;

  for (let i = amount - 1; i >= 0; i--) {
    const startDate = (i > 0 ? dayjs().subtract(i, 'month') : dayjs())
      .startOf('month')
      .startOf('day');

    timeseries.push({
      startedAt: startDate.format(),
      endedAt: startDate.endOf('month').endOf('day').format(),
      value: isFistItem ? 0 : getRandomDecimal(min, max, decimalPrecision)
    });

    isFistItem = false;
  }

  return timeseries;
};

export const generateGasConsumptionOverviewData = (
  amount = 6,
  decimalPrecision = 3
) => generateOverviewData(EnergyType.GAS_CONSUMPTION, amount, decimalPrecision);

export const generateElectricityConsumptionOverviewData = (
  amount = 6,
  decimalPrecision = 3
) =>
  generateOverviewData(
    EnergyType.ELECTRICITY_CONSUMPTION,
    amount,
    decimalPrecision
  );

export const generateElectricityProductionOverviewData = (
  amount = 6,
  decimalPrecision = 3
) =>
  generateOverviewData(
    EnergyType.ELECTRICITY_PRODUCTION,
    amount,
    decimalPrecision
  );

//----------------------------------------------------------------------------//

export const generateElectricityDailyUsageData = (
  amount = 7,
  decimalPrecision = 3
) => {
  const min = 2;
  const max = 20;

  const data: DailyUsage = {
    previous: [],
    current: []
  };

  for (let i = amount - 1; i >= 0; i--) {
    let date = (i > 0 ? dayjs().subtract(i, 'day') : dayjs()).startOf('day');

    const current: TimeSerie = {
      startedAt: date.format(),
      endedAt: date.endOf('day').format(),
      value: getRandomDecimal(min, max, decimalPrecision)
    };

    date = date.subtract(1, 'week').startOf('day');

    const previous: TimeSerie = {
      startedAt: date.format(),
      endedAt: date.endOf('day').format(),
      value: getRandomDecimal(min, max, decimalPrecision)
    };

    data.current.push(current);
    data.previous.push(previous);
  }

  return data;
};

//----------------------------------------------------------------------------//
