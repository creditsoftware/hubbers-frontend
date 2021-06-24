import React from 'react';
import { MainPageHoc } from '../../../containers';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { fetchJson, openNotificationWithIcon, withSession, fetcher } from '../../../utils';
import { API } from '../../../constants/index';
import useSWR from 'swr';
const Activate = ({ ...props }) => {
  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [communityDetail, setCommunityDetail] = React.useState(null);
  const fetchCommunity = async () => {
    let community = await fetchJson(`${process.env.API_V1}community/${router.query.community}`);
    if (community.success) {
      setCommunityDetail(community.data);
    }
  };
  React.useEffect(() => {
    fetchCommunity();
  }, [router]);
  const activate = async () => {
    let result = await fetchJson(`${process.env.API_V1}community/member-invite/activate/${router.query.community}/${props.auth?.id}`);
    if (result && result.success) {
      openNotificationWithIcon('success', 'Activated you', `${result.message}`);
      router.push(`/desk/community/home?community=${router.query.community}`);
    } else {
      openNotificationWithIcon('error', 'Something went wrong', `${result.message}`);
    }
    return;
  };
  return (
    <MainPageHoc title='Activate' auth={{ ...data }}>
      <div className='max-w-80 m-auto px-3 pt-5 text-center'>
        <h1 className="fs-5 fw-6">
          Join in {communityDetail && communityDetail.name} community
        </h1>
        <div className="text-center">
          <Button type='hbs-primary' size='large' shape='round' onClick={activate}>Go to the communtiy</Button>
        </div>
      </div>
    </MainPageHoc>
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
export default Activate;