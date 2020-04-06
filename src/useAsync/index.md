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

**规划中：**

* [ ] 长缓存：有缓存数据的情况下不再进行请求
* [ ] 缓存方式：目前是缓存到内存中，后面需支持 `sessionStorage` `localStorage`，能更好的支持长缓存
* [ ] 并行请求示例
* [ ] 分页加载示例

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