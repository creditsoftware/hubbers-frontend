import { Button } from 'antd';
import React from 'react';
import { TopicDrawer } from './TopicDrawer';
export const CreateTopicBtn = ({...props}) => {
  const [visible, setVisible] = React.useState(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  return <React.Fragment>
    <Button shape='circle' type='hbs-primary' onClick={toggleVisible}>+</Button>
    <TopicDrawer visible={visible} onHide={toggleVisible} {...props} editable={false} />
  </React.Fragment>;
};