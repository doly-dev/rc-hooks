/**
 * title: 查询表单和Ant Table
 */

import React, { useCallback } from 'react';
import { Form, Input, Select, Button, Table } from 'antd';
import { usePagination } from 'rc-hooks';

import getUserList from './services/getUserList';
import { useEffect } from 'react';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
};

const buttonItemLayout = {
  wrapperCol: { offset: 4, span: 14 }
};

const columns = [
  {
    title: 'name',
    dataIndex: 'name'
  },
  {
    title: 'email',
    dataIndex: 'email'
  },
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: 'gender',
    dataIndex: 'gender'
  }
];

export default () => {
  const { run, refresh, loading, pagination, tableProps } = usePagination(
    ({ current, pageSize, ...rest }) => {
      console.log(rest);
      return getUserList({ current, pageSize });
    },
    {
      autoRun: false,
      formatResult: (res) => ({
        ...res,
        list: res.data
      })
    }
  );

  const [form] = Form.useForm();

  const handleReset = useCallback(() => {
    form.resetFields();
    form.submit();
  }, [form]);

  useEffect(() => {
    form.submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Form
        {...formItemLayout}
        form={form}
        initialValues={{}}
        onFinish={(values) => {
          run({
            current: 1,
            pageSize: pagination.pageSize,
            ...values
          });
        }}
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
          <Button type="primary" htmlType="submit" loading={loading}>
            查询
          </Button>
          <Button onClick={handleReset} style={{ marginLeft: 16 }} disabled={loading}>
            重置
          </Button>
          <Button onClick={refresh} style={{ marginLeft: 16 }} disabled={loading}>
            刷新
          </Button>
        </Form.Item>
      </Form>
      <Table {...tableProps} columns={columns} rowKey="id" bordered />
    </div>
  );
};
