import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { MainPageHoc } from '../../containers/hocs/MainPageHoc';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { API } from '../../constants';
import openNotificationWithIcon from '../../utils/openNotificationWithIcon';

const SendVerifyEmail = () => {
  const onFinish = (values) => {
    axios.post(`${API.RESEND_EAMIL_API}`, { ...values })
      .then((response) => {
        if (response.data.success === true) {
          openNotificationWithIcon('success', response.data.message, '');
        } else {
          openNotificationWithIcon('error', response.data.message, '');
        }
      })
      .catch((err) => {
        openNotificationWithIcon('error', 'Something went wrong!', err.response.data.message);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <MainPageHoc title="Resend verify email">
      <div className='signin-page'>
        <p className="text-center py-5 fs-1">
          First step done.<br />
					Please check your email inbox to verify your email address. If you don&apos;t see in your email inbox, check in your spam box.<br />
					If after 2 minutes you have still not received your verification email, enter your email again and we will resend it to you.
        </p>
        <div className="text-center">
          <Form
            name="sendEmail"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input size='large' prefix={<UserOutlined />} placeholder='Enter your email' />
            </Form.Item>
            <Form.Item>
              <Button size='large' shape='round' className='mt-4' htmlType='submit' type='hbs-primary'>
                Resend verification email
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </MainPageHoc>
  );
};

export default SendVerifyEmail;