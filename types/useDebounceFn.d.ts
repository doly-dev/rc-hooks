interface DebounceOptions {
  leading?: boolean;
  maxWait?: number;
  trailing?: boolean;
}

type Fn = (...args: any[]) => any;

interface ReturnValue<T extends Fn> {
  run: T;
  cancel: () => void;
}

declare const useDebounceFn: <T extends Fn>(func: T, wait?: number, options?: DebounceOptions) => ReturnValue<typeof func>;

export default useDebounceFn;