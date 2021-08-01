import React from 'react';
import { Input, Select, Button, Form } from 'antd';
import { Container } from '../../Container';
import { SettingDrawer } from '../global';

const { Option } = Select;
const { TextArea } = Input;

export const CourseDrawer = ({ visible, onHide, ...props }) => {
  const [progress, setProgress] = React.useState(1);
  const [form] = Form.useForm();
  const onFinish = () => {
    onHide();
  };
  const onNext = () => {
    console.log(progress);
    setProgress (progress + 1);
  };
  const onPrev = () => {
    if (progress === 1) {
      onHide();
    } else {
      setProgress (progress - 1);
    }
  };
  return <SettingDrawer
    visible={visible}
    onHide={onHide}
    onCourseNext={onNext}
    onCoursePrev={onPrev}
    title='Create a Course'
    submitBtn={progress < 4}
    type = 'course'
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
              <Form.Item
                name='privacy'
                style={{ width: '300px', borderBottom: '1px solid gray' }}
              >
                <Select bordered={false} className="fw-6">
                  <Option value="secret">Secret</Option>
                  <Option value="public">Public</Option>
                  <Option value="private">Private</Option>
                </Select> 
              </Form.Item>
              <div className="mt-5 p-4" style={{ border: '1px solid grey', borderRadius: '5px' }}>We&apos;ve made this Course secret while you get it set up. If you&apos;re ready for this Course to go live now, feel free to choose another privacy setting.</div>
            </React.Fragment>
          ): progress === 2 ? (
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
          ): progress === 3 ? (
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
          ): progress === 4 ? (
            <React.Fragment>
              <p className="text-center fw-6 fs-2 mb-2">How to build a Brand has been created!</p>
              <p className="text-center fs-1">Next, you can choose to invite members, view your new Course and customize the settings, or create a new plan so you can charge members for access.</p>
              <div className="d-flex fd-vertical f-align-center mt-5">
                <Button style={{ width: '300px' }} type="hbs-primary" shape="round" size="large">Change for Access</Button>
                <Button style={{ width: '300px' }} className="my-3" type="hbs-outline-primary" shape="round" size="large">Invite People to Join</Button>
                <Button style={{ width: '300px' }} type="hbs-outline-primary" shape="round" size="large">View this Course</Button>
              </div>
            </React.Fragment>
          ): null
        }
      </Form>
    </Container>
  </SettingDrawer>;
};