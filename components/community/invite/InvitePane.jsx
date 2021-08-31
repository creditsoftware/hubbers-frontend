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
import { API } from '../../../constants';
import { UserTags } from '../../contest/UserTags';
import { useCommunityDetail } from '../../../hooks/useSWR/community/useCommunityDetail';
const { Option } = Select;
export const InvitePane = ({ ...props }) => {
  const router = useRouter();
  const [auth, setAuth] = React.useState(null);
  const [msg, setMsg] = React.useState(null);
  const [placeholder, setPlaceHolder] = React.useState(null);
  const [roles, setRoles] = React.useState(null);
  const [community, setCommunity] = React.useState(null);
  const [selectedRole, setSelectedRole] = React.useState(3);
  const [form] = Form.useForm();
  const { data } = useCommunityDetail(props.query.community ? props.query.community : null);
  React.useEffect(() => {
    if (data && roles) {
      setCommunity(data.data);
      const role = roles.filter((r) => r.id === selectedRole)[0];
      const m = `Hi,\n\nWelcome to the Hubbers Community. We are excited that you are here and we are inviting you to join Hubbers as a "${role.name}" of "${data.data.name}".\n\nAt Hubbers, we are building global communities and we craft products and services that help reduce waste, combat climate change, and create healthy, safe, and sustainable cities.\n\nBy being part of "${data.data.name}" you will have access to a network of inspiring, talented and driven people, innovative projects, and resources to support your innovation journey.\n\nWelcome to the ${data.data.name} Hubbers Community!\nWe are a global network of creators, contributors, and experts co-creating innovative new products. Click the button below to start your discovery of your local community and join fellow Hubbers in ${data.data.name}\n\nSincerely,\n\nThe Hubbers Team`;
      setMsg(m);
      setPlaceHolder(m);
      form.setFieldsValue({ message: m });
    }
  }, [data, roles, auth, selectedRole, form]);
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
  }, [form]);
  React.useEffect(() => {
    getData();
  }, [router, getData]);
  const invite = (values) => {
    let data = { ...values, communityRoleId: props.gid ? 2 : 1, communityId: props.gid ?? router.query.community, from: props && props.auth && props.auth.communityMember.filter((member) => member.communityId === Number(router.query.community))[0].id };
    httpRequestLocal(`${API.LOCAL_COMMUNITY_MEMBER_INVITE_API}`, REQUEST_TYPE.POST, data)
      .then((response) => {
        openNotificationWithIcon('success', 'Success', response.message);
        props.onClose();
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
        <UserTags />
      </Form.Item>
      <Form.Item
        name='message'
        rules={[{ required: true, message: 'Please input description!' }]}
      >
        <AvatarTextarea
          avatar={props.auth?.avatar ?? defaultAvatar}
          placeholder={placeholder}
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
          {
            community &&
            `Choose what permissions these members will have ${community.name}.`
          }
        </p>
        <Form.Item
          name='roleId'
          rules={[{ required: true, message: 'Please select role!' }]}
        >
          <Select initialvalues={3} size='large' style={{ width: '100%' }} onChange={setSelectedRole}>
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
            <Button htmlType='submit' type='hbs-primary' size='large' onClick={(e) => e.stopPropagation()}>Send</Button>
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