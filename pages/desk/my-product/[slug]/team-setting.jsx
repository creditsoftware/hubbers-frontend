import React from 'react';
import { DeskPageHoc } from '../../../../containers/hocs/DeskPageHoc';
import { withSession } from '../../../../utils/withSession';
import { API } from '../../../../constants/index';
import useSWR from 'swr';
import { jwtDecode } from '../../../../utils/jwt';
import { fetcher } from '../../../../utils/fetcher';
const TeamSetting = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <DeskPageHoc title='Team Setting' activeSide={{ active: ['team-setting'], open: ['my-product', 'product1'] }} auth={{ ...data }}>
      <React.Fragment>

      </React.Fragment>
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
export default TeamSetting;