/**
 * title: 防抖
 * desc: 通过设置 `options.debounceInterval` ，则进入防抖模式。此时如果频繁触发 `run` ，则会以防抖策略进行请求。
 */

import React from 'react';
import { Select } from 'antd';
import { useAsync } from 'rc-hooks';
import getEmail from './services/getEmail';

const { Option } = Select;

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
        {data &&
          data.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
      </Select>
    </div>
  );
};
