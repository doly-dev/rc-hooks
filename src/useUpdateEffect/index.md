---
title: useUpdateEffect
group:
  title: LifeCycle
  path: /life-cycle
legacy: /life-cycle/use-update-effect
---

# useUpdateEffect

只在依赖更新时执行的 useEffect Hook。

## 代码演示

### 基本用法

<code src="./demo/Demo1.jsx" />

## API

```javascript
useUpdateEffect(fn: () => void, deps?: any[]);
```

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| fn | 可执行函数  | `function` | -      |
| deps | 可选项，传入依赖变化的对象  | `any[]`      |
