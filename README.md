# rc-hooks

React Hooks Library. 

[查看文档和示例][site]

## 安装

```shell
npm install rc-hooks
# or
yarn install rc-hooks
```

## 使用

```javascript
import { useAsync } from "rc-hooks";
```

**按需引入**

如果你使用 `babel`，下面两种方式都可以只加载用到的组件。

- 方式一：指定模块文件，所有模块都放在 `lib` 目录下

```javascript
import useAsync from 'rc-hooks/lib/useAsync'
```

- 方式二：使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) ，在 `babel` `plugin` 中添加以下配置

```javascript
['import', { 
  libraryName: 'rc-hooks', 
  camel2DashComponentName: false
}, 'rc-hooks']
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

[site]: https://doly-dev.github.io/rc-hooks/site/0.x/

[useAsync]: https://doly-dev.github.io/rc-hooks/site/0.x/#/async/use-async

[useDebounce]: https://doly-dev.github.io/rc-hooks/site/0.x/#/side-effect/use-debounce
[useThrottle]: https://doly-dev.github.io/rc-hooks/site/0.x/#/side-effect/use-throttle
[useDebounceFn]: https://doly-dev.github.io/rc-hooks/site/0.x/#/side-effect/use-debounce-fn
[useThrottleFn]: https://doly-dev.github.io/rc-hooks/site/0.x/#/side-effect/use-throttle-fn

[useMount]: https://doly-dev.github.io/rc-hooks/site/0.x/#/life-cycle/use-mount
[useUpdate]: https://doly-dev.github.io/rc-hooks/site/0.x/#/life-cycle/use-update
[useUnmount]: https://doly-dev.github.io/rc-hooks/site/0.x/#/life-cycle/use-unmount
[useUpdateEffect]: https://doly-dev.github.io/rc-hooks/site/0.x/#/life-cycle/use-update-effect
[useUpdateLayoutEffect]: https://doly-dev.github.io/rc-hooks/site/0.x/#/life-cycle/use-update-layout-effect

[usePrevious]: https://doly-dev.github.io/rc-hooks/site/0.x/#/other/use-previous
[usePersistFn]: https://doly-dev.github.io/rc-hooks/site/0.x/#/other/use-persist-fn
[useClientRect]: https://doly-dev.github.io/rc-hooks/site/0.x/#/other/use-client-rect
