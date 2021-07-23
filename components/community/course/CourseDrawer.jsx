import React from 'react';
import { Input, Select, Form } from 'antd';
import { Container } from '../../Container';
import { SettingDrawer } from '../global';

const { Option } = Select;
const { TextArea } = Input;

export const CourseDrawer = ({ visible, onHide, editable = true, content, ...props }) => {
  const [progress, setProgress] = React.useState(1);
  const [form] = Form.useForm();
  const onFinish = () => {
    onHide();
  };
  return <SettingDrawer
    visible={visible}
    onHide={onHide}
    title='Create a Course'
    submitBtn={progress < 5}
    submitBtnLabel={!content && editable ? 'Next' : 'Finish'}
    form={form}
    {...props}
  >
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Container className="pt-4">
        <React.Fragment>
          <p className="fw-6 fs-1 mb-2">Table of Contents</p>
          <Form.Item
            name='contents'
            className="mb-5"
            style={{ borderBottom: '1px solid gray' }}
          >
            <TextArea rows={3} bordered={false} />
          </Form.Item>
          <p className="fw-6 fs-1 mb-2">Course Description</p>
          <Form.Item
            name='description'
            className="mb-5"
            style={{ borderBottom: '1px solid gray' }}
          >
            <TextArea rows={3} bordered={false} />
          </Form.Item>
          <p className="fw-6 fs-2">Privacy and Invites</p>
          <p className="fs-1 mb-5">Chavge who can join, and send invites to your Course.</p>
          <p className="fs-1 fw-6">Privacy</p>
          <Form.Item
            name='privacy'
            style={{ borderBottom: '1px solid gray' }}
          >
            <Select bordered={false}>
              <Option value="secret">Secret</Option>
              <Option value="public">Public</Option>
              <Option value="private">Private</Option>
            </Select> 
          </Form.Item>
        </React.Fragment>
      </Container>
    </Form>
  </SettingDrawer>;
};