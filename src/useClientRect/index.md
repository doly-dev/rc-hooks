---
title: useClientRect
group:
  title: Other
  path: /other
  order: 4
legacy: /other/use-client-rect
hide: true
---

# useClientRect

获取元素的大小及其相对于视口的位置的 Hook。

## 代码演示

### 基本用法

<code src="./demos/Demo1.tsx" />

## API

```typescript
const [rect, ref]: [DOMRect, React.RefObject<HTMLDivElement>] = useClientRect();
```

### Result

| 参数 | 说明                             | 类型      |
| ---- | -------------------------------- | --------- |
| rect | dom 节点的尺寸和相对于视口的位置 | `DOMRect` |
| ref  | 将 ref 绑定 dom 节点             | -         |
