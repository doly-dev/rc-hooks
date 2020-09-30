import { AsyncParams, AsyncResult } from "rc-hooks/types/useAsync";

interface Options extends AsyncParams<any, any[] | undefined> {
  defaultPageSize?: number;
  threshold?: number;
  ref?: React.Ref<HTMLElement>;
  [key: string]: any;
}

interface ReturnValues extends AsyncResult {
  reload: () => Promise<any>;
  loadMore: () => Promise<any>;
  loadingMore: boolean;
  done: boolean;
  pagination: {
    total: number;
    current: number;
    pageSize: number;
  }
}

declare function useLoadMore(asyncFn: () => Promise<any>, options?: Options): ReturnValues;

export default useLoadMore;