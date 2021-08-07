import React from 'react';
import Image from 'next/image';
import { Row, Col, Button } from 'antd';
import { MainPageHoc } from '../../containers';
import { Container, MainBanner } from '../../components';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import { jwtDecode } from '../../utils/jwt';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
const BecomeACreator = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <MainPageHoc title="Become a Creator" auth={{ ...data }}>
      <React.Fragment>
        <MainBanner
          url='https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/home-banner-1.jpg'
          title={
            <h1 className="fs-6 fw-6 fc-white">CREATORS</h1>
          }
          date={
            <p className="fs-2 fw-5 fc-white">Got a great product idea?<br />Or a design that is different from the rest of the market?</p>
          }
        />
        <div className="bg-white text-center py-5">
          <Container>
            <React.Fragment>
              <h1 className="text-center pt-5 fs-3 fw-6">HUBBERS</h1>
              <p className="text-center fs-1">a hub of makers are calling creators from all over the world.</p>
              <Row className="py-4">
                <Col lg={8} xs={24} className="text-center px-3 pt-3">
                  <Image width={400} height={260} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-a-creator.png" />
                  <h1 className="pt-1 fs-3 fw-6">DESIGNER</h1>
                </Col>
                <Col lg={8} xs={24} className="text-center px-3 pt-3">
                  <Image width={400} height={260} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-an-expert.png" />
                  <h1 className="pt-1 fs-3 fw-6">INVESTOR</h1>
                </Col>
                <Col lg={8} xs={24} className="text-center px-3 pt-3">
                  <Image width={400} height={260} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-an-investor.png" />
                  <h1 className="pt-1 fs-3 fw-6">CORPORATE</h1>
                </Col>
              </Row>
            </React.Fragment>
          </Container>
        </div>
        <div style={{ backgroundColor: '#333' }} className="py-5">
          <Container>
            <React.Fragment>
              <h1 className="text-center pt-5 fs-3 fw-6 fc-white">HUBBE.RS CAN HELP YOU</h1>
              <Row className="py-4">
                <Col lg={6} sm={12} xs={24} className="text-center px-3 pt-3">
                  <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-5.png" />
                  <p className="fs-1 pt-2 fc-white">Find experts and freelancers to help you create your product</p>
                </Col>
                <Col lg={6} sm={12} xs={24} className="text-center px-3 pt-3">
                  <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-6.png" />
                  <p className="fs-1 pt-2 fc-white">Track the progress of your idea or product</p>
                </Col>
                <Col lg={6} sm={12} xs={24} className="text-center px-3 pt-3">
                  <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-7.png" />
                  <p className="fs-1 pt-2 fc-white">Get funding and help with the project management</p>
                </Col>
                <Col lg={6} sm={12} xs={24} className="text-center px-3 pt-3">
                  <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-8.png" />
                  <p className="fs-1 pt-2 fc-white">Join Hubbe.rs contest to create creative products</p>
                </Col>
              </Row>
            </React.Fragment>
          </Container>
        </div>
        <div style={{ backgroundColor: 'black' }} className="py-5">
          <Container>
            <React.Fragment>
              <h1 className="text-center pt-5 fs-3 fw-6 fc-white">EXPERT MARKETPLACE</h1>
              <p className="text-center fs-1 fc-white">Access a pool of talented and experienced professionals ready to work on your project.</p>
              <Row className="py-4">
                <Col lg={6} sm={12} xs={24} className="text-center px-3 pt-3">
                  <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-9.png" />
                  <p className="fs-1 pt-2 fc-white">Browse Expert Marketplace</p>
                </Col>
                <Col lg={6} sm={12} xs={24} className="text-center px-3 pt-3">
                  <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-2.png" />
                  <p className="fs-1 pt-2 fc-white">Choose experts or projects</p>
                </Col>
                <Col lg={6} sm={12} xs={24} className="text-center px-3 pt-3">
                  <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-3.png" />
                  <p className="fs-1 pt-2 fc-white">Define the task</p>
                </Col>
                <Col lg={6} sm={12} xs={24} className="text-center px-3 pt-3">
                  <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-4.png" />
                  <p className="fs-1 pt-2 fc-white">Agree on the price</p>
                </Col>
                {/* <Col lg={6} sm={12} xs={24} className="text-center px-3 pt-3">
                  <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-4.png" />
                  <p className="fs-1 pt-2 fc-white">Complete the task</p>
                </Col> */}
              </Row>
            </React.Fragment>
          </Container>
        </div>
        <MainBanner
          url='https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/home-banner-2.jpg'
          title={
            <React.Fragment>
              <h1 className="fs-6 fw-6 fc-white">PRODUCT DEVELOPMENT MODULE</h1>
              <Button type="hbs-primary" size="large" shape="round" style={{ width: '200px' }}>REGISTER AND APPLY</Button>
            </React.Fragment>
          }
        />
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
export default BecomeACreator;