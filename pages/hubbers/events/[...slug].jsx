import React from 'react';
import { MainPageHoc } from '../../../containers';
import { MainBanner, Talent, GuestSpeakers, TalkAbout, Location } from '../../../components';
import { useRouter } from 'next/router';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import { jwtDecode } from '../../../utils/jwt';
import useSWR from 'swr';
import { fetchJson } from '../../../utils';
import { fetcher } from '../../../utils/fetcher';
import moment from 'moment';

const EventDetail = ({ ...props }) => {
  const router = useRouter();
  const [eventData, setEventData] = React.useState({});
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  React.useEffect(() => {
    fetchJson(`${API.GET_EVENT_SLUG_API}/${router.query.slug}`).then((response) => {
      setEventData(response.data);
    });
  }, []);
  return (
    <MainPageHoc title='Hubers events' auth={{ ...data }}>
      <React.Fragment>
        <MainBanner
          title={eventData.title}
          date={eventData.startTime?.substring(0,5) + '-' + eventData.endTime?.substring(0,5) + ' ' + moment(eventData.startDate).format('MMMM, DD YYYY')}
          url={eventData.headerImageUrl}
        />
        <Talent eventData={eventData} />
        {
          eventData.speakers && <GuestSpeakers eventData={eventData} />
        }
        <TalkAbout eventData={eventData} />
        <Location eventData={eventData} />
      </React.Fragment>
    </MainPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: false } } };
  }
});
export default EventDetail;