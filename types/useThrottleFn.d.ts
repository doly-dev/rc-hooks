interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

type Fn = (...args: any) => any;

interface ReturnValue<T extends Fn> {
  run: T;
  cancel: () => void;
}

declare const useThrottleFn: (value: any, wait?: number, options?: ThrottleOptions) => ReturnValue<any>;

export default useThrottleFn;