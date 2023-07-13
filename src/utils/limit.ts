export default function limit(fn: (...args: any[]) => void, timespan: number) {
  let pending = false;
  return (...args: any[]) => {
    if (pending) return;
    pending = true;
    fn.apply(void 0, args);
    setTimeout(() => {
      pending = false;
    }, timespan);
  };
}
