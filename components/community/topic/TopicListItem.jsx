import { Space } from 'antd';
import React from 'react';
import Image from 'next/image';
import { DEFAULT_COMMUNITY_TOPIC_IMAGE } from '../../../constants/etc';
export const TopicListItem = ({...props}) => {
  console.log(props);
  return <Space style={{borderLeft:`8px solid ${'red'}`, borderTopLeftRadius:'5px', borderBottomLeftRadius:'5px'}}>
    <div style={{display:'flex'}}>
      <Image width={180} height={130} src={props.backgroundImageUrl ?? DEFAULT_COMMUNITY_TOPIC_IMAGE} alt='topic' />
    </div>
  </Space>;
};