import type { DateParamType } from '~/utils/format';

import dayjs from 'dayjs';

import { getRandomFloat, getRandomDecimal } from '~/utils/random';
import {
  DEFAULT_MAXIMUM_FRACTION_DIGITS,
  formatHourStringId
} from '~/utils/format';

//----------------------------------------------------------------------------//

export interface ReferencePower {
  /** datetime ISO string */
  startedAt?: string;
  value: number;
}

export interface TimeSerie {
  /** datetime ISO string */
  startedAt: string;
  /** datetime ISO string */
  endedAt: string;

  value: number;

  /** it could represent a repartition value or exceedance value */
  anotherValue?: number;
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

export const generateElectricityDailyUsageData = (
  amount = 7,
  decimalPrecision = DEFAULT_MAXIMUM_FRACTION_DIGITS
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

export enum EnergyType {
  GAS_CONSUMPTION = 'GAS_CONSUMPTION',
  ELECTRICITY_CONSUMPTION = 'ELECTRICITY_CONSUMPTION',
  ELECTRICITY_PRODUCTION = 'ELECTRICITY_PRODUCTION'
}

//---//

export const generateOverviewData = (
  energyType: EnergyType = EnergyType.ELECTRICITY_CONSUMPTION,
  amount = 6,
  decimalPrecision = DEFAULT_MAXIMUM_FRACTION_DIGITS
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
  decimalPrecision = DEFAULT_MAXIMUM_FRACTION_DIGITS
) => generateOverviewData(EnergyType.GAS_CONSUMPTION, amount, decimalPrecision);

export const generateElectricityConsumptionOverviewData = (
  amount = 6,
  decimalPrecision = DEFAULT_MAXIMUM_FRACTION_DIGITS
) =>
  generateOverviewData(
    EnergyType.ELECTRICITY_CONSUMPTION,
    amount,
    decimalPrecision
  );

export const generateElectricityProductionOverviewData = (
  amount = 6,
  decimalPrecision = DEFAULT_MAXIMUM_FRACTION_DIGITS
) =>
  generateOverviewData(
    EnergyType.ELECTRICITY_PRODUCTION,
    amount,
    decimalPrecision
  );

//----------------------------------------------------------------------------//

const getYesterday = () => dayjs().subtract(1, 'day').startOf('day');

const isTimeInHourRange = (time: number, min: number, max?: number) =>
  max === undefined ? time === min : time >= min && time <= max;

//---//

export const GAS_CONSUMPTION_RANGE = {
  LOWEST: {
    min: 0.1,
    max: 0.3
  },
  PICK: {
    min: 0.3,
    max: 1
  }
};

export const isPickGasConsumption = (startedAt: DateParamType) => {
  const time = Number(formatHourStringId(startedAt));

  if (
    isTimeInHourRange(time, 700, 800) ||
    isTimeInHourRange(time, 1100, 1300) ||
    isTimeInHourRange(time, 1800, 2200)
  ) {
    return true;
  }

  return false;
};

export const ELECTRICITY_CONSUMPTION_RANGE = {
  LOWEST: {
    min: 0.1,
    max: 0.3
  },
  PICK: {
    min: 0.3,
    max: 5
  }
};

export const isPickElectricitysConsumption = (startedAt: DateParamType) => {
  const time = Number(formatHourStringId(startedAt));

  if (
    isTimeInHourRange(time, 600, 815) ||
    isTimeInHourRange(time, 1130, 1345) ||
    isTimeInHourRange(time, 1645, 2230)
  ) {
    return true;
  }

  return false;
};

//----------------------------------------------------------------------------//

// TODO: refactor the code to also generate the day accumulation
export const generateGasConsumptionHoursData = (
  startedAt: DateParamType = getYesterday(),
  decimalPrecision = DEFAULT_MAXIMUM_FRACTION_DIGITS
) => {
  const timeUnit = 'hour';
  const dayHours = 24;

  const timeseries: TimeSerie[] = [];

  for (let i = 0; i < dayHours; i++) {
    const startDate = (
      i > 0 ? dayjs(startedAt).add(i, timeUnit) : dayjs(startedAt)
    ).startOf(timeUnit);

    const isPickConsumption = isPickGasConsumption(startDate);
    const { min, max } =
      GAS_CONSUMPTION_RANGE[isPickConsumption ? 'PICK' : 'LOWEST'];
    const value = getRandomDecimal(min, max, decimalPrecision);

    timeseries.push({
      startedAt: startDate.format(),
      endedAt: startDate.endOf(timeUnit).format(),
      value
    });
  }

  return timeseries;
};

//----------------------------------------------------------------------------//

export const generateElectricityConsumptionDayData = (
  startedAt: DateParamType = getYesterday(),
  generateRepartitions: boolean = false
) => {
  const timeSlot = 15;
  const dayQuartersOfHours = 96; // 24 hours * 4 ( quarter of hour = 15 mins )

  const hours: TimeSerie[] = [];
  const minutes: TimeSerie[] = [];

  let hour: TimeSerie = {
    startedAt: '',
    endedAt: '',
    value: 0
  };

  let quarterCount = 0;
  let totalQuarterValue = 0;
  let totalQuarterAnotherValue = 0;

  let totalDayValue = 0;
  let totalDayAnotherValue = 0;

  for (let i = 0; i < dayQuartersOfHours; i++) {
    const amount = i * timeSlot;

    const startDate = (
      i > 0 ? dayjs(startedAt).add(amount, 'm') : dayjs(startedAt)
    ).startOf('s');

    const isPickConsumption = isPickElectricitysConsumption(startDate);
    const { min, max } =
      ELECTRICITY_CONSUMPTION_RANGE[isPickConsumption ? 'PICK' : 'LOWEST'];

    const value = getRandomFloat(min, max);
    const anotherValue = generateRepartitions
      ? getRandomFloat(min, value * (3 / 5))
      : undefined;

    startedAt = startDate.format();
    const endedAt = startDate
      .add(timeSlot - 1, 'm')
      .endOf('s')
      .format();

    if (quarterCount === 0) {
      hour = {
        startedAt,
        endedAt: '',
        value: 0
      };
    } else if (quarterCount === 3) {
      hour.endedAt = endedAt;
      hour.value = totalQuarterValue;
      hour.anotherValue = generateRepartitions
        ? totalQuarterAnotherValue
        : undefined;

      totalQuarterValue = 0;
      totalQuarterAnotherValue = 0;

      hours.push(hour);
    }

    totalDayValue += value;
    totalDayAnotherValue += anotherValue ?? 0;

    totalQuarterValue += value;
    totalQuarterAnotherValue += anotherValue ?? 0;
    quarterCount++;

    minutes.push({
      startedAt,
      endedAt,
      value,
      anotherValue
    });
  }

  const lastHoursIndex = hours.length - 1;

  const day: TimeSerie = {
    startedAt: hours[0].startedAt,
    endedAt: hours[lastHoursIndex].endedAt,
    value: totalDayValue,
    anotherValue: generateRepartitions ? totalDayAnotherValue : undefined
  };

  return {
    day,
    hours,
    minutes
  };
};

//----------------------------------------------------------------------------//
