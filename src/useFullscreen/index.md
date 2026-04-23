---
group:
  title: Other
toc: content
---

# useFullscreen

管理全屏状态的 Hook。

## 用法

### 基础用法

<code src='./demos/Demo1.tsx'></code>

### 带回调的用法

<code src='./demos/Demo2.tsx'></code>

### 无 ref 的用法

<code src='./demos/Demo3.tsx'></code>

## API

```typescript
function useFullscreen(
  ref?: RefType,
  options?: {
    onEnter?: () => void;
    onExit?: () => void;
  }
): {
  isFullscreen: boolean;
  enter: () => void;
  exit: () => void;
  toggle: () => void;
};
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ref | Dom 节点或 Ref 对象。如果不传，则默认使用 document.documentElement | RefType | - |
| options | 配置项 | `{ onEnter?: () => void; onExit?: () => void; }` | {} |
| options.onEnter | 进入全屏时的回调 | () => void | - |
| options.onExit | 退出全屏时的回调 | () => void | - |

### 返回值

| 返回值       | 说明               | 类型       |
| ------------ | ------------------ | ---------- |
| isFullscreen | 当前是否为全屏状态 | boolean    |
| enter        | 进入全屏的方法     | () => void |
| exit         | 退出全屏的方法     | () => void |
| toggle       | 切换全屏状态的方法 | () => void |

## 注意事项

- 浏览器全屏 API 在不同浏览器中有不同的实现，本 Hook 已做了兼容性处理，支持主流浏览器。
- 全屏操作需要用户交互触发，否则可能会被浏览器阻止。
- 在某些浏览器中，全屏状态可能会被用户手动退出，本 Hook 会监听全屏状态的变化并更新 isFullscreen 值。
