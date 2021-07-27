import React from 'react';
import { Input, Select, Form } from 'antd';
import { ColorPicker } from '../../ColorPicker';
import { Container } from '../../Container';
import { UploadImage } from '../../UploadImage';
import { fetchJson, openNotificationWithIcon } from '../../../utils';
import { API, primaryColor } from '../../../constants';
import { REQUEST_TYPE } from '../../../constants/requestType';
import { useRouter } from 'next/router';
import { SettingDrawer } from '../global';
import axios from 'axios';
const { Option } = Select;
const { TextArea } = Input;

export const TopicDrawer = ({ visible, onHide, editable = true, content, ...props }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  React.useEffect(() => {
    if (content) {
      form.setFieldsValue({ ...content });
    } else {
      form.setFieldsValue({ color: primaryColor });
    }
  }, [content, form]);
  const onFinish = (value) => {
    if (!content && editable) {
      let v = { ...value };
      if (props.query?.community) {
        v = { ...v, communityId: router.query?.community };
      }
      if (props.query?.group) {
        v = { ...v, communityId: router.query?.group };
      }
      if (props.auth) {
        v = { ...v, createdBy: props.auth?.communityMember.filter((member) => member.communityId === Number(props.query.community))[0].id };
      }
      fetchJson(`${API.ADD_TOPIC_API}/${v.communityId}`, {
        method: REQUEST_TYPE.POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(v)
      }).then(() => {
        openNotificationWithIcon('success', 'Success', 'Successed to create topic!');
        form.resetFields();
        onHide();
      });
    }
    if (content && editable) {
      axios.put(`${API.UPDATE_TOPIC_API}/${props.id}`, { ...value })
        .then((response) => {
          openNotificationWithIcon('success', 'Success', 'Updated successfully');
          if (response.data?.success && props.refreshList) {
            props.refreshList();
          }
          onHide();
        })
        .catch(() => {
          openNotificationWithIcon('error', 'Failed', 'Failed to update');
        });
    }
  };
  return <SettingDrawer
    visible={visible}
    onHide={onHide}
    title='Topic'
    submitBtn={(!content && editable) || (content && editable)}
    submitBtnLabel={!content && editable ? 'Create' : content && editable ? 'Save' : 'Save'}
    form={form}
    {...props}
  >
    <Form
      name='topic-form'
      form={form}
      onFinish={onFinish}
    >
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
            <Input disabled={!editable} type='text' placeholder='Name Your Topic' />
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
            <Select disabled={!editable} style={{ width: '100%' }} placeholder='All members can contribute'>
              <Option value='all_members'>All Members can contribute</Option>
              <Option value='host_moderators'>Only Host and Moderator can contribute</Option>
            </Select>
          </Form.Item>
          <p className='mb-2 mt-3 fw-6'>Topic description</p>
          <Form.Item
            name='description'
          >
            <TextArea
              disabled={!editable}
              placeholder="What is this about?"
              autoSize={{ minRows: 6, maxRows: 24 }}
            />
          </Form.Item>
          <p className='mb-2 mt-3 fw-6'>Choose a color</p>
          <Form.Item
            name='color'
          >
            <ColorPicker disabled={!editable} />
          </Form.Item>
          <p className='mb-2 mt-3 fw-6'>Choose a background image</p>
          <Form.Item
            name='backgroundImageUrl'
          >
            <UploadImage disabled={!editable} />
          </Form.Item>
        </React.Fragment>
      </Container>
    </Form>
  </SettingDrawer>;
};