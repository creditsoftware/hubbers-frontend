import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CourseDrawer } from './CourseDrawer';

export const CreateCourseBtn = ({...props}) => {
  const [visible, setVisible] = React.useState(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  return <React.Fragment>
    <Button shape='circle' type='hbs-primary' size="large" onClick={toggleVisible} icon={<PlusOutlined />} />
    <CourseDrawer visible={visible} onHide={toggleVisible} {...props} />
  </React.Fragment>;
};