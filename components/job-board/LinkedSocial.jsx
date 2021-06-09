import React from 'react';
import { TwitterOutlined, GoogleOutlined, FacebookOutlined, AppleOutlined, LinkedinOutlined } from '@ant-design/icons';
import { getRandomInt } from '../../utils/randomNumber';

export const SocialIcon = ({ name, className }) => {
  let classNameTemp = '';
  if (className) {
    classNameTemp = className;
  }
  return name === 'twitter' ?
    <TwitterOutlined className={classNameTemp} /> : name === 'google' ?
      <GoogleOutlined className={classNameTemp} /> : name === 'facebook' ?
        <FacebookOutlined className={classNameTemp} /> : name === 'apple' ?
          <AppleOutlined className={classNameTemp} /> : name === 'linkedin' ?
            <LinkedinOutlined className={classNameTemp} /> : <div></div>;
};

export const LinkedSocial = ({ name, title, className }) => {
  let classNameTemp = 'linked-social-wrap';
  if (className) {
    classNameTemp = 'linked-social-wrap ' + className;
  }
  return <div className={classNameTemp}>
    <div className='mr-2'>
      <div className='linked-social-wrap-background' style={{ backgroundImage: `url(/images/polygon/pol${getRandomInt(5, 8)}.png)` }}></div>
      <SocialIcon name={name} className='fc-white' />
    </div>
    <div className='fw-6 fc-grey'>
      {title}
    </div>
  </div>;
};