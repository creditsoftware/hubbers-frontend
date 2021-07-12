import { Button, Col, Row } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import {
  GroupListItem,
  GroupManageBtn,
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
  const [groups, setGroups] = React.useState(null);
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const getGroups = React.useCallback(async () => {
    const result = await fetchJson(`${API.GET_COMMUNITY_GROUP_LIST_API}/${router.query.community}`);
    setGroups(result.data);
  }, [router]);
  React.useEffect(() => {
    if (router.query.community) {
      getGroups();
    }
  }, [router, getGroups]);
  return (
    router.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} />
      : <DeskPageHoc title='Members' activeSide={{ active: [ `community-${router.query.community}-group`], open: ['community', `community-${router.query.community}-group`] }} auth={{ ...data }}>
        <React.Fragment>
          <div className='max-w-80 m-auto px-3 pt-5'>
            <Row>
              <Col span={12}>
                <h1 className='fw-6 fs-5'>Groups</h1>
              </Col>
              <Col span={12} className='text-right'>
                <Space>
                  <GroupManageBtn />
                  <Button shape='circle' type='hbs-primary'>+</Button>
                  <SwitchCommunity />
                </Space>
              </Col>
            </Row>
            <div>
              {
                groups &&
                groups.map((g) => {
                  return <GroupListItem key={g.id} {...g} />;
                })
              }
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