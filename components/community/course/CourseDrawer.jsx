import React from 'react';
import { Input, Select, Button, Form, Alert, Space } from 'antd';
import { Container } from '../../Container';
import { SettingDrawer } from '../global';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getRandomInt, slugify } from '../../../utils';
import { usePrivacyOptionList } from '../../../hooks/useSWR/community/usePrivacyOptionList';

const { Option } = Select;
const { TextArea } = Input;

export const CourseDrawer = ({ visible, onHide, ...props }) => {
  const [progress, setProgress] = React.useState(1);
  const [formData, setFormData] = React.useState(null);
  const [form] = Form.useForm();
  const {data: pol} = usePrivacyOptionList();
  const onFinish = (values) => {
    console.log(values);
    setFormData({ ...formData, ...values });
    if (progress < 4) {
      setProgress(progress + 1);
    } else {
      onHide();
    }
  };
  console.log(props);
  console.log(formData);
  const onPrev = () => {
    if (progress === 1) {
      onHide();
    } else {
      setProgress(progress - 1);
    }
  };
  return <SettingDrawer
    visible={visible}
    onHide={onHide}
    title={
      <Space>
        {
          progress > 1 ?
            <div className='d-flex'>
              <Button type='link' size='small' onClick={onPrev}>
                <ArrowLeftOutlined style={{ color: 'black' }} />
              </Button>
            </div>
            : ''
        }
        Course
      </Space>
    }
    submitBtn={progress < 4}
    submitBtnLabel={progress < 3 ? 'Next' : 'Finish'}
    form={form}
    {...props}
  >
    <Container className="pt-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        {
          progress === 1 ? (
            <React.Fragment>
              <p className='mb-1 fw-6 fc-black fs-3'>The Big stuff</p>
              <p className='mb-1 fw-6 fc-grey fs-1'>Adjust basic information about your Group here.</p>
              <p className="fw-6 fs-1 mb-2 mt-5">Course Title</p>
              <Form.Item
                name='name'
                className="mb-5"
                style={{ borderBottom: '1px solid gray' }}
                rules={[
                  {
                    required: true,
                    message: 'Please input the contest type!',
                  }
                ]}
              >
                <Input bordered={false} onChange={(v) => form.setFieldsValue({ slug: `${slugify(v.target.value)}-${getRandomInt(100000, 999999)}` })} />
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
                style={{ borderBottom: '1px solid gray' }}
                rules={[
                  {
                    required: true,
                    message: 'Please input the tagline!'
                  }
                ]}
              >
                <TextArea rows={3} bordered={false} placeholder='e.g. Stay as fit as an astronaut, even when gravity is working against you' />
              </Form.Item>
              <p className="fw-6 fs-1 mb-2">Course Description</p>
              <Form.Item
                name='description'
                className="mb-5"
                style={{ borderBottom: '1px solid gray' }}
              >
                <TextArea rows={6} bordered={false} placeholder='​e.g. Our bodies aren&apos;t built for space. That&apos;s why astronauts need to adopt rigorous fitness regimens to maintain bone and muscle mass for when they live in microgravity. The Astronaut&apos;s Guide to Exercise will teach you how you can keep up a similar exercise routine (without leaving Earth).' />
              </Form.Item>
              <p className="fw-6 fs-2">Privacy and Invites</p>
              <p className="fs-1 mb-5">Chavge who can join, and send invites to your Course.</p>
              <Form.Item
                name='privacyOptionId'
                style={{
                  width: '300px',
                  borderBottom: '1px solid gray'
                }}
                rules={[
                  {
                    required: true,
                    message: 'Please input the tagline!'
                  }
                ]}
              >
                <Select bordered={false} className="fw-6">
                  {
                    pol &&
                    pol.data &&
                    pol.data.map((poi) => {
                      return <Option key={poi.id} value={poi.id}>{poi.name}</Option>;
                    })
                  }
                </Select>
              </Form.Item>
              <Alert type='warning' message='We&apos;ve made this Course secret while you get it set up. If you&apos;re ready for this Course to go live now, feel free to choose another privacy setting' />
            </React.Fragment>
          ) : progress === 2 ? (
            <React.Fragment>
              <p className="fw-6 fs-2 mb-2">Course Structure</p>
              <p className="fs-1 mb-4">Now let&apos;s set up the structure of your Course.</p>
              <p className="fw-6 fs-1 mb-2">Table of Contents</p>
              <p className="fs-1 mb-3">The Table of Contents is a hoslistic view of your Course, where students can go to get a summary of the Course Material they have access to. Customize the name here.</p>
              <Form.Item
                name='name'
                style={{ width: '300px', borderBottom: '1px solid gray' }}
              >
                <Select bordered={false} className="fs-1 fw-6">
                  <Option value="table of contents">Table of Contents</Option>
                  <Option value="syllabus">Syllabus</Option>
                  <Option value="course material">Course Material</Option>
                  <Option value="add a custom name">Add a Custom Name...</Option>
                </Select>
              </Form.Item>
              <p className="fw-6 fs-1 mt-5 pt-5 mb-2">Lessons</p>
              <p className="fs-1">Lessons are the main learning unit of a Course. Lessons can stand alone or live within Sections, and can be completed by your members. Coose what you want your Lessons to be called here.</p>
              <Form.Item
                name='lesson'
                style={{ borderBottom: '1px solid gray' }}
              >
                <Select bordered={false} className="fw-6">
                  <Option value="lesson">Lesson</Option>
                </Select>
              </Form.Item>
              <p className="fw-6 fs-1 mt-5 mb-2">Sections</p>
              <p className="fs-1">Secions allow you to break up your Course and organize Lessons together in one place. Choose what you want your Sections to be called here.</p>
              <Form.Item
                name='section'
                style={{ borderBottom: '1px solid gray' }}
              >
                <Select bordered={false} className="fw-6">
                  <Option value="section">Section</Option>
                </Select>
              </Form.Item>
            </React.Fragment>
          ) : progress === 3 ? (
            <React.Fragment>
              <p className="fw-6 fs-2 mb-2">Instructors</p>
              <p className="fs-1">In a Course, members will see your Moderators and Hosts ans Instructors. They will still have separate Moderator or Host permissions, but you will have the added ability to assign instuctors to Lessons.</p>
              <p className="fs-1">You can rename your Course&apos;s Instructors here.</p>
              <Form.Item
                name='instructor'
                style={{ width: '300px', borderBottom: '1px solid gray' }}
              >
                <Select bordered={false} className="fs-1 fw-6">
                  <Option value="instructor">Instructor</Option>
                  <Option value="professor">Professor</Option>
                  <Option value="ta">TA</Option>
                  <Option value="teacher">Teacher</Option>
                  <Option value="add a custom name">Add a Custom Name...</Option>
                </Select>
              </Form.Item>
            </React.Fragment>
          ) : progress === 4 ? (
            <React.Fragment>
              <p className="text-center fw-6 fs-2 mb-2">How to build a Brand has been created!</p>
              <p className="text-center fs-1">Next, you can choose to invite members, view your new Course and customize the settings, or create a new plan so you can charge members for access.</p>
              <div className="d-flex fd-vertical f-align-center mt-5">
                <Button style={{ width: '300px' }} type="hbs-primary" shape="round" size="large">Change for Access</Button>
                <Button style={{ width: '300px' }} className="my-3" type="hbs-outline-primary" shape="round" size="large">Invite People to Join</Button>
                <Button style={{ width: '300px' }} type="hbs-outline-primary" shape="round" size="large">View this Course</Button>
              </div>
            </React.Fragment>
          ) : null
        }
      </Form>
    </Container>
  </SettingDrawer>;
};