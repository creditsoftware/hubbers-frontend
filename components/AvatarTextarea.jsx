import React from 'react';
import { Avatar, Input, Card, Space, Image } from 'antd';
const { TextArea } = Input;
export const AvatarTextarea = ({ avatar, placeholder, value, onChange }) => {
  return (
    <Card className='avatar-textarea-wrap'>
      <Space>
        <Avatar size='large' src={<Image alt='' width={40} height={40} src={avatar} />} />
        <TextArea placeholder={placeholder} allowClear value={value} bordered={false} onChange={onChange} />
      </Space>
    </Card>
  );
};