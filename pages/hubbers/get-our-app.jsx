import React from 'react';
import Image from 'next/image';
import { Row, Col } from 'antd';
import { MainPageHoc } from '../../containers';
import { Container, MainBanner } from '../../components';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { jwtDecode } from '../../utils/jwt';
const GetOurApp = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <MainPageHoc title="Get Our App" auth={{ ...data }}>
      <React.Fragment>
        <div className="p-rel w-100 get-our-app">
          <MainBanner className='p-abs' url='/images/app_store_banner.png' />
          <Container>
            <Row>
              <Col lg={12} xs={24} className="app-img p-5">
                <Image width={550} height={500} src="/images/mobile-img.png" />
              </Col>
              <Col lg={12} xs={24}>
                <div className="app-text text-center py-5">
                  <p className="fw-6 fs-6">
                    GREAT PROJECTS AWAIT!
                  </p>
                  <p className="fs-2 fw-5">
                    Take Hubbers with you, wherever you go! An app created for inventors, creators, freelancers and investors.
                  </p>
                </div>
                <div className="app-link">
                  <Row>
                    <Col lg={12} sm={12} xs={24}>
                      <a href="https://itunes.apple.com/gb/app/hubbers-hub-of-makers/id1377168527" className="d-block mb-4">
                        <Image width={150} height={50} src="/images/appstore.png" />
                      </a>
                      <div className="pb-4">
                        <Image width={150} height={150} src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/APP/Hubbers%20Get%20Our%20APP%20QR.png" />
                      </div>
                    </Col>
                    <Col lg={12} sm={12} xs={24}>
                      <a href="https://play.google.com/store/apps/details?id=io.hubbers.app" className="d-block mb-4">
                        <Image width={150} height={50} src="/images/google_plat_store.png" />
                      </a>
                      <a href="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/APP/2.2.0/Hubbers-v2.2.0%2827%29.apk" className="mb-4 fs-2 primary-link">
                        Download APK
                      </a>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
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
export default GetOurApp;