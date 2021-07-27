import React from 'react';
import { DeskPageHoc } from '../../../containers';
import { useRouter } from 'next/router';
import { Row, Col, Space } from 'antd';
import { withSession } from '../../../utils/withSession';
import { jwtDecode } from '../../../utils/jwt';
import { fetcher } from '../../../utils';
import { API } from '../../../constants/index';
import { CourseManageBtn, CreateCourseBtn, SwitchCommunity } from '../../../components';
import useSWR from 'swr';
import JoinInCommunity from './join';
const Course = ({ ...props }) => {
  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    router.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} />
      : <DeskPageHoc title={`Course ${props.data?.name} - Hubbers Community`} activeSide={{ active: [`course-${router.query.community}`], open: ['community'] }} auth={{ ...data }}>
        <React.Fragment>
          <div className='max-w-80 m-auto px-3 pt-5'>
            <Row>
              <Col span={12}>
                <span className='text-upper'>course</span>
                <h1 className='fw-6 fs-5'>{props.data?.name}</h1>
                <p>{props.data?.description}</p>
              </Col>
              <Col span={12} className='text-right'>
                <Space>
                  <CourseManageBtn />
                  <CreateCourseBtn auth={{ ...data }} />
                  <SwitchCommunity />
                </Space>
              </Col>
            </Row>
            {/* {
              courseData &&
              courseData.posts &&
              courseData.posts.map((p) => {
                return <ListItemTile type='post' auth={{...data}} data={{...p}} key={p.id} />;
              })
            } */}
          </div>
        </React.Fragment>
      </DeskPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (!user) {
    await req.session.destroy();
    return { props: { auth: { isLoggedIn: false, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  }
});
export default Course;