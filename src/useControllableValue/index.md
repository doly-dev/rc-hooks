---
title: useControllableValue
group:
  title: Other
  path: /other
  order: 4
legacy: /other/use-controllabel-value
---

# useControllableValue

组件状态即可以自己内部管理，也可以由外部控制。

## 代码演示

### 非受控组件

<code src="./demos/Demo1.tsx" />

### 受控组件

<code src="./demos/Demo2.tsx" />

### 无 value，有 onChange 的组件

<code src="./demos/Demo3.tsx" />

## API

```typescript
const [state, setState] = useControllableValue(props: object, options?: Options);
```

### Result

| 参数     | 说明       | 类型                   |
| -------- | ---------- | ---------------------- |
| state    | 状态值     | -                      |
| setState | 修改状态值 | `(value: any) => void` |

### Params

| 参数    | 说明         | 类型      | 默认值 |
| ------- | ------------ | --------- | ------ |
| props   | 组件的 props | `object`  | -      |
| options | 可选配置项   | `Options` | -      |

### Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认值，会被 props.defaultValue 和 props.value 覆盖 | - | - |
| defaultValuePropName | 默认值的属性名 | `string` | `'defaultValue'` |
| valuePropName | 值的属性名 | `string` | `'value'` |
| trigger | 修改值时，触发的函数名 | `string` | `'onChange'` |
