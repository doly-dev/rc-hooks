import useAsync from "./useAsync";
import useClientRect from "./useClientRect";
import usePrevious from "./usePrevious";
import usePersistFn from "./usePersistFn";
import useUpdateEffect from "./useUpdateEffect";

const demos = [
  {
    name: 'useAsync',
    description: "管理异步函数，支持自动/手动调用、轮询、防抖、节流、缓存等特性。",
    component: useAsync
  },
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
  {
    name: 'useUpdateEffect',
    description: "一个只在依赖更新时执行的 useEffect hook。",
    component: useUpdateEffect
  }
];

function getDemoByName(name) {
  return demos.find(item=>item.name===name);
}

export {
  getDemoByName,
  demos
}