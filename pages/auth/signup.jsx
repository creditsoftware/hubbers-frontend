import { Col, Row } from 'antd';
import React from 'react';
import { LinkedinOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { MainPageHoc } from '../../containers/hocs/MainPageHoc';
import { Form, Input, Button } from 'antd';
import { jwtDecode } from '../../utils/jwt';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { API, URLS, signupFeatureObj } from '../../constants/index';
import { Promise, withSession, openNotificationWithIcon, fetcher } from '../../utils';
import axios from 'axios';
import useSWR from 'swr';
const Signup = ({ ...props }) => {
  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [btnLoading, setBtnLoading] = React.useState(false);
  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
  };
  const onFinish = (values) => {
    setBtnLoading(true);
    axios.post(`${API.LOCAL_SIGNUP_API}`, { ...values })
      .then((response) => {
        setBtnLoading(false);
        if (response.status === 200 && response.data?.success) {
          openNotificationWithIcon('success', 'Sign up successfully!', '');
          setTimeout(() => {
            router.push('/auth/send-verify-email');
          }, 300);
        } else {
          openNotificationWithIcon('error', 'Something went wrong!', response.message);
        }
      })
      .catch((err) => {
        setBtnLoading(false);
        openNotificationWithIcon('error', 'Something went wrong!', err.response.data.message);
      });
  };
  return (
    <MainPageHoc title="Sign Up" auth={{ ...data }} query={{...props.query}}>
      <div className='signin-page'>
        <h1 className="fw-5 text-upper fs-6 text-center pt-5 pb-1 m-0">
          One more step to join Hubbers
        </h1>
        <p className="text-center pb-5 fs-1">
          where creative journey starts with your community of innovators, experts and investors.
        </p>
        <Row align='center'>
          <Col lg={12}>
            <Form
              {...layout}
              name="signup"
              initialValues={{ remember: false }}
              onFinish={onFinish}
            >
              <Form.Item {...tailLayout}>
                <p className="text-center">
                  Join us with your linkedin account to make it easier for members to know you..
                </p>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <div className="text-center">
                  <Button type="linkedin" icon={<LinkedinOutlined />} size='large'>
                    Sign up with Linkedin
                  </Button>
                </div>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <p className="text-center">
                  OR just join with your email address and start hubbering.
                </p>
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, type:'email', message: 'Please input your email!' }]}
              >
                <Input size='large' placeholder='Email' prefix={<UserOutlined />} />
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
              <Form.Item {...tailLayout}>
                <p className="text-center">
                  By continuing, you agree to
                  <a href={URLS.HUBBERS_TERM_OF_SERVICE_URL} className='primary-link'>
                    &nbsp;Hubbers Terms of Service&nbsp;
                  </a>
                  and
                  <a href={URLS.HUBBERS_PRIVACY_POLICY_URL} className='primary-link'>
                    &nbsp;Privacy policy.
                  </a>
                </p>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <div className="text-center pt-4">
                  <Button loading={btnLoading} type="hbs-primary" size='large' htmlType="submit" shape="round">
                    Join Hubbers
                  </Button>
                </div>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <div className="text-center">
                  <Link href='/auth/signin'>
                    <a className='primary-link'>
                      Already part of Hubbers?
                    </a>
                  </Link>
                </div>
              </Form.Item>
            </Form>
          </Col>
          <Col lg={12} className='signin-right-side'>
            <div>
              {
                signupFeatureObj.map((item, index) => {
                  return (
                    <Row key={index}>
                      <Col span={6}>
                        <div className="img">
                          <div>
                            <img src={item.icon} alt="" />
                          </div>
                        </div>
                      </Col>
                      <Col span={18}>
                        <p className="text-upper fw-6 mb-1">
                          {item.title}
                        </p>
                        <p className="mb-3">
                          {item.description}
                        </p>
                      </Col>
                    </Row>
                  );
                })
              }
            </div>
          </Col>
        </Row>
      </div>
    </MainPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req, query } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user }, query } };
  } else {
    return { props: { auth: { isLoggedIn: false }, query } };
  }
});
export default Signup;