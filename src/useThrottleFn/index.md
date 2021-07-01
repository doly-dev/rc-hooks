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

<code src="./demos/Demo1.tsx" />

### 对比

<code src="./demos/Demo2.tsx" />

## API

```javascript
const { run, cancel } = useThrottleFn(
  fn: (...args: any) => any,
  wait?: number,
  options?: object
);
```

### Result

| 参数   | 说明                           | 类型 |
| ------ | ------------------------------ | ---- |
| run    | 触发执行 fn，参数也会传递给 fn |
| cancel | 取消当前节流                   |

### Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fn | 需要节流的函数 | `function` | `() => {}` |
| wait | 节流等待时间，单位为毫秒 | `number` | `0` |
| options | [`lodash.throttle`](https://www.lodashjs.com/docs/latest#_throttlefunc-wait0-options) 的 `options` 配置项 | `object` | `{}` |
