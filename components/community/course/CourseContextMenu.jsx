import React from 'react';
import {
  Button,
  Popover
} from 'antd';
import { CourseSettingDrawer } from './CourseSettingDrawer'
import { MoreOutlined } from '@ant-design/icons';

export const CourseContextMenu = ({...props}) => {
  console.log(props);
  const [visible, setVisible] = React.useState(false);

  const onToggleVisible = () => {
    setVisible(!visible);
  };
  const onClose = () => {
    setVisible(false);
  };
  return <Popover
    placement='bottomRight'
    content={
      <CourseSettingDrawer auth={props.auth} onClick={onClose} />
    }
    visible={visible}
    onVisibleChange={onToggleVisible}
    trigger='click'
  >
    <Button type='text' onClick={onToggleVisible}>
      <MoreOutlined />
    </Button>
  </Popover>;
};