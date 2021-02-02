interface DebounceOptions {
  leading?: boolean;
  maxWait?: number;
  trailing?: boolean;
}

declare const useDebounce: <T=any>(value: T, wait?: number, options?: DebounceOptions) => T;

export default useDebounce;