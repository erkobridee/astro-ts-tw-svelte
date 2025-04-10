// https://decipher.dev/30-seconds-of-typescript/docs/debounce/

export const DEFAULT_DEBOUNCE_DELAY = 300;

export const debounce = (fn: Function, ms = DEFAULT_DEBOUNCE_DELAY) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  const cleanup = () => {
    clearTimeout(timeoutId);
  };

  const debounceFn = function (this: any, ...args: any[]) {
    cleanup();
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };

  debounceFn.cleanup = cleanup;

  return debounceFn;
};

export default debounce;
