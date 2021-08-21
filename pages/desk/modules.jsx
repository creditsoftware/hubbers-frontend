import React from 'react';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import { jwtDecode } from '../../utils/jwt';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
const Modules = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <DeskPageHoc title='Modules' activeSide={{ active: ['modules'], open: [] }} auth={{ ...data }} query={{...props.query}}>
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
export default Modules;