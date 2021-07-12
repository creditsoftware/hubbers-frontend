import React from 'react';
import { Button, Divider, Menu, Popover, Radio } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
export const GroupContextMenu = (props) => {
  console.log(props);
  return <Popover
    placement='bottomRight'
    content={
      <React.Fragment>
        <Radio.Group>
          <Menu>
            <Menu.Item key='invite'>
              Invite
            </Menu.Item>
            <Menu.Item key='leave-group'>
              Leave Group
            </Menu.Item>
            <Divider />
            <Menu.ItemGroup key='manage' title='Manage'>
              <SubMenu key='add-this-to' title='Add This To ...'>
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
              </Menu.Item>
              <Menu.Item key='delete-group'>
                Delete
              </Menu.Item>
              <Menu.Item key='manage-group'>
                Manage
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Radio.Group>
      </React.Fragment>
    }
    trigger='click'
  >
    <Button type='text'>
      <MoreOutlined />
    </Button>
  </Popover>;
};