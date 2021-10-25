/**
 * title: 可变列表
 * desc: 当列表数据变化时，重置列表和limited
 */
import * as React from 'react';
import { useLimitList } from 'rc-hooks';
import Mockjs from 'mockjs';

const getList = (num: number) => {
  if (num === 0) {
    return [];
  } else if (num === 1) {
    return [
      Mockjs.mock({
        id: 1,
        name: '@cname'
      })
    ];
  }
  const { list } = Mockjs.mock({
    [`list|${num}`]: [
      {
        'id|+1': 1,
        name: '@cname'
      }
    ]
  }) as { list: { id: number; name: string }[] };
  return list;
};

const Demo = () => {
  const [len, setLen] = React.useState(10);
  const [list, setList] = React.useState(() => getList(len));
  const { data, limited, canLimit, toggle } = useLimitList(list);

  return (
    <div>
      <div>
        修改数据数量：
        <input
          type="number"
          min={0}
          step={1}
          value={len}
          onChange={e => setLen(Number(e.target.value))}
        />
        <button type="button" onClick={() => setList(getList(len))}>
          确定
        </button>
      </div>
      <br />
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
