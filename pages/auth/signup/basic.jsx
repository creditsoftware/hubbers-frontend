import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Col, Row, Select, Form, Input, Button } from 'antd';
import { API } from '../../../constants';
import { Container, SingupProgress } from '../../../components';
import { MainPageHoc } from '../../../containers/hocs/MainPageHoc';
import { fetcher, fetchJson, withSession } from '../../../utils';
import { jwtDecode } from '../../../utils/jwt';

const { Option } = Select;

const SignupBasic = ({ ...props }) => {
  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [userRoleList, setUserRoleList] = React.useState([]);
  
  React.useEffect(() => {
    fetchJson(`${API.GET_USER_ROLES_API}`).then((response) => {
      setUserRoleList(response);
    });
  }, []);
  
  const onFinish = (values) => {
    const email = router.query.email;
    console.log(email);
    const community = router.query ? router.query.community : undefined;
    fetchJson(`${API.USER_SIGN_UP_STEP_ONE}/${email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values }),
    });
    router.push(`/auth/signup/community?email=${email}${community?'&community=' + community : ''}`);
  };

  return (
    <MainPageHoc title="Signup Basic" auth={{ ...data }} query={{ ...props.query }}>
      <Container>
        <div className="max-w-40 m-auto py-5">
          <SingupProgress current={0} percent={0} />
          <div className="pt-5">
            <h1 className="fw-6 fs-5 text-upper text-center pb-1">
              One more step to join Hubbers
            </h1>
            <p className="text-center pb-5 fs-1">
              where creative journey starts with your community of innovators, experts and investors.
            </p>
            <Form
              name="register-detail"
              initialValues={{ remember: false }}
              onFinish={onFinish}
            >
              <Form.Item
                name="firstname"
                rules={[{ required: true, message: 'Please input your firstname!' }]}
              >
                <Input size='large' className="mt-1 mb-1" placeholder='Input your firstname!' />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[{ required: true, message: 'Please input your lastname!' }]}
              >
                <Input size='large' className="mt-1 mb-1" placeholder='Input your lastname!' />
              </Form.Item>
              <Form.Item
                name="preferedRoleId"
                rules={[{ required: true, message: 'Please select your role!' }]}
              >
                <Select
                  placeholder="Select your role!"
                  size='large' className="mt-1 mb-1"
                >
                  {
                    userRoleList?.map((item) => {
                      return <Option key={item.id} value={item.id}>{item.name}</Option>;
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item>
                <div className="mt-2">
                  <Row>
                    <Col span={24} className='text-right'>
                      <Button type="hbs-primary" size='large' htmlType="submit" shape="round">
                        Next
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Container>
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
export default SignupBasic;