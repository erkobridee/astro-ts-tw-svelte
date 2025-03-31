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

  for (let i = 0; i < amount; i++) {
    const startDate = (i > 0 ? dayjs().subtract(i, 'month') : dayjs())
      .startOf('month')
      .startOf('day');

    timeseries.push({
      startedAt: startDate.format(),
      endedAt: startDate.endOf('month').endOf('day').format(),
      value: i === 0 ? 0 : getRandomDecimal(min, max, decimalPrecision)
    });
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
