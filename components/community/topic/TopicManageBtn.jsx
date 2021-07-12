import { Button } from 'antd';
import React from 'react';
// import { SettingDrawer } from '../global';
export const TopicManageBtn = ({ ...props }) => {
  const [visible, setVisible] = React.useState(false);
  console.log(props);
  return <React.Fragment>
    <Button type='hbs-primary' shape='round' onClick={() => setVisible(!visible)}>Manage</Button>
    {/* <SettingDrawer visible={visible} onHide={() => setVisible(!visible)} {...props}>
    </SettingDrawer> */}
  </React.Fragment>;
};