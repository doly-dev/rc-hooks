/**
 * title: 持久化数据
 * desc: |
 *    如果有缓存数据，不再执行异步函数。
 *
 *    需要配合 `cacheKey` `cacheTime` 使用。
 */
import * as React from 'react';
import { Button, Spin } from 'antd';
import { useAsync } from 'rc-hooks';
import getArticle from './services/getArticle';

function Demo() {
  const { run, data, loading } = useAsync(getArticle, {
    cacheKey: 'persited-demo',
    cacheTime: 10 * 1000,
    persisted: true
  });

  return (
    <div>
      <p>10秒内再次获取，直接从缓存中读取数据。</p>
      <p>
        <Button onClick={run}>获取数据</Button>
      </p>
      <Spin spinning={loading}>
        <p>Latest request time: {data?.time}</p>
        <p>{data?.data}</p>
      </Spin>
    </div>
  );
}

export default Demo;
