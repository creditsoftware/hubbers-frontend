import { Col, Row } from 'antd';
import React from 'react';
import {
  GroupListItem,
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
import { CreateGroupBtn } from '../../../components/community';
const Groups = (props) => {
  const [groups, setGroups] = React.useState(null);
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const {data: result} = useSWR(`${API.GET_COMMUNITY_GROUP_LIST_API}/${props.query.community}`, fetcher);
  React.useEffect(() => {
    if(result && result.data) {
      setGroups(result.data);
    }
  }, [result]);
  return (
    props.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} />
      : <DeskPageHoc title='Members' activeSide={{ active: [ `community-${props.query.community}-group`], open: ['community', `community-${props.query.community}-group`] }} auth={{ ...data }}>
        <React.Fragment>
          <div className='max-w-80 m-auto px-3 pt-5'>
            <Row>
              <Col span={12}>
                <h1 className='fw-6 fs-5'>Groups</h1>
              </Col>
              <Col span={12} className='text-right'>
                <Space>
                  {/* <GroupManageBtn /> */}
                  <CreateGroupBtn />
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
  const { req, query } = ctx;
  const user = await req.session.get('user');
  if (!user) {
    await req.session.destroy();
    return { props: { auth: { isLoggedIn: false, ...user }, query } };
  }
  return { props: { data: null, error: null, auth: { isLoggedIn: true, ...user }, query } };
});
export default Groups;