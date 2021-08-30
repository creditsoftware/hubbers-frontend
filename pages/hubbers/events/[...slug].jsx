import React from 'react';
import moment from 'moment';
import useSWR from 'swr';
import { MainPageHoc } from '../../../containers';
import { MainBanner, Talent, GuestSpeakers, TalkAbout, Location } from '../../../components';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import { jwtDecode } from '../../../utils/jwt';
import { fetchJson } from '../../../utils';
import { fetcher } from '../../../utils/fetcher';
import { DEFAULT_COMMUNITY_TOPIC_IMAGE } from '../../../constants/etc';

const EventDetail = ({ ...props }) => {
  const [eventData, setEventData] = React.useState({});
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const { data: eventDetail } = useSWR(`${API.GET_EVENT_SLUG_API}/${props.query.slug}`, fetcher, { initialData: props.eventDetail });
  React.useEffect(() => {
    if(eventDetail) {
      setEventData(eventDetail.data);
    }
  }, [eventDetail]);
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
          eventData.speakers?.length > 0 && <GuestSpeakers eventData={eventData} />
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
  const eventDetail = await fetchJson(`${API.GET_EVENT_SLUG_API}/${query.slug}`);
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user }, query, eventDetail } };
  } else {
    return { props: { auth: { isLoggedIn: false }, query, eventDetail } };
  }
});
export default EventDetail;