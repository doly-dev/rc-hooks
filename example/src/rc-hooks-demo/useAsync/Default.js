import { useAsync } from "rc-hooks";
import Mock from 'mockjs';
import React from 'react';

function getUsername(){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default () => {
  const { data, error, loading } = useAsync(getUsername)

  if (error) {
    return <div>failed to load</div>
  }
  if (loading) {
    return <div>loading...</div>
  }
  return <div>Username: {data}</div>
}
