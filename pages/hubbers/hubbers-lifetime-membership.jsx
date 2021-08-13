import React from 'react';
import {
  MembershipBanner1,
  MembershipBanner2,
  MembershipBanner3,
  MembershipBanner4,
  MembershipBanner5,
  MembershipBanner6,
  MembershipBanner7,
  MembershipBanner8,
  MembershipBanner9,
  Testimonials
} from '../../components';
import { jwtDecode } from '../../utils/jwt';
import { MainPageHoc } from '../../containers';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
const LifetimeMembership = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <MainPageHoc title='Hubbers Lifetime Membership' auth={{ ...data }}>
      <React.Fragment>
        <MembershipBanner1 />
        <MembershipBanner2 />
        <MembershipBanner3 />
        <MembershipBanner4 />
        <MembershipBanner5 />
        <MembershipBanner6 />
        <MembershipBanner7 />
        <MembershipBanner8 />
        <MembershipBanner9 />
        <Testimonials />
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
export default LifetimeMembership;