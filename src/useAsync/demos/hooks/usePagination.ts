import { useState, useEffect, useCallback, useRef } from 'react';
import { useAsync } from 'rc-hooks';
import { AsyncOptions, AsyncFunction } from 'rc-hooks/es/useAsync';
import { SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

type RecordType = Record<number | string, any>;

interface ResponseDataType extends RecordType {
  data: any[];
  total?: number;
}

interface ParamsRef {
  params: any;
  filters?: Record<string, (string | number)[] | null> | null;
  sorter?: SorterResult<RecordType> | SorterResult<RecordType>[] | null;
  extra?: TableCurrentDataSource<RecordType> | null;
}

interface Options<DataType = any> extends AsyncOptions<DataType> {
  defaultPageSize?: number;
  defaultTotal?: number;
}

// 显示数据总量
const showTotal = (num: number) => `共 ${num} 条数据`;

function usePagination<DataType extends ResponseDataType = any>(
  asyncFn: AsyncFunction,
  {
    defaultPageSize = 10,
    defaultTotal = 0,
    autoRun,
    onSuccess = () => { },
    ...restOptions
  }: Options<DataType> = {}) {
  const [data, setData] = useState<DataType['data']>([]);

  const pageRef = useRef({
    current: 1,
    pageSize: defaultPageSize || 10,
    total: defaultTotal || 0,
  }); // 分页
  const paramsRef = useRef<ParamsRef>({
    params: {},
    filters: null,
    sorter: null,
    extra: null
  }); // 请求参数，这里不使用 useAsync 缓存params，因为里面可能包含了分页数据

  const request = useAsync<DataType>(asyncFn, {
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
  const onTableChange = useCallback((pagination?, filters?, sorter?, extra?) => {
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
}

export default usePagination;
