import React from 'react';
import { Button, Drawer, Row, Col, Avatar, Input, Select, Space, PageHeader, Form } from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Container } from '../../Container';
import { useWindowSize } from '../../../hooks';
import { MemberInvitationBtn } from '../invite/MemberInvitationBtn';
import { API } from '../../../constants';
import { openNotificationWithIcon, fetchJson, socket, slugify } from '../../../utils';
import { REQUEST_TYPE } from '../../../constants/requestType';
import { useRouter } from 'next/router';
import { defaultAvatar } from '../../../constants/etc';
const { Option } = Select;
const { TextArea } = Input;

export const EditGroupDrawer = ({ visible, onHide, ...props }) => {
  const [fullWidth, setFullWidth] = React.useState(false);
  const [optionList, setOptionList] = React.useState(false);
  const size = useWindowSize();
  const router = useRouter();
  const [form] = Form.useForm();
  React.useEffect(() => {
    fetchJson(`${API.GET_COMMUNITY_GROUP_PRIVACY_OPTIONS_API}`).then((v) => setOptionList(v.data));
    socket.on('created-community-post', (d) => {
      console.log(d);
    });
  }, []);
  const onFinish = (value) => {
    let data;
    if (router?.query?.community) {
      data = { ...value, communityId: router?.query?.community };
    }
    if (props.auth?.isLoggedIn && props.auth.id) {
      data = { ...data, createdBy: props.auth.id };
    }
    console.log(props);
    fetchJson(`${API.CREATE_COMMUNITY_GROUP_API}/${props.auth?.id}`, {
      method: REQUEST_TYPE.POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, slug: slugify(data.name) }),
    }).then((res) => {
      socket.emit('create-community-post', { ...data });
      openNotificationWithIcon('success', 'Success', res.message);
    }).catch(() => {
      openNotificationWithIcon('error', 'Error', 'Failed to create a group!');
    });
    onHide();
  };
  return <Drawer
    title={
      <Row className='px-3 py-2'>
        <Col lg={14} md={14} sm={14}>
          <Row className='f-align-center'>
            <Avatar size={50} icon={<Image width={100} height={100} src={props.auth?.avatar ?? defaultAvatar} />} />
            <div className='ml-4'>
              <p className='mb-1 fw-6 fc-primary'>Hubbers</p>
              <p className='mb-1 fw-6 fc-3 fs-3'>Network Setting</p>
            </div>
          </Row>
        </Col>
        <Col lg={10} md={10} sm={10} className='text-right'>
          <Space align='center' className='h-100'>
            <Button type='hbs-link' onClick={() => setFullWidth(!fullWidth)}>
              <ArrowsAltOutlined style={{ fontSize: '26px', fontWeight: '600', color: '#c4c4c4' }} />
            </Button>
            <MemberInvitationBtn shape='round' />
            <Button type='hbs-dashed' shape='round' onClick={onHide}>&times;&nbsp;Close</Button>
          </Space>
        </Col>
      </Row>
    }
    closable={false}
    visible={visible}
    onClose={onHide}
    key='1'
    width={fullWidth || size.width <= 1024 ? '100%' : 1024}
  >
    <Form
      name='group-edit'
      form={form}
      onFinish={onFinish}
    >
      <PageHeader
        title='Create Group'
        className='bg-primary'
        style={{
          margin: '-24px -24px 24px -24px'
        }}
        extra={
          <Form.Item style={{ marginBottom: 0 }}>
            <Button htmlType='submit' type='default' shape='round'>
              Save
            </Button>
          </Form.Item>
        }
      />
      <Container>
        <React.Fragment>
          <p className='mb-1 fw-6 fc-black fs-3'>The Big stuff</p>
          <p className='mb-1 fw-6 fc-grey fs-1'>Adjust basic information about your Group here.</p>
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
                message: 'Please input the group title!',
              },
            ]}
          >
            <Input type='text' placeholder='e.g. The Astronaut&apos;s Guide to Exercise' />
          </Form.Item>
          <p className='mb-2 mt-3 fw-6'>Group Tagline</p>
          <Form.Item
            name='tagLine'
            rules={[
              {
                required: true,
                message: 'Please input the group Tagline!',
              },
            ]}
          >
            <TextArea
              placeholder="e.g. Stay as fit as an astronaut, even when gravity is working against you"
              autoSize={{ minRows: 4, maxRows: 24 }}
            />
          </Form.Item>
          <p className='mb-2 mt-3 fw-6'>Group description</p>
          <Form.Item
            name='description'
            rules={[
              {
                required: true,
                message: 'Please input the group description!',
              },
            ]}
          >
            <TextArea
              placeholder="e.g. Our bodies aren&apos;t built for space. That&apos;s why astronauts need to adopt rigorous fitness regimens to maintain bone and muscle mass for when they live in microgravity. The astronaut&apos;s Guide to Exercise will teach you how you can keep up a similar exercise routine(without living earch)."
              autoSize={{ minRows: 6, maxRows: 24 }}
            />
          </Form.Item>
          <p className='mb-1 fw-6 fc-black fs-3'>Privacy and Invites</p>
          <p className='mb-1 fw-6 fc-grey fs-1'>Change who can join, view and send invites to your group.</p>
          <Form.Item
            name='privacyOptionId'
            rules={[
              {
                required: true,
                message: 'Please select privacy option!',
              },
            ]}
          >
            <Select>
              {
                optionList &&
                optionList.map((item, index) => {
                  return <Option key={index} value={item.id}>{item.name}</Option>;
                })
              }
            </Select>
          </Form.Item>
        </React.Fragment>
      </Container>
    </Form>
  </Drawer>;
};