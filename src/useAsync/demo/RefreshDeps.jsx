/**
 * title: refreshDeps
 * desc: |
 *  当 `options.refreshDeps` 变化时，且 `options.autoRun=true`， `useAsync` 会使用之前的参数重新执行。
 */
import { useAsync } from '../../../';
import React, { useState } from 'react';

const userSchool = (id) => {
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

async function getUserSchool(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userSchool(userId));
    }, 1000);
  });
}

export default () => {
  const [userId, setUserId] = useState('1');
  const { data, loading } = useAsync(() => getUserSchool(userId), {
    refreshDeps: [userId],
  });

  return (
    <div>
      <select
        onChange={(e) => setUserId(e.target.value)}
        value={userId}
        style={{ marginBottom: 16, width: 120 }}
      >
        <option value="1">user 1</option>
        <option value="2">user 2</option>
        <option value="3">user 3</option>
      </select>
      <p>School: {loading ? 'loading' : data}</p>
    </div>
  );
};
