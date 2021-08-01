import React from 'react';
import { Button } from 'antd';
import { CourseManageDrawer } from './CourseManageDrawer';

export const CourseManageBtn = ({...props}) => {
  const [visible, setTogleVisible] = React.useState(false);
  const toggleVisible = () => {
    setTogleVisible(!visible);
  };
  return <React.Fragment>
    <Button type="hbs-primary" shape="round" onClick={toggleVisible}>Manage</Button>
    <CourseManageDrawer visible={visible} onHide={toggleVisible} {...props} />
  </React.Fragment>;
};  