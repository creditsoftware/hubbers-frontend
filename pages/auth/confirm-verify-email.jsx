import React from 'react';
import { MainPageHoc } from '../../containers/hocs/MainPageHoc';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API } from '../../constants';
import openNotificationWithIcon from '../../utils/openNotificationWithIcon';
const ConfirmVerifyEmail = () => {
  const router = useRouter();
  const [btnLoading, setBtnLoading] = React.useState(false);
  const confirmHandle = () => {
    setBtnLoading(true);
    const email = router.query.email;
    axios.post(`${API.LOCAL_VERIFY_EMAIL_API}`, { email: email })
      .then((response) => {
        if (response.data.success === true) {
          openNotificationWithIcon('success', 'Success', response.data.message);
        }
        setBtnLoading(false);
        setTimeout(() => {
          router.push('/auth/signin');
        }, 300);
      })
      .catch((err) => {
        setBtnLoading(false);
        openNotificationWithIcon('error', 'Something went wrong!', err.response.data.message);
      });
  };
  return (
    <MainPageHoc title="Confirm email">
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

export default ConfirmVerifyEmail;