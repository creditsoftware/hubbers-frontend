import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

export const CreateCourseInstructor = () => {
  return <React.Fragment>
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
  </React.Fragment>;
};