import { Col, Row } from 'antd';
import React from 'react';
import {
  CreateEventBtn,
  SwitchCommunity,
} from '../../../components';
import { Space } from 'antd';
import { DeskPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { jwtDecode } from '../../../utils/jwt';
import { API } from '../../../constants/apis';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import JoinInCommunity from './join';
import { useEventList } from '../../../hooks';
import { EventListItem } from '../../../components/community/events/EventListItem';
const Events = (props) => {
  const [eventList, setEventList] = React.useState(null);
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const { data: events } = useEventList(props.query.community);
  React.useEffect(() => {
    console.log(events);
    if (events) {
      setEventList(events.data);
    }
  }, [events]);
  return (
    props.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} />
      : <DeskPageHoc title='Events' activeSide={{ active: [`events-${props.query.community}`], open: ['community'] }} auth={{ ...data }}>
        <React.Fragment>
          <div className='max-w-80 m-auto px-3 pt-5'>
            <Row>
              <Col span={12}>
                <h1 className='fw-6 fs-5'>Events</h1>
              </Col>
              <Col span={12} className='text-right'>
                <Space>
                  <CreateEventBtn auth={{ ...data }} query={{...props.query}} />
                  <SwitchCommunity />
                </Space>
              </Col>
            </Row>
            {/* <Space>
              <Button type='hbs-primary'>Upcoming</Button>
              <Button type='hbs-outline-primary'>Nearby</Button>
              <Button type='hbs-outline-primary'>Past</Button>
              <Button type='hbs-outline-primary'>Yours</Button>
            </Space> */}
            <div>
              {
                eventList &&
                eventList.length > 0 &&
                eventList.map((e) => {
                  return <EventListItem key={e.id} {...e} auth={{...props.auth}} query={{...props.query}} />;
                })
              }
            </div>
          </div>
        </React.Fragment>
      </DeskPageHoc>
  );
};

export const getServerSideProps = withSession(async (ctx) => {
  const { req, query } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (!user) {
    await req.session.destroy();
    return { props: { auth: { isLoggedIn: false, ...user }, query } };
  }
  return { props: { data: null, error: null, auth: { isLoggedIn: true, ...user }, query } };
});
export default Events;