export function debounce(func: CallableFunction, wait = 0) {
  let timeout: NodeJS.Timeout | null;

  return (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(
      (...args) => {
        func(...args);
        timeout = null;
      },
      wait,
      ...args
    );
  };
}
