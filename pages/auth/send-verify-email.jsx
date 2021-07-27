import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { MainPageHoc } from '../../containers/hocs/MainPageHoc';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { jwtDecode } from '../../utils/jwt';
import { API } from '../../constants';
import useSWR from 'swr';
import { fetcher, openNotificationWithIcon, withSession } from '../../utils';

const SendVerifyEmail = ({ ...props }) => {
  const [btnLoading, setBtnLoading] = React.useState(false);
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const onFinish = (values) => {
    setBtnLoading(true);
    axios.get(`${API.RESEND_EAMIL_API}/${values.email}`)
      .then((response) => {
        setBtnLoading(false);
        if (response.data.success === true) {
          openNotificationWithIcon('success', 'Success', response.data.message);
        } else {
          openNotificationWithIcon('error', 'Failed to send email', response.data.message);
        }
      })
      .catch((error) => {
        setBtnLoading(false);
        if (error.response) {
          openNotificationWithIcon('error', 'Something went wrong!', error.response.data.message);
        } else if (error.request) {
          openNotificationWithIcon('error', 'Something went wrong!', error.message);
        }
      });
  };
  return (
    <MainPageHoc title="Resend verify email" auth={{ ...data }}>
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
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input size='large' prefix={<UserOutlined />} placeholder='Enter your email' />
            </Form.Item>
            <Form.Item>
              <Button loading={btnLoading} size='large' shape='round' className='mt-4' htmlType='submit' type='hbs-primary'>
                Resend verification email
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </MainPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: false } } };
  }
});
export default SendVerifyEmail;