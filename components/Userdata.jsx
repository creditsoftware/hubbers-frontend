import React from 'react';
import { Avatar, Popover, Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import Image from 'next/image';

export const Userdata = ({ ...props }) => {
  const thumbsPopover = (
    <div className="text-center">
      <div className="d-flex pt-3">
        <Avatar src={
          <Image width={100} height={100} src={props.image} alt='' />
        } size={100}/>
        <div className="p-3">
          <h3 className="mt-2 mb-0 fw-6 fs-2" title={props.name}>{props.name}</h3>
          <span className="user-country">{props.country}</span>
        </div>
      </div>
      <div className="pt-3">
        <Button type="text">See Activity</Button>
        <Button type="text">View Profile</Button>
      </div>
      <Button type="text">
        <MessageOutlined />Send Message
      </Button>
    </div>
  );
  return (
    <div className="user-box text-center m-auto">
      <Popover content={thumbsPopover}>
        <Avatar src={
          <Image width={100} height={100} src={props.image} alt='' />
        } size={100} style={{cursor: 'pointer'}} />
      </Popover>
      <h3 className="mt-2 mb-0 fw-6 fs-2" title={props.name}>{props.name}</h3>
      <span className="user-country">{props.country}</span>
      <p className="user-date">{props.date}</p>
    </div>
  );
};