import type { DateParamType } from '~/utils/format';

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import {
  getRandomBoolean,
  getRandomInt,
  getRandomFloat,
  getRandomDecimal
} from '~/utils/random';
import {
  DEFAULT_MAXIMUM_FRACTION_DIGITS,
  formatDayStringId,
  formatHourStringId
} from '~/utils/format';
import { getPercentageValueOf } from '~/utils/math';

dayjs.extend(isSameOrBefore);

//----------------------------------------------------------------------------//

// only on the for a single metering point on plain data
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

const getLastMonth = () => dayjs().subtract(1, 'month').startOf('day');

const getLastYear = () => dayjs().subtract(1, 'year').startOf('day');

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
  GAS: 'GAS',
  ELECTRICITY: 'ELECTRICITY'
} as const satisfies Record<string, string>;

export type EnergyTypeKeys = keyof typeof EnergyType;
export type EnergyTypes = (typeof EnergyType)[EnergyTypeKeys];

export const EnergyServiceType = {
  GAS_CONSUMPTION: 'GAS_CONSUMPTION',
  ELECTRICITY_CONSUMPTION: 'ELECTRICITY_CONSUMPTION',
  ELECTRICITY_PRODUCTION: 'ELECTRICITY_PRODUCTION'
} as const satisfies Record<string, string>;

export type EnergyServiceTypeKeys = keyof typeof EnergyServiceType;
export type EnergyServiceTypes =
  (typeof EnergyServiceType)[EnergyServiceTypeKeys];

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
  energyServiceType: EnergyServiceTypes = EnergyServiceType.ELECTRICITY_CONSUMPTION,
  amount = 6,
  decimalPrecision = DEFAULT_MAXIMUM_FRACTION_DIGITS
) => {
  let min = 1;
  let max = 10;

  switch (energyServiceType) {
    case EnergyServiceType.GAS_CONSUMPTION:
      min = 1000;
      max = 30000;
      break;
    case EnergyServiceType.ELECTRICITY_PRODUCTION:
      min = 1;
      max = 15;
      break;
    case EnergyServiceType.ELECTRICITY_CONSUMPTION:
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
) =>
  generateOverviewData(
    EnergyServiceType.GAS_CONSUMPTION,
    amount,
    decimalPrecision
  );

export const generateElectricityConsumptionOverviewData = (
  amount = 6,
  decimalPrecision = DEFAULT_MAXIMUM_FRACTION_DIGITS
) =>
  generateOverviewData(
    EnergyServiceType.ELECTRICITY_CONSUMPTION,
    amount,
    decimalPrecision
  );

export const generateElectricityProductionOverviewData = (
  amount = 6,
  decimalPrecision = DEFAULT_MAXIMUM_FRACTION_DIGITS
) =>
  generateOverviewData(
    EnergyServiceType.ELECTRICITY_PRODUCTION,
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

export interface GasConsumptionMonthData {
  month: TimeSerie;
  weeks: TimeSerie[];
  days: TimeSerie[];
  hoursMap: Record<string, TimeSerie[]>;
}

export const generateGasConsumptionMonthData = (
  monthReference: DateParamType = getLastMonth()
): GasConsumptionMonthData => {
  let startDate = dayjs(monthReference).startOf('month').startOf('day');
  const endDate = startDate.endOf('month').endOf('day');

  const startedAt = startDate.format();
  const endedAt = endDate.format();

  const data: GasConsumptionMonthData = {
    month: {
      startedAt,
      endedAt,
      value: 0
    },
    weeks: [],
    days: [],
    hoursMap: {}
  };

  let week: TimeSerie = { ...EMPTY_TIMESERIE, startedAt };

  let totalWeekValue = 0;
  let totalValue = 0;

  do {
    const stringId = formatDayStringId(startDate);
    const { day, hours } = generateGasConsumptionDayData(startDate);

    const { value } = day;
    totalWeekValue += value;
    totalValue += value;

    data.days.push(day);
    data.hoursMap[stringId] = hours;

    const nextDay = startDate.add(1, 'day').startOf('day');

    if (startDate.day() === 6 || startDate.isSame(endDate, 'day')) {
      week.endedAt = startDate.endOf('day').format();
      week.value = totalWeekValue;
      data.weeks.push(week);

      totalWeekValue = 0;
      week = { ...EMPTY_TIMESERIE, startedAt: nextDay.format() };
    }

    startDate = nextDay;
  } while (startDate.isSameOrBefore(endDate));

  data.month.value = totalValue;

  return data;
};

export interface GasConsumptionData {
  months: TimeSerie[];
  weeks: TimeSerie[];
  weeksMap: Record<string, TimeSerie[]>;
  daysMap: Record<string, TimeSerie[]>;
  hoursMap: Record<string, TimeSerie[]>;
}

export const generateGasConsumptionData = (
  yearReference: DateParamType = getLastYear()
): GasConsumptionData => {
  let startDate = dayjs(yearReference).startOf('year').startOf('day');
  const endDate = startDate.endOf('year').endOf('day');

  const data: GasConsumptionData = {
    months: [],
    weeks: [],
    weeksMap: {},
    daysMap: {},
    hoursMap: {}
  };

  do {
    let stringId = formatDayStringId(startDate);

    const { month, weeks, days, hoursMap } =
      generateGasConsumptionMonthData(startDate);

    data.months.push(month);

    data.weeks = [...data.weeks, ...weeks];

    data.weeksMap[stringId] = weeks;
    data.daysMap[stringId] = days;

    data.hoursMap = { ...data.hoursMap, ...hoursMap };

    startDate = startDate.add(1, 'month');
  } while (startDate.isSameOrBefore(endDate));

  return data;
};

// @end: gas consumption
//----------------------------------------------------------------------------//
// @begin: electricity consumption and production

export interface ElectricityTimeserieData<T = TimeSerie> {
  plain: T;
  repartition: T;
}

export interface ElectricityTimeserieDataMapEntry<T = TimeSerie[]>
  extends ElectricityTimeserieData<T> {
  referencePowers: ReferencePower[];
}

export type ElectricityTimeserieDataMap<T = TimeSerie[]> = Record<
  string,
  ElectricityTimeserieDataMapEntry<T>
>;

export interface ElectricityDayData {
  day: ElectricityTimeserieData;

  referencePower?: ReferencePower;
  hours: ElectricityTimeserieData<TimeSerie[]>;
  minutes: ElectricityTimeserieData<TimeSerie[]>;
}

export interface ElectricityMonthData {
  month: ElectricityTimeserieData;

  referencePowers: ReferencePower[];
  weeks: ElectricityTimeserieData<TimeSerie[]>;
  days: ElectricityTimeserieData<TimeSerie[]>;

  hoursMap: ElectricityTimeserieDataMap;
  minutesMap: ElectricityTimeserieDataMap;
}

export interface ElectricityData {
  referencePowers: ReferencePower[];
  months: ElectricityTimeserieData<TimeSerie[]>;
  weeks: ElectricityTimeserieData<TimeSerie[]>;

  weeksMap: ElectricityTimeserieDataMap;
  daysMap: ElectricityTimeserieDataMap;
  hoursMap: ElectricityTimeserieDataMap;
  minutesMap: ElectricityTimeserieDataMap;
}

//---//

export const buildElectricityRepartitionTimeseries = (
  { startedAt, endedAt, value }: TimeSerie,
  anotherValue: number
): TimeSerie => {
  const newAnotherValue = value - anotherValue;

  if (newAnotherValue < 0) {
    return {
      startedAt,
      endedAt,
      value: 0,
      anotherValue: Math.abs(newAnotherValue)
    };
  }

  return {
    startedAt,
    endedAt,
    value: anotherValue,
    anotherValue: newAnotherValue
  };
};

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

    // TODO: review
    referencePower: undefined,
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

    totalDayValue += value;
    totalDayAnotherValue += anotherValue;

    totalQuarterValue += value;
    totalQuarterAnotherValue += anotherValue;

    switch (startDate.format('mm')) {
      case '00':
        hour = { ...EMPTY_TIMESERIE, startedAt };
        break;
      case '45':
        hour.endedAt = endedAt;
        hour.value = totalQuarterValue;

        consumptionDayData.hours.plain.push(hour);
        consumptionDayData.hours.repartition.push(
          buildElectricityRepartitionTimeseries(hour, totalQuarterAnotherValue)
        );

        totalQuarterValue = 0;
        totalQuarterAnotherValue = 0;
        break;
    }

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

export const generateElectricityMonthData = (
  monthReference: DateParamType = getLastMonth(),
  generateValues: GenerateElectricityValues
) => {
  let startDate = dayjs(monthReference).startOf('month').startOf('day');
  const endDate = startDate.endOf('month').endOf('day');

  const startedAt = startDate.format();
  const endedAt = endDate.format();

  const data: ElectricityMonthData = {
    month: {
      plain: {
        startedAt,
        endedAt,
        value: 0
      },
      repartition: {
        startedAt,
        endedAt,
        value: 0
      }
    },

    // TODO: review
    referencePowers: [],
    weeks: {
      plain: [],
      repartition: []
    },
    days: {
      plain: [],
      repartition: []
    },

    hoursMap: {},
    minutesMap: {}
  };

  let week: ElectricityTimeserieData = {
    plain: { ...EMPTY_TIMESERIE, startedAt },
    repartition: { ...EMPTY_TIMESERIE, startedAt }
  };

  let totalWeekPlainValue = 0;
  let totalWeekPlainAnotherValue = 0;
  let totalWeekRepartitionValue = 0;
  let totalWeekRepartitionAnotherValue = 0;

  let totalPlainValue = 0;
  let totalPlainAnotherValue = 0;
  let totalRepartitionValue = 0;
  let totalRepartitionAnotherValue = 0;

  do {
    const stringId = formatDayStringId(startDate);
    const { day, referencePower, hours, minutes } = generateElectricityDayData(
      startDate,
      generateValues
    );

    const { plain: plainDay, repartition: repartitionDay } = day;
    const { value: plainDayValue, anotherValue: plainDayAnotherValue = 0 } =
      plainDay;
    const {
      value: repartitionDayValue,
      anotherValue: repartitionDayAnotherValue = 0
    } = repartitionDay;

    totalWeekPlainValue += plainDayValue;
    totalWeekPlainAnotherValue += plainDayAnotherValue;
    totalWeekRepartitionValue += repartitionDayValue;
    totalWeekRepartitionAnotherValue += repartitionDayAnotherValue;

    totalPlainValue += plainDayValue;
    totalPlainAnotherValue += plainDayAnotherValue;
    totalRepartitionValue += repartitionDayValue;
    totalRepartitionAnotherValue += repartitionDayAnotherValue;

    data.days.plain.push(plainDay);
    data.days.repartition.push(repartitionDay);

    const referencePowers = referencePower ? [referencePower] : [];
    data.hoursMap[stringId] = { referencePowers, ...hours };
    data.minutesMap[stringId] = { referencePowers, ...minutes };

    const nextDay = startDate.add(1, 'day').startOf('day');

    if (startDate.day() === 6 || startDate.isSame(endDate, 'day')) {
      const weekStartedAt = nextDay.format();
      const weekEndedAt = startDate.endOf('day').format();

      week.plain.endedAt = weekEndedAt;
      week.plain.value = totalWeekPlainValue;
      week.plain.anotherValue = totalWeekPlainAnotherValue;
      data.weeks.plain.push(week.plain);

      week.repartition.endedAt = weekEndedAt;
      week.repartition.value = totalWeekRepartitionValue;
      week.repartition.anotherValue = totalWeekRepartitionAnotherValue;
      data.weeks.repartition.push(week.repartition);

      totalWeekPlainValue = 0;
      totalWeekPlainAnotherValue = 0;
      totalWeekRepartitionValue = 0;
      totalWeekRepartitionAnotherValue = 0;

      week = {
        plain: { ...EMPTY_TIMESERIE, startedAt: weekStartedAt },
        repartition: { ...EMPTY_TIMESERIE, startedAt: weekStartedAt }
      };
    }

    startDate = nextDay;
  } while (startDate.isSameOrBefore(endDate));

  data.month.plain.value = totalPlainValue;
  data.month.plain.anotherValue = totalPlainAnotherValue;

  data.month.repartition.value = totalRepartitionValue;
  data.month.repartition.anotherValue = totalRepartitionAnotherValue;

  return data;
};

export const generateElectricityData = (
  yearReference: DateParamType = getLastYear(),
  generateValues: GenerateElectricityValues
) => {
  let startDate = dayjs(yearReference).startOf('year').startOf('day');
  const endDate = startDate.endOf('year').endOf('day');

  const data: ElectricityData = {
    referencePowers: [],
    months: { plain: [], repartition: [] },
    weeks: { plain: [], repartition: [] },

    weeksMap: {},
    daysMap: {},
    hoursMap: {},
    minutesMap: {}
  };

  do {
    let stringId = formatDayStringId(startDate);

    const { month, referencePowers, weeks, days, hoursMap, minutesMap } =
      generateElectricityMonthData(startDate, generateValues);

    data.months.plain.push(month.plain);
    data.months.repartition.push(month.repartition);

    data.weeks.plain = [...data.weeks.plain, ...weeks.plain];
    data.weeks.repartition = [...data.weeks.repartition, ...weeks.repartition];

    data.weeksMap[stringId] = { referencePowers, ...weeks };
    data.daysMap[stringId] = { referencePowers, ...days };

    data.hoursMap = { ...data.hoursMap, ...hoursMap };
    data.minutesMap = { ...data.minutesMap, ...minutesMap };

    startDate = startDate.add(1, 'month');
  } while (startDate.isSameOrBefore(endDate));

  return data;
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

  const anotherValue = getRandomBoolean()
    ? getPercentageValueOf(value, getRandomInt(10, 30))
    : 0;

  return [value, anotherValue];
};

export const generateElectricityConsumptionDayData = (
  startedAt: DateParamType = getYesterday()
) =>
  generateElectricityDayData(startedAt, generateElectricityConsumptionValues);

export const generateElectricityConsumptionMonthData = (
  monthReference: DateParamType = getLastMonth()
) =>
  generateElectricityMonthData(
    monthReference,
    generateElectricityConsumptionValues
  );

export const generateElectricityConsumptionData = (
  yearReference: DateParamType = getLastYear()
) =>
  generateElectricityData(yearReference, generateElectricityConsumptionValues);

// @end: electricity consumption
//----------------------------------------------------------------------------//
// @begin: electricity production

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
    const anotherValue = getRandomBoolean()
      ? getPercentageValueOf(value, getRandomInt(10, 60))
      : 0;

    return [value, anotherValue];
  };

export const generateElectricityProductionDayData = (
  startedAt: DateParamType = getYesterday()
) =>
  generateElectricityDayData(startedAt, generateElectricityProductionValues());

export const generateElectricityProductionMonthData = (
  monthReference: DateParamType = getLastMonth()
) =>
  generateElectricityMonthData(
    monthReference,
    generateElectricityProductionValues()
  );

export const generateElectricityProductionData = (
  yearReference: DateParamType = getLastYear()
) =>
  generateElectricityData(yearReference, generateElectricityProductionValues());

// @end: electricity production
//----------------------------------------------------------------------------//
