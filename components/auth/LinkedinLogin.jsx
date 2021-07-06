import { LinkedinOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { API } from '../../constants';
import { REQUEST_TYPE } from '../../constants/requestType';
import { openPopupCenter, fetchJson } from '../../utils';

export const LinkedinLogin = () => {
  React.useEffect(() => {
    window.addEventListener('message', receiveToken);
  }, []);
  const receiveToken = async (response) => {
    if (response.data.type === 'linkedin') {
      const token = response.data.data;
      fetchJson(`${API.LOCAL_REFRESH_API}`, {
        method: REQUEST_TYPE.POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(token),
      });
    }
  };
  const handleClick = () => {
    openPopupCenter(`
      	https://www.linkedin.com/oauth/v2/authorization?response_type=code` +
      `&client_id=${process.env.LINKEDIN_API_KEY}&redirect_uri=${API.LINKEDIN_LOGIN_REDIRECT_API}` +
      `&state=${Math.floor(Math.random() * 90000) + 10000}` +
      '&scope=r_liteprofile,r_emailaddress', 'Linkedin Authentication', 600, 600, API.LINKEDIN_LOGIN_REDIRECT_API);
  };
  return <Button type="linkedin" icon={<LinkedinOutlined />} size='large' onClick={handleClick}>
    Sign in with Linkedin
  </Button>;
};