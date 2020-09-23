import { useState, useEffect, useCallback, useRef } from "react";
import { useAsync } from "rc-hooks";
import useScrollToBottomLoad from "./useScrollToBottomLoad";

const useLoadMore = (asyncFn, {
  defaultPageSize = 10,
  threshold = 100,
  ref,
  ...restOptions
} = {}) => {
  const [data, setData] = useState([]);
  const [loadDone, setLoadDone] = useState(false); // 是否完成

  const pageRef = useRef({
    pageNum: 1,
    pageSize: defaultPageSize,
    total: 0
  }); // 分页
  const paramsRef = useRef({}); // 请求参数，这里不使用 useAsync 缓存params，因为里面可能包含了分页数据

  const request = useAsync(asyncFn, {
    ...restOptions,
    autoRun: false,
    onSuccess: (res, params) => {
      // 1. 设置分页和数据
      pageRef.current.total = res.pageInfo.total;
      if (pageRef.current.pageNum === 1) {
        setData(res.data);
      } else {
        setData(d => d.concat(res.data));
      }

      if (pageRef.current.pageSize * pageRef.current.pageNum >= pageRef.current.total) {
        setLoadDone(true);
      }

      if (restOptions.onSuccess) {
        restOptions.onSuccess(res, params)
      }
    },
    onError: (error, params) => {
      if (pageRef.current.pageNum > 1) {
        pageRef.current.pageNum -= 1;
      }
      if (restOptions.onError) {
        restOptions.onError(error, params)
      }
    }
  });

  const run = useCallback((params) => {
    paramsRef.current = params;
    const { pageSize, pageNum } = pageRef.current;

    // 2. 传入参数，发起请求
    request.run({
      page: { pageSize, pageNum },
      data: paramsRef.current
    });
  }, []);

  const cancel = useCallback(() => {
    // 加载中并且当前页码大于第一页，页码自减一
    if (request.loading && pageRef.current.pageNum > 1) {
      pageRef.current.pageNum -= 1;
    }
    request.cancel();
  }, []);

  const loadMore = useCallback(() => {
    if (request.loading || loadDone) {
      return;
    }
    pageRef.current.pageNum += 1;
    run(paramsRef.current);
  }, []);

  const reload = useCallback(() => {
    setLoadDone(false);
    cancel();
    pageRef.current.pageNum = 1;
    run(paramsRef.current);
  }, []);

  useScrollToBottomLoad({
    ready: !request.loading && !loadDone,
    ref,
    onLoad: loadMore
  });

  useEffect(() => {
    if (typeof restOptions.autoRun === 'undefined' || restOptions.autoRun) {
      run(paramsRef.current);
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
    loadingMore: request.loading && pageRef.current.pageNum > 1,
    done: loadDone,
    pagination: {
      total: pageRef.current.total,
      current: pageRef.current.pageNum,
      pageSize: pageRef.current.pageSize
    }
  };
}

export default useLoadMore;