import React from 'react';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
const AccountPreference = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <DeskPageHoc title='Account preference' activeSide={{ active: ['account-preference'], open: [] }} auth={{ ...data }}>
      <React.Fragment>

      </React.Fragment>
    </DeskPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req } = ctx;
  const user = await req.session.get('user');
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: false } } };
  }
});
export default AccountPreference;