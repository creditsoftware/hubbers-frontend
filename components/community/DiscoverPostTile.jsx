import { Avatar, Space } from 'antd';
import Image from 'next/image';
import React from 'react';
import { denisAvatar, post1Image } from '../../constants/etc';
export const DiscoverPostTile = () => {
  return <Space direction='vertical' className='discover-post-tile-wrap'>
    <Image width={100} height={100} src={post1Image}/>
    <div>
      Bring your expertise in a specific module
    </div>
    <Space direction='horizontal'>
      <Avatar src={<Image width={100} height={100} src={denisAvatar}/> }/>
      <div>
        Denis Kravchenko
      </div>
    </Space>
  </Space>;
};