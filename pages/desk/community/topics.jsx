import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import {
  SwitchCommunity,
} from '../../../components';
import { Space } from 'antd';
import { DeskPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/apis';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import JoinInCommunity from './join';
const Topics = (props) => {
  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    router.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} />
      : <DeskPageHoc title='Members' activeSide={{ active: ['members'], open: ['community'] }} auth={{ ...data }}>
        <React.Fragment>
          <div className='max-w-80 m-auto px-3 pt-5'>
            <Row>
              <Col span={12}>
                <h1 className='fw-6 fs-5'>Topics</h1>
              </Col>
              <Col span={12} className='text-right'>
                <Space>
                  <SwitchCommunity />
                </Space>
              </Col>
            </Row>
            <div>
            
            </div>
          </div>
        </React.Fragment>
      </DeskPageHoc>
  );
};

export const getServerSideProps = withSession(async (ctx) => {
  const { req } = ctx;
  const user = await req.session.get('user');
  if (!user) {
    await req.session.destroy();
    return { props: { auth: { isLoggedIn: false, ...user } } };
  }
  return { props: { data: null, error: null, auth: { isLoggedIn: true, ...user } } };
});
export default Topics;