import React from 'react';
import Image from 'next/image';
import { MainPageHoc } from '../../containers';
import { Container } from '../../components';
import { Row, Col } from 'antd';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
const ProductLauncher = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const items1 = [{
    image: '/images/hbb/bring_your_expertise.png',
    text: 'Bringing your expertise In creators project Against HBB.'
  },{
    image: '/images/hbb/participating_in_product_competition.png',
    text: 'Participating in product competition.'
  },{
    image: '/images/hbb/promoting_hubbers_activities.png',
    text: 'Promoting Hubbers Activities & events.'
  }];
  const items2 = [{
    image: '/images/hbb/get_usage_of_workspace.png',
    text: 'Get usage of Hubbers workspace.'
  },{
    image: '/images/hbb/start-project.png',
    text: 'Get Hubbers experts works for your product launch.'
  },{
    image: '/images/hbb/participate_in_hubbers_activities.png',
    text: 'Participate in Hubbers premium activities and premium events.'
  }];
  return (
    <MainPageHoc title='HBB Blockchain Taken' auth={{ ...data }}>
      <React.Fragment>
        <Container className="py-5 my-5">
          <div className="max-w-50 m-auto py-5 text-center">
            <h1 className="fs-5 fw-6">Hubbers community token how it works</h1>
            <p className="fs-1">As a purpose-driven community, Hubbers let member to bring their best ideas to create the pro user-friendly to the purpose Rewards in Hubbers are called HBB.</p>
          </div>
        </Container>
        <div className="w-100 py-5 bg-white">
          <Container>
            <Row>
              <Col span={24} className="text-center fs-2 fw-6">Rewards are given when YOU ARE</Col>
              {
                items1.map((item,index)=>{
                  return(
                    <Col key={index} lg={8} xs={24} className="p-5 pb-0 text-center">
                      <Image width={230} height={150} src={item.image} />
                      <p>{item.text}</p>
                    </Col>
                  );
                })
              }
            </Row>
          </Container>
        </div>
        <Container className="py-5">
          <Row>
            <Col span={24} className="fs-5 fw-6 text-center pt-4 pb-5">You can also win HBB by doing a lot of useful things for Hubbers</Col>
            <Col sm={12} xs={24} className="p-3">
              <Row className="d-flex text-center f-align-center">
                <Col lg={12} xs={24}>
                  <Image width={200} height={200} src="/images/hbb/post_in_your_social_media.png" />
                </Col>
                <Col lg={12} xs={24}>
                  <p className="px-3 fs-1 mb-0 text-center">Post in your social media.</p>
                </Col>
              </Row>
            </Col>
            <Col sm={12} xs={24} className="p-3">
              <Row className="d-flex text-center f-align-center">
                <Col lg={12} xs={24}>
                  <Image width={200} height={200} src="/images/hbb/bring_new_users.png" />
                </Col>
                <Col lg={12} xs={24} className="f-left">
                  <p className="px-3 fs-1 mb-0 text-center">Bring new users that will use Hubbers.</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <div className="w-100 py-5 bg-white">
          <Container>
            <Row>
              <Col span={24} className="text-center fs-2 fw-6">Rewards are given when YOU ARE</Col>
              {
                items2.map((item,index)=>{
                  return(
                    <Col key={index} lg={8} xs={24} className="p-5 pb-0 text-center">
                      <Image width={230} height={150} src={item.image} />
                      <p>{item.text}</p>
                    </Col>
                  );
                })
              }
            </Row>
          </Container>
        </div>
        <div
          className="py-5 fc-white text-center"
          style={{
            backgroundImage: 'linear-gradient(0deg, #81A942 -7.92%, #B3DD5D 141.91%)'
          }}
        >
          <Container>
            <React.Fragment>
              <p>When you reach a certain level of HBB, it is time to become part of our community and turn you HBB into HBS: blockchain-powered shares of Hubbers.</p>
              <p>Ultimate HBS token: learn more soon</p>
              <div className="m-auto bg-white p-2" style={{ width: 'max-content', borderRadius: '6px' }}>
                <Image width={145} height={45} src="/images/logo/hubbers-logo.png" />
              </div>
            </React.Fragment>
          </Container>
        </div>
      </React.Fragment>
    </MainPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const {req} = ctx;
  const user = await req.session.get('user');
  if (user) {
    return {props: {auth: {isLoggedIn: true, ...user } } };
  } else {
    return {props: {auth: {isLoggedIn: false } } };
  }
});
export default ProductLauncher;