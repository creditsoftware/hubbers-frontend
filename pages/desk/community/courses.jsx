import React from 'react';
import JoinInCommunity from './join';
import useSWR from 'swr';
import { API } from '../../../constants/apis';
import { fetcher } from '../../../utils/fetcher';
import { useRouter } from 'next/router';
import { Row, Col, Space } from 'antd';
import { withSession } from '../../../utils/withSession';
import { DeskPageHoc } from '../../../containers';
import { CourseManageBtn, CreateCourseBtn, CourseListItem, SwitchCommunity } from '../../../components';
import { jwtDecode } from '../../../utils/jwt';
import { useGetCourseList } from '../../../hooks/useSWR/community/useGetCourseList';
// import { CourseFilter } from '../../../components/community/course/CourseFilter';

const Courses = (props) => {
  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [courseList, setCourseList] = React.useState(null);
  const {data: cl} = useGetCourseList(props.query.community, props.auth.id);
  React.useEffect(() => {
    if(cl) {
      setCourseList(cl.data);
    }
  },[cl]);
  return (
    router.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} query={{...props.query}}/>
      : <DeskPageHoc title='Course - Hubbers Community' activeSide={{ active: [`Course-${router.query.community}`], open: ['community'] }} auth={{ ...data }} query={{...props.query}}>
        <React.Fragment>
          <div className='max-w-80 m-auto px-3 pt-5'>
            <Row>
              <Col span={12}>
                <h1 className='fw-6 fs-5'>Course</h1>
              </Col>
              <Col span={12} className='text-right'>
                <Space>
                  <CourseManageBtn auth={{ ...data }} />
                  <CreateCourseBtn auth={{ ...data }} query={{...props.query}} />
                  <SwitchCommunity />
                </Space>
              </Col>
            </Row>
            {/* <CourseFilter /> */}
            {
              courseList?.map((course, index) => {
                return <CourseListItem key={index} data={course} auth={{ ...data }} />;
              })
            }
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
export default Courses;