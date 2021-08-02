import React from 'react';
import {  Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';

export const CourseManageItem = ({ ...props }) => {
  return <Button
    style={{
      width: '100%',
      height: 'auto',
      border: '1px solid grey',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '12px 0',
      padding: '12px 24px'
    }}
    {...props}
  >
    <div className="pr-3 text-left" style={{ whiteSpace: 'break-spaces' }}>
      <p className="mb-0" style={{ fontSize: '18px' }}>{props.text}</p>
      {
        props.description?<p className="mb-0" style={{ color: 'grey' }}>{props.description}</p>:null
      }
    </div>
    <RightOutlined />
  </Button>;
};