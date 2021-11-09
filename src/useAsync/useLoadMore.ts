import * as React from 'react';
import useAsync from '.';
import type { AsyncBaseOptions, AsyncOptions, AsyncResult } from '.';
import useScrollToLower from './useScrollToLower';
import useUpdateEffect from '../useUpdateEffect';

export interface LoadMoreAsyncReturn<DataItem = any> {
  list: DataItem[];
}

export type LoadMoreParams<R extends LoadMoreAsyncReturn = any> = [
  page: { current: number; data?: R; [key: string]: any },
  ...args: any[]
];

export interface LoadMoreAsyncBaseOption<R extends LoadMoreAsyncReturn = any>
  extends Omit<
    AsyncBaseOptions<R, LoadMoreParams<R>>,
    'cacheKey' | 'cacheTime' | 'persisted' | 'pollingInterval' | 'pollingWhenHidden'
  > {
  threshold?: number;
  ref?: React.RefObject<HTMLElement | Window>;
  isNoMore?: (data?: R) => boolean;
}

export interface LoadMoreAsyncOption<R extends LoadMoreAsyncReturn = any, FP = any>
  extends LoadMoreAsyncBaseOption<R>,
    Pick<AsyncOptions<R, LoadMoreParams<R>, FP>, 'formatResult'> {}

export interface LoadMoreResult<R extends LoadMoreAsyncReturn = any, P extends any[] = any>
  extends AsyncResult<R, P> {
  loadMore: () => void;
  loadingMore: boolean;
  noMore: boolean;
}

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
    ...restOptions
  } = (options || {}) as LoadMoreAsyncOption<R, FP>;

  const dataGroup = React.useRef<R['list']>([]);
  const currentPageRef = React.useRef(1); // 当前页码

  const {
    run,
    loading,
    cancel: reqCancel,
    data,
    params,
    mutate: reqMutate,
    ...restAsyncReturn
  } = useAsync<R, LoadMoreParams<R>, FP>(asyncFn, {
    defaultParams: [
      {
        current: currentPageRef.current,
        data: options?.initialData
      }
    ],
    ...restOptions,
    onError: (err, params) => {
      // 加载失败并且当前页码大于第一页，页码自减一
      if (currentPageRef.current > 1) {
        currentPageRef.current -= 1;
      }
      restOptions?.onError?.(err, params);
    },
    formatResult: (res, params) => {
      const fmtRes = (formatResult ? formatResult(res, params) : res) as R;
      dataGroup.current =
        currentPageRef.current === 1 ? fmtRes.list : dataGroup.current.concat(fmtRes.list);
      return {
        ...fmtRes,
        list: dataGroup.current
      };
    }
  } as LoadMoreAsyncOption<R, FP>);

  const noMore = isNoMore ? !loading && isNoMore(data) : false;

  const loadData = React.useCallback(() => {
    const [, ...restParams] = params;
    return run(
      {
        current: currentPageRef.current,
        data
      },
      ...restParams
    );
  }, [data, params, run]);

  const cancel = React.useCallback(() => {
    // 加载中并且当前页码大于第一页，页码自减一
    if (loading && currentPageRef.current > 1) {
      currentPageRef.current -= 1;
    }
    reqCancel();
  }, [reqCancel, loading]);

  const loadMore = React.useCallback(() => {
    if (loading || noMore) {
      return;
    }
    currentPageRef.current += 1;
    loadData();
  }, [loading, noMore, loadData]);

  const mutate: LoadMoreResult<R, LoadMoreParams<R>>['mutate'] = React.useCallback(
    (param) => {
      const res = typeof param === 'function' ? param(data as R) : param;
      dataGroup.current = res?.list || [];
      reqMutate(res);
    },
    [data, reqMutate]
  );

  const refresh = React.useCallback(() => {
    cancel();
    currentPageRef.current = 1;
    mutate((d) => ({
      ...d,
      list: []
    }));
    return loadData();
  }, [cancel, loadData, mutate]);

  const scrollMethod = React.useCallback(() => {
    if (loading || !ref?.current) {
      return;
    }
    return loadMore();
  }, [loadMore, ref, loading]);

  useScrollToLower({
    ref,
    threshold,
    onScrollLower: scrollMethod
  });

  useUpdateEffect(() => {
    if (options?.autoRun !== false) {
      refresh();
    }
  }, refreshDeps);

  return {
    ...restAsyncReturn,
    loading,
    data,
    run,
    refresh,
    cancel,
    mutate,
    params,

    loadMore,
    loadingMore: loading && currentPageRef.current > 1,
    noMore
  };
}

export default useLoadMore;
