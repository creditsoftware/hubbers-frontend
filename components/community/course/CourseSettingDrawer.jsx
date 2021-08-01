  import React from 'react';
import { Input, Select, Button, Form, Menu } from 'antd';
import { Container } from '../../Container';
import { SettingDrawer } from '../global';
import { CourseManageItem } from './CourseManageItem';

export const CourseSettingDrawer = ({ ...props }) => {
  const [visible, setVisible] = React.useState(false);
  const [showDrawer, setShowDrawer] = React.useState();
  const toggleVisible = () => {
    setVisible(!visible);
  };
  const showSettings = () => {
    toggleVisible();
    props.onClick();
    setShowDrawer('Course Settings');
  };
  const changeDrawer = (status) => {
    setShowDrawer(status);
  };
  const onPrev = () => {
    if (showDrawer === 'Course Settings') {
      toggleVisible();
    } else if (showDrawer === 'Course Plans') {
      setShowDrawer('Payments');
    } else {
      setShowDrawer('Course Settings');
    }
  };
  return <React.Fragment>
    <Button type='text' onClick={showSettings}>Settings</Button>
    <SettingDrawer
      visible={visible}
      onHide={toggleVisible}
      title={showDrawer}
      onCoursePrev={onPrev}
      {...props}
    >
      <Container className="pt-4 d-flex fd-vertical f-align-center">
        {
          showDrawer === 'Course Settings' ? (
            <React.Fragment>
              <CourseManageItem text="General Settings" onClick={()=>{changeDrawer("General Settings")}} />
              <CourseManageItem text="Group Members" onClick={()=>{changeDrawer("Group Members")}} />
              <CourseManageItem text="Group Content" onClick={()=>{changeDrawer("Group Content")}} />
              <CourseManageItem text="Payments" onClick={()=>{changeDrawer("Payments")}} />
              <Button type="hbs-primary" shape="round" size="large" className="mt-2" onClick={toggleVisible}>Invite to Course</Button>
            </React.Fragment>
            ):showDrawer === 'Group Members' ? (
              <React.Fragment>
                <h1 className="fw-6 fs-3">Current Course Members</h1>
                <CourseManageItem text="See All Members" onClick={toggleVisible} />
                <CourseManageItem text="Welcome New Members" onClick={toggleVisible} />
                <CourseManageItem text="Message All Members" onClick={toggleVisible} />
                <CourseManageItem text="Download Member List" onClick={toggleVisible} />
                <h1 className="fw-6 fs-3 mt-5">Incoming Course Members</h1>
                <CourseManageItem text="Sent Invites" onClick={toggleVisible} />
                <Button type="hbs-primary" shape="round" size="large" className="mt-2" onClick={toggleVisible}>Invite</Button>
              </React.Fragment>
            ):showDrawer === 'Payments' ? (
              <React.Fragment>
                <CourseManageItem text="Course Plans" onClick={()=>{changeDrawer("Course Plans")}} />
                <CourseManageItem text="Past Due Members" onClick={toggleVisible} />
                <Button type="hbs-primary" shape="round" size="large" className="mt-2" onClick={toggleVisible}>Change for Access</Button>
              </React.Fragment>
            ):showDrawer === 'Course Plans' ? (
              <React.Fragment>
                <CourseManageItem text="Course Plans" onClick={toggleVisible} />
                <CourseManageItem text="Past Due Members" onClick={toggleVisible} />
                <Button type="hbs-primary" shape="round" size="large" className="mt-2" onClick={toggleVisible}>Change for Access</Button>
              </React.Fragment>
            ):null
          }
      </Container>
    </SettingDrawer>
  </React.Fragment>
};