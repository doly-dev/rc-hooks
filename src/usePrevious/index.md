---
title: usePrevious
group:
  title: Other
  path: /other
legacy: /other/use-previous
---

# usePrevious

保存上一次渲染时状态的 Hook。

> 参考 [如何获取上一轮的 props 或 state？](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state)

## 代码演示

### 基本用法

<code src="./demos/Demo1.tsx" />

## API

```typescript
const prevState = usePrevious((state: any));
```

### Result

| 参数      | 说明            | 类型 |
| --------- | --------------- | ---- |
| prevState | 上次 state 的值 | -    |

### Params

| 参数  | 说明             | 类型 | 默认值 |
| ----- | ---------------- | ---- | ------ |
| state | 需要记录变化的值 | -    | -      |
