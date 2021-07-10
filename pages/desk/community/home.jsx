import React from 'react';
import { withSession } from '../../../utils/withSession';
import { DeskPageHoc } from '../../../containers';
import { CommunityManageBtn, CreateNewBtn, HomeFilter, HomeSorter, SwitchCommunity, HomeBody } from '../../../components';
import JoinInCommunity from './join';
import { useRouter } from 'next/router';
import { API } from '../../../constants/apis';
import { REQUEST_TYPE } from '../../../constants/requestType';
import { httpApiServer } from '../../../utils/httpRequest';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
const Home = ({ ...props }) => {
  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [community, setCommunity] = React.useState(null);
  React.useEffect(() => {
    setCommunity(props.data?.data);
  }, [router]);
  return (
    router.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} />
      : <DeskPageHoc title='Home' activeSide={{ active: ['home'], open: ['community'] }} auth={{ ...data }}>
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
            <CreateNewBtn auth={{ ...data }} />
          </div>
          <div>
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
    return { props: { auth: { isLoggedIn: false, ...user } } };
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
          return { props: { error: err.message, data: null, auth: { isLoggedIn: true, ...user } } };
        }
        return { props: { data: null, error: err.message, auth: { isLoggedIn: true, ...user } } };
      });
  }
  return httpApiServer(`${API.COMMUNITY_DETAIL_API}/${communityId}`, REQUEST_TYPE.GET, null, ctx)
    .then((response) => {
      return { props: { data: response, error: null, auth: { isLoggedIn: true, ...user } } };
    })
    .catch(async (err) => {
      if (err.response && err.response.status === 401) {
        await req.session.destroy();
        return { props: { error: err.message, data: null, auth: { isLoggedIn: true, ...user } } };
      }
      return { props: { data: null, error: err.message, auth: { isLoggedIn: true, ...user } } };
    });
});
export default Home;