/**
 * desc: |
 *    设置 `persisted` 为 `true` 。如果存在缓存有效期的数据，将不再执行异步函数，直接返回该数据。
 *
 *    注意，该特性需要配合 `cacheKey` `cacheTime` 使用。
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
      <p>
        10秒内再次获取，直接从缓存中读取数据。实际项目中部分数据可以设置更长的缓存时间，不需要每次都去服务端获取。
      </p>
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
