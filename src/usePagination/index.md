---
group:
  title: Async
toc: content
---

# usePagination

基于 [useAsync](/hooks/use-async) 扩展，用于管理`分页`的 Hook。

**核心特性**

- 自动管理分页 `current` `pageSize`
- `asyncFn` 第一个参数必定含有 `{ current, pageSize }`
- `asyncFn` 返回的数据结构必须包含 `{ list: DataItem[], total: number; }` 。
- 额外返回 `pagination` 字段，包含所有分页信息，及操作分页的函数。
- 额外返回 `tableProps` 字段，适配 `antd Table` 组件的数据结构，可以直接用在 `antd Table` 组件上。。
- `refreshDeps` 变化后，会重置`current`为 1，并触发异步方法。

## 代码演示

### 基础用法

<code src="./demos/Pagination1.tsx"></code>

### Ant Table

<code src="./demos/Pagination2.tsx"></code>

### 第一个参数包含其他值

<code src="./demos/Pagination3.tsx"></code>

## API

```typescript
const {
  ...,
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPage: number;
    onChange: (current: number, pageSize: number) => void;
    changeCurrent: (current: number) => void;
    changePageSize: (pageSize: number) => void;
  };
  tableProps: {
    dataSource: DataItem[];
    loading: boolean;
    onChange: (
      pagination: any,
      filters?: any,
      sorter?: any,
    ) => void;
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    };
  };
} = usePagination(async ({ current, data, sorter?, filters?, extra? }) => ({
    list,
    total,
    ...
  }), {
  ...,
  defaultPageSize,
  refreshDeps,
});
```

除了以下，其它和 [useAsync](/hooks/use-async) 一样。

### Result

| 参数       | 说明                                                             | 类型 |
| ---------- | ---------------------------------------------------------------- | ---- |
| pagination | 分页数据及操作分页的方法。                                       | -    |
| tableProps | 适配 antd Table 组件的数据结构，可以直接用在 antd Table 组件上。 | -    |

### Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultPageSize | 默认每页的数量。 | `number` | `10` |
| refreshDeps | 在 `autoRun = true` 时，refreshDeps 变化，会重置 `current` 到第一页，并执行 `run` 方法。 | `any[]` | - |
