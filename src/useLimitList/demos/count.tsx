/**
 * title: 基础用法
 * desc: 修改默认显示列表数量 和 默认显示全部
 */
import * as React from 'react';
import { useLimitList } from 'rc-hooks';
import Mockjs from 'mockjs';

const { list } = Mockjs.mock({
  [`list|10`]: [
    {
      'id|+1': 1,
      name: '@cname'
    }
  ]
}) as { list: { id: number; name: string }[] };

const Demo = () => {
  const { data, limited, canLimit, toggle } = useLimitList(list, {
    count: 5,
    defaultLimited: false
  });

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
