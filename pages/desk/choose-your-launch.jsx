import React from 'react';
import Image from 'next/image';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
import { Container, ChooseYourLaunchProgress, ChooseYourLaunchSelector } from '../../components';
import { Space, Button } from 'antd';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import { jwtDecode } from '../../utils/jwt';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
const ChooseYourLaunch = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <DeskPageHoc title='Choose your launch' activeSide={{ active: ['choose-your-launch'], open: [] }} auth={{ ...data }} query={{...props.query}}>
      <Container className="pt-5">
        <React.Fragment>
          <ChooseYourLaunchProgress />
          <p className="fw-6 fs-1 py-3">
            Now your general product specification is now clarified and your team is set, still a long way to go to the market. 2 main ways to launcha new product with Hubbers workspace, tools, and great comunity.
          </p>
          <ChooseYourLaunchSelector />
          <div className="px-4 pt-2 text-center">
            <p className="fs-1 fw-6 py-4">
              In order to apply for the accelerator, our communicate need to know more about your products. All communicate membersbare bound to very strict non-dsclosure, non- conpetition &amp; agreement.
            </p>
            <p className="fs-1">
              The application is a 5- step process that helps you see the potential interest. Our commmittee is more judging the work that has been done to refine the project that to give good and bad marks.
            </p>
            <Space size={30} wrap align="center" className="my-3 fjc-center w-100">
              <div style={{ width: '160px' }}>
                <Image width={150} height={115} src="/images/choose-launch/lean_canvas.png" />
                <p className="fs-1 fw-6">Lean Canvas</p>
              </div>
              <div style={{ width: '160px' }}>
                <Image width={150} height={115} src="/images/choose-launch/product_specification.png" />
                <p className="fs-1 fw-6">Product Specification</p>
              </div>
              <div style={{ width: '160px' }}>
                <Image width={150} height={115} src="/images/choose-launch/product_design.png" />
                <p className="fs-1 fw-6">Product Design</p>
              </div>
              <div style={{ width: '160px' }}>
                <Image width={150} height={115} src="/images/choose-launch/product_competition.png" />
                <p className="fs-1 fw-6">Product Competition</p>
              </div>
              <div style={{ width: '160px' }}>
                <Image width={150} height={115} src="/images/choose-launch/potential_user.png" />
                <p className="fs-1 fw-6">Potential user/buyer/community feedback</p>
              </div>
            </Space>
            <p className="fs-1 pb-3">
              Once you have been through those steps, a small commitment is asked to you of USD 1 refundable fees is asked to you. Help us to verify your identify and make sure that we do a small effort. If our file is not complete you will have the possibility to rework on it once.
            </p>
            <Button type="hbs-primary" size="large" shape="round">START THE APPLICATION</Button>
          </div>
        </React.Fragment>
      </Container>
    </DeskPageHoc>
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
export default ChooseYourLaunch;