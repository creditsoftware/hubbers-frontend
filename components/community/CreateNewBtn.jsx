import React from 'react';
import { Button, Popover, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EditPostDrawer } from './EditPostDrawer';
import { EditTopicDrawer } from './EditTopicDrawer';
import { EditEventDrawer } from './EditEventDrawer';

export const CreateNewBtn = () => {
  const [visible, setVisible] = React.useState({
    popover: false,
    postEditor: false,
    articleEditor: false,
    eventEditor: false,
    topicEditor: false
  });
  return <React.Fragment>
    <Popover
      placement='bottomRight'
      title={
        <p className='fw-6 my-2 fw-5'>
          Create
        </p>
      }
      content={
        <React.Fragment>
          <Menu defaultSelectedKeys={['-']}>
            <Menu.Item key='post' onClick={() => setVisible({ ...visible, postEditor: !visible.postEditor, popover: !visible.popover })}>
              Post
            </Menu.Item>
            <Menu.Item key='article' onClick={() => setVisible({ ...visible, articleEditor: !visible.articleEditor, popover: !visible.popover })}>
              Article
            </Menu.Item>
            <Menu.Item key='topic' onClick={() => setVisible({ ...visible, topicEditor: !visible.topicEditor, popover: !visible.popover })}>
              Topic
            </Menu.Item>
            <Menu.Item key='event' onClick={() => setVisible({ ...visible, eventEditor: !visible.eventEditor, popover: !visible.popover })}>
              Event
            </Menu.Item>
            <Menu.Item key='group' onClick={() =>{}}>
              Group
            </Menu.Item>
          </Menu>
          <EditPostDrawer visible={visible.postEditor} onHide={() => setVisible({ ...visible, postEditor: !visible.postEditor })} />
          <EditPostDrawer article visible={visible.articleEditor} onHide={() => setVisible({ ...visible, articleEditor: !visible.articleEditor })} />
          <EditTopicDrawer visible={visible.topicEditor} onHide={() => setVisible({ ...visible, topicEditor: !visible.topicEditor })} />
          <EditEventDrawer visible={visible.eventEditor} onHide={() => setVisible({ ...visible, eventEditor: !visible.eventEditor })} />
        </React.Fragment>
      }
      trigger='click'
      onVisibleChange={() => setVisible({ ...visible, popover: !visible.popover })}
      visible={visible.popover}
    >
      <Button type='hbs-primary' className='ml-2' shape='circle' onClick={() => { }}>
        <PlusOutlined />
      </Button>
    </Popover>
  </React.Fragment >;
};