import React from 'react';
import { Space } from 'antd';
import Image from 'next/image';
import Avatar from 'antd/lib/avatar/avatar';
export const Testimonial = (props) => {
  return (
    <Space className='mb-4'>
      <Avatar size={150} src={<Image width={200} height={200} src={props.imageUrl}/>}/>
      <div>
        <p className='m-0'>
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