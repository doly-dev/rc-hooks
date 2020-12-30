export interface AsyncParams<D = any, P = any[] | undefined> {
  autoRun?: boolean;
  refreshDeps?: any[];
  initialData?: any;
  defaultParams?: any;
  formatResult?: (data: D) => any;
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

export interface AsyncResult<D = any, P = any[] | undefined> {
  data: D;
  error: any;
  loading: boolean;
  params: P;
  run: (...args: any) => Promise<D>;
  cancel: () => void;
  refresh: () => Promise<D>;
  mutate: (newData: any | ((oldData: any) => any)) => void;
}

declare const useAsync: (asyncFn: (...args: any) => Promise<any>, options?: AsyncParams) => AsyncResult;

export default useAsync;
