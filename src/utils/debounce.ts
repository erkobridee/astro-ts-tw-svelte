// https://decipher.dev/30-seconds-of-typescript/docs/debounce/

export const DEFAULT_DEBOUNCE_DELAY = 300;

export const debounce = (fn: Function, ms = DEFAULT_DEBOUNCE_DELAY) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export default debounce;
