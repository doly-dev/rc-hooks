---
title: useAsync
group:
  title: Async
  path: /async
  order: 1
legacy: /async/use-async
---

# useAsync

管理异步函数的 Hook。

**核心特性**

* 自动请求
* 手动请求
* 缓存 & 预加载
* 屏幕聚焦重新请求
* 轮询
* 防抖
* 节流
* 突变
* Loading Delay
* 并行请求

**规划中：**

* [ ] 长缓存：有缓存数据的情况下不再进行请求
* [ ] 缓存方式：目前是缓存到内存中，后面需支持 `sessionStorage` `localStorage`，能更好的支持长缓存

## 代码演示

### 默认请求

<code src="./demo/Default.jsx" />

### 手动触发

<code src="./demo/AutoRun.jsx" />

### 缓存 & 预加载

<code src="./demo/Preload.jsx" />

### 屏幕聚焦重新请求

<code src="./demo/RefreshOnWindowFocus.jsx" />

### 轮询

<code src="./demo/PollingInterval.jsx" />

### 防抖

<code src="./demo/DebounceInterval.jsx" />

### 节流

<code src="./demo/ThrottleInterval.jsx" />

### 突变

<code src="./demo/Mutate.jsx" />

### Loading Delay

<code src="./demo/LoadingDelay.jsx" />

### 并行请求

<code src="./demo/Parallel.jsx" />

## API

```javascript
const {
  data,
  error,
  loading,
  params,
  run,
  cancel,
  refresh,
  mutate
} = useAsync(asyncFn, {
  autoRun,
  initialData,
  defaultParams,
  onSuccess,
  onError,
  cacheKey,
  cacheTime,
  loadingDelay,
  pollingInterval,
  pollingWhenHidden,
  refreshOnWindowFocus,
  focusTimespan,
  debounceInterval,
  throttleInterval,
});
```

### Result

参数 | 说明 | 类型 |
------------- | ------------- | ------------- |
data  | 异步函数的返回值，默认为 `undefined`。 | `any` |
error  | 异步函数抛出的异常，默认为 `undefined` | `any` |
loading  | 异步函数正在执行 | `boolean` |
params  | 执行service的参数数组。比如你触发了 run(1, 2, 3)，则 params 等于 [1, 2, 3] | `array` |
run  | 手动触发异步函数。debounce 模式与throttle 模式返回值为 `Promise<null>` | `(...args) => Promise` |
cancel  | 取消当前请求。如果有轮询，停止。 | `() => void` |
refresh  | 使用上一次的params，重新执行异步函数。 | `() => void` |
mutate  | 直接修改data | `(newData) => void` / `((oldData) => newData) => void` |

### Params

所有配置项都是可选的。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
autoRun  | 默认 `true`。即在初始化时自动执行异步函数。如果设置为 `false`，则需要手动调用 `run` 触发执行。 | `boolean` | `true` |
initialData  | 默认的 `data`。 | `any` | - |
defaultParams  | 如果 `autoRun=true` 自动执行 `run` 的默认参数。 |  `array`  | - |
onSuccess  | 异步函数 `resolve` 时触发，参数为 `data` 和 `params`。 | `(data, params) => void` | - |
onError  | 异步函数报错时触发，参数为 `error` 和 `params` | `(error, parmams) => void` | - |
cacheKey  | 缓存的键值，启用缓存机制。异步成功结果，将被缓存。 | `string` | - |
cacheTime  | 缓存时间，单位为毫秒。 | `number` | `5*60*1000` |
loadingDelay  | 设置 `loading` 延迟时间，避免闪烁，单位为毫秒。| `number` | - |
pollingInterval | 轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 `run` | `number`  | - |
refreshOnWindowFocus  | 在屏幕重新获取焦点或重新显示时，是否重新发起请求。默认为 false，即不会重新发起请求。如果设置为 true，在屏幕重新聚焦或重新显示时，会重新发起请求。 | `boolean` | `false` |
focusTimespan  | 屏幕重新聚焦，如果每次都重新发起请求，不是很好，我们需要有一个时间间隔，在当前时间间隔内，不会重新发起请求。需要配置 refreshOnWindowFocus 使用。 | `number` | `5000` |
debounceInterval  | 防抖间隔, 单位为毫秒，设置后，请求进入防抖模式。 | `number` | - |
throttleInterval  | 节流间隔, 单位为毫秒，设置后，请求进入节流模式。 | `number` | - |

## 扩展用法

基于基础的 `useAsync`，我们可以进一步封装，实现更高级的定制需求。下面演示 `分页` 和 `加载更多` 两种场景，你可以参考代码，根据业务实现自己的封装。

该场景以下面的 `请求参数` 和 `响应数据` 格式为示例

请求参数：

```
{
  page: {
    pageNum: number,
    pageSize: number
  },
  data: {
    ...
  }
}
```

响应数据：

```
{
  pageInfo: {
    ...,
    total: number
  },
  data: []
}
```

### 分页

- 自动管理分页条件 `page` ， `page: {pageNum: number, pageSize: number}` 。
- 内部缓存当前查询条件 `data` ，当分页变化后，自动携带当前查询条件触发请求。
- `run` 方法如果带有参数，表示修改了查询条件 `data` 。将会重置分页到第一页，并触发请求。
- `refresh` 相当于 `run` 不带参数的方式触发请求，将使用当前缓存的分页条件和查询条件触发请求。
- `changePagination` 修改分页，将使用当前查询条件进行请求。

#### usePagination

```
import { useState, useEffect, useCallback, useRef } from "react";
import { useAsync } from "rc-hooks";

// 针对接口入参和响应，自定义 usePagination Hook
export default function usePagination(service, { defaultPageSize = 10, ...restOptions } = {}) {
  const [data, setData] = useState([]);

  const pageRef = useRef({
    pageNum: 1,
    pageSize: defaultPageSize,
    total: 0
  }); // 分页
  const paramsRef = useRef({}); // 请求参数，这里不使用 useAsync 缓存params，因为里面可能包含了分页数据

  const request = useAsync(service, {
    ...restOptions,
    autoRun: false,
    onSuccess: (res, params) => {
      pageRef.current.total = res.pageInfo.total;
      setData(res.data);

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
      run(restOptions.defaultParams || {});
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
```

<code src="./demo/Pagination1.jsx" />
<code src="./demo/Pagination2.jsx" />
<code src="./demo/Pagination3.jsx" />

#### API

```
const { 
  ...,
  changePagination, 
  pagination 
} = usePagination(service, {
  defaultPageSize
});
```

#### Result

参数 | 说明 | 类型 |
------------- | ------------- | ------------- |
changePagination  | 页码改变时调用 | `({current, pageSize}) => void` |
pagination  | 分页数据 `current` `pageSize` `total` | `object` |

#### Params

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
defaultPageSize  | 默认每页的数量 | `number` | `10` |

### 加载更多

- 自动管理列表数据，返回的数据 `data` 即为合并数组。
- `loading` 仅在第一页时为 `ture` ， `loadingMore` 为每次请求时都为 `true` 。
- `loadMore` 方法如果带有参数，表示修改了查询条件 `data` 。将会重置分页到第一页，并触发请求。
- `refresh` 相当于 `loadMore` 不带参数的方式触发请求，将使用当前缓存的分页条件和查询条件触发请求。

#### useLoadMore

```
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

    reload,
    loadMore,
    data,
    loadingMore,
    done: doneRef.current,
    pagination: {
      total: pageRef.current.total,
      current: pageRef.current.pageNum,
      pageSize: pageRef.current.pageSize
    }
  };
}
```

<code src="./demo/LoadMore1.jsx" />
<code src="./demo/LoadMore2.jsx" />

#### API

```
const { 
  ...,
  reload,
  loadMore,
  loadingMore,
  done,
  pagination
} = usePagination(service, {
  defaultPageSize,
  threshold,
  ref
});
```

#### Result

参数 | 说明 | 类型 |
------------- | ------------- | ------------- |
reload  | 触发重新加载 | `() => void` |
loadMore  | 触发加载更多 | `() => void` |
loadingMore  | 是否正在加载更多 | `boolean` |
done  | 是否加载完成 | `boolean` |
pagination  | 分页数据 `current` `pageSize` `total` | `object` |

#### Params

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
defaultPageSize  | 默认每页的数量 | `number` | `10` |
threshold  | 上拉自动加载，距离底部距离阈值 | `number` | `100` |
ref  | 容器的 `ref` ，如果存在，则在滚动到底部时，自动触发 loadMore | `RefObject<HTMLElement>` | - |
