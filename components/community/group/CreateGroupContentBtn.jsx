import React from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EditPostDrawer } from '../post/EditPostDrawer';
import { EditTopicDrawer } from '../topic/EditTopicDrawer';
import { EditEventDrawer } from '../events/EditEventDrawer';
import { useRouter } from 'next/router';

export const CreateGroupContentBtn = ({...props}) => {
  const router = useRouter();
  const [visible, setVisible] = React.useState({
    popover: false,
    postEditor: false,
    articleEditor: false,
    eventEditor: false,
    topicEditor: false
  });
  console.log(props);
  return <React.Fragment>
    <Dropdown
      placement='bottomRight'
      overlay={
        <React.Fragment>
          <Menu defaultSelectedKeys={['-']} style={{minWidth: '8rem'}}>
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
          </Menu>
          <EditPostDrawer {...props} visible={visible.postEditor} onHide={() => setVisible({ ...visible, postEditor: !visible.postEditor })} />
          <EditPostDrawer {...props} article visible={visible.articleEditor} onHide={() => setVisible({ ...visible, articleEditor: !visible.articleEditor })} />
          <EditTopicDrawer visible={visible.topicEditor} onHide={() => setVisible({ ...visible, topicEditor: !visible.topicEditor })} />
          <EditEventDrawer visible={visible.eventEditor} onHide={() => setVisible({ ...visible, eventEditor: !visible.eventEditor })} />
        </React.Fragment>
      }
      trigger={['click']}
      onVisibleChange={() => setVisible({ ...visible, popover: !visible.popover })}
      visible={visible.popover}
    >
      <Button type='hbs-primary' shape='circle' className='ml-2'>
        <PlusOutlined />
      </Button>
    </Dropdown>
  </React.Fragment >;
};