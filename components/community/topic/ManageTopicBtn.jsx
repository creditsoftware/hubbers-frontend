import { Button } from 'antd';
import React from 'react';
import { TopicManageDrawer } from './TopicManageDrawer';
export const ManageTopicBtn = ({...props}) => {
  const [visible, setVisible] = React.useState(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  return <React.Fragment>
    <Button shape='circle' type='hbs-primary' onClick={toggleVisible}>Manage</Button>
    <TopicManageDrawer visible={visible} onHide={toggleVisible} {...props} />
  </React.Fragment>;
};