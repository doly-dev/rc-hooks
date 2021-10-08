---
title: useMountedRef
group:
  title: LifeCycle
  path: /life-cycle
  order: 3
legacy: /life-cycle/use-mounted-ref
---

# useMountedRef

用于异步回调 或 dom 操作判断当前组件是否装载，如果装载再去更新，避免因组件卸载后更新状态而导致的内存泄漏。

**<mark>组件未加载完成时，mountedRef 的值也为 false 。</mark>**

大多数场景中，你需要的可能是 [`useUnmountedRef`](/life-cycle/use-unmounted-ref) 。

## 代码演示

### 基础用法

<code src="./demos/basic.tsx" />

## API

```typescript
const mountedRef = useMountedRef();

useEffect(()=>{
  fetch().then(()=>{
    if(mountedRef.current){
      setState(...)
    }
  })
});
```

### Result

| 参数       | 说明                     | 类型                              |
| ---------- | ------------------------ | --------------------------------- |
| mountedRef | ref 值为当前组件是否装载 | `React.MutableRefObject<boolean>` |
