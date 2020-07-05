/**
 * title: 缓存 & 预加载
 * desc: |
 *  如果设置了 `options.cacheKey` ， `useAsync` 会将当前请求结束数据缓存起来。下次组件初始化时，如果有缓存数据，我们会优先返回缓存数据，然后在背后发送新请求。
 * 
 *  同一个 `cacheKey` 的请求，是全局共享的，也就是你可以提前加载数据。利用该特性，可以很方便的实现预加载。
 */

import { useAsync } from 'rc-hooks';
import { Button, Spin } from 'antd';
import React, { useState } from 'react';
import Mock from 'mockjs';

async function getArticle(type) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: Mock.mock('@paragraph'),
        time: new Date().getTime()
      })
    }, 1000)
  });
}

export default () => {
  const [visible, setVisible] = useState(false);
  const { run } = useAsync(getArticle, {
    cacheKey: 'article',
    autoRun: false
  });
  return (
    <div>
      <p>When the mouse hovers over the button, the article data is preloaded.</p>
      <p>
        <Button onMouseEnter={() => run()} onClick={() => setVisible(b => !b)}>show/hidden</Button>
      </p>
      {visible && <Article />}
    </div>
  )
};

const Article = () => {
  const { data, loading } = useAsync(getArticle, {
    cacheKey: 'article'
  });
  return (
    <Spin spinning={!data && loading}>
      <p>Latest request time: {data?.time}</p>
      <p>{data?.data}</p>
    </Spin>
  );
}
