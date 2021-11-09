import * as React from 'react';
import { useLoadMore, useDebounce } from 'rc-hooks';
import Mockjs from 'mockjs';

function waitTime(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function searchApi({
  keyword,
  order,
  pageNum,
  pageSize
}: {
  keyword: string;
  order: number;
  pageNum: number;
  pageSize: number;
}) {
  await waitTime();
  if (keyword && keyword.length <= 1) {
    return {
      list: []
    };
  }
  if (pageNum < 3) {
    return Mockjs.mock({
      [`list|${pageSize}`]: [
        {
          text: `${keyword} ${order} ${pageNum} @id`
        }
      ]
    });
  }
  return Mockjs.mock({
    [`list|2`]: [
      {
        text: `${keyword} ${order} ${pageNum} @id`
      }
    ]
  });
}

// 排序
const orderTypes = [
  {
    name: '综合',
    value: 1
  },
  {
    name: '销量',
    value: 2
  },
  {
    name: '价格',
    value: 3
  }
];

const DefaultPageSize = 3;

type DataItem = {
  text: string;
};

type Result = {
  list: DataItem[];
};

const Demo = () => {
  const [keyword, setKeyword] = React.useState('');
  const [order, setOrder] = React.useState(orderTypes[0].value);
  const debounceKeyword = useDebounce(keyword, 500);
  const ref = React.useRef();

  const { data, loadMore, noMore, loading, loadingMore } = useLoadMore<
    Result & { prevListLen: number }
  >(
    async ({ current }) => {
      if (!debounceKeyword) {
        return {
          list: [],
          prevListLen: 0
        };
      }
      return searchApi({
        pageNum: current,
        pageSize: DefaultPageSize,
        keyword: debounceKeyword,
        order
      }).then((res) => ({
        ...res,
        prevListLen: res?.list.length
      }));
    },
    {
      ref,
      isNoMore: (result) => result?.prevListLen < DefaultPageSize,
      refreshDeps: [debounceKeyword, order]
    }
  );

  return (
    <div>
      <input
        type="text"
        placeholder="请输入搜索关键词"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div className="orderList">
        {orderTypes.map((item) => (
          <a
            key={item.value}
            style={order === item.value ? { color: 'red' } : {}}
            onClick={() => {
              setOrder(item.value);
            }}
          >
            {item.name}
          </a>
        ))}
      </div>
      <div style={{ height: 150, overflowY: 'auto' }} ref={ref}>
        {loading && !loadingMore && '搜索中...'}
        {noMore &&
          debounceKeyword &&
          !loading &&
          data?.list?.length <= 0 &&
          `没有找到 “${debounceKeyword}” 相关数据`}
        {debounceKeyword && data?.list?.length > 0 && (
          <div>
            <ol>
              {data.list.map((item) => (
                <li key={item.text}>{item.text}</li>
              ))}
            </ol>
            {!noMore && (
              <button onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? '正在加载...' : '点击加载更多'}
              </button>
            )}
            {noMore && !loadingMore && '没有更多数据'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Demo;
