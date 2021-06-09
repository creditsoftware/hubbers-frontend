import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';

export const MailChimp = ({label, placeholder}) => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='mailchimp-wrap'>
      <Form
        layout="vertical"
        name="mailchimp"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={label}
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input size='large' placeholder={placeholder} prefix={<UserOutlined/>} />
        </Form.Item>
        <Form.Item>
          <div className="text-center pt-4">
            <Button type="hbs-primary" size='large' htmlType="submit" shape="round">
							Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};