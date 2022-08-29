---
title: useMount
group:
  title: LifeCycle
  path: /life-cycle
  order: 3
legacy: /life-cycle/use-mount
---

# useMount

只在组件 mount 时执行的 Hook。

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx" />

## API

```typescript
useMount(fn: () => void);
```

### Params

| 参数 | 说明               | 类型       | 默认值 |
| ---- | ------------------ | ---------- | ------ |
| fn   | mount 时执行的函数 | `function` | -      |
