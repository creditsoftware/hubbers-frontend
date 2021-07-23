import { Button } from 'antd';
import React from 'react';
import { EventDrawer } from './EventDrawer';
export const CreateEventBtn = ({ ...props }) => {
  const [visible, setVisible] = React.useState(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  return <React.Fragment>
    <Button shape='circle' type='hbs-primary' onClick={toggleVisible}>+</Button>
    <EventDrawer visible={visible} onHide={toggleVisible} {...props} />
  </React.Fragment>;
};