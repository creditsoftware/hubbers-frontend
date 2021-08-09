import React from 'react';
import { AvatarTextarea } from '../../AvatarTextarea';
import { defaultAvatar } from '../../../constants/etc';
import {
  Button,
  Card,
  Col,
  Row,
  Select,
  Form,
  // Space
} from 'antd';
// import { LinkCopy } from '../LinkCopy';
import { useRouter } from 'next/router';
import { httpRequestLocal, openNotificationWithIcon, fetchJson } from '../../../utils';
import { REQUEST_TYPE } from '../../../constants/requestType';
import { defaultMsgOfCommunityMemberInvitation } from '../../../constants/defaultMsgOfCommunityMemberInvitation';
import { API } from '../../../constants';
import { UserSelector } from '../../UserSelector';
const { Option } = Select;
export const InvitePane = ({...props}) => {
  const router = useRouter();
  const [auth, setAuth] = React.useState(null);
  const [msg, setMsg] = React.useState(null);
  const [roles, setRoles] = React.useState(null);
  const [form] = Form.useForm();
  const getData = React.useCallback(async () => {
    const response = await fetchJson(`${API.GET_USER_FROM_SESSIOM_API}`);
    setAuth(response);
    const rs = await fetchJson(`${API.LOCAL_GET_COMMUNITY_MEMBER_ROLES_API}`);
    if (rs.success) {
      setRoles(rs.data);
      form.setFieldsValue({ roleId: 3 });
    } else {
      setRoles([]);
    }
  }, [router]);
  React.useEffect(() => {
    getData();
  }, [router, getData]);
  const invite = (values) => {
    let data = { ...values, communityRoleId: props.gid ? 2 : 1, communityId: props.gid ?? router.query.community, from: props && props.data && props.data.members.filter((member) => member.communityId === Number(props.gid ?? router.query.community))[0].id };
    httpRequestLocal(`${API.LOCAL_COMMUNITY_MEMBER_INVITE_API}`, REQUEST_TYPE.POST, data)
      .then((response) => {
        openNotificationWithIcon('success', 'Success', response.message);
        // mutate(`${API.LOCAL_GET_POST_LIST_API}`, async () => {
        //   if (router.query.community) {
        //     let response = await fetch(`${API.LOCAL_GET_POST_LIST_API}?communityId=${router.query.community}`);
        //     response = await response.json();
        //     return response.data;
        //   } else {
        //     return [];
        //   }
        // });
      });
  };
  return <React.Fragment>
    <h1 className="fw-6 fs-4 text-center">
      Let&apos;s Invite!
    </h1>
    <Form
      form={form}
      onFinish={invite}
    >
      <Form.Item
        name='to'
        rules={[{ required: true, message: 'Please input emails!' }]}
      >
        <UserSelector />
      </Form.Item>
      <Form.Item
        name='message'
        rules={[{ required: true, message: 'Please input description!' }]}
      >
        <AvatarTextarea
          avatar={props.auth?.avatar ?? defaultAvatar}
          placeholder={`${defaultMsgOfCommunityMemberInvitation}\n${auth && auth.firstname ? auth.firstname : ''} ${auth && auth.lastname ? auth.lastname : ''}`}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
      </Form.Item>
      <Card
        title='More Options'
        className='mt-3'
      >
        <p className="fw-6">
          Network Permissions
        </p>
        <p>
          Choose what permissions these members will have hubby.
        </p>
        <Form.Item
          name='roleId'
          rules={[{ required: true, message: 'Please select role!' }]}
        >
          <Select defaultValue={3} size='large' style={{ width: '100%' }} allowClear>
            {
              roles && roles.map((r) => {
                return <Option value={r.id} key={r.id}>{r.name}</Option>;
              })
            }
          </Select>
        </Form.Item>
      </Card>
      <Row className='mt-4 mx-4'>
        <Col span={16}>
          {/* <Space>
            <Button type='hbs-outline-primary' size='large'>Import Contacts</Button>
            <Button type='hbs-outline-primary' size='large'>Upload CSV</Button>
          </Space> */}
        </Col>
        <Col span={8} className='text-right'>
          <Form.Item>
            <Button htmlType='submit' type='hbs-primary' size='large' onClick={(e)=>e.stopPropagation()}>Send</Button>
          </Form.Item>
        </Col>
      </Row>
      {/* <Card
        className='mt-5'
        title={
          <React.Fragment>
            <p className='fw-6 m-0'>
              Send a Share link
            </p>
            <p className='mb-0'>
              Invite people to hubby as members using this share link
            </p>
          </React.Fragment>
        }
      >
        <LinkCopy value={`${process.env.LOCAL_API_V1}/auth/signin?redirect=${process.env.LOCAL_API_V1}/desk/community/activate?community=${router.query.community}`} />
      </Card> */}
    </Form>
  </React.Fragment>;
};