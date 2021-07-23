import React from 'react';
import JoinInCommunity from './join';
import useSWR from 'swr';
import { API } from '../../../constants/apis';
import { fetcher } from '../../../utils/fetcher';
import { useRouter } from 'next/router';
import { Row, Col, Space } from 'antd';
import { withSession } from '../../../utils/withSession';
import { DeskPageHoc } from '../../../containers';
import { CreateCourseBtn } from '../../../components';

const Course = (props) => {
  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    router.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} />
      : <DeskPageHoc title='Course - Hubbers Community' activeSide={{ active: [`Course-${router.query.community}`], open: ['community'] }} auth={{ ...data }}>
        <React.Fragment>
          <div className='max-w-80 m-auto px-3 pt-5'>
            <Row>
              <Col span={12}>
                <h1 className='fw-6 fs-5'>Course</h1>
              </Col>
              <Col span={12} className='text-right'>
                <Space>
                  <CreateCourseBtn auth={{ ...data }}/>
                </Space>
              </Col>
            </Row>
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
export default Course;