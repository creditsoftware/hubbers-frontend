import React from 'react';
import { MainPageHoc } from '../../containers/hocs/MainPageHoc';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API } from '../../constants';
import { jwtDecode } from '../../utils/jwt';
import useSWR from 'swr';
import { fetcher, withSession, openNotificationWithIcon } from '../../utils';
const ConfirmVerifyEmail = ({ ...props }) => {
  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [btnLoading, setBtnLoading] = React.useState(false);
  const confirmHandle = () => {
    setBtnLoading(true);
    const email = router.query ? router.query.email : undefined;
    const community = router.query ? router.query.community : undefined;
    axios.post(`${API.LOCAL_VERIFY_EMAIL_API}`, { email: email, community:community })
      .then((response) => {
        if (response.data.success === true) {
          openNotificationWithIcon('success', 'Success', response.data.message);
        }
        setBtnLoading(false);
        setTimeout(() => {
          router.push(`/auth/signup-detail?email=${email}${community?'&community=' + community : ''}`);
        }, 300);
      })
      .catch((err) => {
        setBtnLoading(false);
        openNotificationWithIcon('error', 'Something went wrong!', err.response.data.message);
      });
  };
  return (
    <MainPageHoc title="Confirm email" auth={{ ...data }} query={{...props.query}}>
      <div className='signin-page'>
        <p className="text-center py-5 fs-1">
          Please activate your account
        </p>
        <div className="text-center">
          <Button size='large' loading={btnLoading} shape='round' className='mt-4' htmlType='submit' type='hbs-primary' onClick={confirmHandle}>
            Activate your account
          </Button>
        </div>
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
export default ConfirmVerifyEmail;