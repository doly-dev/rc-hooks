interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

declare const useThrottle: <T=any>(value: T, wait?: number, options?: ThrottleOptions) => T;

export default useThrottle;