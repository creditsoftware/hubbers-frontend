import React from 'react';
import moment from 'moment';
import useSWR from 'swr';
import { MainPageHoc } from '../../../containers';
import { MainBanner, Talent, GuestSpeakers, TalkAbout, Location } from '../../../components';
import { useRouter } from 'next/router';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import { jwtDecode } from '../../../utils/jwt';
import { fetchJson } from '../../../utils';
import { fetcher } from '../../../utils/fetcher';
import { DEFAULT_COMMUNITY_TOPIC_IMAGE } from '../../../constants/etc';

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
    <MainPageHoc title='Hubers events' auth={{ ...data }} query={{...props.query}}>
      <React.Fragment>
        <MainBanner
          title={eventData.title}
          date={eventData.startTime?.substring(0,5) + '-' + eventData.endTime?.substring(0,5) + ' ' + moment(eventData.startDate).format('MMMM, DD YYYY')}
          url={eventData.headerImageUrl ?? DEFAULT_COMMUNITY_TOPIC_IMAGE}
        />
        <Talent eventData={eventData} auth={{ ...data }} />
        {
          eventData.speakers?.length && <GuestSpeakers eventData={eventData} />
        }
        <TalkAbout eventData={eventData} />
        <Location eventData={eventData} />
      </React.Fragment>
    </MainPageHoc>
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
export default EventDetail;