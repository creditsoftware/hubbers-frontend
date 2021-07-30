import { Col, Row } from 'antd';
import Image from 'next/image';
import React from 'react';
import { Container, JobApplyTable } from '../../../components';
import { MainPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { jwtDecode } from '../../../utils/jwt';
import { API } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
const HubbersJobBoard = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <MainPageHoc title='Hubbers Job Board' auth={{ ...data }}>
      <React.Fragment>
        <Container className='mt-5'>
          <React.Fragment>
            <h1 className="fw-6 fs-5 text-center mb-4">
              Hubbers Job Board
            </h1>
            <p className='max-w-50 text-center m-auto pb-4'>
              Put your passion and creativity for the community and get rewarded. Want to join us to grow our community, build our tools, design our UX fill free to drop us a message.
            </p>
          </React.Fragment>
        </Container>
        <div className="bg-white">
          <Container className='pb-3'>
            <Row>
              <Col lg={18} md={18}>
                <h3 className="fw-6 text-center pt-4 mb-4 fs-4">
                  What you get from this experience?
                </h3>
                <Row className='mb-2'>
                  <Col lg={1} md={1} sm={2} xs={3}>
                    <div className='w-100 h-100 d-flex f-align-center'>
                      <Image width={30} height={30} src='/images/homepage/create-community_icon_one.png' />
                    </div>
                  </Col>
                  <Col lg={23} md={23} sm={22} xs={21}>
                    <div className='w-100 h-100 d-flex f-align-center'>
                      Being part of great community of innovators and experts in product development.
                    </div>
                  </Col>
                </Row>
                <Row className='mb-2'>
                  <Col lg={1} md={1} sm={2} xs={3}>
                    <div className='w-100 h-100 d-flex f-align-center'>
                      <Image width={30} height={30} src='/images/homepage/create-community_icon_one.png' />
                    </div>
                  </Col>
                  <Col lg={23} md={23} sm={22} xs={21}>
                    <div className='w-100 h-100 d-flex f-align-center'>
                      Learn new skills and experiment by yourself.
                    </div>
                  </Col>
                </Row>
                <Row className='mb-2'>
                  <Col lg={1} md={1} sm={2} xs={3}>
                    <div className='w-100 h-100 d-flex f-align-center'>
                      <Image width={30} height={30} src='/images/homepage/create-community_icon_one.png' />
                    </div>
                  </Col>
                  <Col lg={23} md={23} sm={22} xs={21}>
                    <div className='w-100 h-100 d-flex f-align-center'>
                      Great environment of international-minded and innovation-focused members.
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={6} md={6}>
                <div className='w-100 h-100 d-flex f-align-center'>
                  <Image width={300} height={200} src='/images/job-board/job-board-main.png' />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container className='mb-4'>
          <React.Fragment>
            <h3 className="fw-6 text-center pt-4 mb-4 fs-4">
              Apply if you fit the following available positions
            </h3>
            <JobApplyTable auth={{ ...data }} />
          </React.Fragment>
        </Container>
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
export default HubbersJobBoard;