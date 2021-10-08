---
title: Introduction
group:
  title: Introduction
  path: /
  order: 0
---

# rc-hooks

[![npm][npm]][npm-url] ![GitHub](https://img.shields.io/github/license/doly-dev/rc-hooks.svg)

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
  - [useLoadMore] - 管理加载更多
- SideEffect
  - [useDebounce] - 用来处理防抖值
  - [useDebounceFn] - 用来处理防抖函数
  - [useThrottle] - 用来处理节流值
  - [useThrottleFn] - 用来处理节流函数
- LifeCycle
  - [useMount] - 只在组件 mount 时执行
  - [useMountedRef] - 用于异步回调或 dom 操作中判断当前组件是否装载
  - [useUpdate] - 强制组件重新渲染
  - [useUnmount] - 只在组件 unmount 时执行
  - [useUnmountedRef] - 用于判断当前组件是否卸载
  - [useUpdateEffect] - 只在依赖更新时执行的 useEffect
  - [useUpdateLayoutEffect] - 只在依赖更新时执行的 useLayoutEffect
- Other
  - [useClickAway] - 管理目标元素外的事件
  - [useControllableValue] - 便于管理 `受控/非受控` 组件的状态
  - [usePersistFn] - 持久化 function
  - [usePrevious] - 保存上一次渲染时状态
  - [useSafeState] - 安全状态，组件卸载后 setState 不再执行
  - [useSize] - 获取并监听 dom 节点的宽高

[useasync]: /async/use-async
[useloadmore]: /async/use-load-more
[usedebounce]: /side-effect/use-debounce
[usethrottle]: /side-effect/use-throttle
[usedebouncefn]: /side-effect/use-debounce-fn
[usethrottlefn]: /side-effect/use-throttle-fn
[usemount]: /life-cycle/use-mount
[usemountedref]: /life-cycle/use-mounted-ref
[useupdate]: /life-cycle/use-update
[useunmount]: /life-cycle/use-unmount
[useunmountedref]: /life-cycle/use-unmounted-ref
[useupdateeffect]: /life-cycle/use-update-effect
[useupdatelayouteffect]: /life-cycle/use-update-layout-effect
[useprevious]: /other/use-previous
[usepersistfn]: /other/use-persist-fn
[usesafestate]: /other/use-safe-state
[usesize]: /other/use-size
[useclickaway]: /other/use-click-away
[usecontrollablevalue]: /other/use-controllable-value
[npm]: https://img.shields.io/npm/v/rc-hooks.svg
[npm-url]: https://npmjs.com/package/rc-hooks
