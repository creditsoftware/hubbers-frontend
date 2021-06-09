import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import {
  Avatar,
  // Badge,
  Button,
  Popover,
  Space
} from 'antd';
import Image from 'next/image';
import { PostTileCtrlMenu } from './PostTileCtrlMenu';
export const PostTileHeader = ({ ...props }) => {
  return (
    <Space className='w-100'>
      {
        props &&
        props.post &&
        props.post.creator &&
        props.post.creator.user &&
        <React.Fragment>
          <Avatar src={<Image src={props.post.creator.user.avatar} width={100} height={100} />} size='large' />
          <div>
            {/* <Badge dot={true} status='success'> */}
            <b>
              {
                props.post.creator.user.firstname + ' ' + props.post.creator.user.lastname
              }
            </b>
            {/* </Badge> */}
            <div className="fs-1 fc-primary">
              {
                props.post.creator.role.name
              }
            </div>
          </div>
        </React.Fragment>
      }
      <Popover
        placement='bottomRight'
        content={
          <PostTileCtrlMenu onEdit={() => props.onHandleChange('edit')} onDelete={() => props.onHandleChange('delete')} />
        }
        trigger='click'
      >
        <Button type='text' shape='circle'>
          <MoreOutlined />
        </Button>
      </Popover>
    </Space>
  );
};