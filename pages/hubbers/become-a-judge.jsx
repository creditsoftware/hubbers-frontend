import React from 'react';
import Image from 'next/image';
import { Row, Col, Space } from 'antd';
import { MainPageHoc } from '../../containers';
import { Container, MainBanner } from '../../components';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import { jwtDecode } from '../../utils/jwt';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
const BecomeAJudge = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  // const products = [
  //   {
  //     image: 'url("https://hubbers-files-storage.s3.amazonaws.com/0xE0y6Va6.png")',
  //     title: 'Contest For Testing',
  //     date: 'Ended 45 days ago',
  //     contestants: '1',
  //     judges: '1',
  //     view: '48',
  //     like: '0',
  //     shares: '0'
  //   },
  //   {
  //     image: 'url("https://hubbers-us.oss-us-west-1.aliyuncs.com/6V1GLLP2-.png")',
  //     title: 'Scooter Delivery Case',
  //     date: 'Ended 74 days ago',
  //     contestants: '4',
  //     judges: '1',
  //     view: '180',
  //     like: '3',
  //     shares: '0'
  //   },
  //   {
  //     image: 'url("https://hubbers-us.oss-us-west-1.aliyuncs.com/SJgt5sJ8p.jpg")',
  //     title: 'Travel Kit',
  //     date: 'Ended 2 days ago',
  //     contestants: '30',
  //     judges: '12',
  //     view: '1948',
  //     like: '4',
  //     shares: '0'
  //   }
  // ];
  return (
    <MainPageHoc title="Become a Judge" auth={{ ...data }}>
      <React.Fragment>
        <MainBanner
          url='https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/home-banner-1.jpg'
          title={
            <h1 className="fs-6 fw-6 fc-white">BECOME A JUDGE</h1>
          }
          date={
            <p className="fs-2 fw-5 fc-white">Use your expertise, judge competitions, & help to build the creator community</p>
          }
        />
        <Container>
          <React.Fragment>
            <p className="text-center pt-5 fs-3 fw-6">THE PERKS OF BECOMING A HUBBE.RS JUDGES</p>
            <Row className="py-4">
              <Col lg={6} sm={12} xs={24} className="text-center px-3">
                <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-1.png" />
                <p className="pt-1 fs-3 fw-6">NETWORKING</p>
              </Col>
              <Col lg={6} sm={12} xs={24} className="text-center px-3">
                <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-2.png" />
                <p className="pt-1 fs-3 fw-6">VISIBILITY</p>
              </Col>
              <Col lg={6} sm={12} xs={24} className="text-center px-3">
                <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-3.png" />
                <p className="pt-1 fs-3 fw-6">FIRST TO MARKET OPPORTUNITY</p>
              </Col>
              <Col lg={6} sm={12} xs={24} className="text-center px-3">
                <Image width={120} height={120} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-4.png" />
                <p className="pt-1 fs-3 fw-6">EARNING $$</p>
              </Col>
            </Row>
          </React.Fragment>
        </Container>
        <div className="text-center" style={{ backgroundColor: '#232323', textTransform: 'capitalize', color: 'white' }}>
          <Container>
            <React.Fragment>
              <h1 className="text-center pt-5 fs-3 fw-6 fc-white">SIGN UP IF YOU ARE AN EXPERT IN YOUR FIELD</h1>
              <Row className="py-4">
                <Col lg={6} sm={12} xs={24} className="text-center p-3">
                  <Image width={400} height={260} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-a-creator.png" />
                  <h1 className="pt-1 fs-3 fw-6 fc-white">I&D</h1>
                </Col>
                <Col lg={6} sm={12} xs={24} className="text-center p-3">
                  <Image width={400} height={260} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-an-expert.png" />
                  <h1 className="pt-1 fs-3 fw-6 fc-white">TECH REPORTER</h1>
                </Col>
                <Col lg={6} sm={12} xs={24} className="text-center p-3">
                  <Image width={400} height={260} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-an-investor.png" />
                  <h1 className="pt-1 fs-3 fw-6 fc-white">DISTRIBUTORS / INVESTORS</h1>
                </Col>
                <Col lg={6} sm={12} xs={24} className="text-center p-3">
                  <Image width={400} height={260} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-a-freelancer.png" />
                  <h1 className="pt-1 fs-3 fw-6 fc-white">DESIGN EXPERT</h1>
                </Col>
              </Row>
            </React.Fragment>
          </Container>
        </div>
        <Container className="py-5">
          <React.Fragment>
            <h1 className="fw-6 fs-3 text-center pb-4">DUTIES AND OPPORTUNITIES OF A HUBBE.RS JUDGE</h1>
            <Row>
              <Col lg={11} xs={24}>
                <Space className='mb-3'>
                  <div style={{ width: '2rem', height: '2rem', border: '2px solid #75AC2A', color: '#75AC2A', borderRadius: '100%', textAlign: 'center', padding: '4px' }}>1</div>
                  <div className="fs-1">Mark each contestant on 4 criteria<br />[design, functions, manufacturability, &amp; market]</div>
                </Space>
              </Col>
              <Col lg={2} xs={24} />
              <Col lg={11} xs={24}>
                <Space className='mb-3'>
                  <div style={{ width: '2rem', height: '2rem', border: '2px solid #75AC2A', color: '#75AC2A', borderRadius: '100%', textAlign: 'center', padding: '4px' }}>2</div>
                  <div className="fs-1">Get the opportunity to be the first to see, the ﬁrst to understand new ideas and new designs.</div>
                </Space>
              </Col>
              <Col lg={11} xs={24}>
                <Space className='mb-3'>
                  <div style={{ width: '2rem', height: '2rem', border: '2px solid #75AC2A', color: '#75AC2A', borderRadius: '100%', textAlign: 'center', padding: '4px' }}>3</div>
                  <div className="fs-1">Support the best talents and products ideas to reach the market</div>
                </Space>
              </Col>
              <Col lg={2} xs={24} />
              <Col lg={11} xs={24}>
                <Space className='mb-3'>
                  <div style={{ width: '2rem', height: '2rem', border: '2px solid #75AC2A', color: '#75AC2A', borderRadius: '100%', textAlign: 'center', padding: '4px' }}>4</div>
                  <div className="fs-1">Any entry can enter product development if pre-qualifies.</div>
                </Space>
              </Col>
              <Col lg={11} xs={24}>
                <Space className='mb-3'>
                  <div style={{ width: '2rem', height: '2rem', border: '2px solid #75AC2A', color: '#75AC2A', borderRadius: '100%', textAlign: 'center', padding: '4px' }}>5</div>
                  <div className="fs-1">Gain visibility and recognition from industry experts, distributors investors, tech reporters</div>
                </Space>
              </Col>
            </Row>
          </React.Fragment>
        </Container>
        <div style={{ backgroundColor: '#656565' }}>
          <Container>
            <React.Fragment>
              <h1 className="fs-6 fw-6 fc-white">What are you waiting for?<br />START WITH ONE OF THESE PRODUCT COMPETITIONS</h1>
              <Space wrap size={30} align="center">
                {

                }
              </Space>
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
export default BecomeAJudge;