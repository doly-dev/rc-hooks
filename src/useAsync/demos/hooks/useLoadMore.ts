import { useState, useEffect, useCallback, useRef } from "react";
import { useAsync } from "rc-hooks";
import type { AsyncOptions, AsyncFunction } from "rc-hooks/es/useAsync";
import useScrollToBottomLoad from "./useScrollToBottomLoad";

interface Options<R = any, P extends any[] = any> extends AsyncOptions<R, P> {
  defaultPageSize?: number;
  threshold?: number;
  ref?: React.RefObject<HTMLDivElement>;
}

type ParamWithPagination<P = any> = {
  current: number;
  pageSize: number;
} & P;

type ResultWithPagination<R = any> = {
  data: R[];
  total?: number;
  [key: string]: any;
}

function useLoadMore<R = any, P = any>(
  asyncFn: AsyncFunction<ResultWithPagination<R>, [ParamWithPagination<P>]>,
  {
    defaultPageSize = 10,
    threshold = 100,
    ref,
    ...restOptions
  }: Options<ResultWithPagination<R>, [ParamWithPagination<P>]> = {}
) {
  const [data, setData] = useState<ResultWithPagination<R>['data']>([]);
  const [loadDone, setLoadDone] = useState(false); // 是否完成

  const pageRef = useRef({
    current: 1,
    pageSize: defaultPageSize,
    total: 0,
  }); // 分页
  const paramsRef = useRef<P>(); // 请求参数，这里不使用 useAsync 缓存params，因为里面可能包含了分页数据

  const request = useAsync<ResultWithPagination<R>, [ParamWithPagination<P>]>(asyncFn, {
    ...restOptions,
    autoRun: false,
    onSuccess: (res, params) => {
      // 1. 设置分页和数据
      pageRef.current.total = res.total as number;
      if (pageRef.current.current === 1) {
        setData(res.data);
      } else {
        setData((d) => d.concat(res.data));
      }

      if (
        pageRef.current.pageSize * pageRef.current.current >=
        pageRef.current.total
      ) {
        setLoadDone(true);
      }

      if (restOptions.onSuccess) {
        restOptions.onSuccess(res, params);
      }
    },
    onError: (error: Error, params: any[]) => {
      if (pageRef.current.current > 1) {
        pageRef.current.current -= 1;
      }
      if (restOptions.onError) {
        restOptions.onError(error, params);
      }
    },
  });

  const run = useCallback(
    (params?: P) => {
      if (params) {
        paramsRef.current = params;
        pageRef.current.current = 1;
      }
      const { pageSize, current } = pageRef.current;

      // 2. 传入参数，发起请求
      return request.run({
        pageSize,
        current,
        ...paramsRef.current,
      });
    },
    [request]
  );

  const cancel = useCallback(() => {
    // 加载中并且当前页码大于第一页，页码自减一
    if (request.loading && pageRef.current.current > 1) {
      pageRef.current.current -= 1;
    }
    request.cancel();
  }, [request]);

  const loadMore = useCallback(() => {
    if (request.loading || loadDone) {
      return;
    }
    pageRef.current.current += 1;
    return run();
  }, [loadDone, request.loading, run]);

  const reload = useCallback(() => {
    setLoadDone(false);
    cancel();
    pageRef.current.current = 1;
    return run();
  }, [cancel, run]);

  useScrollToBottomLoad({
    ready: !request.loading && !loadDone,
    ref,
    threshold,
    onLoad: loadMore,
  });

  useEffect(() => {
    if (typeof restOptions.autoRun === "undefined" || restOptions.autoRun) {
      run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    pagination: pageRef.current,
  };
}

export default useLoadMore;
