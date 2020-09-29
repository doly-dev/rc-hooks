interface DebounceOptions {
  leading?: boolean;
  maxWait?: number;
  trailing?: boolean;
}

type Fn = (...args: any) => any;

interface ReturnValue<T extends Fn> {
  run: T;
  cancel: () => void;
}

declare const useDebounceFn: <T extends Fn>(fn: T, wait?: number, options?: DebounceOptions) => ReturnValue<any>;

export default useDebounceFn;