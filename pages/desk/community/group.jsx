import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import {
  CreateGroupContentBtn,
  // GroupManageBtn,
  SwitchCommunity,
} from '../../../components';
import { Space } from 'antd';
import { DeskPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/apis';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import JoinInCommunity from './join';
import { fetchJson } from '../../../utils';
const Groups = (props) => {
  const router = useRouter();
  const [group, setGroup] = React.useState(null);
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const getGroup = React.useCallback(async () => {
    const result = await fetchJson(`${API.GET_COMMUNITY_GROUP_DETAIL_API}/${router.query.group}`);
    setGroup(result.data);
  }, [router]);
  React.useEffect(() => {
    if (router.query.community) {
      getGroup();
    }
  }, [router, getGroup]);
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
                  <CreateGroupContentBtn auth={{ ...data }} group={{ ...group }} />
                  <SwitchCommunity />
                </Space>
              </Col>
            </Row>
            <h1 className='fw-6 fs-5 m-0'>{group && group.name}</h1>
            <p>{group && group.tagLine}</p>
            <div>
              <p className="text-center mt-5">
                This Group is just getting started!
              </p>
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
export default Groups;