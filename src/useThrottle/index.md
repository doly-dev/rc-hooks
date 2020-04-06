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

### 基本用法

<code src="./demo/Demo1.jsx" />

## API

```javascript
const throttledValue = useThrottle(value, [wait=0], [options={}]);
```

### Params

| 参数  | 说明                     | 类型   | 默认值 |
|-------|-----------------------|--------|--------|
| value | 需要防抖的值         | `any`    | -      |
| wait  | 防抖等待时间，单位为毫秒 | `number` | `0`   |
| options  | [`lodash.throttle`](https://www.lodashjs.com/docs/latest#_throttlefunc-wait0-options) 的 `options` 配置项 | `object`  | `{}` |
