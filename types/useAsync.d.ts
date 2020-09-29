type AsyncFn = (...args: any) => Promise<any>;

type Params = any[];
type FormatResultReturn = any;

export interface AsyncParams {
  autoRun?: boolean;
  refreshDeps?: any[];
  initialData?: any;
  defaultParams?: any;
  formatResult?: (data: any) => FormatResultReturn;
  onSuccess?: (data: any, params: Params) => void;
  onError?: (error: any, params: Params) => void;
  cacheKey?: string;
  cacheTime?: number;
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
  params: any[];
  run: (...args: any) => Promise<any>;
  cancel: () => void;
  refresh: () => Promise<any>;
  mutate: <T>(newData: T | ((newData: T) => void)) => void;
}

declare const useAsync: (asyncFn: AsyncFn, options?: AsyncParams) => AsyncResult;

export default useAsync;
