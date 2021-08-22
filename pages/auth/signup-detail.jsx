import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Collapse, DatePicker, Empty, Space, Col, Row, Select, Form, Input, Button, Steps } from 'antd';
import { MainPageHoc } from '../../containers/hocs/MainPageHoc';
import { jwtDecode } from '../../utils/jwt';
import { Container, CheckBtn } from '../../components';
import { countryList } from '../../constants/index';
import { API, CONTINENTS } from '../../constants';
import { fetchJson } from '../../utils';
import { withSession } from '../../utils/withSession';
import { fetcher } from '../../utils/fetcher';

const { Option } = Select;
const { Panel } = Collapse;
const { Step } = Steps;

const SignupDetail = ({ ...props }) => {
  const router = useRouter();
  const email = router.query.email;
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [current, setCurrent] = React.useState(0);
  const [userRoleList, setUserRoleList] = React.useState([]);
  const [techCategory, setTechCategory] = React.useState([]);
  const [productCategory, setProductCategory] = React.useState([]);
  const [innovationCategory, setInnovationCategory] = React.useState([]);
  const [communityList, setCommunityList] = React.useState([]);
  const [selectedCommunities, setSelectedCommunities] = React.useState([]);
  
  React.useEffect(()=>{
    fetchJson(`${API.GET_USER_ROLES_API}`).then((response) => {
      setUserRoleList(response);
    });
    fetchJson(`${API.GET_COMMUNITY_LIST_API}`).then((response) => {
      setCommunityList(response.data);
    });
    fetchJson(`${API.GET_PRODUCT_CATTEGORY_API}`).then((response) => {
      setProductCategory(response.data);
    });
    fetchJson(`${API.GET_INNOVATION_CATTEGORY_API}`).then((response) => {
      setInnovationCategory(response.data);
    });
    fetchJson(`${API.GET_TECH_CATTEGORY_API}`).then((response) => {
      setTechCategory(response.data);
    });
  },[]);
  const onFinish = (values) => {
    if (!current) {
      fetchJson(`${API.USER_SIGN_UP_STEP_ONE}/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...values}),
      });
    } else {
      fetchJson(`${API.USER_SIGN_UP_STEP_THREE}/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...values}),
      });
    }
    if (current < 2) {
      next();
    } else {
      router.push('/auth/signin');
    }
  };
  const skip = () => {
    if (current === 0) {
      router.back();
    }
    prev();
  };
  const done = () => {
    fetchJson(`${API.USER_SIGN_UP_STEP_TWO}/${email}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({community: selectedCommunities}),
    });
    next();
  };
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const selectCommunityEvnet = (e) => {
    if (selectedCommunities.includes(e)) {
      setSelectedCommunities([...selectedCommunities.filter((i) => i !== e)]);
    } else {
      setSelectedCommunities([...selectedCommunities, e]);
    }
  };
  const steps = [
    {
      title: 'Basic Information',
      content: <div>
        <h1 className="fw-6 fs-5 text-upper text-center pt-4 pb-1">
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
                userRoleList?.map((item)=>{
                  return <Option key={item.id} value={item.id}>{item.name}</Option>;
                })
              }
            </Select>
          </Form.Item>
          <Form.Item>
            <div className="mt-2">
              <Row>
                <Col span={12}>
                  <Button type="hbs-outline-primary" size='large' shape="round" onClick={skip}>
                    Skip
                  </Button>
                </Col>
                <Col span={12} className='text-right'>
                  <Button type="hbs-primary" size='large' htmlType="submit" shape="round">
                    Next
                  </Button>
                </Col>
              </Row>
            </div>
          </Form.Item>
        </Form>
      </div>,
    },
    {
      title: 'Community',
      content: <div className='pt-5'>
        <p>
          The power of our community is at the core of Hubbers.<br />
          In your community, you can share, exchange ideas, participate to events.
        </p>
        <p>
          As a new free member, you can be part of 2 communities.
        </p>
        <p>
          Pick the one you want to be part of:
        </p>
        <Collapse>
          {
            CONTINENTS.map((item) => {
              return <Panel key={item} header={item}>
                <Space wrap>
                  {
                    communityList && communityList.filter((c) => c.country?.continent === item).map((c) => {
                      return <CheckBtn
                        key={c.id}
                        disabled={(selectedCommunities.length > 1)&&!selectedCommunities.includes(c.id)}
                        checked={selectedCommunities.includes(c.id)}
                        onChange={() => selectCommunityEvnet(Number(c.id))}
                        label={c.name} />;
                    })
                  }
                </Space>
                {
                  communityList &&
                  communityList.filter((c) => c.country?.continent === item).length === 0 &&
                  <Empty />
                }
              </Panel>;
            })  
          }
        </Collapse>
        <Row className='my-4'>
          <Col span={12}>
            <Button type="hbs-outline-primary" size='large' shape="round" onClick={skip}>
              Skip
            </Button>
          </Col>
          <Col span={12} className='text-right'>
            <Button type="hbs-primary" size='large' htmlType="submit" shape="round" onClick={done}>
              Next
            </Button>
          </Col>
        </Row>
      </div>,
    },
    {
      title: 'Profile',
      content: <div>
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
                  <Button type="hbs-outline-primary" size='large' shape="round" onClick={skip}>
                    Skip
                  </Button>
                </Col>
                <Col span={12} className='text-right'>
                  <Button type="hbs-primary" size='large' htmlType="submit" shape="round">
                    Next
                  </Button>
                </Col>
              </Row>
            </div>
          </Form.Item>
        </Form>
      </div>,
    },
  ];
  return (
    <MainPageHoc title="Sign Up" auth={{ ...data }} query={{...props.query}}>
      <Container>
        <div className="max-w-40 m-auto py-5">
          <React.Fragment>
            <Steps current={current} className='my-5'>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
          </React.Fragment>
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
export default SignupDetail;