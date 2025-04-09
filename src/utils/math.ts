export const getPercentageValueOf = (value: number, percent: number) =>
  percent === 0 ? 0 : (value * percent) / 100;

export const addPercentageValueTo = (value: number, percent: number) =>
  percent === 0 ? value : value + getPercentageValueOf(value, percent);

export const getPercentageOf = (value: number, amount: number) =>
  amount === 0 ? 0 : (amount * 100) / value;

export const getValueFromPercentage = (amount: number, percent: number) =>
  percent === 0 ? 0 : (amount * 100) / percent;

//----------------------------------------------------------------------------//

export const getMinAvgMaxValuesOf = <T>(values: T[], property?: string) => {
  let min = Infinity;
  let max = -Infinity;
  let avg = 0;
  const length = values.length;

  let len = length;
  let value = 0;

  while (len--) {
    value = Number(property ? (values[len] as any)[property] : values[len]);
    avg += value;

    if (value < min) {
      min = value;
    }

    if (value > max) {
      max = value;
    }
  }

  if (length > 0 && avg !== 0) {
    avg = avg / length;
  }

  return {
    min,
    avg,
    max
  };
};

export const getMinValueOf = <T>(values: T[], property?: string) => {
  let min = Infinity;
  const length = values.length;

  let len = length;
  let value = 0;

  while (len--) {
    value = Number(property ? (values[len] as any)[property] : values[len]);

    if (value < min) {
      min = value;
    }
  }

  return min;
};

export const getAvgValueOf = <T>(values: T[], property?: string) => {
  let avg = 0;
  const length = values.length;

  let len = length;
  let value = 0;

  while (len--) {
    value = Number(property ? (values[len] as any)[property] : values[len]);
    avg += value;
  }

  if (length > 0 && avg !== 0) {
    avg = avg / length;
  }

  return avg;
};

export const getMaxValueOf = <T>(values: T[], property?: string) => {
  let max = -Infinity;
  const length = values.length;

  let len = length;
  let value = 0;

  while (len--) {
    value = Number(property ? (values[len] as any)[property] : values[len]);

    if (value > max) {
      max = value;
    }
  }

  return max;
};

//----------------------------------------------------------------------------//
