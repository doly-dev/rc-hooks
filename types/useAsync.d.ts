export interface AsyncParams<D, P> {
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

export interface AsyncResult {
  data: any;
  error: any;
  loading: boolean;
  params: any[] | undefined;
  run: (...args: any) => Promise<any>;
  cancel: () => void;
  refresh: () => Promise<any>;
  mutate: (newData: any | ((oldData: any) => any)) => void;
}

declare const useAsync: (asyncFn: (...args: any) => Promise<any>, options?: AsyncParams<any, any[] | undefined>) => AsyncResult;

export default useAsync;
