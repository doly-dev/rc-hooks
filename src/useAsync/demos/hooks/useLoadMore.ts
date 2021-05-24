import { useState, useEffect, useCallback, useRef } from "react";
import { useAsync } from "rc-hooks";
import type { AsyncOptions, AsyncFunction } from 'rc-hooks/es/useAsync';
import useScrollToBottomLoad from "./useScrollToBottomLoad";

interface ResponseDataType extends Record<number | string, any> {
  data: any[];
  total?: number;
}

interface Options<DataType = any> extends AsyncOptions<DataType> {
  defaultPageSize?: number;
  threshold?: number;
  ref?: React.RefObject<HTMLDivElement | any> | null;
  [key: string]: any;
}

function useLoadMore<DataType extends ResponseDataType = any>(asyncFn: AsyncFunction, {
  defaultPageSize = 10,
  threshold = 100,
  ref,
  ...restOptions
}: Options<DataType> = {}) {
  const [data, setData] = useState<DataType['data']>([]);
  const [loadDone, setLoadDone] = useState(false); // 是否完成

  const pageRef = useRef({
    current: 1,
    pageSize: defaultPageSize,
    total: 0
  }); // 分页
  const paramsRef = useRef({}); // 请求参数，这里不使用 useAsync 缓存params，因为里面可能包含了分页数据

  const request = useAsync<DataType>(asyncFn, {
    ...restOptions,
    autoRun: false,
    onSuccess: (res, params) => {
      // 1. 设置分页和数据
      pageRef.current.total = res.total as number;
      if (pageRef.current.current === 1) {
        setData(res.data);
      } else {
        setData(d => d.concat(res.data));
      }

      if (pageRef.current.pageSize * pageRef.current.current >= pageRef.current.total) {
        setLoadDone(true);
      }

      if (restOptions.onSuccess) {
        restOptions.onSuccess(res, params)
      }
    },
    onError: (error, params) => {
      if (pageRef.current.current > 1) {
        pageRef.current.current -= 1;
      }
      if (restOptions.onError) {
        restOptions.onError(error, params)
      }
    }
  });

  const run = useCallback((params?: any) => {
    if (params) {
      paramsRef.current = params;
      pageRef.current.current = 1;
    }
    const { pageSize, current } = pageRef.current;

    // 2. 传入参数，发起请求
    return request.run({
      pageSize,
      current,
      ...paramsRef.current
    });
  }, []);

  const cancel = useCallback(() => {
    // 加载中并且当前页码大于第一页，页码自减一
    if (request.loading && pageRef.current.current > 1) {
      pageRef.current.current -= 1;
    }
    request.cancel();
  }, []);

  const loadMore = useCallback(() => {
    if (request.loading || loadDone) {
      return;
    }
    pageRef.current.current += 1;
    return run();
  }, []);

  const reload = useCallback(() => {
    setLoadDone(false);
    cancel();
    pageRef.current.current = 1;
    return run();
  }, []);

  useScrollToBottomLoad({
    ready: !request.loading && !loadDone,
    ref,
    threshold,
    onLoad: loadMore
  });

  useEffect(() => {
    if (typeof restOptions.autoRun === 'undefined' || restOptions.autoRun) {
      run();
    }
  }, []);

  return {
    ...request,
    run,
    refresh: reload,
    cancel,
    data,

    reload,
    loadMore,
    loadingMore: request.loading && pageRef.current.current > 1,
    done: loadDone,
    pagination: pageRef.current
  };
}

export default useLoadMore;