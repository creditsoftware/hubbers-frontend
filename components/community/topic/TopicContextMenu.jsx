import React from 'react';
import { Button, Divider, Menu, Popover, Radio } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
export const TopicContextMenu = (props) => {
  console.log(props);
  return <Popover
    placement='bottomRight'
    content={
      <React.Fragment>
        <Radio.Group>
          <Menu mode='inline'>
            <Menu.Item key='hide-topic'>
              Hide Topic
            </Menu.Item>
            <Divider />
            <Menu.ItemGroup key='manage' title='Manage'>
              <SubMenu key='add-this-to' title='Add This To ...'>
                <Menu.Item key='featured-topic'>
                  <Radio value='featured'>
                    Featured
                  </Radio>
                </Menu.Item>
                <Menu.Item key='welcome-topic'>
                  <Radio value='welcome'>
                    Welcome
                  </Radio>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key='edit-topic'>
                Edit
              </Menu.Item>
              <Menu.Item key='delete-topic'>
                Delete
              </Menu.Item>
              <Menu.Item key='manage-topic'>
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