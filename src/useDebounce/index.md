---
group:
  title: SideEffect
  order: 2
toc: content
---

# useDebounce

用来处理防抖值的 Hook。

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx"></code>

## API

```typescript
const debouncedValue = useDebounce(
  value: any,
  wait?: number,
  immediate?: boolean
);
```

### Params

| 参数      | 说明                       | 类型      | 默认值  |
| --------- | -------------------------- | --------- | ------- |
| value     | 需要防抖的值。             | `any`     | -       |
| wait      | 防抖等待时间，单位为毫秒。 | `number`  | `0`     |
| immediate | 是否在延迟开始前调用。     | `boolean` | `false` |
