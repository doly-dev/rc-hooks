import * as React from 'react';
import useAsync from '.';
import type { AsyncOptions, AsyncResult } from '.';
import useUpdateEffect from '../useUpdateEffect';

export interface PaginationAsyncReturn<DataItem = any> {
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

export interface PaginationAsyncBaseOption<R extends PaginationAsyncReturn = any>
  extends AsyncOptions<R, PaginationParams> {
  defaultPageSize?: number;
}

export interface PaginationResult<R extends PaginationAsyncReturn = any, P extends any[] = any>
  extends AsyncResult<R, P> {
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPage: number;
    onChange: (current: number, pageSize: number) => void;
    changeCurrent: (current: number) => void;
    changePageSize: (pageSize: number) => void;
  };
  tableProps: {
    dataSource: R['list'];
    loading: boolean;
    onChange: (pagination: any, sorter?: any, filters?: any, extra?: any) => void;
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    };
  };
}

export function usePagination<R extends PaginationAsyncReturn = any>(
  asyncFn: (...args: PaginationParams) => Promise<R>,
  options?: PaginationAsyncBaseOption<R>
) {
  const { defaultPageSize = 10, refreshDeps = [], ...restOptions } = options || {};

  const { run, data, params, loading, ...restAsyncReturn } = useAsync<R, PaginationParams>(
    asyncFn,
    {
      defaultParams: [
        {
          current: 1,
          pageSize: defaultPageSize
        }
      ],
      ...restOptions
    }
  );

  const { current, pageSize } = params && params[0] ? params[0] : ({} as PaginationParams[0]);

  const total = data?.total || 0;
  const totalPage = Math.ceil(total / pageSize);

  const changePagination = React.useCallback(
    (pagination: PaginationParams[0]) => {
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
    (pagination, filters, sorter, extra) => {
      changePagination({
        current: pagination.current,
        pageSize: pagination.pageSize,
        filters,
        sorter,
        extra
      });
    },
    [changePagination]
  );

  useUpdateEffect(() => {
    if (options?.autoRun !== false) {
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
      totalPage,
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
