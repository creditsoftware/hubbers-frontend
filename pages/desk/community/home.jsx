import React from 'react';
import { withSession } from '../../../utils/withSession';
import { DeskPageHoc } from '../../../containers';
import { CommunityManageBtn, CreateNewBtn, HomeFilter, HomeSorter, SwitchCommunity, HomeBody } from '../../../components';
import JoinInCommunity from './join';
import { useRouter } from 'next/router';
import { API } from '../../../constants/apis';
import { REQUEST_TYPE } from '../../../constants/requestType';
import { httpApiServer } from '../../../utils/httpRequest';
const Home = (props) => {
  const router = useRouter();
  const [community, setCommunity] = React.useState(null);
  React.useLayoutEffect(() => {
    if (props.error === 'Unautherized you') {
      router.push('/auth/signin');
    }
    setCommunity(props.data?.data);
  }, [router]);
  return (
    router.query.community === 'join' ?
      <JoinInCommunity />
      : <DeskPageHoc title='Home' activeSide='home'>
        <div className='max-w-80 m-auto px-3'>
          <div className="f-right" style={{ right: 10, top: 70 }}>
            <SwitchCommunity />
          </div>
          <h1 className="fw-6 fs-5 mt-5">
            {
              community &&
              community.name
            }
            &nbsp;Community
          </h1>
          <div className='text-right'>
            <CommunityManageBtn />
            <CreateNewBtn />
          </div>
          <div className='homepage-action-bar'>
            <HomeFilter />
            <HomeSorter className='ml-2' />
          </div>
          <HomeBody />
        </div>
      </DeskPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req, query } = ctx;
  const user = await req.session.get('user');
  if (!user) {
    await req.session.destroy();
    return { props: { error: 'Unautherized you', data: null } };
  }
  let communityId;
  if (query.community && query.community !== 'join') {
    communityId = query.community;
  } else {
    await httpApiServer(`${API.IS_EXIST_MY_COMMUNITY_API}/${user.id}`, REQUEST_TYPE.GET, null, ctx)
      .then((response) => {
        communityId = response.data && response.data[0] && response.data[0].id;
      })
      .catch(async (err) => {
        if (err.response && err.response.status === 401) {
          await req.session.destroy();
          return { props: { error: err.message, data: null } };
        }
        return { props: { data: null, error: err.message } };
      });
  }
  return httpApiServer(`${API.COMMUNITY_DETAIL_API}/${communityId}`, REQUEST_TYPE.GET, null, ctx)
    .then((response) => {
      return { props: { data: response, error: null } };
    })
    .catch(async (err) => {
      if (err.response && err.response.status === 401) {
        await req.session.destroy();
        return { props: { error: err.message, data: null } };
      }
      return { props: { data: null, error: err.message } };
    });
});
export default Home;