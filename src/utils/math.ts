export const getPercentageValueOf = (value: number, percente: number) =>
  percente <= 0 ? 0 : value * (percente / 100);

export const addPercentageValueTo = (value: number, percente: number) =>
  percente <= 0 ? value : value + getPercentageValueOf(value, percente);
