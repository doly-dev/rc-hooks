---
title: useDebounce
group:
  title: SideEffect
  path: /side-effect
  order: 2
legacy: /side-effect/use-debounce
---

# useDebounce

用来处理防抖值的 Hook。

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx" />

## API

```typescript
const debouncedValue = useDebounce(
  value: any,
  wait?: number,
  options?: DebounceSettings
);
```

### Params

| 参数    | 说明                     | 类型               | 默认值 |
| ------- | ------------------------ | ------------------ | ------ |
| value   | 需要防抖的值             | `any`              | -      |
| wait    | 防抖等待时间，单位为毫秒 | `number`           | `0`    |
| options | 防抖配置                 | `DebounceSettings` | -      |

### DebounceSettings

| 参数     | 说明                     | 类型      | 默认值  |
| -------- | ------------------------ | --------- | ------- |
| leading  | 延迟开始前调用           | `boolean` | `false` |
| maxWait  | 调用前允许延迟的最大时间 | `number`  | -       |
| trailing | 延迟结束后调用           | `boolean` | `true`  |
