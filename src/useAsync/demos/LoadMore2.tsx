/**
 * title: 上拉加载更多
 * desc: 如果 `options` 中存在 `ref` ，则在滚动到底部时，自动触发 `loadMore` 。
 */

import { Avatar, Button, List } from "antd";
import React, { useRef, useEffect } from "react";
import useLoadMore from "./hooks/useLoadMore";

import getUserList from "./services/getUserList";

export default () => {
  const containerRef = useRef(null);
  const {
    run,
    data,
    loading,
    loadingMore,
    reload,
    loadMore,
    done,
    pagination,
  } = useLoadMore<{ id: string; name: string }>(getUserList, {
    ref: containerRef,
    autoRun: false,
  });

  useEffect(() => {
    run({ a: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFooter = () => (
    <>
      {!done && (
        <Button onClick={loadMore} loading={loadingMore}>
          {loadingMore ? "Loading more" : "Click to load more"}
        </Button>
      )}

      {done && <span>No more data</span>}

      <span style={{ float: "right", fontSize: 12 }}>
        total: {pagination.total}
      </span>
    </>
  );

  return (
    <div ref={containerRef} style={{ height: 300, overflowY: "auto" }}>
      <List
        header={
          <Button onClick={reload} loading={loading}>
            Reload
          </Button>
        }
        footer={renderFooter()}
        loading={loading}
        bordered
        dataSource={data}
        renderItem={(item: { name: string }) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a>{item.name}</a>}
              description="rc-hooks is a react hooks library"
            />
          </List.Item>
        )}
      />
    </div>
  );
};
