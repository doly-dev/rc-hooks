/**
 * title: 查询表单和Ant Table
 */

import React, { useCallback } from 'react';
import { Form, Input, Select, Button, Table } from 'antd';
import usePagination from './hooks/usePagination';

import getUserList from './services/getUserList';
import { useEffect } from 'react';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const buttonItemLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: 'email',
    dataIndex: 'email',
  },
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: 'gender',
    dataIndex: 'gender'
  },
];

export default () => {
  const { run, refresh, data, loading, pagination, changePagination } = usePagination(getUserList, {
    autoRun: false
  });

  const [form] = Form.useForm();

  const handleReset = useCallback(() => {
    form.resetFields();
    form.submit();
  }, []);

  useEffect(() => {
    form.submit();
  }, []);

  return (
    <div>
      <Form
        {...formItemLayout}
        form={form}
        initialValues={{}}
        onFinish={run}
      >
        <Form.Item label="name" name="name">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="gender" name="gender">
          <Select placeholder="请选择">
            <Select.Option value="male">male</Select.Option>
            <Select.Option value="female">female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>查询</Button>
          <Button onClick={handleReset} style={{ marginLeft: 16 }} disabled={loading}>重置</Button>
          <Button onClick={refresh} style={{ marginLeft: 16 }} disabled={loading}>刷新</Button>
        </Form.Item>
      </Form>
      <Table
        dataSource={data || []}
        columns={columns}
        pagination={pagination}
        onChange={changePagination}
        loading={loading}
        rowKey="id"
        bordered
      />
    </div>
  );
};
