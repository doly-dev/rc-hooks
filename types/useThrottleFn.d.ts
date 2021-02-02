interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

type Fn = (...args: any[]) => any;

interface ReturnValue<T extends Fn> {
  run: T;
  cancel: () => void;
}

declare const useThrottleFn: <T extends Fn>(func: T, wait?: number, options?: ThrottleOptions) => ReturnValue<typeof func>;

export default useThrottleFn;