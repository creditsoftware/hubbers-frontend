import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import {
  MemberInvitationBtn,
  // MemberFilter,
  SwitchCommunity,
  MemberTile
} from '../../../components';
import { Space } from 'antd';
import { jwtDecode } from '../../../utils/jwt';
import { DeskPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { httpApiServer } from '../../../utils/httpRequest';
import { API } from '../../../constants/apis';
import { REQUEST_TYPE } from '../../../constants/requestType';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import JoinInCommunity from './join';
const Members = (props) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  // const [filterValue, setFilterValue] = React.useState('all');
  const [auth, setAuth] = React.useState(null);
  const [members, setMembers] = React.useState(null);
  useEffect(() => {
    if (props.data && props.data.success) {
      setMembers(props.data.data);
      setAuth(props.data.auth);
    }
    // if (router.query.filter) {
    //   setFilterValue(router.query.filter);
    // }
  }, []);
  return (
    props.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} query={{...props.query}}/>
      : <DeskPageHoc title='Members' activeSide={{ active: [`members-${props.query.community}`], open: ['community'] }} auth={{ ...data }} query={{...props.query}}>
        <React.Fragment>
          <div className='max-w-80 m-auto px-3 pt-5'>
            <Row>
              <Col span={12}>
                <h1 className='fw-6 fs-5'>Members</h1>
              </Col>
              <Col span={12} className='text-right'>
                <Space>
                  <MemberInvitationBtn query={{...props.query}} auth={{ ...data }} />
                  <SwitchCommunity />
                </Space>
              </Col>
            </Row>
            {/* <MemberFilter value={filterValue} /> */}
            <div>
              {
                members &&
                members.map((m) => {
                  return <MemberTile
                    key={m.id}
                    id={m.id}
                    showActions={Number(m.user?.id) !== Number(auth.id) ? true : false}
                    avatar={m.user?.avatar ? m.user?.avatar : '/images/icons/avatar.png'}
                    name={m.user?.firstname ? m.user?.firstname : '' + ' ' + m.user?.lastname ? m.user?.lastname : ''}
                    role={m.role?.name}
                  />;
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
  return httpApiServer(`${API.LOCAL_GET_MEMBER_LIST_API}?communityId=${query.community}`, REQUEST_TYPE.GET, null, ctx)
    .then((response) => {
      return { props: { data: { ...response, auth: user }, error: null, auth: { isLoggedIn: true, ...user }, query } };
    })
    .catch(async (err) => {
      if (err.response && err.response.status === 401) {
        await req.session.destroy();
        return { props: { error: err.message, data: null, auth: { isLoggedIn: true, ...user }, query } };
      }
      return { props: { data: null, error: err.message, auth: { isLoggedIn: true, ...user }, query } };
    });
});
export default Members;