import { useState, useEffect, useCallback, useRef } from 'react';
import { useAsync } from 'rc-hooks';
import { AsyncBaseOptions, AsyncFunction } from 'rc-hooks';
import { SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

type Key = Record<number | string, any>;

interface Options<R = any, P extends any[] = []> extends AsyncBaseOptions<R, P> {
  defaultPageSize?: number;
  defaultTotal?: number;
}

type ParamFilters = Record<string, (string | number)[] | null> | null;
type ParamSorter = SorterResult<Key> | SorterResult<Key>[] | null;
type ParamExtra = TableCurrentDataSource<Key> | null;

type ParamWithPagination<P = any> = [
  {
    current: number;
    pageSize: number;
  } & P,
  ParamFilters,
  ParamSorter,
  ParamExtra
];

type ResultWithPagination<R = any> = {
  data: R[];
  total?: number;
  [key: string]: any;
};

// 显示数据总量
const showTotal = (num: number) => `共 ${num} 条数据`;

function usePagination<R = any, P = any>(
  asyncFn: AsyncFunction<ResultWithPagination<R>, ParamWithPagination<P>>,
  {
    defaultPageSize = 10,
    defaultTotal = 0,
    autoRun,
    onSuccess = () => {},
    ...restOptions
  }: Options<ResultWithPagination<R>, ParamWithPagination<P>> = {} as any
) {
  const [data, setData] = useState<ResultWithPagination<R>['data']>([]);

  const pageRef = useRef({
    current: 1,
    pageSize: defaultPageSize || 10,
    total: defaultTotal || 0
  }); // 分页
  const paramsRef = useRef<{
    params: P;
    filters: ParamFilters;
    sorter: ParamSorter;
    extra: ParamExtra;
  }>({
    params: {} as any,
    filters: null,
    sorter: null,
    extra: null
  }); // 请求参数，这里不使用 useAsync 缓存params，因为里面可能包含了分页数据

  const request = useAsync<ResultWithPagination<R>, ParamWithPagination<P>>(asyncFn, {
    ...restOptions,
    autoRun: false,
    onSuccess: (res, params) => {
      pageRef.current.total = res.total || 0;
      setData(res.data || []);

      if (typeof onSuccess === 'function') {
        onSuccess(res, params);
      }
    }
  });

  const run = useCallback(
    (params?: P) => {
      // 如果查询参数变化，重置参数和分页
      if (params) {
        paramsRef.current.params = params;
        pageRef.current.current = 1;
      }
      const { pageSize, current } = pageRef.current;
      const { params: paramsRet, filters, sorter, extra } = paramsRef.current;

      return request.run({ ...paramsRet, pageSize, current }, filters, sorter, extra);
    },
    [request]
  );

  const refresh = useCallback(() => {
    return run();
  }, [run]);

  // 修改分页、筛选、排序
  const onTableChange = useCallback(
    (pagination?, filters?, sorter?, extra?) => {
      pageRef.current = {
        ...pageRef.current,
        ...pagination
      };
      paramsRef.current = {
        ...paramsRef.current,
        filters,
        sorter,
        extra
      };
      return run();
    },
    [run]
  );

  useEffect(() => {
    if (typeof autoRun === 'undefined' || autoRun) {
      run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...request,
    run,
    refresh,
    data,
    onTableChange,
    pagination: {
      showTotal,
      showSizeChanger: true,
      showQuickJumper: true,
      ...pageRef.current
    }
  };
}

export default usePagination;
