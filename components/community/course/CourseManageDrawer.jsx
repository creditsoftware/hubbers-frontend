import React from 'react';
import { Button } from 'antd';
import { Container } from '../../Container';
import { SettingDrawer } from '../global';
import { CourseManageItem } from './CourseManageItem';

export const CourseManageDrawer = ({ visible, onHide, ...props }) => {
  return <SettingDrawer
    visible={visible}
    onHide={onHide}
    title='Manage Courses'
    submitBtn={false}
    type = 'manage-course'
    {...props}
  >
    <Container className="pt-4 d-flex fd-vertical f-align-center">
      <CourseManageItem text="Rename Course" onClick={onHide} />
      <CourseManageItem text="Reorder Course List" onClick={onHide} />
      <CourseManageItem text="View Course List" onClick={onHide} />
      <Button type="hbs-primary" shape="round" size="large" className="mt-2">Create a Course</Button>
    </Container>
  </SettingDrawer>;
};