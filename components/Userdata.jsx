import React from 'react';
import { Avatar } from 'antd';
import Image from 'next/image';

export const Userdata = ({ ...props }) => {
  return (
    <div className="user-box text-center m-auto">
      <Avatar src={
        <Image width={100} height={100} src={props.image} alt='' />
      } size={100}/>
      <h3 className="mt-2 mb-0 fw-6 fs-2">{props.name}</h3>
      <span className="user-country">{props.country}</span>
      <p className="user-date">{props.date}</p>
    </div>
  );
};