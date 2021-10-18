---
title: useLoadMore
group:
  title: Async
  path: /async
  order: 1
legacy: /async/use-load-more
---

# useLoadMore

基于 [`useAsync`](/async/use-async) 扩展，用于管理`加载更多`的 Hook。

**核心特性**

- 自动管理列表数据，返回的 `data.list` 为异步函数返回的 `list` 合并数组。
- `asyncFn` 第一个参数为`current`和 `data`。
- `asyncFn` 返回的数据结构必须包含 `{ list: DataItem[] }`，如果不满足可以通过 `formatResult` 转换。
- 设置 `ref` 和 `isNoMore` 可实现上拉自动加载更多功能。
- `refreshDeps` 变化后，会重置`current`为第一页，并触发异步方法。
- 在`请求失败`或`取消请求`后，如果`current`大于 1，自动减 1。

## 代码演示

### 基础用法

<code iframe="300" src="./demos/LoadMore1.tsx" />

### 滚动底部自动加载

<code src="./demos/LoadMore2.tsx" />

### 根据 data 进行下一次请求

<code src="./demos/LoadMore3.tsx" />

### 搜索列表

<code src="./demos/LoadMore4.tsx" />

## API

```typescript
const {
  ...,
  loadMore,
  loadingMore,
  noMore
} = useLoadMore<R>(async ({ current, data }) => {
  return {
    list,
    ...
  }
}, {
  ...,
  threshold,
  ref,
  isNoMore
});
```

除了以下，其它和 [`useAsync`](/async/use-async) 一样。

### Result

| 参数        | 说明                                                 | 类型                     |
| ----------- | ---------------------------------------------------- | ------------------------ |
| loadMore    | 触发加载更多。页码加 1，并触发 `asynfFn`。           | `() => void`             |
| loadingMore | 是否正在加载更多。即加载中并且 `current` 不等于 1    | `boolean`                |
| noMore      | 是否没有更多                                         | `boolean`                |
| refresh     | 重置`current`到第 1 页，并清除之前列表数据，发起请求 | `()=>Promise<R \| null>` |

### Params

不支持 `'cacheKey' | 'cacheTime' | 'persisted' | 'pollingInterval' | 'pollingWhenHidden'` 配置项

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| threshold | 上拉自动加载，距离底部距离阈值 | `number` | `100` |
| ref | 滚动容器的 `ref` ，如果存在，则在滚动到底部时，自动触发 loadMore | `Ref<HTMLElement>` | - |
| isNoMore | 判断是否没有更多数据 | `(data?: R) => boolean` | - |
| refreshDeps | 在 `autoRun = true` 时，refreshDeps 变化，会执行 refresh 。 | `any[]` |
