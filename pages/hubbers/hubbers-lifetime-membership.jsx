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
  MembershipBanner10
} from '../../components';
import { MainPageHoc } from '../../containers';
const LifetimeMembership = () => {
  return (
    <MainPageHoc title='Hubbers Lifetime Membership'>
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
        <MembershipBanner10 />
      </React.Fragment>
    </MainPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default LifetimeMembership;