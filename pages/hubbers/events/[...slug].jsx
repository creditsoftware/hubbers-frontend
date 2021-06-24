import React from 'react';
import { MainPageHoc } from '../../../containers';
import { MainBanner, Talent, GuestSpeakers, TalkAbout, Location } from '../../../components';
import { useRouter } from 'next/router';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
const EventDetail = ({ ...props }) => {
  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <MainPageHoc title='Hubers events' auth={{ ...data }}>
      <React.Fragment>
        <MainBanner
          title={router.query.slug}
          date={'18:00-20:00 Sep, 22 2019'}
          url={'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/argentina.jpg'}
        />
        <Talent />
        <GuestSpeakers />
        <TalkAbout />
        <Location />
      </React.Fragment>
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
export default EventDetail;