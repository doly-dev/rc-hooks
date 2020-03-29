# rc-hooks

React Hooks Library. 

[查看示例](https://doly-dev.github.io/rc-hooks/demo/)

## 安装

```shell
npm install rc-hooks
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

- [useAsync](#useAsync) - 管理异步函数，支持自动/手动调用、轮询、防抖、节流、缓存等特性。
- [useClientRect](#useClientRect) - 获取元素的大小及其相对于视口的位置。
- [usePrevious](#usePrevious) - 获取上一轮的 props 或 state。
- [usePersistFn](#usePersistFn) - 持久化 function 的 Hook。
- [useUpdateEffect](#useUpdateEffect) - 一个只在依赖更新时执行的 useEffect hook。
- [useUnmount](#useUnmount) - 只在组件 unmount 时执行的 hook
- [useMount](#useMount) - 只在组件 mount 时执行的 hook
- [useDebounceFn](#useDebounceFn) - 用来处理防抖函数的 Hook。
- [useDebounce](#useDebounce) - 用来处理防抖值的 Hook。
- [useThrottleFn](#useThrottleFn) - 用来处理节流函数的 Hook。
- [useThrottle](#useThrottle) - 用来处理节流值的 Hook。

### useAsync

管理异步函数，支持自动/手动调用、轮询、防抖、节流、缓存等特性。

```
const {
  data,
  error,
  loading,
  params,
  run,
  cancel,
  refresh,
  mutate
} = useAsync(asyncFn, {
  autoRun,
  initialData,
  defaultParams,
  onSuccess,
  onError,
  cacheKey,
  cacheTime,
  loadingDelay,
  pollingInterval,
  pollingWhenHidden,
  refreshOnWindowFocus,
  focusTimespan,
  debounceInterval,
  throttleInterval,
});
```

#### Result

参数 | 说明 | 类型
------------- | ------------- | -------------
data  | 异步函数的返回值，默认为 `undefined`。 | `undefined` / `any`
error  | 异步函数抛出的异常，默认为 `undefined` | `undefined` / `any`
loading  | 异步函数正在执行 | `boolean`
params  | 执行service的参数数组。比如你触发了 run(1, 2, 3)，则 params 等于 [1, 2, 3] | `array`
run  | 手动触发异步函数。debounce 模式与throttle 模式返回值为 `Promise<null>` | `function`
cancel  | 取消当前请求。如果有轮询，停止。 | `function`
refresh  | 使用上一次的params，重新执行异步函数。 | `function`
mutate  | 直接修改data | `(newData) => void` / `((oldData)=>newData)=>void`

#### Params

所有配置项都是可选的。

参数 | 说明 | 类型 | 默认值
------------- | ------------- | ------------- | -------------
autoRun  | 默认 `true`。即在初始化时自动执行异步函数。如果设置为 `false`，则需要手动调用 `run` 触发执行。 | `boolean` | true
initialData  | 默认的 `data`。 | `any` | -
defaultParams  | 如果 `autoRun=true` 自动执行 `run` 的默认参数。 |  `any[]`  | -
onSuccess  | 异步函数 `resolve` 时触发，参数为 `data` 和 `params`。 | `(data: any, params: any[]) => void` | -
onError  | 异步函数报错时触发，参数为 `error` 和 `params` | `(error: any, parmams: any[]) => void` | -
cacheKey  | 缓存的键值，启用缓存机制。异步成功结果，将被缓存。 | `string` | -
cacheTime  | 缓存时间，单位为毫秒。 | `number` | `5 * 60 * 1000`
loadingDelay  | 设置 `loading` 延迟时间，避免闪烁，单位为毫秒。| `number` | -
pollingInterval | 轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 `run` | `number`  | -
refreshOnWindowFocus  | 在屏幕重新获取焦点或重新显示时，是否重新发起请求。默认为 false，即不会重新发起请求。如果设置为 true，在屏幕重新聚焦或重新显示时，会重新发起请求。
 | `boolean` | `false`
focusTimespan  | 屏幕重新聚焦，如果每次都重新发起请求，不是很好，我们需要有一个时间间隔，在当前时间间隔内，不会重新发起请求。需要配置 refreshOnWindowFocus 使用。 | `number` | `5000`
debounceInterval  | 防抖间隔, 单位为毫秒，设置后，请求进入防抖模式。 | `number` | -
throttleInterval  | 节流间隔, 单位为毫秒，设置后，请求进入节流模式。 | `number` | -


### useClientRect

获取元素的大小及其相对于视口的位置。

```
import React from "react";
import { useClientRect } from "rc-hooks";

export default function MeasureExample() {
  const [rect, ref] = useClientRect();

  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null &&
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      }
    </>
  );
}
```


### usePrevious

获取上一轮的 props 或 state。

```
import React, { useState } from "react";
import { usePrevious } from "rc-hooks";

export default function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  const handleInput = (e) => {
    setCount(e.target.value);
  }

  return (
    <>
      <h1>Now: {count}, before: {prevCount}</h1>
      <input type="text" onInput={handleInput} />
    </>
  );
}
```

### usePersistFn

持久化 function 的 Hook。

```
// https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
import React, { useState } from "react";
import { usePersistFn } from "rc-hooks";

export default function Form() {
  const [text, updateText] = useState('');

  const handleSubmit = usePersistFn(() => {
    alert(text);
  });

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <div onClick={handleSubmit}>Alert</div>
    </>
  );
}
```

### useUpdateEffect

一个只在依赖更新时执行的 useEffect hook。

```
import React, { useLayoutEffect, useState } from 'react';
import { useUpdateEffect } from 'rc-hooks';

export default () => {
  const [count, setCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);
  const [updateEffectCount, setUpdateEffectCount] = useState(0);

  useLayoutEffect(() => {
    setEffectCount(c => c + 1);
  }, [count]);

  useUpdateEffect(() => {
    setUpdateEffectCount(c => c + 1);
    return () => {
      // do something
    };
  }, [count]); // you can include deps array if necessary

  return (
    <div>
      <p>effectCount: {effectCount}</p>
      <p>updateEffectCount: {updateEffectCount}</p>
      <p>
        <button onClick={() => setCount(c => c + 1)}>
          reRender
        </button>
      </p>
    </div>
  );
};
```

### useUnmount

只在组件 unmount 时执行的 hook

```
import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useUnmount } from 'rc-hooks';

const MyComponent = () => {
  useUnmount(
    () => {
      message.info('unmount');
    }
  );

  return (<div>Hello World</div>)
}

export default () => {
  const [state, toggle] = useState(true);

  return (<>
    <Button onClick={() => toggle(s => !s)}>{state ? 'unmount' : 'mount'}</Button>
    {state && <MyComponent />}
  </>);
};
```

### useMount

只在组件 mount 时执行的 hook

```
import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useMount } from 'rc-hooks';

const MyComponent = () => {
  useMount(
    () => {
      message.info('mount');
    }
  );

  return (<div>Hello World</div>)
}

export default () => {
  const [state, toggle] = useState(false);

  return (<>
    <Button onClick={() => toggle(s => !s)}>{state ? 'unmount' : 'mount'}</Button>
    {state && <MyComponent />}
  </>);
};
```

### useDebounceFn

用来处理防抖函数的 Hook。

```
import React, { useState } from 'react';
import { Button } from 'antd';
import { useDebounceFn } from 'rc-hooks';

export default () => {
  const [value, setValue] = useState(0);
  const { run } = useDebounceFn(setValue, 500);

  return (
    <div>
      <p style={{ marginTop: 16 }}> Clicked count: {value} </p>
      <Button onClick={() => run(value + 1)}>Click fast!</Button>
    </div>
  );
};
```

### useDebounce

用来处理防抖值的 Hook。

```
import { Input } from 'antd';
import React, { useState } from 'react';
import { useDebounce } from 'rc-hooks';

export default () => {
  const [value, setValue] = useState();
  const debouncedValue = useDebounce(value, 500);

  return (
    <div>
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
    </div>
  );
};
```

### useThrottleFn

用来处理节流函数的 Hook。

```
import React, { useState } from 'react';
import { Button } from 'antd';
import { useThrottleFn } from 'rc-hooks';

export default () => {
  const [value, setValue] = useState(0);
  const { run } = useThrottleFn(setValue, 500);

  return (
    <div>
      <p style={{ marginTop: 16 }}> Clicked count: {value} </p>
      <Button onClick={() => { run(value + 1) }}>Click fast!</Button>
    </div>
  );
};
```

### useThrottle

用来处理节流值的 Hook。

```
import { Input } from 'antd';
import React, { useState } from 'react';
import { useThrottle } from 'rc-hooks';

export default () => {
  const [value, setValue] = useState();
  const throttledValue = useThrottle(value, 500);

  return (
    <div>
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>throttledValue: {throttledValue}</p>
    </div>
  );
};
```





