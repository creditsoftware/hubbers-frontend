import { Col, Divider, Row } from 'antd';
import React from 'react';
import { LinkedinOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { MainPageHoc } from '../../containers/hocs/MainPageHoc';
import { Form, Input, Button } from 'antd';
import useWindowSize from '../../hooks/useWindowSize';
import Link from 'next/link';
import { API, signinFeatureObj } from '../../constants/index';
import { useUser } from '../../hooks/useUser';
import { fetchJson } from '../../utils/fetchJson';
import openNotificationWithIcon from '../../utils/openNotificationWithIcon';
import { useRouter } from 'next/router';

const Signin = () => {
  const size = useWindowSize();
  const router = useRouter();
  const { mutateUser } = useUser({
    redirectTo: !router.query.redirect ? '' : router.query.redirect,
    redirectIfFound: true,
  });
  const [errorMsg, setErrorMsg] = React.useState('');
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: size.width > 575 ? 8 : 0, span: 16 },
  };
  React.useEffect(async () => {
    const response = await fetchJson(`${API.GET_USER_FROM_SESSIOM_API}`);
    if(response.isLoggedIn){
      router.push(!router.query.redirect ? '/desk/dashboard' : router.query.redirect);
    }
  }, [router]);
  const onFinish = async (values) => {
    try {
      await mutateUser(
        fetchJson(`${API.LOCAL_SIGNIN_API}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        }),
      );
      openNotificationWithIcon('success', 'Login successfully!', '');
      router.push(!router.query.redirect ? '/desk/dashboard' : router.query.redirect);
    } catch (error) {
      setErrorMsg(error.data.message);
    }
    if (errorMsg) {
      openNotificationWithIcon('error', 'Something went wrong!', errorMsg);
      setErrorMsg('');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <MainPageHoc title="Sign in">
      <div className='signin-page'>
        <h1 className="fw-5 text-upper fs-6 text-center py-5 m-0">
          welcome back to hubbers
        </h1>
        <Row align='center'>
          <Col lg={12}>
            <Form
              {...layout}
              name="signin"
              initialValues={{ remember: false }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item {...tailLayout}>
                <div className="text-center">
                  <Button type="linkedin" icon={<LinkedinOutlined />} size='large'>
                    Sign in with Linkedin
                  </Button> 
                </div>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Divider />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input size='large' prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password size='large' prefix={<LockOutlined />} />
              </Form.Item>
              {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
								<Checkbox>Remember me</Checkbox>
							</Form.Item> */}
              <Form.Item {...tailLayout}>
                <div className="text-center pt-4">
                  <Button type="hbs-primary" size='large' htmlType="submit" shape="round">
                    Sign in
                  </Button>
                </div>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <div>
                  <Row className={size.width < 991 && size.width > 575 ? 'text-center d-block' : ''}>
                    <Col lg={12} md={24} sm={24} xs={12}>
                      <Link href='/auth/signup'>
                        <a className='primary-link'>
                          Need an account?
                        </a>
                      </Link>
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={12} className={size.width < 991 && size.width > 575 ? '' : 'text-right'}>
                      <Link href='/auth/forgot-password'>
                        <a className='primary-link'>
                          Forgot password?
                        </a>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </Form.Item>
            </Form>
          </Col>
          <Col lg={12} className='signin-right-side'>
            <div>
              {
                signinFeatureObj.map((item, index) => {
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

export default Signin;