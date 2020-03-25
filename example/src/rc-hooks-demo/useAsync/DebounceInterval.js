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
    }, 300);
  });
}

export default () => {
  const { data, loading, run, cancel } = useAsync(getEmail, {
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
        {data && data.map(i => <Option key={i}>{i}</Option>)}
      </Select>
    </div>
  );
};
