import React from 'react';
import { MainPageHoc } from '../../../containers';
import { useRouter } from 'next/router';
import { withSession } from '../../../utils/withSession';
import { Button } from 'antd';
import { fetchJson } from '../../../utils/fetchJson';
import openNotificationWithIcon from '../../../utils/openNotificationWithIcon';
const Activate = (props) => {
  const router = useRouter();
  const [communityDetail, setCommunityDetail] = React.useState(null);
  const fetchCommunity = async () => {
    let community = await fetchJson(`${process.env.API_V1}community/${router.query.community}`);
    if(community.success) {
      setCommunityDetail(community.data);
    }
  };
  React.useLayoutEffect(() => {
    if (props.error === 'Unautherized you') {
      router.push('/auth/signin');
    }
    fetchCommunity();
  }, [router]);
  const activate = async () => {
    let result = await fetchJson(`${process.env.API_V1}community/member-invite/activate/${router.query.community}/${props.data?.id}`);
    if(result && result.success) {
      openNotificationWithIcon('success', 'Activated you', `${result.message}`);
      router.push(`/desk/community/home?community=${router.query.community}`);
    } else {
      openNotificationWithIcon('error', 'Something went wrong', `${result.message}`);
    }
    return;
  };
  return (
    <MainPageHoc title='Activate'>
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
  if (!user) {
    await req.session.destroy();
    return { props: { error: 'Unautherized you', data: null } };
  }
  return { props: { error: null, data: user } };
});
export default Activate;