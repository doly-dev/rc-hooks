---
group:
  title: LifeCycle
toc: content
---

# useUnmountedRef

用于异步回调中判断当前组件是否卸载。

如果组件卸载就不更新状态，避免因组件卸载后更新状态而导致的内存泄漏。

## 代码演示

### 基础用法

<code src="./demos/basic.tsx"></code>

## API

```typescript
const unmountedRef = useUnmountedRef();

useEffect(()=>{
  fetch().then(()=>{
    if(unmountedRef.current){
      return;
    }
    setState(...)
  })
});
```

### Result

| 参数         | 说明                     | 类型                              |
| ------------ | ------------------------ | --------------------------------- |
| unmountedRef | ref 值为当前组件是否卸载 | `React.MutableRefObject<boolean>` |
