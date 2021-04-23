export type AsyncFn<D = any> = (...args: any[]) => Promise<D>;
export interface AsyncParams<D = any, P = any> {
  autoRun?: boolean;
  refreshDeps?: any[];
  initialData?: any;
  defaultParams?: any;
  formatResult?: (data: any) => D;
  onSuccess?: (data: D, params: P) => void;
  onError?: (error: any, params: P) => void;
  cacheKey?: string;
  cacheTime?: number;
  persisted?: boolean;
  loadingDelay?: number;
  pollingInterval?: number;
  pollingWhenHidden?: boolean;
  refreshOnWindowFocus?: boolean;
  focusTimespan?: number;
  debounceInterval?: number;
  throttleInterval?: number;
}

export interface AsyncResult<D = any, P = any> {
  data: D;
  error: any;
  loading: boolean;
  params: P;
  run: AsyncFn<D>;
  cancel: () => void;
  refresh: () => Promise<D>;
  mutate: (newData: any | ((oldData: any) => any)) => void;
}

declare const useAsync: <D = any, P = any>(asyncFn: AsyncFn<D>, options?: AsyncParams<D, P>) => AsyncResult<D, P>;

export default useAsync;
