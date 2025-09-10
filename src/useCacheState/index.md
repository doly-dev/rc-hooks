---
group:
  title: State
  order: 1
toc: content
---

# useCacheState

管理缓存 state 的 Hook。

:::warning

同一个域名下可能挂载多个应用，如果不是内存缓存需要注意：

1. 跨页面缓存建议使用命名空间，避免命名冲突。（缓存键添加前缀，如：`someProjectName_config`）
2. 清除缓存时，建议指定缓存键，如果清除全部缓存，会将同域名下的 `useCacheState` 缓存全部清除。

:::

## 代码演示

### 内存

默认使用内存缓存。设置不同值，然后切换页面再返回，初始 state 是缓存的内存值。

适用于单页应用，不支持多页应用跨页面缓存，且刷新页面缓存会丢失。

<code src="./demos/basic.tsx"></code>

### localStorage

自定义 localStorage 缓存。可通过 `clearCacheState(localStorage)` 清除缓存。

适用于持久缓存，存取数据自动处理序列化和解析，刷新页面缓存不会丢失，支持跨页面/跨标签页存取。

<code src="./demos/local.tsx"></code>

### sessionStorage

自定义 sessionStorage 缓存。可通过 `clearCacheState(sessionStorage)` 清除缓存。

适用于当前窗口的持久缓存，存取数据自动处理序列化和解析，刷新页面缓存不会丢失，支持同一标签页跨页面存取，不支持跨标签页存取。

<code src="./demos/session.tsx"></code>

### Cookie

效果同 localStorage 。

<code src="./demos/cookie.tsx"></code>

### 数据存活时间

设置数据后，超过该时间，再次读取数据将失效。试试`10s`后刷新页面，数据将失效。

每次设置数据时，会更新数据的过期时间。（没有对比数据，设置相同数据也会更新过期时间）

<code src="./demos/ttl.tsx"></code>

### 清除缓存

<code src="./demos/clear.tsx"></code>

## API

```typescript
const [state, setState] = useCacheState(key: string, defaultValue?: any, options?: {
  ttl?: number;
  storage?: TStorage;
});
```

### Result

返回结果同 `useState` 一致。

### Params

所有配置项都是可选的。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ttl | 相对当前时间的数据存活时间，单位毫秒。默认无期限。 | `number` | - |
| storage | 自定义数据存储器，支持 `localStorage` `sessionStorage`，或[自定义实现](https://github.com/caijf/cache2?tab=readme-ov-file#%E5%A6%82%E4%BD%95%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%80%E4%B8%AA-storage)。默认使用内存缓存。 | `TStorage` | - |

### clearCacheState

清理 `useCacheState` 缓存。如果不传`key`，表示清理全部。

```typescript
import { clearCacheState } from 'rc-hooks';

clearCacheState(storageType?: StorageType, cacheKey?: string|string[]);

clearCacheState(); // 清除内存缓存
clearCacheState(localStorage); // 清除 localStorage 缓存
clearCacheState(sessionStorage); // 清除 sessionStorage 缓存

clearCacheState(undefined, 'key'); // 清除指定内存缓存
clearCacheState(localStorage, 'key'); // 清除指定 localStorage 缓存
clearCacheState(sessionStorage, 'key'); // 清除指定 sessionStorage 缓存
clearCacheState(localStorage, ['key1', 'key2']); // 清除指定 localStorage 缓存
clearCacheState(sessionStorage, ['key1', 'key2']); // 清除指定 sessionStorage 缓存
```
