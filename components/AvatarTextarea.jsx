import React from 'react';
import { Avatar, Input, Card, Space } from 'antd';
import Image from 'next/image';
const { TextArea } = Input;
export const AvatarTextarea = ({ avatar, placeholder, value, onChange }) => {
  return (
    <Card className='avatar-textarea-wrap'>
      <Space>
        <Avatar size='large' src={<Image width={100} height={100} src={avatar} />} />
        <TextArea placeholder={placeholder} allowClear value={value} bordered={false} onChange={onChange} />
      </Space>
    </Card>
  );
};