---
group:
  title: LifeCycle
toc: content
---

# useUpdateEffect

只在依赖更新时执行的 useEffect Hook。

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx"></code>

## API

```typescript
useUpdateEffect(effect: () => any, deps?: any[]);
```

### Params

| 参数   | 说明                         | 类型       | 默认值 |
| ------ | ---------------------------- | ---------- | ------ |
| effect | 可执行函数。                 | `function` | -      |
| deps   | 可选项，传入依赖变化的对象。 | `any[]`    | -      |
