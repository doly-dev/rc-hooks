import useAsync from "./useAsync";

import useDebounce from "./useDebounce";
import useDebounceFn from "./useDebounceFn";
import useThrottle from "./useThrottle";
import useThrottleFn from "./useThrottleFn";

import useMount from "./useMount";
import useUnmount from "./useUnmount";
import useUpdate from "./useUpdate";
import useUpdateEffect from "./useUpdateEffect";
import useUpdateLayoutEffect from "./useUpdateLayoutEffect";

import useClientRect from "./useClientRect";
import usePrevious from "./usePrevious";
import usePersistFn from "./usePersistFn";

const demos = [
  // async
  {
    name: 'useAsync',
    description: "管理异步函数，支持自动/手动调用、轮询、防抖、节流、缓存等特性。",
    component: useAsync
  },
  // side effect
  {
    name: 'useDebounce',
    description: "用来处理防抖值的 Hook。",
    component: useDebounce
  },
  {
    name: 'useDebounceFn',
    description: "用来处理防抖函数的 Hook。",
    component: useDebounceFn
  },
  {
    name: 'useThrottleFn',
    description: "用来处理节流函数的 Hook。",
    component: useThrottleFn
  },
  {
    name: 'useThrottle',
    description: "用来处理节流值的 Hook。",
    component: useThrottle
  },

  // life cycle
  {
    name: 'useMount',
    description: "只在组件 mount 时执行的 hook",
    component: useMount
  },
  {
    name: 'useUnmount',
    description: "只在组件 unmount 时执行的 hook",
    component: useUnmount
  },
  {
    name: 'useUpdate',
    description: "强制组件重新渲染的 hook。",
    component: useUpdate
  },
  {
    name: 'useUpdateEffect',
    description: "只在依赖更新时执行的 useEffect hook。",
    component: useUpdateEffect
  },
  {
    name: 'useUpdateLayoutEffect',
    description: "只在依赖更新时执行的 useLayoutEffect Hook。",
    component: useUpdateLayoutEffect
  },

  // other
  {
    name: 'useClientRect',
    description: "获取元素的大小及其相对于视口的位置。",
    component: useClientRect
  },
  {
    name: 'usePrevious',
    description: "获取上一轮的 props 或 state",
    component: usePrevious
  },
  {
    name: 'usePersistFn',
    description: "持久化 function 的 Hook",
    component: usePersistFn
  },
];

function getDemoByName(name) {
  return demos.find(item=>item.name===name);
}

export {
  getDemoByName,
  demos
}