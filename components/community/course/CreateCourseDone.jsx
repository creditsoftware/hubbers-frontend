import React from 'react';
import { Button } from 'antd';

export const CreateCourseDone = () => {
  return <React.Fragment>
    <p className="text-center fw-6 fs-2 mb-2">How to build a Brand has been created!</p>
    <p className="text-center fs-1">Next, you can choose to invite members, view your new Course and customize the settings, or create a new plan so you can charge members for access.</p>
    <div className="d-flex fd-vertical f-align-center mt-5">
      <Button style={{ width: '300px' }} type="hbs-primary" shape="round" size="large">Change for Access</Button>
      <Button style={{ width: '300px' }} className="my-3" type="hbs-outline-primary" shape="round" size="large">Invite People to Join</Button>
      <Button style={{ width: '300px' }} type="hbs-outline-primary" shape="round" size="large">View this Course</Button>
    </div>
  </React.Fragment>;
};