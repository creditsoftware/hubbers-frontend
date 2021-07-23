import React from 'react';
import { Input, Select, Form } from 'antd';
import { Container } from '../../Container';
import { API } from '../../../constants';
import { openNotificationWithIcon, fetchJson, slugify } from '../../../utils';
import { REQUEST_TYPE } from '../../../constants/requestType';
import { useRouter } from 'next/router';
import { SettingDrawer } from '../global';
const { Option } = Select;
const { TextArea } = Input;

export const GroupDrawer = ({ visible, onHide, editable = true, content, ...props }) => {
  const [optionList, setOptionList] = React.useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  React.useEffect(() => {
    fetchJson(`${API.GET_COMMUNITY_GROUP_PRIVACY_OPTIONS_API}`).then((v) => setOptionList(v.data));
  }, []);
  const onFinish = (value) => {
    let data;
    if (router?.query?.community) {
      data = { ...value, communityId: router?.query?.community };
    }
    if (props.auth?.isLoggedIn && props.auth.id) {
      data = { ...data, createdBy: props.auth.id };
    }
    fetchJson(`${API.CREATE_COMMUNITY_GROUP_API}`, {
      method: REQUEST_TYPE.POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, slug: slugify(data.name) }),
    }).then((res) => {
      openNotificationWithIcon('success', 'Success', res.message);
    }).catch(() => {
      openNotificationWithIcon('error', 'Error', 'Failed to create a group!');
    });
    onHide();
  };
  return <SettingDrawer
    visible={visible}
    onHide={onHide}
    title='Creaete Group'
    submitBtn={(!content && editable) || (content && editable)}
    submitBtnLabel={!content && editable ? 'Create' : content && editable ? 'Save' : 'Save'}
    form={form}
    {...props}
  >
    <Form
      name='group-edit'
      form={form}
      onFinish={onFinish}
    >
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
  </SettingDrawer>;
};