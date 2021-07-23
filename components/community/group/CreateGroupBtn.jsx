import { Button } from 'antd';
import React from 'react';
import { GroupDrawer } from './GroupDrawer';
export const CreateGroupBtn = ({...props}) => {
  const [visible, setVisible] = React.useState(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  return <React.Fragment>
    <Button shape='circle' type='hbs-primary' onClick={toggleVisible}>+</Button>
    <GroupDrawer visible={visible} onHide={toggleVisible} {...props} />
  </React.Fragment>;
};