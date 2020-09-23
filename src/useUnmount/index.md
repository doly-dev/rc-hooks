---
title: useUnmount
group:
  title: LifeCycle
  path: /life-cycle
legacy: /life-cycle/use-unmount
---

# useUnmount

只在组件 unmount 时执行的 Hook。

## 代码演示

### 基本用法

<code src="./demo/Demo1.tsx" />

## API

```javascript
useUnmount(fn: () => void);
```

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| fn | unmount 时执行的函数  | `function` | -      |

