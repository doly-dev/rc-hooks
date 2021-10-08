---
title: useThrottle
group:
  title: SideEffect
  path: /side-effect
legacy: /side-effect/use-throttle
---

# useThrottle

用来处理节流值的 Hook。

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx" />

## API

```typescript
const throttledValue = useThrottle(
  value: any,
  wait?: number,
  options?: object
);
```

### Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 需要防抖的值 | `any` | - |
| wait | 防抖等待时间，单位为毫秒 | `number` | `0` |
| options | [`lodash.throttle`](https://www.lodashjs.com/docs/latest#_throttlefunc-wait0-options) 的 `options` 配置项 | `object` | `{}` |
