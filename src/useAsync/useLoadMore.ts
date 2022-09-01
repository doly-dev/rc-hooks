import * as React from 'react';
import useAsync from '.';
import type { AsyncOptions } from '.';
import useScrollToLower, { TargetType } from './useScrollToLower';
import useUpdateEffect from '../useUpdateEffect';

export interface LoadMoreAsyncReturn<DataItem = any> {
  list: DataItem[];
  [key: string]: any;
}

export type LoadMoreParams = [
  page: {
    current: number;
  },
  ...args: any[]
];

export interface LoadMoreOptions<R extends LoadMoreAsyncReturn = any>
  extends Omit<
  AsyncOptions<R, LoadMoreParams>,
  'cacheKey' | 'cacheTime' | 'persisted' | 'pollingInterval' | 'pollingWhenHidden'
  > {
  threshold?: number;
  target?: TargetType;
  isNoMore?: (data?: R) => boolean;
}

function useLoadMore<R extends LoadMoreAsyncReturn = any>(
  asyncFn: (...args: LoadMoreParams) => Promise<R>,
  options?: LoadMoreOptions<R>
) {
  const {
    threshold = 100,
    target,
    isNoMore = () => false,
    refreshDeps = [],
    autoRun = true,
    ...restOptions
  } = (options || {}) as LoadMoreOptions<R>;

  const dataGroup = React.useRef<R['list']>([]); // 缓存之前请求的列表数据
  const currentPageRef = React.useRef(1); // 当前页码

  const {
    run,
    data,
    loading,
    cancel: reqCancel,
    params,
    mutate: reqMutate,
    ...restAsyncReturn
  } = useAsync<R, LoadMoreParams>(asyncFn, {
    defaultParams: [
      {
        current: currentPageRef.current
      }
    ],
    autoRun,
    ...restOptions,
    onError(err, _params) {
      // 加载失败并且当前页码大于第一页，页码自减一
      if (currentPageRef.current > 1) {
        currentPageRef.current -= 1;
      }
      restOptions?.onError?.(err, _params);
    },
    __INTERNAL_FORMAT__(res) {
      dataGroup.current =
        currentPageRef.current === 1 ? res.list : dataGroup.current.concat(res.list);
      return {
        ...res,
        list: dataGroup.current
      };
    }
  });

  const noMore = isNoMore ? !loading && isNoMore(data) : false;
  const [firstParams, ...restParams] = params || [];

  const loadData = React.useCallback(() => {
    return run(
      {
        current: currentPageRef.current
      },
      ...restParams
    );
  }, [restParams, run]);

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

  const mutate: typeof reqMutate = React.useCallback(
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
    if (loading || !target) {
      return;
    }
    return loadMore();
  }, [loadMore, target, loading]);

  useScrollToLower({
    target,
    threshold,
    onScrollLower: scrollMethod
  });

  useUpdateEffect(() => {
    if (autoRun && Array.isArray(refreshDeps) && refreshDeps.length > 0) {
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
    params: [
      { ...firstParams, current: currentPageRef.current },
      ...restParams
    ],

    loadMore,
    loadingMore: loading && currentPageRef.current > 1,
    noMore
  };
}

export default useLoadMore;
