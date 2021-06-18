import { Col, Row } from 'antd';
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { MainPageHoc } from '../../containers/hocs/MainPageHoc';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import { fetchJson } from '../../utils/fetchJson';
import { API } from '../../constants/index';
import { useRouter } from 'next/router';
import openNotificationWithIcon from '../../utils/openNotificationWithIcon';
import { Promise } from '../../utils/promise';

const ResetPassword = () => {
  const router = useRouter();
  const formRef = React.createRef();
  React.useEffect(() => {
    formRef.current.setFieldsValue({ email: router.query.email });
  }, [router]);
  const onFinish = async (values) => {
    const data = {password:values.password, token:router.query.token};
    fetchJson(`${API.RESET_PASSWORD_API}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((response) => {
      if(response.success) {
        openNotificationWithIcon('success', 'Success', response.message);
      } else {
        openNotificationWithIcon('error', 'Failed', response.message);
      }
    }).catch((err) => {
      console.log(err);
      openNotificationWithIcon('error', 'Failed', 'Failed to reset password!');
    });
  };

  return (
    <MainPageHoc title="Reset Password">
      <React.Fragment>
        <h1 className="fw-5 text-upper fs-6 text-center py-5 m-0">
          Reset your password
        </h1>
        <Form
          name="resetPassword"
          layout='vertical'
          ref={formRef}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          className='max-w-40 m-auto'
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
            hasFeedback
          >
            <Input disabled prefix={<UserOutlined />} placeholder='Email' size='large' />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder='Password' size='large' />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder='Confirm Password' size='large' />
          </Form.Item>
          <Form.Item>
            <div className="text-center pt-4">
              <Button type="hbs-primary" size='large' htmlType="submit" shape="round">
                Reset password
              </Button>
            </div>
          </Form.Item>
          <Row>
            <Col span={12}>
              <Link href='/auth/signup'>
                <a className='primary-link'>
                  Need an account?
                </a>
              </Link>
            </Col>
            <Col span={12} className='text-right'>
              <Link href='/auth/signin'>
                <a className='primary-link'>
                  Sign in?
                </a>
              </Link>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    </MainPageHoc>
  );
};

export default ResetPassword;