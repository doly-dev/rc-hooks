import * as React from 'react';
import { Button, Space } from 'antd';
import { useAsync, clearCache } from 'rc-hooks';
import getArticle from './services/getArticle';

const Article: React.FC<{ cacheKey: string }> = ({ cacheKey }) => {
  const { loading, data } = useAsync(getArticle, {
    cacheKey
  });

  return (
    <div>
      <h3>{cacheKey}</h3>
      {loading && !data ? (
        'Loading'
      ) : (
        <div>
          <p>Background loading: {loading ? 'true' : 'false'}</p>
          <p>Latest request time: {data?.time}</p>
          <p>{data?.data}</p>
        </div>
      )}
    </div>
  );
};

function Demo() {
  const [visible, setVisible] = React.useState(false);
  const articleCacheKey1 = 'Article1';
  const articleCacheKey2 = 'Article2';
  const articleCacheKey3 = 'Article3';

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <Button type="primary" onClick={() => setVisible((s) => !s)}>
          显示/隐藏
        </Button>
      </div>
      <Space>
        <Button onClick={() => clearCache(articleCacheKey1)}>Clear Article1</Button>
        <Button onClick={() => clearCache(articleCacheKey2)}>Clear Article2</Button>
        <Button onClick={() => clearCache([articleCacheKey2, articleCacheKey3])}>
          Clear Article2 and Article3
        </Button>
        <Button onClick={() => clearCache()}>Clear All</Button>
      </Space>
      {visible && (
        <div>
          <Article cacheKey={articleCacheKey1} />
          <Article cacheKey={articleCacheKey2} />
          <Article cacheKey={articleCacheKey3} />
        </div>
      )}
    </div>
  );
}

export default Demo;
