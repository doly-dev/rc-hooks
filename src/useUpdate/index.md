---
group:
  title: LifeCycle
toc: content
---

# useUpdate

强制组件重新渲染的 Hook。

内部使用了 useSafeState ，调用时如果组件已经卸载则不会触发。

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx"></code>

## API

```typescript
const update = useUpdate();
```
