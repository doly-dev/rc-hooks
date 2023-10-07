/**
 * desc: 当列表数量小于等于 3 时，不显示`显示更多`按钮
 */
import * as React from 'react';
import { useLimitList } from 'rc-hooks';
import Mockjs from 'mockjs';

const { list } = Mockjs.mock({
  [`list|1-3`]: [
    {
      'id|+1': 1,
      name: '@cname'
    }
  ]
}) as { list: { id: number; name: string }[] };

function Demo() {
  const { data, limited, canLimit, toggle } = useLimitList(list);

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
