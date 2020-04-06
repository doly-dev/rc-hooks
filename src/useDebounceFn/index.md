---
title: useDebounceFn
group:
  title: SideEffect
  path: /side-effect
legacy: /side-effect/use-debounce-fn
---

# useDebounceFn

用来处理防抖函数的 Hook。

## 代码演示

### 基本用法

<code src="./demo/Demo1.jsx" />

### 对比

<code src="./demo/Demo2.jsx" />

## API

```javascript
const debouncedValue = useDebounceFn(fn, [wait=0], [options={}]);
```

### Params

| 参数  | 说明                     | 类型   | 默认值 |
|-------|-----------------------|--------|--------|
| fn | 需要防抖的函数         | `function`    | `() => {}`      |
| wait  | 防抖等待时间，单位为毫秒 | `number` | `0`   |
| options  | [`lodash.debounce`](https://www.lodashjs.com/docs/latest#_debouncefunc-wait0-options) 的 `options` 配置项 | `object`  | `{}` |
