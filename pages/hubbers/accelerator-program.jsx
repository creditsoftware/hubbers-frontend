import React from 'react';
import Image from 'next/image';
import { Row, Col, Button, Form, Input, Select } from 'antd';
import { MainPageHoc } from '../../containers';
import { Container } from '../../components';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import useSWR from 'swr';
import { jwtDecode } from '../../utils/jwt';
import { fetcher } from '../../utils/fetcher';
const { Option } = Select;

const AcceleratorProgram = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <MainPageHoc title="Accelerator Program" auth={{ ...data }}>
      <React.Fragment>
        <Container>
          <React.Fragment>
            <Row className="py-4">
              <Col lg={13} xs={24} className="d-flex fd-vertical fjc-center">
                <h1 className="fs-6 fw-6 fc-primary">
                  Accelertor Program
                </h1>
                <p className="fs-4 fw-6" style={{ lineHeight: '35px' }}>
                  The hubbers&apos; accelerator is a step by step program to launch new products in the market.
                </p>
                <p className="fs-1">
                  - Investor to fund innovative project
                </p>
                <p className="fs-1">
                  - The online platform to streamline projects
                </p>
                <p className="fs-1">
                  - A super expert to ensure the well
                </p>
                <p className="fs-1">
                  development of the product.
                </p>
                <p>
                  The accelerator program requires the creator to share the benefice of the product at 12 % for Hubbers, 3% for the super expert and give the exploitation license to Hubbers for 3 years.
                </p>
              </Col>
              <Col lg={2} xs={24} />
              <Col lg={9} xs={24} className="text-center">
                <Image src="/images/accelerator_image.png" width={450} height={530} />
              </Col>
            </Row>
            <div className="text-center py-3">
              <Button type='hbs-main'>
                Start Hubbers Accelerator
              </Button>
              <h1 className="fc-primary py-3">
                See the accelerator FAQ
              </h1>
            </div>
            <div className="text-center pb-5">
              <h1 className="fs-6 fw-6">
                How does the Hubbers Accelerator work?
              </h1>
            </div>
            <Row className="pb-5">
              <Col lg={11} xs={24} className="accelerator-help accelerator-help-left">
                <p className="fs-2 fw-5 mb-1">
                  Assessment
                </p>
                <p>
                  Hubbers need to evaluate new project prior to be accepted in the accelerator program. Upon filling the initial 5 modules you will get an assessment and be part of the accelerator program.
                </p>
                <Image width={70} height={70} src="/images/time/1.png" />
              </Col>
              <Col lg={2} xs={24} />
              <Col lg={11} xs={24} className="accelerator-help accelerator-help-right">
                <p className="fs-2 fw-5 mb-1">
                  Super Expert
                </p>
                <p>
                  Choose your project manager from a pool of professionals with the expertise in the required field.
                </p>
                <Image width={70} height={70} src="/images/time/2.png" />
              </Col>
              <Col lg={11} xs={24} className="accelerator-help accelerator-help-left">
                <p className="fs-2 fw-5 mb-1">
                  Work Plan
                </p>
                <p>
                  Create a detailed plan to ensure all the necessary steps of the product development cycle are executed according to standards, expectations, and requirements.
                </p>
                <Image width={70} height={70} src="/images/time/3.png" />
              </Col>
              <Col lg={2} xs={24} />
              <Col lg={11} xs={24} className="accelerator-help accelerator-help-right">
                <p className="fs-2 fw-5 mb-1">
                  Hire Experts
                </p>
                <p>
                  Find and hire the expert you need to complete your project well. The Hubbers platform provides the opportunity to connect with people and organizations from around the world.
                </p>
                <Image width={70} height={70} src="/images/time/4.png" />
              </Col>
              <Col lg={11} xs={24} className="accelerator-help accelerator-help-left">
                <p className="fs-2 fw-5 mb-1">
                  Complete your Business Plan
                </p>
                <p>
                  Test the feasibility of your business idea. Make business planning effective, secure funding, and create an opportunity for your business to succeed.
                </p>
                <Image width={70} height={70} src="/images/time/5.png" />
              </Col>
              <Col lg={2} xs={24} />
              <Col lg={11} xs={24} className="accelerator-help accelerator-help-right">
                <p className="fs-2 fw-5 mb-1">
                  Product Development
                </p>
                <p>
                  Once your product idea reaches the required score on the Product Launcher, get support from a specialized team of experts/super experts to create your product and deliver it to market. (6-12 months)
                </p>
                <Image width={70} height={70} src="/images/time/6.png" />
              </Col>
              <Col lg={11} xs={24} className="accelerator-help accelerator-help-left">
                <p className="fs-2 fw-5 mb-1">
                  Product to Market
                </p>
                <p>
                  Connect with the right market, build relationship with suitable distributors, and get access to established networks to sell and promote your product.
                </p>
                <Image width={70} height={70} src="/images/time/7.png" />
              </Col>
              <Col lg={2} xs={24} />
              <Col lg={11} xs={24} />
            </Row>
            <div className="text-center py-3">
              <Button type='hbs-main'>
                Start Hubbers Accelerator
              </Button>
              <h1 className="fc-primary py-3">
                See the accelerator FAQ
              </h1>
            </div>
          </React.Fragment>
        </Container>
        <div className="bg-white pb-5">
          <Container >
            <React.Fragment>
              <div className="py-5 text-center">
                <h1 className="fs-6">
                  Access to our Platform
                </h1>
                <p className="fs-1 fw-6">
                  Our platform is limited to our priority members.
                </p>
                <p>
                  In the meantime enter your information below and we will contact you as soon as the next batch&apos;s registrations begin:
                </p>
              </div>
              <div className="accelerator-form">
                <Form
                  name='acceleratorForm'
                  onFinish={() => { }}

                >
                  <Form.Item
                    name='name'
                  >
                    <Input type='text' placeholder='Name' />
                  </Form.Item>
                  <Form.Item
                    name='companyName'
                  >
                    <Input type='text' placeholder='Company Name' />
                  </Form.Item>
                  <Form.Item
                    name='country'
                  >
                    <Select placeholder='Country'>
                      <Option value='china'>China</Option>
                      <Option value='india'>India</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name='email'
                    rules={[{ required: true, message: 'Please input the email!' }]}
                  >
                    <Input type='email' placeholder='Email' />
                  </Form.Item>
                  <Form.Item
                    name='submit'
                    className='text-center'
                  >
                    <Button htmlType='submit' type='hbs-main'>Register Now</Button>
                  </Form.Item>
                </Form>
              </div>
            </React.Fragment>
          </Container>
        </div>
      </React.Fragment>
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
export default AcceleratorProgram;