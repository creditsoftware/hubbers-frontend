import { LinkedinOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { API } from '../../constants';
import { openPopupCenter } from '../../utils/window';

export const LinkedinLogin = () => {
  React.useEffect(() => {
    window.addEventListener('message', receiveToken);
  }, []);
  const receiveToken = (response) => {
    // if (response.data.type === 'linkedin') {
    console.log(response);
    // }
  };
  const handleClick = () => {
    console.log(`
    https://www.linkedin.com/oauth/v2/authorization?response_type=code` +
  `&client_id=${process.env.LINKEDIN_API_KEY}&redirect_uri=${API.LINKEDIN_LOGIN_REDIRECT_API}` +
  `&state=${Math.floor(Math.random() * 90000) + 10000}` +
  '&scope=r_liteprofile,r_emailaddress', 'Linkedin Authentication', 600, 600, API.LINKEDIN_LOGIN_REDIRECT_API);
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