import { Space, Tooltip } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Image from 'next/image';
import React from 'react';
import {
  TopicSwiper,
  // TopPostSwiper,
  SwitchCommunity
} from '../../../components';
import { DeskPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { API, primaryColor } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import JoinInCommunity from './join';
import { useRouter } from 'next/router';
import { fetchJson } from '../../../utils';
const Discover = ({ ...props }) => {
  const router = useRouter();
  const [memberList, setMemberList] = React.useState(null);
  const [community, setCommunity] = React.useState(null);
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  React.useEffect(() => {
    console.log(community);
    if (router.query.community) {
      fetch(`${API.GET_MEMBER_LIST_API}/${router.query.community}`).then(async (response) => setMemberList(await response.json()));
      fetchJson(`${API.LOCAL_GET_COMMUNITY_LIST_API}`).then((response) => {
        if (response.data && response.data.data?.length > 0) {
          setCommunity(response.data.data.filter((f) => Number(f.id) === Number(router.query.community)) && response.data.data.filter((f) => Number(f.id) === Number(router.query.community))[0]);
        }
      });
    }
  }, [router]);
  return (
    router.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} />
      : <DeskPageHoc title='Discover' activeSide={{ active: ['discover'], open: ['community'] }} auth={{ ...data }}>
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
                    title={`${e.user?.firstname && e.user?.firstname} ${e.user?.lastname && e.user?.lastname}${!e.user?.firstname && !e.user?.lastname && e.user?.email}`}>
                    <Avatar src={<Image width={100} height={100} src={e.user?.avatar ? e.user?.avatar : '/images/icons/avatar.png'} />} />
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
  const { req } = ctx;
  const user = await req.session.get('user');
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: false } } };
  }
});
export default Discover;