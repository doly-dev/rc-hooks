/**
 * title: 共享异步
 * desc: 该特性如果配合持久化数据 `persisted` 使用，可以优化一下特殊场景的重复异步问题。例如，同一个页面中，多个不同组件同时加载国家列表，可以减少请求，并持久化数据。
 */
import * as React from 'react';
import { useAsync } from 'rc-hooks';
import getArticle from './services/getArticle';
import { waitTime } from 'util-helpers';

function Article() {
  const { data, loading, run } = useAsync(async () => {
    await waitTime(3000);
    return getArticle();
  }, {
    cacheKey: 'article'
  });

  return (
    <div>
      <button onClick={run}>点击请求</button>
      <p>loading: {loading ? 'true' : 'false'}</p>
      <p>request time: {data?.time}</p>
      <p>{data?.data}</p>
    </div>
  )
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