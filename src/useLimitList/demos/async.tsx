/**
 * title: 基础用法
 * desc: 当列表数量小于等于 3 时，不显示`显示更多`按钮
 */
import * as React from 'react';
import { useLimitList, useAsync } from 'rc-hooks';
import Mockjs from 'mockjs';

function sleep(delay = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

async function getList() {
  await sleep();
  return Mockjs.mock({
    'list|4-10': [
      {
        'id|+1': 1,
        name: '@cname'
      }
    ]
  }) as { list: { id: number; name: string }[] };
}

const Demo = () => {
  const { data: asyncData, loading } = useAsync(getList);
  const { data, limited, canLimit, toggle } = useLimitList(asyncData?.list);

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item.id}>{`${item.id}.${item.name}`}</li>
        ))}
      </ul>
      {canLimit && (
        <button type="button" onClick={toggle}>
          {limited ? '显示更多' : '收起'}
        </button>
      )}
    </div>
  );
};

export default Demo;
