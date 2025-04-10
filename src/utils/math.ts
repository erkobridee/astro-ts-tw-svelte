/** `total = ( amount * 100 ) / percentage` */
export const getValueFromPercentage = (amount: number, percentage: number) =>
  percentage === 0 ? 0 : (amount * 100) / percentage;

/** `percentage = ( amount * 100 ) / total` */
export const getPercentageOf = (total: number, amount: number) =>
  amount === 0 ? 0 : (amount * 100) / total;

/** `value = ( total * percentage ) / 100` */
export const getPercentageValueOf = (total: number, percentage: number) =>
  percentage === 0 ? 0 : (total * percentage) / 100;

/** `value = value + valuePercentage` */
export const addPercentageValueTo = (value: number, percentage: number) =>
  percentage === 0 ? value : value + getPercentageValueOf(value, percentage);

/** `value = value - valuePercentage` */
export const subtractPercentageValueTo = (value: number, percentage: number) =>
  percentage === 0 ? value : value - getPercentageValueOf(value, percentage);

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
