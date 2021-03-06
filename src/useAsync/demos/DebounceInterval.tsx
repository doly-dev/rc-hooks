/**
 * title: 防抖
 * desc: 通过设置 `options.debounceInterval` ，则进入防抖模式。此时如果频繁触发 `run` ，则会以防抖策略进行请求。
 */

import React from 'react';
import { Select } from 'antd';
import { useAsync } from 'rc-hooks';
import Mock from 'mockjs';

function getEmail(search: string): Promise<string[]> {
  console.log(search);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock({ 'data|5': ['@email'] }).data);
    }, 300);
  });
}

const { Option } = Select;

export default () => {
  const { data, loading, run, cancel } = useAsync<string[]>(getEmail, {
    debounceInterval: 500,
    autoRun: false
  });

  return (
    <div>
      <p>Enter quickly to see the effect</p>
      <Select
        showSearch
        placeholder="Select Emails"
        filterOption={false}
        onSearch={run}
        onBlur={cancel}
        loading={loading}
        style={{ width: 300 }}
      >
        {data && data.map(item => <Option key={item} value={item}>{item}</Option>)}
      </Select>
    </div>
  );
};
