import { Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Image from 'next/image';
import React from 'react';
import {
  TopicSwiper,
  TopPostSwiper,
  SwitchCommunity
} from '../../../components';
import {
  denisAvatar,
  jomarieAvatar,
  wangAvatar
} from '../../../constants/etc';
import { DeskPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import JoinInCommunity from './join';
import { useRouter } from 'next/router';
const Discover = ({ ...props }) => {
  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    router.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} />
      : <DeskPageHoc title='Discover' activeSide={{ active: ['discover'], open: ['community'] }} auth={{ ...data }}>
        <div className='max-w-80 m-auto px-3 pt-5'>
          <h1 className="fw-6 fs-5">
            Discover
            <span style={{ float: 'right' }}>
              <SwitchCommunity />
            </span>
          </h1>
          <div className="fw-6 fs-2 mb-3">
            Top Posts
          </div>
          <TopPostSwiper />
          <div className="fw-6 fs-2 mt-5">
            Members near you
          </div>
          <div className='mb-3'>
            Inside your first members. Or, better yet, share out the whole world.
          </div>
          <div>
            <Space className='discover-members-wrap' wrap>
              <Avatar src={<Image width={100} height={100} src={denisAvatar} />} />
              <Avatar src={<Image width={100} height={100} src={jomarieAvatar} />} />
              <Avatar src={<Image width={100} height={100} src={wangAvatar} />} />
            </Space>
          </div>
          <div className="fw-6 fs-2 mt-5 mb-3">
            Topics
          </div>
          <TopicSwiper />
        </div>
      </DeskPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req } = ctx;
  const user = await req.session.get('user');
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: false } } };
  }
});
export default Discover;