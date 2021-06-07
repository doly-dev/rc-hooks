---
title: useUpdateLayoutEffect
group:
  title: LifeCycle
  path: /life-cycle
legacy: /life-cycle/use-update-layout-effect
---

# useUpdateLayoutEffect

只在依赖更新时执行的 useLayoutEffect Hook。

## 代码演示

### 基本用法

<code src="./demos/Demo1.tsx" />

## API

```javascript
useUpdateLayoutEffect(effect: () => void, deps?: any[]);
```

### Params

| 参数   | 说明                       | 类型       | 默认值 |
| ------ | -------------------------- | ---------- | ------ |
| effect | 可执行函数                 | `function` | -      |
| deps   | 可选项，传入依赖变化的对象 | `any[]`    |
