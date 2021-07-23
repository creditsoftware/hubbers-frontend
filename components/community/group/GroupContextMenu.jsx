import React from 'react';
import {
  Button,
  // Divider,
  Menu,
  Popconfirm,
  Popover,
  Radio
} from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { fetchJson } from '../../../utils';
import { API } from '../../../constants';
import { REQUEST_TYPE } from '../../../constants/requestType';
import { useCommunityList, useGroupList } from '../../../hooks';
// const { SubMenu } = Menu;
export const GroupContextMenu = ({ ...props }) => {
  const [visible, setVisible] = React.useState(false);
  const { mutate } = useGroupList(props.communityId);
  const { mutate: mutateCommunityList } = useCommunityList();
  const toggleVisible = () => {
    setVisible(!visible);
  };
  const onDelete = () => {
    fetchJson(`${API.REMOVE_COMMUNITY_GROUP_API}/${props.id}`, {
      method: REQUEST_TYPE.DELETE
    }).then(() => {
      mutate();
      mutateCommunityList();
    });
    toggleVisible();
  };
  return <Popover
    placement='bottomRight'
    content={
      <React.Fragment>
        <Radio.Group>
          <Menu>
            {/* <Menu.Item key='invite'>
              Invite
            </Menu.Item>
            <Menu.Item key='leave-group'>
              Leave Group
            </Menu.Item>
            <Divider /> */}
            <Menu.ItemGroup key='manage' title='Manage'>
              {/* <SubMenu key='add-this-to' title='Add This To ...'>
                <Menu.Item key='featured-group'>
                  <Radio value='featured'>
                    Featured
                  </Radio>
                </Menu.Item>
                <Menu.Item key='welcome-group'>
                  <Radio value='welcome'>
                    Welcome
                  </Radio>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key='setting'>
                Setting
              </Menu.Item>
              <Menu.Item key='charge-for-access'>
                Charge for Access
              </Menu.Item> */}
              <Menu.Item key='delete-group'>
                <Popconfirm title='Are you sure?' okText='Yes' cancelText='No' onConfirm={onDelete} onCancel={toggleVisible}>
                  Delete
                </Popconfirm>
              </Menu.Item>
              {/* <Menu.Item key='manage-group'>
                Manage
              </Menu.Item> */}
            </Menu.ItemGroup>
          </Menu>
        </Radio.Group>
      </React.Fragment>
    }
    visible={visible}
    onVisibleChange={toggleVisible}
    trigger='click'
  >
    <Button type='text' onClick={toggleVisible}>
      <MoreOutlined />
    </Button>
  </Popover>;
};