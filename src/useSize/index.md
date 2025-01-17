---
group:
  title: Other
toc: content
---

# useSize

获取并监听 dom 节点的宽高。

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx"></code>

### 显示/隐藏

<code src="./demos/Demo2.tsx"></code>

## API

```typescript
const size = useSize(ref: (() => HTMLElement) | HTMLElement | MutableRefObject<HTMLElement>);
```

### Result

| 参数 | 说明               | 类型                                  |
| ---- | ------------------ | ------------------------------------- |
| size | `dom` 节点的尺寸。 | `{ width?:number; height?: number; }` |
