import React from 'react';
import { MainPageHoc } from '../../containers/hocs/MainPageHoc';
import { API } from '../../constants';
import { jwtDecode } from '../../utils/jwt';
import useSWR from 'swr';
import { fetcher, withSession } from '../../utils';
const SignupBasic = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <MainPageHoc title="Signup Basic" auth={{ ...data }} query={{...props.query}}>
      <div className='signin-page'>
      </div>
    </MainPageHoc>
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
export default SignupBasic;