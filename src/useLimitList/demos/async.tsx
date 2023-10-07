/**
 * desc: 初始列表为空，当数据加载完成后，更新显示限制列表数量
 */
import * as React from 'react';
import { useLimitList, useAsync } from 'rc-hooks';
import Mockjs from 'mockjs';
import { sleep } from 'ut2';

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

function Demo() {
  const { data: asyncData, loading } = useAsync(getList);
  const { data, limited, canLimit, toggle } = useLimitList(asyncData?.list);

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <ul>
        {data.map((item) => (
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
}

export default Demo;
