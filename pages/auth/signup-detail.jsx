import { Collapse, DatePicker, Empty, Col, Row, Select, Form, Input, Button, Steps } from 'antd';
import React from 'react';
import { MainPageHoc } from '../../containers/hocs/MainPageHoc';
import { useRouter } from 'next/router';
import { Option } from 'antd/lib/mentions';
import { jwtDecode } from '../../utils/jwt';
import { Container } from '../../components';
import { countryList } from '../../constants/index';
import { API } from '../../constants';
import { withSession } from '../../utils/withSession';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
const { Panel } = Collapse;
const { Step } = Steps;

const SignupDetail = ({ ...props }) => {
  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [current, setCurrent] = React.useState(0);
  const onFinish = () => {
    if (current < 2) {
      next();
    }
    if (current === 2) {
      router.push('/desk/dashboard');
    }
  };
  const skip = () => {
    if (current === 0) {
      router.back();
    }
    prev();
  };
  const done = () => {
    next();
  };
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: 'Basic Information',
      content: <div>
        <h1 className="fw-5 text-upper fs-6 text-center pt-5 pb-1 m-0">
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
            name="firstName"
            rules={[{ required: true, message: 'Please input your firstname!' }]}
          >
            <Input size='large' placeholder='Input your firstname!' />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: 'Please input your lastname!' }]}
          >
            <Input size='large' placeholder='Input your lastname!' />
          </Form.Item>
          <Form.Item
            name="role"
            rules={[{ required: true, message: 'Please select your role!' }]}
          >
            <Select
              placeholder="Select your role!"
              allowClear
              size='large'
            >
              <Option value="creator">Creator</Option>
              <Option value="expert">Expert</Option>
              <Option value="investor">Investor</Option>
            </Select>
          </Form.Item>
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
        <Collapse accordion>
          <Panel header="Asia" key="1">
            <Empty />
          </Panel>
          <Panel header="Europe" key="2">
            <Empty />
          </Panel>
          <Panel header="Africa" key="3">
            <Empty />
          </Panel>
          <Panel header="Oceania" key="4">
            <Empty />
          </Panel>
          <Panel header="North America" key="5">
            <Empty />
          </Panel>
          <Panel header="South America" key="6">
            <Empty />
          </Panel>
          <Panel header="Antarctica" key="7">
            <Empty />
          </Panel>
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
            >
              {
                countryList.map((country, index) => {
                  return (
                    <Option value={country.shortName} key={index}>{country.label}</Option>
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
            >
              {
                countryList.map((country, index) => {
                  return (
                    <Option value={country.shortName} key={index}>{country.label}</Option>
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
            name="innovationCategory"
            rules={[{ required: false, message: 'Please select innovation category!' }]}
          >
            <Select
              showSearch
              placeholder="Select Innovation category"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              size='large'
            >
            </Select>
          </Form.Item>
          <Form.Item
            name="productCategory"
            rules={[{ required: false, message: 'Please select product category!' }]}
          >
            <Select
              showSearch
              placeholder="Select Product category"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              size='large'
            >
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
    <MainPageHoc title="Sign Up" auth={{ ...data }}>
      <Container>
        <div className="max-w-40 m-auto">
          <React.Fragment>
            <Steps current={current} className='my-5 pt-5'>
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
  const { req } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: false } } };
  }
});
export default SignupDetail;