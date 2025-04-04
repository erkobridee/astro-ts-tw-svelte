import type { DateParamType } from '~/utils/format';

import dayjs from 'dayjs';

import { getRandomInt, getRandomFloat, getRandomDecimal } from '~/utils/random';
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

//---//

export const EMPTY_TIMESERIE: TimeSerie = {
  startedAt: '',
  endedAt: '',
  value: 0
};

//----------------------------------------------------------------------------//

const getYesterday = () => dayjs().subtract(1, 'day').startOf('day');

const isTimeInHourRange = (time: number, min: number, max?: number) =>
  max === undefined ? time === min : time >= min && time <= max;

const dateToTimeIdNumber = (startedAt: DateParamType) =>
  Number(formatHourStringId(startedAt));

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
  DAY: 'day',
  HOUR: 'hour',
  MINUTES: '15_minutes',
  UNDEFINED: ''
} as const satisfies Record<string, string>;

export type AggregationKeys = keyof typeof Aggregation;
export type Aggregations = (typeof Aggregation)[AggregationKeys];

export const EnergyType = {
  GAS_CONSUMPTION: 'GAS_CONSUMPTION',
  ELECTRICITY_CONSUMPTION: 'ELECTRICITY_CONSUMPTION',
  ELECTRICITY_PRODUCTION: 'ELECTRICITY_PRODUCTION'
} as const satisfies Record<string, string>;

export type EnergyTypeKeys = keyof typeof EnergyType;
export type EnergyTypes = (typeof EnergyType)[EnergyTypeKeys];

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
// @begin: overview data

export const generateOverviewData = (
  energyType: EnergyTypes = EnergyType.ELECTRICITY_CONSUMPTION,
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

// @end: overview data
//----------------------------------------------------------------------------//
// @begin: gas consumption

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
  const time = dateToTimeIdNumber(startedAt);

  if (
    isTimeInHourRange(time, 700, 800) ||
    isTimeInHourRange(time, 1100, 1300) ||
    isTimeInHourRange(time, 1800, 2200)
  ) {
    return true;
  }

  return false;
};

export interface GasConsumptionDayData {
  day: TimeSerie;
  hours: TimeSerie[];
}

export const generateGasConsumptionDayData = (
  startedAt: DateParamType = getYesterday()
): GasConsumptionDayData => {
  const timeUnit = 'hour';
  const dayHours = 24;

  let totalValue = 0;
  const timeseries: TimeSerie[] = [];

  for (let i = 0; i < dayHours; i++) {
    const startDate = (
      i > 0 ? dayjs(startedAt).add(i, timeUnit) : dayjs(startedAt)
    ).startOf(timeUnit);

    const isPickConsumption = isPickGasConsumption(startDate);
    const { min, max } =
      GAS_CONSUMPTION_RANGE[isPickConsumption ? 'PICK' : 'LOWEST'];
    const value = getRandomFloat(min, max);
    totalValue += value;

    timeseries.push({
      startedAt: startDate.format(),
      endedAt: startDate.endOf(timeUnit).format(),
      value
    });
  }

  const lastIndex = timeseries.length - 1;

  const day: TimeSerie = {
    startedAt: timeseries[0].startedAt,
    endedAt: timeseries[lastIndex].endedAt,
    value: totalValue
  };

  return {
    day,
    hours: timeseries
  };
};

// TODO: define month and weeks

// TODO: define months

// @end: gas consumption
//----------------------------------------------------------------------------//
// @begin: electricity consumption and production

export interface ElectricityTimeserieData<T = TimeSerie> {
  plain: T;
  repartition: T;
}

export interface ElectricityDayData {
  day: ElectricityTimeserieData;
  hours: ElectricityTimeserieData<TimeSerie[]>;
  minutes: ElectricityTimeserieData<TimeSerie[]>;
}

export const buildElectricityRepartitionTimeseries = (
  { startedAt, endedAt, value }: TimeSerie,
  anotherValue: number
): TimeSerie => ({
  startedAt,
  endedAt,
  value: anotherValue,
  anotherValue: value - anotherValue
});

//---//

export type GenerateElectricityValues = (
  startDate: DateParamType
) => [number, number];

export const generateElectricityDayData = (
  startedAt: DateParamType,
  generateValues: GenerateElectricityValues
) => {
  const timeSlot = 15;

  const consumptionDayData: ElectricityDayData = {
    day: {
      plain: EMPTY_TIMESERIE,
      repartition: EMPTY_TIMESERIE
    },
    hours: {
      plain: [],
      repartition: []
    },
    minutes: {
      plain: [],
      repartition: []
    }
  };

  let hour: TimeSerie = EMPTY_TIMESERIE;

  let quarterCount = 0;
  let totalQuarterValue = 0;
  let totalQuarterAnotherValue = 0;

  let totalDayValue = 0;
  let totalDayAnotherValue = 0;

  let startDate = dayjs(startedAt).startOf('day');
  const endDate = startDate.add(1, 'day').startOf('day');

  do {
    const [value, anotherValue] = generateValues(startDate);

    startedAt = startDate.format();
    const endedAt = startDate
      .add(timeSlot - 1, 'm')
      .endOf('s')
      .format();

    if (quarterCount === 0) {
      hour = EMPTY_TIMESERIE;
    } else if (quarterCount === 3) {
      hour.endedAt = endedAt;
      hour.value = totalQuarterValue;

      consumptionDayData.hours.plain.push(hour);
      consumptionDayData.hours.repartition.push(
        buildElectricityRepartitionTimeseries(hour, totalQuarterAnotherValue)
      );

      totalQuarterValue = 0;
      totalQuarterAnotherValue = 0;
    }

    totalDayValue += value;
    totalDayAnotherValue += anotherValue;

    totalQuarterValue += value;
    totalQuarterAnotherValue += anotherValue;
    quarterCount++;

    const minute: TimeSerie = {
      startedAt,
      endedAt,
      value
    };

    consumptionDayData.minutes.plain.push(minute);
    consumptionDayData.minutes.repartition.push(
      buildElectricityRepartitionTimeseries(minute, anotherValue)
    );

    startDate = startDate.add(timeSlot, 'minutes');
  } while (startDate.isBefore(endDate));

  const hours = consumptionDayData.hours.plain;

  if (hours.length === 0) {
    return consumptionDayData;
  }

  const lastHoursIndex = hours.length - 1;

  const day: TimeSerie = {
    startedAt: hours[0].startedAt,
    endedAt: hours[lastHoursIndex].endedAt,
    value: totalDayValue
  };

  consumptionDayData.day.plain = day;
  consumptionDayData.day.repartition = buildElectricityRepartitionTimeseries(
    day,
    totalDayAnotherValue
  );

  return consumptionDayData;
};

// @end: electricity consumption and production
//----------------------------------------------------------------------------//
// @begin: electricity consumption

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
  const time = dateToTimeIdNumber(startedAt);

  if (
    isTimeInHourRange(time, 600, 815) ||
    isTimeInHourRange(time, 1130, 1345) ||
    isTimeInHourRange(time, 1645, 2230)
  ) {
    return true;
  }

  return false;
};

export const generateElectricityConsumptionValues: GenerateElectricityValues = (
  startDate
) => {
  const isPickConsumption = isPickElectricitysConsumption(startDate);
  const { min, max } =
    ELECTRICITY_CONSUMPTION_RANGE[isPickConsumption ? 'PICK' : 'LOWEST'];

  const value = getRandomFloat(min, max);
  const anotherValue = getRandomFloat(0, value * (3 / 5));

  return [value, anotherValue];
};

export const generateElectricityConsumptionDayData = (
  startedAt: DateParamType = getYesterday()
) =>
  generateElectricityDayData(startedAt, generateElectricityConsumptionValues);

// TODO: define month and weeks

// TODO: define months

// @end: electricity consumption
//----------------------------------------------------------------------------//
// @begin: electricity production

/*
min aggregation: `15 mins`

- unit: `kW`

> generate a wave pattern starting from `06:00`, pick between `11:00` and `14:00`, and end at `18:00`

- Average peak sun hours: `4.5 hours per day`

- Amount of panels: `15`

- Average panel Wattage: `400 W`

- One Kilo Watt: `1000 W`

- min value: `0` - night time

- pick value: `( ( Amount of panels ) * ( Average panel wattage ) ) / ( One Kilo Watt )`

*/

export const isElectricityProductionTime = (startedAt: DateParamType) => {
  const time = dateToTimeIdNumber(startedAt);

  if (isTimeInHourRange(time, 600, 1800)) {
    return true;
  }

  return false;
};

export const generatePickElectricityProductionValue = () => {
  const amountOfPanels = getRandomInt(15, 30);
  const averagePanelWattage = 400;
  const oneKiloWatt = 1000;
  return (amountOfPanels * averagePanelWattage) / oneKiloWatt;
};

export const getElectricityProductionRange = (
  startDate: DateParamType,
  pickProductionValue: number
) => {
  const time = dateToTimeIdNumber(startDate);

  const midProductionValue = pickProductionValue * (2 / 4);
  const lowProductionValue = pickProductionValue * (1 / 4);

  // generate a wave pattern starting from `06:00`, pick between `10:00` and `15:00`, and end at `18:00`
  if (time < 830) {
    return [0, lowProductionValue];
  }

  if (time < 1000) {
    return [lowProductionValue, midProductionValue];
  }

  if (time < 1500) {
    return [midProductionValue, pickProductionValue];
  }

  if (time < 1645) {
    return [lowProductionValue, midProductionValue];
  }

  return [0, lowProductionValue];
};

export const generateElectricityProductionValues =
  (
    pickProductionValue = generatePickElectricityProductionValue()
  ): GenerateElectricityValues =>
  (startDate) => {
    if (!isElectricityProductionTime(startDate)) {
      return [0, 0];
    }

    const [min, max] = getElectricityProductionRange(
      startDate,
      pickProductionValue
    );

    const value = getRandomFloat(min, max);
    const anotherValue = getRandomFloat(0, value * (getRandomInt(4, 8) / 10));

    return [value, anotherValue];
  };

export const generateElectricityProductionDayData = (
  startedAt: DateParamType = getYesterday()
) =>
  generateElectricityDayData(startedAt, generateElectricityProductionValues());

// TODO: define month and weeks

// TODO: define months

// @end: electricity production
//----------------------------------------------------------------------------//
