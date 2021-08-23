import React from 'react';
import { Input, Form, Select, Alert } from 'antd';
import { getRandomInt, slugify } from '../../../utils';
import { usePrivacyOptionList } from '../../../hooks/useSWR/community/usePrivacyOptionList';

const { TextArea } = Input;
const { Option } = Select;

export const CreateCourseBasic = ({ form }) => {
  const { data: pol } = usePrivacyOptionList();
  return <React.Fragment>
    <p className='mb-1 fw-6 fc-black fs-3'>The Big stuff</p>
    <p className='mb-1 fw-6 fc-grey fs-1'>Adjust basic information about your Group here.</p>
    <p className="fw-6 fs-1 mb-2 mt-5">Course Title</p>
    <Form.Item
      name='name'
      className="mb-5"
      rules={[
        {
          required: true,
          message: 'Please input the contest type!',
        }
      ]}
    >
      <Input
        bordered={false}
        style={{ borderBottom: '1px solid gray' }}
        onChange={(v) =>
          form.setFieldsValue({
            slug: `${slugify(v.target.value)}-${getRandomInt(100000, 999999)}`
          })
        }
      />
    </Form.Item>
    <Form.Item
      name='slug'
      hidden
      rules={[
        {
          required: true,
          message: 'Please input the slug!'
        }
      ]}
    >
      <Input type='hidden' disabled />
    </Form.Item>
    <p className="fw-6 fs-1 mb-2">Course Tagline</p>
    <Form.Item
      name='tagLine'
      className="mb-5"
      rules={[
        {
          required: true,
          message: 'Please input the tagline!'
        }
      ]}
    >
      <TextArea
        rows={3}
        bordered={false}
        style={{ borderBottom: '1px solid gray' }}
        placeholder='e.g. Stay as fit as an astronaut, even when gravity is working against you'
      />
    </Form.Item>
    <p className="fw-6 fs-1 mb-2">Course Description</p>
    <Form.Item
      name='description'
      className="mb-5"
    >
      <TextArea
        rows={6}
        bordered={false}
        style={{ borderBottom: '1px solid gray' }}
        placeholder='​e.g. Our bodies aren&apos;t built for space. That&apos;s why astronauts need to adopt rigorous fitness regimens to maintain bone and muscle mass for when they live in microgravity. The Astronaut&apos;s Guide to Exercise will teach you how you can keep up a similar exercise routine (without leaving Earth).'
      />
    </Form.Item>
    <p className="fw-6 fs-2">Privacy and Invites</p>
    <p className="fs-1 mb-5">Change who can join, and send invites to your Course.</p>
    <Form.Item
      name='privacyOptionId'
      style={{
        width: '300px',
      }}
      rules={[
        {
          required: true,
          message: 'Please input the tagline!'
        }
      ]}
    >
      <Select
        bordered={false}
        className="fw-6"
        style={{ borderBottom: '1px solid gray' }}
      >
        {
          pol &&
          pol.data &&
          pol.data.map((poi) => {
            return <Option key={poi.id} value={poi.id}>{poi.name}</Option>;
          })
        }
      </Select>
    </Form.Item>
    <div className='my-5'>
      <Alert type='warning' message='We&apos;ve made this Course secret while you get it set up. If you&apos;re ready for this Course to go live now, feel free to choose another privacy setting' />
    </div>
  </React.Fragment>;
};