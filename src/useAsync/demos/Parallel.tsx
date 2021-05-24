/**
 * title: 并行请求
 * desc: 将有请求的组件单独封装，每一个请求都有独立的状态。
 */

import React from "react";
import { Button, message } from 'antd';
import { useAsync } from 'rc-hooks';

function deleteUser(userId: string): Promise<{ success: boolean }> {
  console.log(userId);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

function DeleteButton({ id, username }: { id: string; username: string; }) {
  const { run, loading } = useAsync(deleteUser, {
    autoRun: false,
    onSuccess: (result) => {
      if (result.success) {
        message.success(`Delete user ${username}`);
      }
    }
  });

  return <Button loading={loading} onClick={() => { run(id) }}>delete {username}</Button>
}

export default () => {
  const users = [{ id: '1', username: 'A' }, { id: '2', username: 'B' }, { id: '3', username: 'C' }];

  return (
    <div>
      <div>You can click all buttons, each request has its own status.</div>
      <ul>
        {users.map((user => (
          <li key={user.id} style={{ marginTop: 8 }}>
            <DeleteButton {...user} />
          </li>
        )))}
      </ul>
    </div>
  );
}