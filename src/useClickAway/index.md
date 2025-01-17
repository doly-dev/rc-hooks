---
group:
  title: Other
  order: 5
toc: content
---

# useClickAway

管理目标元素外事件的 Hook。

## 代码演示

### 基础用法

<code src="./demos/basic.tsx"></code>

### 自定义 Dom

<code src="./demos/defineDom.tsx"></code>

### 多个目标对象

<code src="./demos/moreDom.tsx"></code>

### 监听其他事件

<code src="./demos/defineEvent.tsx"></code>

### 监听多个事件

<code src="./demos/moreEvent.tsx"></code>

## API

| 参数        | 说明                            | 类型                   | 默认值  |
| ----------- | ------------------------------- | ---------------------- | ------- |
| ref         | Dom 节点或 Ref 对象，支持数组。 | `RefType \| RefType[]` | -       |
| onClickAway | 触发事件的函数。                | `(event)=>void`        | -       |
| events      | 监听事件名称，支持数组。        | `string \| string[]`   | `click` |

```typescript
export type RefType<T = HTMLElement> =
  | RefObject<T>
  | null
  | (() => T | null)
  | T
  | MutableRefObject<T | undefined>;
```
