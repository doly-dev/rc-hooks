import { useMemo, useCallback } from 'react';
import useAsync from '.';
import type { AsyncOptions } from '.';
import useUpdateEffect from '../useUpdateEffect';

/**
 * 分页异步返回类型。
 */
export interface PaginationAsyncReturn<DataItem = any> {
  list: DataItem[];
  total: number;
  [key: string]: any;
}

/**
 * 异步函数参数类型。
 */
export type PaginationParams = [
  param1: {
    current: number;
    pageSize: number;
    [key: string]: any;
  },
  ...args: any[]
];

export interface PaginationOptions<DataItem = any, R extends PaginationAsyncReturn<DataItem> = any>
  extends AsyncOptions<R, PaginationParams> {
  defaultPageSize?: number;
}

/**
 * 基于 `useAsync` 扩展，用于管理分页的 Hook。
 *
 * @param {Function} asyncFn 异步函数。
 * @param {Object} [options] 配置项。
 * @param {number} [options.defaultPageSize=10] 默认每页的数量。
 * @param {boolean} [options.autoRun=true] 在初始化时自动执行异步函数。如果设置为 `false`，则需要手动调用 `run` 触发执行。默认 `true`。
 * @param {*} [options.initialData] 初始化的 `data`。
 * @param {boolean} [options.defaultLoading=false] 初始化默认 `loading` 值。默认 `false`。
 * @param {Array} [options.defaultParams] 如果 `autoRun=true` 自动执行 `run` 的默认参数。
 * @param {Array} [options.refreshDeps] 在 `autoRun = true` 时，refreshDeps 变化，会重置 `current` 到第一页，并执行 `run` 方法。
 * @param {Function} [options.onBefore] 异步函数执行前触发，参数为 `params`。
 * @param {Function} [options.onSuccess] 异步函数 `resolve` 时触发，参数为 `data` 和 `params`。
 * @param {Function} [options.onError] 异步函数报错时触发，参数为 `error` 和 `params`。
 * @param {string} [options.cacheKey] 缓存的键值。启用缓存机制，异步成功结果将被缓存。如果多个相同 cacheKey 的异步同时触发中，将共享第一个异步结果。
 * @param {number} [options.cacheTime=5*60*1000] 缓存时间。单位毫秒。
 * @param {boolean} [options.persisted=false] 持久化数据。当有缓存数据时，不再执行异步函数。需要配合 `cacheKey` `cacheTime` 使用。默认 `false`。
 * @param {number} [options.loadingDelay] 设置 `loading` 延迟时间，避免闪烁，单位为毫秒。
 * @param {number} [options.pollingInterval] 轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 `run`。
 * @param {boolean} [options.pollingWhenHidden=true] 在页面隐藏时，是否继续轮询。如果为 `true`，不会停止轮询。如果为 `false`，在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询。默认 `true`。
 * @param {boolean} [options.refreshOnWindowFocus=false] 在屏幕重新获取焦点或重新显示时，是否重新发起请求。如果为 `false`，不会重新发起请求。如果为 `true`，在屏幕重新聚焦或重新显示时，会重新发起请求。默认 `false`。
 * @param {number} [options.focusTimespan=5000] 屏幕重新聚焦，重新发起请求时间间隔。需要配置 `refreshOnWindowFocus` 使用。默认 `5000`。
 * @param {number} [options.debounceInterval] 防抖间隔，单位为毫秒，设置后，请求进入防抖模式。
 * @param {number} [options.throttleInterval] 节流间隔，单位为毫秒，设置后，请求进入节流模式。
 * @returns {Object}
 * @example
 * const { data, error, loading, run, params, refresh, pagination, tableProps } = usePagination(asyncFn, options);
 */
function usePagination<D = any, R extends PaginationAsyncReturn<D> = any>(
  asyncFn: (...args: PaginationParams) => Promise<R>,
  options?: PaginationOptions<R>
) {
  const {
    defaultPageSize = 10,
    refreshDeps = [],
    defaultParams: defaultParamsProp,
    autoRun = true,
    ...restOptions
  } = options || {};

  const defaultParams = useMemo(
    () => defaultParamsProp || ([{ current: 1, pageSize: defaultPageSize }] as PaginationParams),
    [defaultPageSize, defaultParamsProp]
  );

  const { run, data, params, loading, ...restAsyncReturn } = useAsync<R, PaginationParams>(
    asyncFn,
    {
      defaultParams,
      autoRun,
      ...restOptions
    }
  );

  const { current, pageSize } = params && params[0] ? params[0] : defaultParams[0];

  const total = data?.total || 0;

  const changePagination = useCallback(
    (pagination: Partial<PaginationParams[0]>) => {
      const [oldParams, ...restParams] = params;
      run.apply(void 0, ([{ ...oldParams, ...pagination }] as any).concat(restParams));
    },
    [params, run]
  );

  const refresh = useCallback(() => {
    changePagination({ current, pageSize });
  }, [changePagination, current, pageSize]);

  const onChange = useCallback(
    (c: number, p: number) => {
      let toCurrent = c <= 0 ? 1 : c;
      const toPageSize = p <= 0 ? 1 : p;

      const tempTotalPage = Math.ceil(total / toPageSize);
      if (toCurrent > tempTotalPage && tempTotalPage > 0) {
        toCurrent = tempTotalPage;
      }

      changePagination({
        current: toCurrent,
        pageSize: toPageSize
      });
    },
    [changePagination, total]
  );

  const changeCurrent = useCallback(
    (c: number) => {
      onChange(c, pageSize);
    },
    [onChange, pageSize]
  );

  const changePageSize = useCallback(
    (p: number) => {
      onChange(current, p);
    },
    [current, onChange]
  );

  const changeTable = useCallback(
    (
      pagination: { current?: number; pageSize?: number } & Record<string, any>,
      filters: any,
      sorter: any,
      extra: any
    ) => {
      changePagination({
        current: pagination?.current,
        pageSize: pagination?.pageSize,
        filters,
        sorter,
        extra
      });
    },
    [changePagination]
  );

  useUpdateEffect(() => {
    if (autoRun && Array.isArray(refreshDeps) && refreshDeps.length > 0) {
      changeCurrent(1);
    }
  }, refreshDeps);

  return {
    ...restAsyncReturn,
    data,
    run,
    refresh,
    loading,
    params,

    /**
     * 分页数据及操作分页的方法。
     */
    pagination: {
      current,
      pageSize,
      total,
      onChange,
      changeCurrent,
      changePageSize
    },

    /**
     * 适配 antd Table 组件的数据结构，可以直接用在 antd Table 组件上。
     */
    tableProps: {
      dataSource: (data?.list || []) as R['list'],
      loading,
      onChange: changeTable,
      pagination: {
        total,
        current,
        pageSize
      }
    }
  };
}

export default usePagination;
