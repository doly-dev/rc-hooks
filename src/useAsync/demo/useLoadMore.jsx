import { useState, useEffect, useCallback, useRef } from "react";
import { useAsync } from "rc-hooks";

// 针对接口入参和响应，自定义 useLoadMore Hook
export default function useLoadMore(service, { defaultPageSize = 10, threshold = 100, ref, ...restOptions }) {
  const [data, setData] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const pageRef = useRef({
    pageNum: 1,
    pageSize: defaultPageSize,
    total: 0
  }); // 分页
  const doneRef = useRef(false); // 是否完成
  const paramsRef = useRef({}); // 请求参数，这里不使用 useAsync 缓存params，因为里面可能包含了分页数据

  const isDone = useCallback((data) => {
    // 以下状态表示已完成:
    // 1. 无响应数据
    // 2. 当前响应数据小于单次请求数据
    // 3. 当前响应数据总数小于等于当前页码和每页大小的乘积
    if (
      !data ||
      data.length < pageRef.current.pageSize ||
      pageRef.current.total <= pageRef.current.pageSize * pageRef.current.pageNum
    ) {
      return true;
    }

    return false;
  })

  const request = useAsync(service, {
    ...restOptions,
    autoRun: false,
    onSuccess: (res, params) => {
      pageRef.current.total = res.pageInfo.total;
      doneRef.current = isDone(res.data);
      setLoadingMore(false);

      if (pageRef.current.pageNum === 1) {
        setData(res.data);
      } else {
        setData(d => d.concat(res.data));
      }

      if (restOptions.onSuccess) {
        restOptions.onSuccess(res, params)
      }
    },
    onError: (error, params) => {
      setLoadingMore(false);

      if (restOptions.onError) {
        restOptions.onError(error, params)
      }
    }
  });

  const loadMore = useCallback(params => {
    // 如果查询参数变化，重置分页 和 参数
    if (params) {
      paramsRef.current = params;
      pageRef.current.pageNum = 1;
      doneRef.current = false;
    } else {
      if (doneRef.current) {
        return;
      } else {
        pageRef.current.pageNum += 1;
      }
    }

    setLoadingMore(true);

    const { pageSize, pageNum } = pageRef.current;

    request.run({
      page: { pageSize, pageNum },
      data: {
        ...paramsRef.current,
        ...params
      }
    });
  }, []);

  const reload = useCallback(() => {
    loadMore(paramsRef.current);
  }, []);

  const cancel = useCallback(() => {
    setLoadingMore(false);
    request.cancel();
  }, []);

  /* 上拉加载的方法 */
  const scrollMethod = useCallback(() => {
    if (request.loading || !ref || !ref.current) {
      return;
    }
    if (ref.current.scrollHeight - ref.current.scrollTop <= ref.current.clientHeight + threshold) {
      loadMore();
    }
  }, [request.loading, ref]);

  useEffect(() => {
    if (typeof restOptions.autoRun === 'undefined' || restOptions.autoRun) {
      loadMore(restOptions.defaultParams || {});
    }
  }, []);

  useEffect(() => {
    if (!ref || !ref.current) {
      return () => { };
    }

    ref.current.addEventListener('scroll', scrollMethod);
    return () => {
      if (ref && ref.current) {
        ref.current.removeEventListener('scroll', scrollMethod);
      }
    };
  }, [scrollMethod]);

  return {
    ...request,
    run: loadMore,
    refresh: reload,
    cancel,
    loading: request.loading && pageRef.current.pageNum === 1,
    data,

    reload,
    loadMore,
    loadingMore,
    done: doneRef.current,
    pagination: {
      total: pageRef.current.total,
      current: pageRef.current.pageNum,
      pageSize: pageRef.current.pageSize
    }
  };
}
