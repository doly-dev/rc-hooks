/* eslint-disable react-hooks/refs */
import { useCallback, useRef } from 'react';
import { isArray } from 'ut2';
import useAsync, { AsyncOptions } from '../useAsync';
import useScrollToLower, { TargetType } from './useScrollToLower';
import useUpdateEffect from '../useUpdateEffect';

/**
 * 加载更多异步返回类型。
 */
export interface LoadMoreAsyncReturn<DataItem = any> {
  /**
   * @description 列表数据。
   */
  list: DataItem[];
  [key: string]: any;
}

/**
 * 异步函数参数类型。
 */
export type LoadMoreParams = [
  page: {
    current: number;
  },
  ...args: any[]
];

export interface LoadMoreOptions<
  DataItem = any,
  R extends LoadMoreAsyncReturn<DataItem> = any
> extends Omit<
  AsyncOptions<R, LoadMoreParams>,
  'cacheKey' | 'cacheTime' | 'persisted' | 'pollingInterval' | 'pollingWhenHidden'
> {
  /**
   * @description 上拉自动加载，距离底部距离阈值。
   * @default 100
   */
  threshold?: number;

  /**
   * @description 内容的滚动容器。如果存在，则在滚动到底部时，自动触发 `loadMore` 方法。
   */
  target?: TargetType;

  /**
   * @description 判断是否没有更多数据。
   * @param data 异步返回的数据。
   * @returns
   * @default () => false
   */
  isNoMore?: (data?: R) => boolean;
}

/**
 * 基于 `useAsync` 扩展，用于管理加载更多的 Hook。
 *
 * @param {number} [options.threshold=100] 上拉自动加载，距离底部距离阈值。默认 `100`。
 * @param {Object | Function} [options.target] 内容的滚动容器，如果存在，则在滚动到底部时，自动触发 `loadMore` 方法。
 * @param {Function} [options.isNoMore=()=>false] 判断是否没有更多数据。默认 `()=>false`。
 * @param {boolean} [options.autoRun=true] 在初始化时自动执行异步函数。如果设置为 `false`，则需要手动调用 `run` 触发执行。默认 `true`。
 * @param {*} [options.initialData] 初始化的 `data`。
 * @param {boolean} [options.defaultLoading] 初始化默认 `loading` 值。默认值等于 `autoRun && !loadingDelay`。
 * @param {Array} [options.defaultParams] 如果 `autoRun=true` 自动执行 `run` 的默认参数。
 * @param {Array} [options.refreshDeps] 在 `autoRun = true` 时，refreshDeps 变化，会执行 `refresh` （重置`current`到第 1 页，并清除之前列表数据，发起请求。）。
 * @param {Function} [options.onBefore] 异步函数执行前触发，参数为 `params`。
 * @param {Function} [options.onSuccess] 异步函数 `resolve` 时触发，参数为 `data` 和 `params`。
 * @param {Function} [options.onError] 异步函数报错时触发，参数为 `error` 和 `params`。
 * @param {number} [options.loadingDelay] 设置 `loading` 延迟时间，避免闪烁，单位为毫秒。
 * @param {boolean} [options.refreshOnWindowFocus=false] 在屏幕重新获取焦点或重新显示时，是否重新发起请求。如果为 `false`，不会重新发起请求。如果为 `true`，在屏幕重新聚焦或重新显示时，会重新发起请求。默认 `false`。
 * @param {number} [options.focusTimespan=5000] 屏幕重新聚焦，重新发起请求时间间隔。需要配置 `refreshOnWindowFocus` 使用。默认 `5000`。
 * @param {number} [options.debounceInterval] 防抖间隔，单位为毫秒，设置后，请求进入防抖模式。
 * @param {number} [options.throttleInterval] 节流间隔，单位为毫秒，设置后，请求进入节流模式。
 * @returns {Object}
 * @example
 * const { data, error, loading, loadingMore, noMore, loadMore, refresh, cancel } = useLoadMore(asyncFn, options);
 */
function useLoadMore<DataItem = any, R extends LoadMoreAsyncReturn<DataItem> = any>(
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

  const dataGroup = useRef<R['list']>([]); // 缓存之前请求的列表数据
  const currentPageRef = useRef(1); // 当前页码

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

  const loadData = useCallback(() => {
    return run.apply(void 0, ([{ current: currentPageRef.current }] as any).concat(restParams));
  }, [restParams, run]);

  const cancel = useCallback(() => {
    // 加载中并且当前页码大于第一页，页码自减一
    if (loading && currentPageRef.current > 1) {
      currentPageRef.current -= 1;
    }
    reqCancel();
  }, [reqCancel, loading]);

  /**
   * 触发加载更多。
   */
  const loadMore = useCallback(async () => {
    if (loading || noMore) {
      return;
    }
    currentPageRef.current += 1;
    return loadData();
  }, [loading, noMore, loadData]);

  const mutate: typeof reqMutate = useCallback(
    (param) => {
      const res = typeof param === 'function' ? param(data as R) : param;
      dataGroup.current = res?.list || [];
      reqMutate(res);
    },
    [data, reqMutate]
  );

  const refresh = useCallback(() => {
    cancel();
    currentPageRef.current = 1;
    mutate((d) => ({
      ...d,
      list: []
    }));
    return loadData();
  }, [cancel, loadData, mutate]);

  const scrollMethod = useCallback(() => {
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
    if (autoRun && isArray(refreshDeps) && refreshDeps.length > 0) {
      refresh();
    }
  }, refreshDeps);

  return {
    ...restAsyncReturn,
    loading,
    data,
    run,

    /**
     * 重置`current`到第 `1` 页，并清除之前列表数据，发起请求。
     */
    refresh,
    cancel,
    mutate,
    params: [{ ...firstParams, current: currentPageRef.current }].concat(restParams),

    /**
     * 触发加载更多。
     *
     * 如果没有更多或者正在加载中，返回 `undefined`。
     */
    loadMore,

    /**
     * 是否正在加载更多。即加载中并且 `current` 不等于 `1`。
     */
    loadingMore: loading && currentPageRef.current > 1,

    /**
     * 是否没有更多。
     */
    noMore
  };
}

export default useLoadMore;
