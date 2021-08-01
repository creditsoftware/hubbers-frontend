import React from 'react';
import {  Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';

export const CourseManageItem = ({ ...props }) => {
  return <Button
    style={{
        width: '500px',
        border: '1px solid grey',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '12px 0',
        padding: '20px',
        fontSize: '18px'
    }}
    {...props}
  >
    {props.text}
    <RightOutlined />
  </Button>;
};