/*
  useful references:

  https://github.com/erkobridee/lab-pdf-lib/blob/83ef7e53e61227cef4293a6294979b1e551a3603/src/helpers/random.js#L4

  https://gist.github.com/rubinchyk/46d9868e2eb86d744abcb83b5b6d8d29

  https://gist.github.com/erkobridee/ac14ce7f52f66a05747511adf33bc2fa

  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/

export const getRandomBoolean = () => Math.random() >= 0.5;

export const getRandomFloat = (min: number, max: number) =>
  Math.random() * (max - min + 1) + min;

export const getRandomDecimal = (min: number, max: number, fixed = 2) =>
  +getRandomFloat(min, max).toFixed(fixed);

export const getRandomInt = (min: number, max: number) =>
  Math.floor(getRandomFloat(min, max));

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
export const getRandomIntAsString = (
  min: number,
  max: number,
  strLength = String(max).length
) => String(getRandomInt(min, max)).padStart(strLength, '0');

export const getRandomValueInArray = <T>(values: T[], length: number = -1) => {
  if (length < 0) {
    length = values.length;
  }

  return values[Math.floor(Math.random() * length)];
};

// https://www.geeksforgeeks.org/how-to-get-an-object-value-by-key-in-typescript/
export const getRandomValueInObject = <
  T extends Object = Object,
  R = T[keyof T]
>(
  fromObject: T
): R => {
  type Keys = keyof typeof fromObject;

  const objectKeys = Object.keys(fromObject) as Keys[];
  const key = getRandomValueInArray(objectKeys);

  return fromObject[key] as R;
};
