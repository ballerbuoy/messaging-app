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

function formatTime(arg: number): string {
  return arg < 10 ? `0${arg}` : `${arg}`;
}

export function getTime(timestamp: string): string {
  const date = new Date(Number(timestamp));
  const hours = date.getHours();
  const mins = date.getMinutes();
  return `${formatTime(hours)}:${formatTime(mins)}`;
}
