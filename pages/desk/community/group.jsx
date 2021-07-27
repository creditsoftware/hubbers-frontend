import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import {
  CreateNewBtn,
  // GroupManageBtn,
  SwitchCommunity,
} from '../../../components';
import { Space } from 'antd';
import { jwtDecode } from '../../../utils/jwt';
import { DeskPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/apis';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import JoinInCommunity from './join';
import { useGroupDetail } from '../../../hooks/useSWR/community/useGroupDetail';
import { PostListItem } from '../../../components/community';
const Groups = (props) => {
  const router = useRouter();
  const [group, setGroup] = React.useState(null);
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const {data: gDetail} = useGroupDetail(props.query?.group);
  React.useEffect(() => {
    if(gDetail) {
      setGroup(gDetail.data);
    }
  }, [gDetail]);
  return (
    router.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} />
      : <DeskPageHoc title='Members' activeSide={{ active: [`community-${router.query.community}-group-${router.query.group}`], open: ['community', `community-${router.query.community}-group`, `community-${router.query.community}-group-${router.query.group}`] }} auth={{ ...data }}>
        <React.Fragment>
          <div className='max-w-80 m-auto px-3 pt-5'>
            <Row>
              <Col flex='auto'>
                <span className='text-upper'>group</span>
              </Col>
              <Col flex='auto' className='text-right'>
                <Space>
                  {/* <GroupManageBtn /> */}
                  <CreateNewBtn auth={{ ...data }} group={{ ...group }} query={{ ...props.query }} />
                  <SwitchCommunity />
                </Space>
              </Col>
            </Row>
            <h1 className='fw-6 fs-5 m-0'>{group && group.name}</h1>
            <p>{group && group.tagLine}</p>
            <div>
              {
                group &&
                group.posts &&
                group.posts.map((p) => {
                  return <PostListItem key={p.id} data={{...p}} auth={{...props.auth}} query={{...props.query}} />;
                })
              }
              {/* <p className="text-center mt-5">
                This Group is just getting started!
              </p> */}
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
export default Groups;