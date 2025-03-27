---
group:
  title: Async
  order: 1
toc: content
---

# useAsync

管理异步函数的 Hook。

## 特性

- 自动请求
- 手动请求
- 缓存 & 预加载
- 持久化数据
- 共享异步
- 屏幕聚焦重新请求
- 轮询
- 防抖
- 节流
- 突变
- Loading Delay
- refreshDeps
- 并行请求
- 分页
- 加载更多
- ...

## 代码演示

### 默认请求

<code src="./demos/Default.tsx"></code>

### 手动触发

<code src="./demos/AutoRun.tsx"></code>

### 缓存 & 预加载

<code src="./demos/Preload.tsx"></code>

### 清理缓存

<code src="./demos/ClearCache.tsx"></code>

### 持久化数据

<code src="./demos/Persisted.tsx"></code>

### 共享异步

多个相同 `cacheKey` 的异步，同时触发中，只会执行第一个，后面执行的将共享第一个异步执行的结果。

<code src="./demos/CacheKey.tsx"></code>

### 屏幕聚焦重新请求

<code src="./demos/RefreshOnWindowFocus.tsx"></code>

### 轮询

<code src="./demos/PollingInterval.tsx"></code>

### 防抖

<code src="./demos/DebounceInterval.tsx"></code>

### 节流

<code src="./demos/ThrottleInterval.tsx"></code>

### 突变

<code src="./demos/Mutate.tsx"></code>

### Loading Delay

<code src="./demos/LoadingDelay.tsx"></code>

### refreshDeps

当某些 `state` 变化时，我们需要重新执行异步请求，一般我们会这样写代码：

```typescript
const [userId, setUserId] = useState('1');
const { data, run, loading } = useRequest(() => getUserSchool(userId));
useEffect(() => {
  run();
}, [userId]);
```

`refreshDeps` 是一个语法糖，让你更方便的实现上面的功能。当 `refreshDeps` 变化时，会使用之前的 `params` 重新执行。

<code src="./demos/RefreshDeps.tsx"></code>

### 并行请求

<code src="./demos/Parallel.tsx"></code>

## API

```typescript
const { data, error, loading, params, run, cancel, refresh, mutate } = useAsync<R, P>(asyncFn, {
  autoRun,
  defaultParams,
  refreshDeps,
  onSuccess,
  onError,
  cacheKey,
  cacheTime,
  persisted,
  loadingDelay,
  pollingInterval,
  pollingWhenHidden,
  refreshOnWindowFocus,
  focusTimespan,
  debounceInterval,
  throttleInterval
});
```

### Result

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| data | 异步函数的返回值，默认为 `undefined`。 | `any` |
| error | 异步函数抛出的异常，默认为 `undefined` | `Error` |
| loading | 异步函数正在执行 | `boolean` |
| params | 执行异步函数的参数数组。比如你触发了 `run(1, 2, 3)`，则 `params` 等于 `[1, 2, 3]` | `any[]` |
| run | 手动触发异步函数。`debounce` 模式与 `throttle` 模式返回值为 `Promise<null>` | `(...args: P) => Promise<R \| null>` |
| cancel | 取消当前请求。如果有轮询，停止轮询。 | `() => void` |
| refresh | 使用上一次的 `params`，重新执行异步函数。 | `() => Promise<R \| null>` |
| mutate | 直接修改 `data` | `(newData: DataType \| undefined \| ((oldData) => newData)) => void` |

### Params

所有配置项都是可选的。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoRun | 在初始化时自动执行异步函数。如果设置为 `false`，则需要手动调用 `run` 触发执行。 | `boolean` | `true` |
| initialData | 初始化的 `data`。 | `R` | - |
| defaultLoading | 初始化默认 `loading` 值。 | `boolean` | 默认为 `autoRun` 值 |
| defaultParams | 如果 `autoRun=true` 自动执行 `run` 的默认参数。 | `any[]` | - |
| refreshDeps | 在 `autoRun = true` 时，`refreshDeps` 变化，会触发重新执行 | `any[]` | - |
| onBefore | 异步函数执行前触发，参数为 `params`。 | `(params) => void` | - |
| onSuccess | 异步函数 `resolve` 时触发，参数为 `data` 和 `params`。 | `(data, params) => void` | - |
| onError | 异步函数报错时触发，参数为 `error` 和 `params`。 | `(error, parmams) => void` | - |
| onFinally | 异步函数执行完成后触发。 | `() => void` | - |
| cacheKey | 缓存的键值。启用缓存机制，异步成功结果将被缓存。如果多个相同 cacheKey 的异步同时触发中，将共享第一个异步结果。 | `string` | - |
| cacheTime | 缓存时间。单位毫秒。 | `number` | `5*60*1000` |
| persisted | 持久化数据。当有缓存数据时，不再执行异步函数。需要配合 `cacheKey` `cacheTime` 使用。 | `boolean` | `false` |
| loadingDelay | 设置 `loading` 延迟时间，避免闪烁，单位为毫秒。 | `number` | - |
| pollingInterval | 轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 `run`。 | `number` | - |
| pollingWhenHidden | 在页面隐藏时，是否继续轮询。如果为 `true`，不会停止轮询。如果为 `false`，在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询。 | `boolean` | `true` |
| refreshOnWindowFocus | 在屏幕重新获取焦点或重新显示时，是否重新发起请求。如果为 `false`，不会重新发起请求。如果为 `true`，在屏幕重新聚焦或重新显示时，会重新发起请求。 | `boolean` | `false` |
| focusTimespan | 屏幕重新聚焦，重新发起请求时间间隔。需要配置 `refreshOnWindowFocus` 使用。 | `number` | `5000` |
| debounceInterval | 防抖间隔，单位为毫秒，设置后，请求进入防抖模式。 | `number` | - |
| throttleInterval | 节流间隔，单位为毫秒，设置后，请求进入节流模式。 | `number` | - |

### clearCache

清理缓存。如果不传参数，表示清理全部。

```typescript
import { clearCache } from 'rc-hooks';

clearCache(cacheKey?: string|string[]);
```

## 扩展用法

### 加载更多

[点击查看 useLoadMore](/hooks/use-load-more)

### 分页

[点击查看 usePagination](/hooks/use-pagination)
