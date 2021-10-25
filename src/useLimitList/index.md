---
title: useLimitList
group:
  title: Other
  path: /other
legacy: /other/use-limit-list
---

# useLimitList

管理列表展示数量的 Hook。

## 代码演示

### 基础用法

<code src='./demos/basic.tsx' />
<code src='./demos/min.tsx' />
<code src='./demos/count.tsx' />

### 异步获取列表

<code src='./demos/async.tsx' />

### 可变列表

<code src='./demos/control.tsx' />

## API

```typescript
const { data, canLimit, limited, toggle } = useLimitList(list: any[], {
  count: number;
  defaultLimited: boolean;
});
```

### Result

| 参数     | 说明                                                                   | 类型         |
| -------- | ---------------------------------------------------------------------- | ------------ |
| data     | 列表数据。                                                             | `any[]`      |
| canLimit | 是否可以限制列表数量。<br/>当列表数量小于等于 `count` 时，为 `false`。 | `boolean`    |
| limited  | 当前是否限制列表数据。                                                 | `boolean`    |
| toggle   | 切换限制/不限制列表数据。                                              | `() => void` |

### Params

所有配置项都是可选的。

| 参数           | 说明                   | 类型      | 默认值 |
| -------------- | ---------------------- | --------- | ------ |
| count          | 默认限制列表数量       | `number`  | `3`    |
| defaultLimited | 默认是否限制列表数据。 | `boolean` | `true` |
