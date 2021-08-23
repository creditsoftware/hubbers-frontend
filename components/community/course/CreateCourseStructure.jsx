import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

export const CreateCourseStructure = () => {
  return <React.Fragment>
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
  </React.Fragment>;
};