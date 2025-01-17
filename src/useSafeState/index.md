---
group:
  title: State
toc: content
---

# useSafeState

用法与 React.useState 完全一样，但是在组件卸载后 setState 不再执行，避免因组件卸载后更新状态而导致的内存泄漏。

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx"></code>

## API

```typescript
const [state, setState] = useSafeState(initialState?);
```

和 React.useState 一样。
