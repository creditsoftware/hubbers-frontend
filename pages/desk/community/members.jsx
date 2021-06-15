import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  MemberInvitationBtn,
  // MemberFilter,
  SwitchCommunity,
  MemberTile
} from '../../../components';
import { Space } from 'antd';
import { DeskPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { httpApiServer } from '../../../utils/httpRequest';
import { API } from '../../../constants/apis';
import { REQUEST_TYPE } from '../../../constants/requestType';

const Members = (props) => {
  const router = useRouter();
  // const [filterValue, setFilterValue] = React.useState('all');
  const [auth, setAuth] = React.useState(null);
  const [members, setMembers] = React.useState(null);
  useEffect(() => {
    if (props.error === 'Unautherized you') {
      router.push('/auth/signin');
    }
    if(props.data && props.data.success){
      setMembers(props.data.data);
      setAuth(props.data.auth);
    }
    // if (router.query.filter) {
    //   setFilterValue(router.query.filter);
    // }
  }, [router]);
  return (
    <DeskPageHoc title='Members' activeSide={{ active: ['members'], open: ['community'] }}>
      <React.Fragment>
        <div className='max-w-80 m-auto px-3 pt-5'>
          <Row>
            <Col span={12}>
              <h1 className='fw-6 fs-5'>Members</h1>
            </Col>
            <Col span={12} className='text-right'>
              <Space>
                <MemberInvitationBtn />
                <SwitchCommunity/>
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
                  avatar={m.user?.avatar}
                  name={m.user?.firstname + ' ' + m.user.lastname}
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
  const user = await req.session.get('user');
  if (!user) {
    await req.session.destroy();
    return { props: { error: 'Unautherized you', data: null } };
  }
  return httpApiServer(`${API.LOCAL_GET_MEMBER_LIST_API}?communityId=${query.community}`, REQUEST_TYPE.GET, null, ctx)
    .then((response) => {
      return { props: { data: {...response, auth:user}, error: null } };
    })
    .catch(async (err) => {
      if (err.response && err.response.status === 401) {
        await req.session.destroy();
        return { props: { error: err.message, data: null } };
      }
      return { props: { data: null, error: err.message } };
    });
});
export default Members;