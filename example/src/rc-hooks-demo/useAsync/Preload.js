import { useAsync } from 'rc-hooks';
import { getCache } from 'rc-hooks/lib/utils/cache';
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
    auto: false
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
