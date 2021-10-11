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
  prevResult?: R
];

export interface LoadMoreAsyncBaseOption<R extends LoadMoreAsyncReturn = any>
  extends Omit<
    AsyncBaseOptions<R, LoadMoreParams<R>>,
    'cacheKey' | 'cacheTime' | 'persisted' | 'pollingInterval' | 'pollingWhenHidden'
  > {
  threshold?: number;
  ref?: React.RefObject<HTMLElement | Window>;
  isNoMore?: (prevResult?: R, currData?: R) => boolean;
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
  const pageRef = React.useRef(
    restOptions?.defaultParams?.[0] || {
      current: 1 // 当前页码
    }
  );
  const resRef = React.useRef<R | undefined>(
    restOptions?.defaultParams?.[1] || restOptions?.initialData
  ); // 返回值
  const loadMoreAsyncFn = usePersistFn(() => asyncFn(pageRef.current, resRef.current));
  const isNoMorePersist = usePersistFn(isNoMore);

  const {
    run: reqRun,
    loading: reqLoading,
    cancel: reqCancel,
    data: reqData,
    mutate: reqMutate,
    ...restAsyncReturn
  } = useAsync<R, LoadMoreParams<R>, FP>(loadMoreAsyncFn, {
    ...restOptions,
    autoRun: false,
    onSuccess: (res, params) => {
      setNoMore(isNoMorePersist(resRef.current, res));
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
    return reqRun(pageRef.current, resRef.current);
  }, [reqRun]);

  const loadMore = React.useCallback(() => {
    if (reqLoading || noMore) {
      return;
    }
    pageRef.current.current += 1;
    run();
  }, [noMore, reqLoading, run]);

  const cancel = React.useCallback(() => {
    // 加载中并且当前页码大于第一页，页码自减一
    if (reqLoading && pageRef.current.current > 1) {
      pageRef.current.current -= 1;
    }
    reqCancel();
  }, [reqCancel, reqLoading]);

  const mutate: LoadMoreResult<R, LoadMoreParams<R>>['mutate'] = React.useCallback(
    param => {
      const ret = typeof param === 'function' ? param(reqData as R) : param;
      prevList.current = ret?.list || [];
      reqMutate(ret);
    },
    [reqData, reqMutate]
  );

  const refresh = React.useCallback(() => {
    setNoMore(false);
    cancel();
    mutate(d => ({
      ...d,
      list: []
    }));
    resRef.current = undefined;
    pageRef.current.current = 1;
    return run();
  }, [cancel, mutate, run]);

  const scrollMethod = React.useCallback(() => {
    if (reqLoading || !ref?.current) {
      return;
    }
    return loadMore();
  }, [loadMore, ref, reqLoading]);

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
    ...restAsyncReturn,
    loading: reqLoading,
    data: reqData,
    run,
    refresh,
    cancel,
    mutate,

    loadMore,
    loadingMore: reqLoading && pageRef.current.current > 1,
    noMore
  };
}

export default useLoadMore;
