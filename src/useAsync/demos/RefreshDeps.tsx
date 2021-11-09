/**
 * title: refreshDeps
 * desc: |
 *  当 `options.refreshDeps` 变化时，且 `options.autoRun=true`， `useAsync` 会使用之前的参数重新执行。
 */
import { useAsync } from 'rc-hooks';
import React, { useState } from 'react';
import { Select } from 'antd';

const userSchool = (id: string) => {
  switch (id) {
    case '1':
      return 'Tsinghua University';
    case '2':
      return 'Beijing University';
    case '3':
      return 'Zhejiang University';
    default:
      return '';
  }
};

async function getUserSchool(userId: string) {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(userSchool(userId));
    }, 1000);
  });
}

export default () => {
  const [userId, setUserId] = useState('1');
  const { data, loading } = useAsync(() => getUserSchool(userId), {
    refreshDeps: [userId]
  });

  return (
    <div>
      <Select
        onChange={(v) => setUserId(v)}
        value={userId}
        style={{ marginBottom: 16, width: 120 }}
      >
        <Select.Option value="1">user 1</Select.Option>
        <Select.Option value="2">user 2</Select.Option>
        <Select.Option value="3">user 3</Select.Option>
      </Select>
      <p>School: {loading ? 'loading' : data}</p>
    </div>
  );
};
