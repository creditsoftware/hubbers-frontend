import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { DatePicker, Col, Row, Select, Form, Button } from 'antd';
import { API } from '../../../constants';
import { countryList } from '../../../constants/index';
import { Container, SingupProgress } from '../../../components';
import { MainPageHoc } from '../../../containers/hocs/MainPageHoc';
import { fetcher, fetchJson, withSession } from '../../../utils';
import { jwtDecode } from '../../../utils/jwt';

const { Option } = Select;

const SignupProfile = ({ ...props }) => {
  const router = useRouter();
  const email = router.query.email;
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [techCategory, setTechCategory] = React.useState([]);
  const [productCategory, setProductCategory] = React.useState([]);
  const [innovationCategory, setInnovationCategory] = React.useState([]);

  React.useEffect(() => {
    fetchJson(`${API.GET_PRODUCT_CATTEGORY_API}`).then((response) => {
      setProductCategory(response.data);
    });
    fetchJson(`${API.GET_INNOVATION_CATTEGORY_API}`).then((response) => {
      setInnovationCategory(response.data);
    });
    fetchJson(`${API.GET_TECH_CATTEGORY_API}`).then((response) => {
      setTechCategory(response.data);
    });
  }, []);

  const onFinish = (values) => {
    fetchJson(`${API.USER_SIGN_UP_STEP_THREE}/${email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'applicatison/json' },
      body: JSON.stringify({ ...values }),
    });
    router.push('/auth/signin');
  };

  const prev = () => {
    router.push(`/auth/signup/community?email=${email}`);
  };

  return (
    <MainPageHoc title="Signup Profile" auth={{ ...data }} query={{ ...props.query }}>
      <Container>
        <div className="max-w-40 m-auto py-5">
          <SingupProgress current={2} percent={60} />
          <div className="pt-5">
            <p>
              Almost there! Tell us more about you, so we are able to tailor activities that are important to you.
            </p>
            <Form
              name="register-detail"
              initialValues={{ remember: false }}
              onFinish={onFinish}
            >
              <Form.Item
                name="nationality"
                rules={[{ required: true, message: 'Please select your nationality!' }]}
              >
                <Select
                  showSearch
                  placeholder="Which country are you from?"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  size='large'
                  className="my-1"
                >
                  {
                    countryList.map((country, index) => {
                      return (
                        <Option value={country.label} key={index}>{country.label}</Option>
                      );
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item
                name="country"
                rules={[{ required: true, message: 'Please select your country!' }]}
              >
                <Select
                  showSearch
                  placeholder="Which country are you living in?"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  size='large'
                  className="my-1"
                >
                  {
                    countryList.map((country, index) => {
                      return (
                        <Option value={country.label} key={index}>{country.label}</Option>
                      );
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item
                name="birthday"
                rules={[{ required: true, message: 'Please input your birthday!' }]}
              >
                <DatePicker style={{ width: '100%' }} size='large' />
              </Form.Item>
              <p>
                Tell us more about you, so we are able to tailor activities that are important to you.
              </p>
              <Form.Item
                name="productCategory"
                rules={[{ required: false, message: 'Please select product category!' }]}
              >
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Product category"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  size='large'
                >
                  {
                    productCategory?.map((item, index) => {
                      return <Option key={index} value={item.id}>{item.name}</Option>;
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item
                name="innovationCategory"
                rules={[{ required: false, message: 'Please select innovation category!' }]}
              >
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Innovation category"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  size='large'
                >
                  {
                    innovationCategory?.map((item, index) => {
                      return <Option key={index} value={item.id}>{item.name}</Option>;
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item
                name="techCategory"
                rules={[{ required: false, message: 'Please select innovation category!' }]}
              >
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Innovation category"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  size='large'
                >
                  {
                    techCategory?.map((item, index) => {
                      return <Option key={index} value={item.id}>{item.name}</Option>;
                    })
                  }
                </Select>
              </Form.Item>
              <p>
                Before starting exploring Hubbers, you can fill more your profile or leave it for later.
              </p>
              <Form.Item>
                <div>
                  <Row>
                    <Col span={12}>
                      <Button type="hbs-outline-primary" size='large' shape="round" onClick={prev}>
                        Prev
                      </Button>
                    </Col>
                    <Col span={12} className='text-right'>
                      <Button type="hbs-primary" size='large' htmlType="submit" shape="round">
                        Finish
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
export default SignupProfile;