import { Col, Row } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { MainPageHoc } from '../../containers/hocs/MainPageHoc';
import { Form, Input, Button } from 'antd';
import { fetchJson } from '../../utils/fetchJson';
import { API } from '../../constants/index';
import Link from 'next/link';
import openNotificationWithIcon from '../../utils/openNotificationWithIcon';

const ForgotPassword = () => {
  const [btnLoading, setBtnLoading] = React.useState(false);
  const onFinish = async (values) => {
    setBtnLoading(true);
    fetchJson(`${API.FORGOT_PASSWORD_API}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then((response) => {
      if(response.success) {
        openNotificationWithIcon('success', 'Success', response.message);
      } else {
        openNotificationWithIcon('error', 'Failed', response.message);
      }
      setBtnLoading(false);
    }).catch((err) => {
      console.log(err);
      setBtnLoading(false);
      openNotificationWithIcon('error', 'Failed', 'Failed to reset password!');
    });
  };

  return (
    <MainPageHoc title="Forgot password">
      <React.Fragment>
        <h1 className="fw-5 text-upper fs-6 text-center py-5 m-0">
          Forgot your password?
        </h1>
        <Form
          name="forgotPassword"
          layout='vertical'
          initialValues={{ remember: false }}
          onFinish={onFinish}
          className='max-w-40 m-auto'
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input size='large' placeholder='Please enter email' prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item>
            <div className="text-center pt-4">
              <Button loading={btnLoading} type="hbs-primary" size='large' htmlType="submit" shape="round">
                Send email
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

export default ForgotPassword;