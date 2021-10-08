import * as React from 'react';
import useAsync from '.';
import type { AsyncBaseOptions, AsyncOptions, AsyncResult } from '.';
import usePersistFn from '../usePersistFn';
import useScrollToLower from './useScrollToLower';
import useUpdateEffect from '../useUpdateEffect';

export interface LoadMoreAsyncReturn<DataItem = any> {
  list: DataItem[];
}

export type LoadMoreParams<R extends LoadMoreAsyncReturn = any> = [
  page: { current: number },
  currData?: R
];

export interface LoadMoreAsyncBaseOption<R extends LoadMoreAsyncReturn = any>
  extends Omit<
    AsyncBaseOptions<R, LoadMoreParams<R>>,
    | 'cacheKey'
    | 'cacheTime'
    | 'persisted'
    | 'defaultParams'
    | 'pollingInterval'
    | 'pollingWhenHidden'
  > {
  threshold?: number;
  ref?: React.RefObject<HTMLElement | Window>;
  isNoMore?: (data?: R) => boolean;
}

export interface LoadMoreAsyncOption<R extends LoadMoreAsyncReturn = any, FP = any>
  extends LoadMoreAsyncBaseOption<R>,
    Pick<AsyncOptions<R, LoadMoreParams<R>, FP>, 'formatResult'> {}

export interface LoadMoreResult<R extends LoadMoreAsyncReturn = any, P extends any[] = any>
  extends Omit<AsyncResult<R, P>, 'run'> {
  run: () => Promise<R | null>;
  loadMore: () => void;
  loadingMore: boolean;
  noMore: boolean;
}

// 异步方法hooks
export function useLoadMore<R extends LoadMoreAsyncReturn = any>(
  asyncFn: (...args: LoadMoreParams<R>) => Promise<R>,
  options?: LoadMoreAsyncBaseOption<R>
): LoadMoreResult<R, LoadMoreParams<R>>;
export function useLoadMore<R extends LoadMoreAsyncReturn = any, FP = any>(
  asyncFn: (...args: LoadMoreParams<R>) => Promise<FP>,
  options?: LoadMoreAsyncOption<R, FP>
): LoadMoreResult<R, LoadMoreParams<R>>;
export function useLoadMore<R extends LoadMoreAsyncReturn = any, FP = any>(
  asyncFn: (...args: LoadMoreParams<R>) => Promise<FP>,
  options?: LoadMoreAsyncOption<R, FP> | LoadMoreAsyncBaseOption<R>
) {
  const {
    threshold = 100,
    ref,
    isNoMore = () => false,
    refreshDeps = [],
    formatResult,
    autoRun,
    ...restOptions
  } = (options || {}) as LoadMoreAsyncOption<R, FP>;
  const [noMore, setNoMore] = React.useState(false); // 标识没有更多

  const prevList = React.useRef<R['list']>(restOptions?.initialData?.list || []);
  const pageRef = React.useRef({
    current: 1 // 当前页码
  });
  const resRef = React.useRef<R | undefined>(restOptions?.initialData); // 返回值
  const loadMoreAsyncFn = usePersistFn(() => asyncFn(pageRef.current, resRef.current));
  const isNoMorePersist = usePersistFn(isNoMore);

  const request = useAsync<R, LoadMoreParams<R>, FP>(loadMoreAsyncFn, {
    ...restOptions,
    autoRun: false,
    onSuccess: (res, params) => {
      setNoMore(isNoMorePersist(res));
      prevList.current = res.list || [];
      restOptions?.onSuccess?.(res, params);
    },
    onError: (err, params) => {
      if (pageRef.current.current > 1) {
        pageRef.current.current -= 1;
      }
      restOptions?.onError?.(err, params);
    },
    formatResult: res => {
      const fmtRes = (formatResult ? formatResult(res) : res) as R;
      resRef.current = fmtRes;
      return pageRef.current.current === 1
        ? fmtRes
        : {
            ...fmtRes,
            list: prevList.current.concat(fmtRes.list)
          };
    }
  } as LoadMoreAsyncOption<R, FP>);

  const run = React.useCallback(() => {
    return request.run(pageRef.current, resRef.current);
  }, [request]);

  const loadMore = React.useCallback(() => {
    if (request.loading || noMore) {
      return;
    }
    pageRef.current.current += 1;
    run();
  }, [noMore, request.loading, run]);

  const cancel = React.useCallback(() => {
    // 加载中并且当前页码大于第一页，页码自减一
    if (request.loading && pageRef.current.current > 1) {
      pageRef.current.current -= 1;
    }
    request.cancel();
  }, [request]);

  const refresh = React.useCallback(() => {
    setNoMore(false);
    cancel();
    pageRef.current.current = 1;
    prevList.current = [];
    return run();
  }, [cancel, run]);

  const mutate: LoadMoreResult<R, LoadMoreParams<R>>['mutate'] = React.useCallback(
    param => {
      const ret = typeof param === 'function' ? param(request.data as R) : param;
      prevList.current = ret?.list || [];
      request.mutate(ret);
    },
    [request]
  );

  const scrollMethod = React.useCallback(() => {
    if (request.loading || !ref?.current) {
      return;
    }
    return loadMore();
  }, [loadMore, ref, request.loading]);

  useScrollToLower({
    ref,
    threshold,
    onScrollLower: scrollMethod
  });

  React.useEffect(() => {
    if (typeof autoRun === 'undefined' || autoRun) {
      run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateEffect(() => {
    if (typeof autoRun === 'undefined' || autoRun) {
      refresh();
    }
  }, refreshDeps);

  return {
    ...request,
    run,
    refresh,
    cancel,
    mutate,

    loadMore,
    loadingMore: request.loading && pageRef.current.current > 1,
    noMore
  };
}

export default useLoadMore;
