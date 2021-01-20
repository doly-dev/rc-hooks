import { useState, useEffect, useCallback, useRef } from 'react';
import { useAsync } from 'rc-hooks';
import { AsyncFn, AsyncParams, AsyncResult } from 'rc-hooks/types/useAsync';
import { SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

type Text = number | string;
type RecordText = Record<Text, any>;
interface AsyncFnReturn<D = any> extends RecordText {
  data: D[];
  total?: number;
};

// 显示数据总量
const showTotal = (num: Text) => `共 ${num} 条数据`;

interface ParamsRef {
  params: any;
  filters?: Record<string, (string | number)[] | null>;
  sorter?: SorterResult<RecordText> | SorterResult<RecordText>[];
  extra?: TableCurrentDataSource<RecordText>;
}

interface Options<D = any, P = any> extends AsyncParams<D, P> {
  defaultPageSize?: number;
}

interface ReturnValues<RecordType = any> extends Omit<AsyncResult<AsyncFnReturn<RecordType>>, 'data'> {
  data: AsyncFnReturn<RecordType>['data'];
  onTableChange: (
    params: ParamsRef['params'],
    filters?: ParamsRef['filters'],
    sorter?: ParamsRef['sorter'],
    extra?: ParamsRef['extra']
  ) => Promise<AsyncFnReturn<RecordType>>;
  pagination: {
    total: number;
    current: number;
    pageSize: number;
    showTotal: typeof showTotal;
    showSizeChanger: boolean;
    showQuickJumper: boolean;
  } & RecordText;
}

function usePagination<RecordType = any, P = any>(
  asyncFn: AsyncFn<AsyncFnReturn<RecordType>>,
  {
    defaultPageSize = 10,
    autoRun = false,
    onSuccess = () => { },
    ...restOptions
  }: Options<AsyncFnReturn<RecordType>, P> = {}): ReturnValues<RecordType> {
  const [data, setData] = useState([]);

  const pageRef = useRef({
    current: 1,
    pageSize: defaultPageSize || 10,
    total: 0,
  }); // 分页
  const paramsRef = useRef<ParamsRef>({
    params: {},
    filters: null,
    sorter: null,
    extra: null
  }); // 请求参数，这里不使用 useAsync 缓存params，因为里面可能包含了分页数据

  const request = useAsync<AsyncFnReturn<RecordType>, P>(asyncFn, {
    ...restOptions,
    autoRun: false,
    onSuccess: (res, params) => {
      pageRef.current.total = res.total || 0;
      setData(res.data || []);

      if (typeof onSuccess === 'function') {
        onSuccess(res, params);
      }
    },
  });

  const run = useCallback(
    (params?: any) => {
      // 如果查询参数变化，重置参数和分页
      if (params) {
        paramsRef.current.params = params;
        pageRef.current.current = 1;
      }
      const { pageSize, current } = pageRef.current;
      const { params: paramsRet, filters, sorter, extra } = paramsRef.current;

      return request.run({ ...paramsRet, pageSize, current }, filters, sorter, extra);
    },
    [data],
  );

  const refresh = useCallback(() => {
    return run();
  }, []);

  // 修改分页、筛选、排序
  const onTableChange = useCallback((pagination, filters, sorter, extra) => {
    pageRef.current = {
      ...pageRef.current,
      ...pagination,
    };
    paramsRef.current = {
      ...paramsRef.current,
      filters,
      sorter,
      extra,
    };
    return run();
  }, []);

  useEffect(() => {
    if (typeof autoRun === 'undefined' || autoRun) {
      run();
    }
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
      ...pageRef.current,
    },
  };
};

export default usePagination;
