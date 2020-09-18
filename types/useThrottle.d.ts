interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

declare const useThrottle: <T>(value: T, wait?: number, options?: ThrottleOptions) => T;

export default useThrottle;