/**
 * title: 查询表单和Ant Table
 * desc: 试试切换排序、分页、表单项，查看控制台的请求参数。
 */

import React, { useCallback, useEffect } from 'react';
import { Form, Input, Select, Button, Table } from 'antd';
import { usePagination } from 'rc-hooks';
import getUserList from './services/getUserList';

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
    dataIndex: 'id',
    sorter: true
  },
  {
    title: 'gender',
    dataIndex: 'gender'
  }
];

function Demo() {
  const [form] = Form.useForm();
  const { run, params, refresh, loading, pagination, tableProps } = usePagination(
    ({ current, pageSize, ...rest }) => {
      console.log({ current, pageSize, ...rest });
      return getUserList({ current, pageSize }).then((res) => ({
        list: res.data,
        total: res.total
      }));
    },
    {
      autoRun: false
    }
  );

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
            ...params[0],
            current: 1,
            pageSize: pagination.pageSize,
            search: values
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
      <Table
        {...tableProps}
        pagination={{ ...pagination, showSizeChanger: true, showQuickJumper: true }}
        columns={columns}
        rowKey="id"
        bordered
      />
    </div>
  );
}

export default Demo;
