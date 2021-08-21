import React from 'react';
import Image from 'next/image';
import { Row, Col, Button, Form, Input } from 'antd';
import { MainPageHoc } from '../../containers';
import { Container, MainBanner } from '../../components';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import { jwtDecode } from '../../utils/jwt';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
const RequestInvestorAccess = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <MainPageHoc title="Grab a share" auth={{ ...data }} query={{...props.query}}>
      <React.Fragment>
        <MainBanner
          url='/images/requestinvestor_banner.png'
          title={
            <h1 className="fs-6 fw-6 fc-white">HUBBERS GRAB-A-SHARE</h1>
          }
          date={
            <p className="fs-2 fw-5 fc-white">INVITATION ONLY</p>
          }
        />
        <Container>
          <React.Fragment>
            <h1 className="text-center pt-5 fs-3 fw-6">How to qualify for Grab - a - Share</h1>
            <Row className="py-4">
              <Col sm={8} xs={24} className="text-center px-3">
                <div className="grab-circle-img">
                  <Image width={120} height={120} src="/images/heart_icon.png" />
                </div>
                <p className="fs-1 fw-5 pt-3">You love Hubbers, the hub of makers where innovative and creative consumer products are created.</p>
              </Col>
              <Col sm={8} xs={24} className="text-center px-3">
                <div className="grab-circle-img">
                  <Image width={120} height={120} src="/images/signin/become-a-super-expert.png" />
                </div>
                <p className="fs-1 fw-5 pt-3">You love Hubbers, the hub of makers where innovative and creative consumer products are created.</p>
              </Col>
              <Col sm={8} xs={24} className="text-center px-3">
                <div className="grab-circle-img">
                  <Image width={120} height={120} src="/images/signin/be-a-judge.png" />
                </div>
                <p className="fs-1 fw-5 pt-3">You love Hubbers, the hub of makers where innovative and creative consumer products are created.</p>
              </Col>
            </Row>
          </React.Fragment>
        </Container>
        <div className="text-center" style={{ backgroundColor: '#232323', textTransform: 'capitalize', color: 'white' }}>
          <Container>
            <React.Fragment>
              <h1 className="text-center pt-5 fs-3 fw-6 fc-white">THE GRAB - A - SHARE DASHBOARD ALLOWS YOU TO:</h1>
              <Row className="py-4">
                <Col lg={8} xs={24} className="text-center p-3">
                  <Image width={400} height={260} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-a-creator.png" />
                  <h1 className="pt-1 fs-3 fw-6 fc-white">Be part of a creative and inspiring founders community</h1>
                </Col>
                <Col lg={8} xs={24} className="text-center p-3">
                  <Image width={400} height={260} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-an-expert.png" />
                  <h1 className="pt-1 fs-3 fw-6 fc-white">Stay informed about shares and be the first to acquire them</h1>
                </Col>
                <Col lg={8} xs={24} className="text-center p-3">
                  <Image width={400} height={260} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-an-investor.png" />
                  <h1 className="pt-1 fs-3 fw-6 fc-white">Receive regular updates about Hubbers:</h1>
                  <p className="mb-1 fs-1">existing shareholders</p>
                  <p className="mb-1 fs-1">financial statements</p>
                  <p className="mb-1 fs-1">receive regular company updates</p>
                </Col>
              </Row>
            </React.Fragment>
          </Container>
        </div>
        <Container className="text-center py-5">
          <React.Fragment>
            <h1 className="fs-5 fw-6">Access to Grab - a - Share dashboard:</h1>
            <Row className="py-5">
              <Col sm={12} xs={24} className="text-center px-3">
                <div className="grab-circle-img">
                  <Image width={100} height={100} src="/images/heart_icon.png" />
                </div>
                <p className="fs-2 fw-5 pt-3">Qualify through Hubbers directly via Linkedin.</p>
                <a className="fs-2 fw-5" style={{ color: '#75AC2A' }}>Check out who we are</a>
              </Col>
              <Col sm={12} xs={24} className="text-center px-3">
                <div className="grab-circle-img">
                  <Image width={100} height={100} src="/images/signin/become-a-super-expert.png" />
                </div>
                <p className="fs-2 fw-5 pt-3">Ask a Hubbers shareholder to invite you.</p>
                <p className="mb-1">Explain your motivation for becoming a Hubbers shareholder.Making a return on our stock shouldn&apos;t be the only reason.</p>
              </Col>
            </Row>
            <Form
              name='grabAShareForm'
              onFinish={() => { }}
              className='max-w-40 m-auto'
            >
              <Form.Item
                name='email'
                rules={[{ required: true, message: 'Please input the email!' }]}
              >
                <Input type='email' placeholder='Email' />
              </Form.Item>
              <Form.Item
                name='name'
              >
                <Input type='text' placeholder='Name' />
              </Form.Item>
              <Form.Item
                name='submit'
                className='text-center'
              >
                <Button type="hbs-primary" htmlType='submit' size="large" shape="round">SEND NOW</Button>
              </Form.Item>
            </Form>
          </React.Fragment>
        </Container>
      </React.Fragment>
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
export default RequestInvestorAccess;