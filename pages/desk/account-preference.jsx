import React from 'react';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import useSWR from 'swr';
import { jwtDecode } from '../../utils/jwt';
import { fetcher } from '../../utils/fetcher';
const AccountPreference = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <DeskPageHoc title='Account preference' activeSide={{ active: ['account-preference'], open: [] }} auth={{ ...data }} query={{...props.query}}>
      <React.Fragment>

      </React.Fragment>
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
export default AccountPreference;