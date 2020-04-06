---
title: useThrottleFn
group:
  title: SideEffect
  path: /side-effect
legacy: /side-effect/use-debounce-fn
---

# useThrottleFn

用来处理节流函数的 Hook。

## 代码演示

### 基本用法

<code src="./demo/Demo1.jsx" />

### 对比

<code src="./demo/Demo2.jsx" />

## API

```javascript
const throttledValue = useThrottleFn(fn, [wait=0], [options={}]);
```

### Params

| 参数  | 说明                     | 类型   | 默认值 |
|-------|-----------------------|--------|--------|
| fn | 需要节流的函数         | `function`    | `() => {}`      |
| wait  | 节流等待时间，单位为毫秒 | `number` | `0`   |
| options  | [`lodash.throttle`](https://www.lodashjs.com/docs/latest#_throttlefunc-wait0-options) 的 `options` 配置项 | `object`  | `{}` |
