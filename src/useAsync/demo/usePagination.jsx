import { useState, useEffect, useCallback, useRef } from "react";
import { useAsync } from "rc-hooks";

// 针对接口入参和响应，自定义 usePagination Hook
export default function usePagination(service, {
  defaultPageNum = 1,
  defaultPageSize = 10,
  defaultTotal = 0,
  defaultParams = {},
  ...restOptions } = {}) {
  const [data, setData] = useState([]);

  const pageRef = useRef({
    pageNum: defaultPageNum,
    pageSize: defaultPageSize,
    total: defaultTotal
  }); // 分页
  const paramsRef = useRef({ ...defaultParams }); // 请求参数，这里不使用 useAsync 缓存params，因为里面可能包含了分页数据

  const request = useAsync(service, {
    ...restOptions,
    autoRun: false,
    onSuccess: (res, params) => {
      // 1. 设置分页和数据
      pageRef.current.total = res.pageInfo ? res.pageInfo.total : 0;
      setData(res.data || []);

      if (restOptions.onSuccess) {
        restOptions.onSuccess(res, params)
      }
    }
  });

  const run = useCallback(params => {
    // 如果查询参数变化，重置分页 和 参数
    if (params) {
      paramsRef.current = params;
      pageRef.current.pageNum = 1;
    }

    const { pageSize, pageNum } = pageRef.current;

    // 2. 传入参数，发起请求
    request.run({
      page: { pageSize, pageNum },
      data: {
        ...paramsRef.current,
        ...params
      }
    });
  }, []);

  const refresh = useCallback(() => {
    run();
  }, []);

  // 监听分页变化
  const changePagination = useCallback(({ pageSize, current }) => {
    pageRef.current = {
      ...pageRef.current,
      pageSize,
      pageNum: current
    };
    run();
  });

  // 显示数据总量
  const showTotal = useCallback(num => {
    return `共 ${num} 条数据`;
  }, []);

  useEffect(() => {
    if (typeof restOptions.autoRun === 'undefined' || restOptions.autoRun) {
      run();
    }
  }, []);

  return {
    ...request,
    run,
    refresh,
    data,
    changePagination,
    pagination: {
      total: pageRef.current.total,
      current: pageRef.current.pageNum,
      pageSize: pageRef.current.pageSize,
      showTotal
    }
  };
}