import React from 'react';
import { Button, Drawer, Row, Col, Avatar, Input, Select, Space, PageHeader, Form } from 'antd';
import { ColorPicker } from '../ColorPicker';
import { ArrowsAltOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { defaultAvatar } from '../../constants/etc';
import { Container } from '../Container';
import { UploadImage } from '../UploadImage';
import { useWindowSize } from '../../hooks';
import { MemberInvitationBtn } from './MemberInvitationBtn';
import { httpRequestLocal, openNotificationWithIcon } from '../../utils';
import { API } from '../../constants';
import { REQUEST_TYPE } from '../../constants/requestType';
import { useRouter } from 'next/router';
const { Option } = Select;
const { TextArea } = Input;

export const EditTopicDrawer = ({ visible, onHide }) => {
  const [fullWidth, setFullWidth] = React.useState(false);
  const size = useWindowSize();
  const router = useRouter();
  const [form] = Form.useForm();
  const onFinish = (value) => {
    httpRequestLocal(`${API.LOCAL_ADD_TOPIC_API}`, REQUEST_TYPE.POST, { ...value, communityId: router.query.community })
      .then((response) => {
        openNotificationWithIcon('success', 'Success', response.message);
        form.resetFields();
      })
      .catch((err) => {
        openNotificationWithIcon('error', 'Failed', err.response.message);
        form.resetFields();
      });
    onHide();
  };
  return <Drawer
    title={
      <Row className='px-3 py-2'>
        <Col lg={14} md={14} sm={14}>
          <Row className='f-align-center'>
            <Avatar size={50} icon={<Image width={100} height={100} src={defaultAvatar} />} />
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
      name='topic-edit'
      form={form}
      onFinish={onFinish}
    >
      <PageHeader
        title='Create Topic'
        className='bg-primary'
        style={{
          margin: '-24px -24px 24px -24px'
        }}
        extra={
          <Form.Item style={{marginBottom:0}}>
            <Button htmlType='submit' type='default' shape='round'>
              Save
            </Button>
          </Form.Item>
        }
      />
      <Container>
        <React.Fragment>
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
                message: 'Please input the topic name!',
              },
            ]}
          >
            <Input type='text' placeholder='Name Your Topic' />
          </Form.Item>
          <p className='mb-2 mt-3'>More options</p>
          <p className='fw-6 fc-3 fs-2'>Network permissions</p>
          <Form.Item
            name='contributorRole'
            rules={[
              {
                required: true,
                message: 'Please select contributor role!',
              },
            ]}
          >
            <Select style={{ width: '100%' }} placeholder='All members can contribute'>
              <Option value='all_members'>All Members</Option>
              <Option value='host_moderators'>Host Moderator</Option>
            </Select>
          </Form.Item>
          <p className='mb-2 mt-3 fw-6'>Topic description</p>
          <Form.Item
            name='description'
            rules={[
              {
                required: true,
                message: 'Please input the topic description!',
              },
            ]}
          >
            <TextArea
              placeholder="What is this about?"
              autoSize={{ minRows: 6, maxRows: 24 }}
            />
          </Form.Item>
          <p className='mb-2 mt-3 fw-6'>Choose a color</p>
          <Form.Item
            name='color'
            rules={[
              {
                required: true,
                message: 'Please choose a color!',
              },
            ]}
          >
            <ColorPicker />
          </Form.Item>
          <p className='mb-2 mt-3 fw-6'>Choose a background image</p>
          <Form.Item
            name='backgroundImageUrl'
            rules={[
              {
                required: true,
                message: 'Please enter a background image!',
              },
            ]}
          >
            <UploadImage />
          </Form.Item>
        </React.Fragment>
      </Container>
    </Form>
  </Drawer>;
};