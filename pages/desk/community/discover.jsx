import { Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Image from 'next/image';
import React from 'react';
import { TopicSwiper, TopPostSwiper } from '../../../components';
import { denisAvatar, jomarieAvatar, wangAvatar } from '../../../constants/etc';
import { DeskPageHoc } from '../../../containers';
import { useRouter } from 'next/router';
import { withSession } from '../../../utils/withSession';
const Discover = (props) => {
  const router = useRouter();
  React.useLayoutEffect(() => {
    if (props.error === 'Unautherized you') {
      router.push('/auth/signin');
    }
  }, [router]);
  return (
    <DeskPageHoc title='Discover' activeSide={{ active: ['discover'], open: ['community'] }}>
      <div className='max-w-80 m-auto px-3 pt-5'>
        <h1 className="fw-6 fs-5">
          Discover
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
  if (!user) {
    await req.session.destroy();
    return { props: { error: 'Unautherized you', data: null } };
  }
  return { props: { error: null, data: null } };
});
export default Discover;