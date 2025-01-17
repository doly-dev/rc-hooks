---
group:
  title: State
toc: content
---

# useSetState

管理 object 类型 state 的 Hook ，用法和 class 组件的 `this.setState` 基本一致，内部使用展开操作符进行合并。

## 代码演示

### 基础用法

<code src="./demos/basic.tsx"></code>

## API

```typescript
const [state, setState] = useSetState(initialState?);
```
