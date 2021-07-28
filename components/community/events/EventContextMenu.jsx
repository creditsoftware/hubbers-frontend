import React from 'react';
import {
  Button,
  // Divider,
  Menu,
  Popover,
  Radio
} from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { fetchJson } from '../../../utils';
import { API, REQUEST_TYPE } from '../../../constants';
import { useEventList } from '../../../hooks';
import { useTopicDetail } from '../../../hooks/useSWR/community/useTopicDetail';
import { useGroupDetail } from '../../../hooks/useSWR/community/useGroupDetail';
// const { SubMenu } = Menu;
export const EventContextMenu = ({ ...props }) => {
  const [visible, setVisible] = React.useState(false);
  const { mutate: eventListMutate } = useEventList(props.query?.community);
  const { mutate: mutateTDetail } = useTopicDetail(props.query?.topic);
  const { mutate: mutateGDetail } = useGroupDetail(props.query?.group);

  const onToggleVisible = () => {
    setVisible(!visible);
  };
  const onDelete = () => {
    onToggleVisible();
    fetchJson(`${API.DELETE_EVENT_API}/${props.id}`, {
      method: REQUEST_TYPE.DELETE
    })
      .then(() => {
        if(props.query?.topic) {
          mutateTDetail();
          return;
        }
        if(props.query?.group) {
          mutateGDetail();
          return;
        }
        eventListMutate();
      });
  };
  return <Popover
    placement='bottomRight'
    content={
      <React.Fragment>
        <Radio.Group>
          <Menu>
            {/* <Menu.Item key='add-to-calendar'>
              Add to calendar
            </Menu.Item>
            <Menu.Item key='save-event'>
              Save event
            </Menu.Item>
            <Menu.Item key='mute-event'>
              Mute event
            </Menu.Item>
            <SubMenu key='more' title='More'>
              <Menu.Item key='hide-from-acitivity-feed'>
                Hide from activity feed
              </Menu.Item>
              <Menu.Item key='report-event'>
                Report event
              </Menu.Item>
              <Menu.Item key='block-ej'>
                Block EJ
              </Menu.Item>
              <Menu.Item key='hide-topic'>
                Hide topic
              </Menu.Item>
              <Menu.Item key='copy-event-id'>
                Copy Event Id
              </Menu.Item>
            </SubMenu>
            <Divider />
            <Menu.ItemGroup key='manage' title='Manage'>
              <SubMenu key='add-this-to' title='Add This To ...'>
                <Menu.Item key='featured'>
                  <Radio value='featured'>
                    Featured
                  </Radio>
                </Menu.Item>
                <Menu.Item key='welcome'>
                  <Radio value='welcome'>
                    Welcome
                  </Radio>
                </Menu.Item>
              </SubMenu>
              <SubMenu key='action' title='Actions'>
                <Menu.Item key='recommend'>
                  Recommend
                </Menu.Item>
                <Menu.Item key='send-message'>
                  Send message
                </Menu.Item>
                <Menu.Item key='download-rsvps'>
                  Download REVPs
                </Menu.Item>
                <Menu.Item key='duplicate-event'>
                  Duplicate Event
                </Menu.Item>
                <Menu.Item key='event-setting'>
                  Event Setting
                </Menu.Item>
                <Menu.Item key='edit-event'>
                  Edit
                </Menu.Item> */}
            <Menu.Item key='delete-event' onClick={onDelete}>
              Delete
            </Menu.Item>
            {/* <Menu.Item key='manage-event'>
                  Manage
                </Menu.Item>
              </SubMenu>
            </Menu.ItemGroup> */}
          </Menu>
        </Radio.Group>
      </React.Fragment>
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