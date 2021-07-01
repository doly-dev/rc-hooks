# rc-hooks

[![npm][npm]][npm-url]
![GitHub](https://img.shields.io/github/license/doly-dev/rc-hooks.svg)

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
  - [useClickAway] - 管理目标元素外的事件
  - [useSize] - 获取并监听 dom 节点的宽高
  - [useControllableValue] - 便于管理 `受控/非受控` 状态
  - [usePersistFn] - 持久化 function
  - [usePrevious] - 保存上一次渲染时状态

[site]: https://doly-dev.github.io/rc-hooks/latest/index.html
[useasync]: https://doly-dev.github.io/rc-hooks/latest/index.html#/async/use-async
[usedebounce]: https://doly-dev.github.io/rc-hooks/latest/index.html#/side-effect/use-debounce
[usethrottle]: https://doly-dev.github.io/rc-hooks/latest/index.html#/side-effect/use-throttle
[usedebouncefn]: https://doly-dev.github.io/rc-hooks/latest/index.html#/side-effect/use-debounce-fn
[usethrottlefn]: https://doly-dev.github.io/rc-hooks/latest/index.html#/side-effect/use-throttle-fn
[usemount]: https://doly-dev.github.io/rc-hooks/latest/index.html#/life-cycle/use-mount
[useupdate]: https://doly-dev.github.io/rc-hooks/latest/index.html#/life-cycle/use-update
[useunmount]: https://doly-dev.github.io/rc-hooks/latest/index.html#/life-cycle/use-unmount
[useupdateeffect]: https://doly-dev.github.io/rc-hooks/latest/index.html#/life-cycle/use-update-effect
[useupdatelayouteffect]: https://doly-dev.github.io/rc-hooks/latest/index.html#/life-cycle/use-update-layout-effect
[useprevious]: https://doly-dev.github.io/rc-hooks/latest/index.html#/other/use-previous
[usepersistfn]: https://doly-dev.github.io/rc-hooks/latest/index.html#/other/use-persist-fn
[useclickaway]: https://doly-dev.github.io/rc-hooks/latest/index.html#/other/use-click-away
[usesize]: https://doly-dev.github.io/rc-hooks/latest/index.html#/other/use-size
[usecontrollablevalue]: https://doly-dev.github.io/rc-hooks/latest/index.html#/other/use-controllable-value
[npm]: https://img.shields.io/npm/v/rc-hooks.svg
[npm-url]: https://npmjs.com/package/rc-hooks
