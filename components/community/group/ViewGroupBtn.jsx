import { Button } from 'antd';
import React from 'react';
import { GroupDrawer } from './GroupDrawer';
export const ViewGroupBtn = ({ ...props }) => {
  const [visible, setVisible] = React.useState(false);
  const toggleVisible = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };
  return <React.Fragment>
    <Button shape='round' type='hbs-outline-primary' onClick={toggleVisible}>View Group</Button>
    <GroupDrawer visible={visible} onHide={toggleVisible} {...props} content={{ ...props }} editable={false} />
  </React.Fragment>;
};