# rc-hooks

[![npm][npm]][npm-url] ![GitHub](https://img.shields.io/github/license/doly-dev/rc-hooks.svg)

React Hooks Library.

[查看文档和示例][site]

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
  - [useControllableValue] - 便于管理 `受控/非受控` 状态
  - [usePersistFn] - 持久化 function
  - [usePrevious] - 保存上一次渲染时状态
  - [useSafeState] - 安全状态，组件卸载后 setState 不再执行
  - [useSize] - 获取并监听 dom 节点的宽高

[site]: https://doly-dev.github.io/rc-hooks/latest/index.html
[useasync]: https://doly-dev.github.io/rc-hooks/latest/index.html#/async/use-async
[useloadmore]: https://doly-dev.github.io/rc-hooks/latest/index.html#/async/use-load-more
[usedebounce]: https://doly-dev.github.io/rc-hooks/latest/index.html#/side-effect/use-debounce
[usethrottle]: https://doly-dev.github.io/rc-hooks/latest/index.html#/side-effect/use-throttle
[usedebouncefn]: https://doly-dev.github.io/rc-hooks/latest/index.html#/side-effect/use-debounce-fn
[usethrottlefn]: https://doly-dev.github.io/rc-hooks/latest/index.html#/side-effect/use-throttle-fn
[usemount]: https://doly-dev.github.io/rc-hooks/latest/index.html#/life-cycle/use-mount
[usemountedref]: https://doly-dev.github.io/rc-hooks/latest/index.html#/life-cycle/use-mounted-ref
[useupdate]: https://doly-dev.github.io/rc-hooks/latest/index.html#/life-cycle/use-update
[useunmount]: https://doly-dev.github.io/rc-hooks/latest/index.html#/life-cycle/use-unmount
[useunmountedref]: https://doly-dev.github.io/rc-hooks/latest/index.html#/life-cycle/use-unmounted-ref
[useupdateeffect]: https://doly-dev.github.io/rc-hooks/latest/index.html#/life-cycle/use-update-effect
[useupdatelayouteffect]: https://doly-dev.github.io/rc-hooks/latest/index.html#/life-cycle/use-update-layout-effect
[useprevious]: https://doly-dev.github.io/rc-hooks/latest/index.html#/other/use-previous
[usepersistfn]: https://doly-dev.github.io/rc-hooks/latest/index.html#/other/use-persist-fn
[useclickaway]: https://doly-dev.github.io/rc-hooks/latest/index.html#/other/use-click-away
[usesize]: https://doly-dev.github.io/rc-hooks/latest/index.html#/other/use-size
[usesafestate]: https://doly-dev.github.io/rc-hooks/latest/index.html#/other/use-safe-state
[usecontrollablevalue]: https://doly-dev.github.io/rc-hooks/latest/index.html#/other/use-controllable-value
[npm]: https://img.shields.io/npm/v/rc-hooks.svg
[npm-url]: https://npmjs.com/package/rc-hooks
