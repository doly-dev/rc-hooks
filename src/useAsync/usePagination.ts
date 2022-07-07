import * as React from 'react';
import useAsync from '.';
import type { AsyncOptions } from '.';
import useUpdateEffect from '../useUpdateEffect';

export interface PaginationResult<DataItem = any> {
  list: DataItem[];
  total: number;
  [key: string]: any;
}

export type PaginationParams = [
  param1: {
    current: number;
    pageSize: number;
    [key: string]: any;
  },
  ...args: any[]
];

export interface PaginationOptions<R extends PaginationResult = any>
  extends AsyncOptions<R, PaginationParams> {
  defaultPageSize?: number;
}

export function usePagination<R extends PaginationResult = any>(
  asyncFn: (...args: PaginationParams) => Promise<R>,
  options?: PaginationOptions<R>
) {
  const { defaultPageSize = 10, refreshDeps = [], defaultParams: defaultParamsProp, ...restOptions } = options || {};

  const defaultParams = React.useMemo(() => (defaultParamsProp || [{ current: 1, pageSize: defaultPageSize }] as PaginationParams), [defaultPageSize, defaultParamsProp]);

  const { run, data, params, loading, ...restAsyncReturn } = useAsync<R, PaginationParams>(
    asyncFn,
    {
      defaultParams,
      ...restOptions
    }
  );

  const { current, pageSize } = params && params[0] ? params[0] : defaultParams[0];

  const total = data?.total || 0;

  const changePagination = React.useCallback(
    (pagination: Partial<PaginationParams[0]>) => {
      const [oldParams, ...restParams] = params;
      run(
        {
          ...oldParams,
          ...pagination
        },
        ...restParams
      );
    },
    [params, run]
  );

  const onChange = React.useCallback(
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

  const changeCurrent = React.useCallback(
    (c: number) => {
      onChange(c, pageSize);
    },
    [onChange, pageSize]
  );

  const changePageSize = React.useCallback(
    (p: number) => {
      onChange(current, p);
    },
    [current, onChange]
  );

  const changeTable = React.useCallback(
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
    const isAutoRun = typeof options?.autoRun === 'undefined' || options?.autoRun;
    if (isAutoRun && Array.isArray(refreshDeps) && refreshDeps.length > 0) {
      changeCurrent(1);
    }
  }, refreshDeps);

  return {
    ...restAsyncReturn,
    data,
    run,
    loading,
    params,

    pagination: {
      current,
      pageSize,
      total,
      onChange,
      changeCurrent,
      changePageSize
    },
    tableProps: {
      dataSource: data?.list || [],
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
