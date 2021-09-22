---
title: useIsMounted
group:
  title: Other
  path: /other
  order: 4
legacy: /other/use-is-mounted
---

# useIsMounted

**<mark>即将废弃，请使用 [`useUnmountedRef`](/life-cycle/use-unmounted-ref) 或 [`useMountedRef`](/life-cycle/use-mounted-ref)</mark>**

用于异步回调中判断当前组件是否装载，如果装载再去更新状态，防止警告内存可能溢出。

> 参考：[cant-perform-a-react-state-update-on-an-unmounted-component](https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component)

## 代码演示

### 基本用法

<code src="./demos/basic.tsx" />

## API

```javascript
const isMountedRef = useIsMounted();

useEffect(()=>{
  fetch().then(()=>{
    if(isMountedRef.current){
      setState(...)
    }
  })
});
```

### Result

| 参数 | 说明           | 类型                                  |
| ---- | -------------- | ------------------------------------- |
| isMountedRef | ref 值为当前组件是否装载 | `React.MutableRefObject<boolean>` |
