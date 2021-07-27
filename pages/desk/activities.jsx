import React from 'react';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
import { Container, ActivityCards } from '../../components';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import { jwtDecode } from '../../utils/jwt';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
const Activities = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <DeskPageHoc title='Activities' activeSide={{ active: ['activities'], open: [] }} auth={{ ...data }}>
      <Container className="py-5">
        <React.Fragment>
          <p className="max-w-40 m-auto fw-6 fs-1 text-center pt-5">
            Hubbers is a hub of creators, innovators that work together to launch and work on new products. Now you are part of us, time to select what you want to do next.
          </p>
          <ActivityCards />
        </React.Fragment>
      </Container>
    </DeskPageHoc>
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
export default Activities;