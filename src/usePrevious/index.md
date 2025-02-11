---
group:
  title: State
toc: content
---

# usePrevious

返回上一次的 state 或 props 。

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx"></code>

### 不受其他状态更新影响

<code src="./demos/Demo2.tsx"></code>

## API

```typescript
const prevState = usePrevious(state: any);
```

### Result

| 参数      | 说明             | 类型 |
| --------- | ---------------- | ---- |
| prevState | 上一次记录的值。 | -    |

### Params

| 参数  | 说明               | 类型 | 默认值 |
| ----- | ------------------ | ---- | ------ |
| state | 需要记录变化的值。 | -    | -      |
