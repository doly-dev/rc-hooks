# rc-hooks

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
import { useAsync } from "rc-hooks";
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
  - [usePrevious] - 保存上一次渲染时状态
  - [usePersistFn] - 持久化 function
  - [useClientRect] - 获取元素的大小及其相对于视口的位置

[site]: https://doly-dev.github.io/rc-hooks/site/

[useAsync]: https://doly-dev.github.io/rc-hooks/site/#/async/use-async

[useDebounce]: https://doly-dev.github.io/rc-hooks/site/#/side-effect/use-debounce
[useThrottle]: https://doly-dev.github.io/rc-hooks/site/#/side-effect/use-throttle
[useDebounceFn]: https://doly-dev.github.io/rc-hooks/site/#/side-effect/use-debounce-fn
[useThrottleFn]: https://doly-dev.github.io/rc-hooks/site/#/side-effect/use-throttle-fn

[useMount]: https://doly-dev.github.io/rc-hooks/site/#/life-cycle/use-mount
[useUpdate]: https://doly-dev.github.io/rc-hooks/site/#/life-cycle/use-update
[useUnmount]: https://doly-dev.github.io/rc-hooks/site/#/life-cycle/use-unmount
[useUpdateEffect]: https://doly-dev.github.io/rc-hooks/site/#/life-cycle/use-update-effect
[useUpdateLayoutEffect]: https://doly-dev.github.io/rc-hooks/site/#/life-cycle/use-update-layout-effect

[usePrevious]: https://doly-dev.github.io/rc-hooks/site/#/other/use-previous
[usePersistFn]: https://doly-dev.github.io/rc-hooks/site/#/other/use-persist-fn
[useClientRect]: https://doly-dev.github.io/rc-hooks/site/#/other/use-client-rect
