import React from 'react';
import { Input, Select, Form } from 'antd';
import { ColorPicker } from '../../ColorPicker';
import { Container } from '../../Container';
import { UploadImage } from '../../UploadImage';
import { httpRequestLocal, openNotificationWithIcon } from '../../../utils';
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
      httpRequestLocal(`${API.LOCAL_ADD_TOPIC_API}`, REQUEST_TYPE.POST, { ...value, communityId: router.query.community })
        .then((response) => {
          openNotificationWithIcon('success', 'Success', response.message);
          if (props.refreshList) {
            props.refreshList();
          }
          form.resetFields();
        })
        .catch((err) => {
          openNotificationWithIcon('error', 'Failed', err.response.message);
          form.resetFields();
        });
    }
    if (content && editable) {
      axios.put(`${API.UPDATE_TOPIC_API}/${props.id}`, { ...value })
        .then((response) => {
          openNotificationWithIcon('success', 'Success', 'Updated successfully');
          console.log(props);
          if (response.data?.success && props.refreshList) {
            props.refreshList();
          }
        })
        .catch(() => {
          openNotificationWithIcon('error', 'Failed', 'Failed to update');
        });
    }
    onHide();
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