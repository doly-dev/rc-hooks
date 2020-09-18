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

### 基本用法

<code src="./demo/Demo1.jsx" />

## API

```javascript
const debouncedValue = useDebounce(
  value: any, 
  wait?: number, 
  options?: object
);
```

### Params

| 参数  | 说明                     | 类型   | 默认值 |
|-------|-----------------------|--------|--------|
| value | 需要防抖的值         | `any`    | -      |
| wait  | 防抖等待时间，单位为毫秒 | `number` | `0`   |
| options  | [`lodash.debounce`](https://www.lodashjs.com/docs/latest#_debouncefunc-wait0-options) 的 `options` 配置项 | `object`  | `{}` |
