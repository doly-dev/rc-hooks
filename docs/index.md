---
title: Home
group:
  title: Home
  path: /
  order: 0
---

# Home

[![npm][npm]][npm-url]

React Hooks Library.

## 安装

```shell
npm install rc-hooks
# or
yarn add rc-hooks
```

## 使用

```javascript
import { useAsync } from 'rc-hooks';
```

## API

- Async
  - [useAsync] - 管理异步函数
- SideEffect
  - [useDebounce] - 用来处理防抖值
  - [useThrottle] - 用来处理节流值
  - [useDebounceFn] - 用来处理防抖函数
  - [useThrottleFn] - 用来处理节流函数
- LifeCycle
  - [useMount] - 只在组件 mount 时执行
  - [useUpdate] - 强制组件重新渲染
  - [useUnmount] - 只在组件 unmount 时执行
  - [useUpdateEffect] - 只在依赖更新时执行的 useEffect
  - [useUpdateLayoutEffect] - 只在依赖更新时执行的 useLayoutEffect
- Other
  - [useSize] - 获取并监听 dom 节点的宽高
  - [useControllableValue] - 便于管理 `受控/非受控` 组件的状态
  - [usePersistFn] - 持久化 function
  - [usePrevious] - 保存上一次渲染时状态

[useasync]: /async/use-async
[usedebounce]: /side-effect/use-debounce
[usethrottle]: /side-effect/use-throttle
[usedebouncefn]: /side-effect/use-debounce-fn
[usethrottlefn]: /side-effect/use-throttle-fn
[usemount]: /life-cycle/use-mount
[useupdate]: /life-cycle/use-update
[useunmount]: /life-cycle/use-unmount
[useupdateeffect]: /life-cycle/use-update-effect
[useupdatelayouteffect]: /life-cycle/use-update-layout-effect
[useprevious]: /other/use-previous
[usepersistfn]: /other/use-persist-fn
[usesize]: /other/use-size
[usecontrollablevalue]: /other/use-controllable-value
[npm]: https://img.shields.io/npm/v/rc-hooks.svg
[npm-url]: https://npmjs.com/package/rc-hooks
