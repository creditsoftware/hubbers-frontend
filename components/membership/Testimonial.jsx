import React from 'react';
import { Space, Avatar } from 'antd';

export const Testimonial = (props) => {
  return (
    <Space className='mb-4'>
      <Avatar size={150} src={props.imageUrl} />
      <div className="pl-3">
        <p className='mb-1'>
          <b>
            {
              props.name
            }
          </b>
        </p>
        <p className='m-0'>
          {
            props.role
          }
        </p>
        {
          props.linkedinUrl &&
          <p className='m-0'>
            <a className='primary-link'>
              {
                props.linkedinUrl
              }
            </a>
          </p>
        }
        <p className='m-0'>
          {
            props.content
          }
        </p>
      </div>
    </Space>
  );
};