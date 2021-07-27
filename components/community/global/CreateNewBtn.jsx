import React from 'react';
import { Button, Popover, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EditGroupDrawer } from '../group/EditGroupDrawer';
import { useRouter } from 'next/router';
import { PostDrawer } from '../post';
import { TopicDrawer } from '../topic/TopicDrawer';
import { EventDrawer } from '../events';

export const CreateNewBtn = ({...props}) => {
  const router = useRouter();
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
            {
              !router.query.topic &&
              <Menu.Item key='topic' onClick={() => setVisible({ ...visible, topicEditor: !visible.topicEditor, popover: !visible.popover })}>
                Topic
              </Menu.Item>
            }
            <Menu.Item key='event' onClick={() => setVisible({ ...visible, eventEditor: !visible.eventEditor, popover: !visible.popover })}>
              Event
            </Menu.Item>
            {
              !router.query.topic && !router.query.group &&
              <Menu.Item key='group' onClick={() => setVisible({ ...visible, groupEditor: !visible.groupEditor, popover: !visible.popover })}>
                Group
              </Menu.Item>
            }
          </Menu>
          <PostDrawer {...props} visible={visible.postEditor} onHide={() => setVisible({ ...visible, postEditor: !visible.postEditor })} />
          <PostDrawer {...props} article visible={visible.articleEditor} onHide={() => setVisible({ ...visible, articleEditor: !visible.articleEditor })} />
          <TopicDrawer {...props} visible={visible.topicEditor} onHide={() => setVisible({ ...visible, topicEditor: !visible.topicEditor })} />
          <EventDrawer {...props} visible={visible.eventEditor} onHide={() => setVisible({ ...visible, eventEditor: !visible.eventEditor })} />
          <EditGroupDrawer visible={visible.groupEditor} onHide={() => setVisible({ ...visible, groupEditor: !visible.groupEditor })} {...props} />
        </React.Fragment>
      }
      trigger='click'
      onVisibleChange={() => setVisible({ ...visible, popover: !visible.popover })}
      visible={visible.popover}
    >
      <Button type='hbs-primary' shape='circle' className='ml-2'>
        <PlusOutlined />
      </Button>
    </Popover>
  </React.Fragment >;
};