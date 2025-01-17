---
group:
  title: LifeCycle
toc: content
---

# useUnmount

只在组件 unmount 时执行的 Hook。

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx"></code>

## API

```typescript
useUnmount(fn: () => void);
```

### Params

| 参数 | 说明                          | 类型       | 默认值 |
| ---- | ----------------------------- | ---------- | ------ |
| fn   | 组件 `unmount` 时执行的函数。 | `function` | -      |
