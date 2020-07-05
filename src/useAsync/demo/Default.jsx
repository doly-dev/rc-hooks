/**
 * title: 默认请求
 * desc: 在这个例子中， `useAsync` 接收了一个异步函数 `getUsername` ，在组件初次加载时， 自动触发该函数执行。同时 `useAsync` 会自动管理异步请求的 `loading` , `data` , `error` 等状态。
 */

import React from 'react';
import { useAsync } from "rc-hooks";

import getUsername from './services/getUsername';

export default () => {
  const { data, error, loading } = useAsync(getUsername);

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>failed to load</div>
  }
  return <div>Username: {data}</div>
}
