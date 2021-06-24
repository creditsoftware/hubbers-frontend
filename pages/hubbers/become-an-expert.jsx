import React from 'react';
import Image from 'next/image';
import { Row, Col, Button } from 'antd';
import { MainPageHoc } from '../../containers';
import { Container, MainBanner } from '../../components';

const BecomeAnExpert = () => {

  return (
    <MainPageHoc title="Become an Expert">
      <React.Fragment>
        <MainBanner
          url='https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/hero-banner-expert.jpg'
          title={
            <h1 style={{ fontSize: '4rem', fontWeight: '700', color: 'white' }}>EXPERTS</h1>
          }
          date={
            <React.Fragment>
              <p className="fs-2">Enjoy being involved in product development?</p>
              <p className="fs-2">Excited about seeing new products reaching consumers?</p>
              <p className="fs-2">Are you an expert in your field?</p>
            </React.Fragment>
          }
        />
        <Container>
          <React.Fragment>
            <h1 className="text-center pt-5 fs-3 fw-6">FOUR REASONS TO BECOME A HUBBERS EXPERT</h1>
            <Row className="py-4">
              <Col lg={6} sm={12} xs={24} className="text-center px-3">
                <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-14.png" />
                <h1 className="pt-1 fs-3 fw-6">EARN MONEY</h1>
                <p className="fs-1">By offering advice and work on approved projects</p>
              </Col>
              <Col lg={6} sm={12} xs={24} className="text-center px-3">
                <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-15.png" />
                <h1 className="pt-1 fs-3 fw-6">VISIBILITY</h1>
                <p className="fs-1">Gain recognition and build your profile</p>
              </Col>
              <Col lg={6} sm={12} xs={24} className="text-center px-3">
                <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-16.png" />
                <h1 className="pt-1 fs-3 fw-6">JOIN A COMMUNITY</h1>
                <p className="fs-1">Mingle with like-minded people and find work opportunities</p>
              </Col>
              <Col lg={6} sm={12} xs={24} className="text-center px-3">
                <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-17.png" />
                <h1 className="pt-1 fs-3 fw-6">JOIN AS A JUDGE</h1>
                <p className="fs-1">Become a judge, benefit from your expertise</p>
              </Col>
            </Row>
          </React.Fragment>
        </Container>
        <div className="bg-white text-center">
          <Container>
            <React.Fragment>
              <h1 className="text-center pt-5 fs-3 fw-6">EXPERT TYPES</h1>
              <Row className="py-4">
                <Col lg={8} xs={24} className="text-center px-3">
                  <Image width={400} height={260} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-a-creator.png" />
                  <h1 className="pt-1 fs-3 fw-6">CONSULTANTS</h1>
                </Col>
                <Col lg={8} xs={24} className="text-center px-3">
                  <Image width={400} height={260} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-an-expert.png" />
                  <h1 className="pt-1 fs-3 fw-6">FREELANCERS</h1>
                </Col>
                <Col lg={8} xs={24} className="text-center px-3">
                  <Image width={400} height={260} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-an-investor.png" />
                  <h1 className="pt-1 fs-3 fw-6">CORPORATE</h1>
                </Col>
              </Row>
            </React.Fragment>
          </Container>
        </div>
        <div style={{ backgroundColor: 'black' }}>
          <Container>
            <React.Fragment>
              <h1 className="text-center pt-5 fs-3 fw-6 fc-white">JOIN HUNDREDS OF EXPERTS<br />AND START WORKING ON VARIOUS PROJECTS!</h1>
              <Row className="py-4">
                <Col lg={6} sm={12} xs={24} className="text-center px-3">
                  <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-18.png" />
                  <h1 className="fs-2 fw-5 pt-1 fc-white">FIND PROJECTS OR TASKS YOU LIKE</h1>
                </Col>
                <Col lg={6} sm={12} xs={24} className="text-center px-3">
                  <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-19.png" />
                  <h1 className="fs-2 fw-5 pt-1 fc-white">FIND PROJECTS OR TASKS YOU LIKE</h1>
                </Col>
                <Col lg={6} sm={12} xs={24} className="text-center px-3">
                  <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-20.png" />
                  <h1 className="fs-2 fw-5 pt-1 fc-white">BID ON PROJECTS AND WIN</h1>
                </Col>
                <Col lg={6} sm={12} xs={24} className="text-center px-3">
                  <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-21.png" />
                  <h1 className="fs-2 fw-5 pt-1 fc-white">START WORKING AND START EARNING</h1>
                </Col>
              </Row>
            </React.Fragment>
          </Container>
        </div>
        <MainBanner
          url='https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/hero-banner-expert.jpg'
          title={
            <Button type="hbs-primary" size="large" shape="round" style={{ width: '200px' }}>SIGN UP NOW</Button>
          }
        />
      </React.Fragment>
    </MainPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default BecomeAnExpert;