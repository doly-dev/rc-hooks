import React, { useCallback } from 'react';
import { Form, Input, Select, Button, Table } from 'antd';
import Mock from 'mockjs';

import usePagination from "./usePagination";

const userList = ({ page: { pageNum, pageSize }, data = {} }) => (
  Mock.mock({
    [`data|${pageSize}`]: [{
      id: '@guid',
      name: '@cname',
      'gender|1': ['male', 'female'],
      email: '@email',
      disabled: false
    }],
    pageInfo: {
      total: 55,
      pages: 10
    },
    errCode: "00",
    errMsg: ""
  })
)

function getUserList(params) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(userList(params))
    }, 1000)
  });
}

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
  const { run, refresh, data, loading, pagination, changePagination } = usePagination(getUserList);

  const [form] = Form.useForm();

  const handleReset = useCallback(() => {
    form.resetFields();
    run(form.getFieldsValue())
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
        pagination={{ ...pagination, showSizeChanger: true }}
        onChange={changePagination}
        loading={loading}
        rowKey="id"
        bordered
      />
    </div>
  );
};
