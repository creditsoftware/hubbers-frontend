import React from 'react';
import { Button, Popover, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EditPostDrawer } from '../post/EditPostDrawer';
import { EditTopicDrawer } from '../topic/EditTopicDrawer';
import { EditEventDrawer } from '../events/EditEventDrawer';
import { EditGroupDrawer } from '../group/EditGroupDrawer';

export const CreateNewBtn = ({...props}) => {
  const [visible, setVisible] = React.useState({
    popover: false,
    postEditor: false,
    articleEditor: false,
    eventEditor: false,
    groupEditor: false,
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
            <Menu.Item key='group' onClick={() => setVisible({ ...visible, groupEditor: !visible.groupEditor, popover: !visible.popover })}>
              Group
            </Menu.Item>
          </Menu>
          <EditPostDrawer {...props} visible={visible.postEditor} onHide={() => setVisible({ ...visible, postEditor: !visible.postEditor })} />
          <EditPostDrawer {...props} article visible={visible.articleEditor} onHide={() => setVisible({ ...visible, articleEditor: !visible.articleEditor })} />
          <EditTopicDrawer visible={visible.topicEditor} onHide={() => setVisible({ ...visible, topicEditor: !visible.topicEditor })} />
          <EditEventDrawer visible={visible.eventEditor} onHide={() => setVisible({ ...visible, eventEditor: !visible.eventEditor })} />
          <EditGroupDrawer visible={visible.groupEditor} onHide={() => setVisible({ ...visible, groupEditor: !visible.groupEditor })} {...props} />
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