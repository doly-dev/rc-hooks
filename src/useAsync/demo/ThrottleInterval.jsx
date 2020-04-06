/**
 * title: 节流
 * desc: 通过设置 `options.throttleInterval` ，则进入节流模式。此时如果频繁触发 `run` ，则会以节流策略进行请求。
 */

import { useAsync } from 'rc-hooks';
import { Select } from 'antd';
import React from 'react';
import Mock from 'mockjs';

const { Option } = Select;

async function getEmail(search) {
  console.log(search);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Mock.mock({ 'data|5': ['@email'] }).data);
    }, 100);
  });
}

export default () => {
  const { data, loading, run, cancel } = useAsync(getEmail, {
    throttleInterval: 1000,
    manual: true
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
        {data && data.map(i => <Option key={i}>{i}</Option>)}
      </Select>
    </div>
  );
};
