import { Col, Row } from 'antd';
import React from 'react';
import {
  CreateEventBtn,
  SwitchCommunity,
} from '../../../components';
import { Space } from 'antd';
import { DeskPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/apis';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import JoinInCommunity from './join';
const Events = (props) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });

  return (
    props.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} />
      : <DeskPageHoc title='Events' activeSide={{ active: ['members'], open: ['community'] }} auth={{ ...data }}>
        <React.Fragment>
          <div className='max-w-80 m-auto px-3 pt-5'>
            <Row>
              <Col span={12}>
                <h1 className='fw-6 fs-5'>Events</h1>
              </Col>
              <Col span={12} className='text-right'>
                <Space>
                  <CreateEventBtn auth={{...data}} />
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
            </div>
          </div>
        </React.Fragment>
      </DeskPageHoc>
  );
};

export const getServerSideProps = withSession(async (ctx) => {
  const { req, query } = ctx;
  const user = await req.session.get('user');
  if (!user) {
    await req.session.destroy();
    return { props: { auth: { isLoggedIn: false, ...user }, query } };
  }
  return { props: { data: null, error: null, auth: { isLoggedIn: true, ...user }, query } };
});
export default Events;