/**
 * title: 共享异步
 * desc: 该特性如果配合持久化数据 `persisted` 使用，可以优化某些场景同时触发同一个异步请求的问题。例如，同一个页面中，不同组件都需要请求国家列表。使用 `persisted` `cacheKey` 能减少请求并持久化数据。
 */
import * as React from 'react';
import { useAsync } from 'rc-hooks';
import getArticle from './services/getArticle';
import { waitTime } from 'util-helpers';

function Article() {
  const { data, loading, run } = useAsync(
    async () => {
      await waitTime(3000);
      return getArticle();
    },
    {
      cacheKey: 'article'
    }
  );

  return (
    <div>
      <button onClick={run}>点击请求</button>
      <p>Background loading: {loading ? 'true' : 'false'}</p>
      <p>Latest request time: {data?.time}</p>
      <p>{data?.data}</p>
    </div>
  );
}

function Demo() {
  return (
    <div>
      <Article />
      <br />
      <Article />
    </div>
  );
}

export default Demo;
