/**
 * title: 节流
 * desc: 通过设置 `options.throttleInterval` ，则进入节流模式。此时如果频繁触发 `run` ，则会以节流策略进行请求。
 */

import React from 'react';
import { Select } from 'antd';
import { useAsync } from 'rc-hooks';
import Mock from 'mockjs';

function getEmail(search: string) {
  console.log(search);
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock({ 'data|5': ['@email'] }).data);
    }, 300);
  });
}

const { Option } = Select;

export default () => {
  const { data, loading, run, cancel } = useAsync(getEmail, {
    throttleInterval: 1000,
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
        {data && data.map(i => <Option key={i} value={i}>{i}</Option>)}
      </Select>
    </div>
  );
};
