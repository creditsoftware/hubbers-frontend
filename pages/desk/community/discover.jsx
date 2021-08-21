import { Space, Tooltip, Image } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
// import Image from 'next/image';
import React from 'react';
import {
  TopicSwiper,
  // TopPostSwiper,
  SwitchCommunity
} from '../../../components';
import { jwtDecode } from '../../../utils/jwt';
import { DeskPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { API, primaryColor } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import JoinInCommunity from './join';
const Discover = ({ ...props }) => {
  const [memberList, setMemberList] = React.useState(null);
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  React.useEffect(() => {
    if (props.query.community) {
      fetch(`${API.GET_MEMBER_LIST_API}/${props.query.community}`).then(async (response) => setMemberList(await response.json()));
    }
  }, [props.query.community]);
  return (
    props.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} query={{...props.query}}/>
      : <DeskPageHoc title='Discover' activeSide={{ active: [`discover-${props.query.community}`], open: ['community'] }} auth={{ ...data }} query={{...props.query}}>
        <div className='max-w-80 m-auto px-3 pt-5'>
          <h1 className="fw-6 fs-5">
            Discover
            {/* in {community?.name} */}
            <span style={{ float: 'right' }}>
              <SwitchCommunity />
            </span>
          </h1>
          {/* <div className="fw-6 fs-2 mb-3">
            Top Posts
          </div>
          <TopPostSwiper /> */}
          <div className="fw-6 fs-2 mt-5">
            Members near you
          </div>
          <div className='mb-3'>
            Inside your first members. Or, better yet, share out the whole world.
          </div>
          <div>
            <Space className='discover-members-wrap' wrap>
              {
                memberList &&
                memberList.data &&
                memberList.data.map((e) => {
                  return <Tooltip
                    color={primaryColor}
                    placement='bottom'
                    key={e.id}
                    title={`${e.user?.firstname ? e.user?.firstname : ''} ${e.user?.lastname ? e.user?.lastname : ''}${!e.user?.firstname && !e.user?.lastname ? e.user?.email : ''}`}>
                    <Avatar src={<Image preview={false} width={100} height={100} src={e.user?.avatar ? e.user?.avatar : '/images/icons/avatar.png'} alt='' />} />
                  </Tooltip>;
                })
              }
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
  const { req, query } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user }, query } };
  } else {
    return { props: { auth: { isLoggedIn: false }, query } };
  }
});
export default Discover;