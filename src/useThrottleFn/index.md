---
title: useThrottleFn
group:
  title: SideEffect
  path: /side-effect
legacy: /side-effect/use-debounce-fn
---

# useThrottleFn

用来处理节流函数的 Hook。

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx" />

### 对比

<code src="./demos/Demo2.tsx" />

## API

```typescript
const { run, cancel, flush } = useThrottleFn(
  fn: (...args: any) => any,
  wait?: number,
  immediate?: boolean
);
```

### Result

| 参数   | 说明                                 | 类型                      |
| ------ | ------------------------------------ | ------------------------- |
| run    | 触发执行 `fn`，参数也会传递给 `fn`。 | `(...args: any[]) => any` |
| cancel | 取消当前节流。                       | `() => void`              |
| flush  | 立即调用节流函数。                   | `() => void`              |

### Params

| 参数      | 说明                       | 类型       | 默认值     |
| --------- | -------------------------- | ---------- | ---------- |
| fn        | 需要节流的函数。           | `function` | `() => {}` |
| wait      | 节流等待时间，单位为毫秒。 | `number`   | `0`        |
| immediate | 是否在延迟开始前调用。     | `boolean`  | `true`     |
