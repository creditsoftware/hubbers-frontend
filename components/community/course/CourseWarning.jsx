import React from 'react';
import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';

export const CourseWarning = ({...props}) => {
  return <div
    style={{
      color: '#e7b556',
      backgroundColor: '#fdf8ee',
      borderRadius: '5px',
      border: '1px solid #e7b556',
      padding: '12px 24px',
      marginTop: '42px',
      fontSize: '18px'
    }}
  >
    <p className="mb-0">{props.text}</p>
  </div>;
};