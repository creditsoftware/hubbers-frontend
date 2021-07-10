import React from 'react';
import { Button, Divider, Menu, Popover, Radio } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
export const PostContextMenu = (props) => {
  console.log(props);
  return <Popover
    placement='bottomRight'
    content={
      <React.Fragment>
        <Radio.Group>
          <Menu>
            <Menu.Item key='save-post'>
              Save Post
            </Menu.Item>
            <Menu.Item key='mute-post'>
              Mute Post
            </Menu.Item>
            <SubMenu key='more' title='More'>
              <Menu.Item key='hide-from-acitivity-feed'>
                Hide from activity feed
              </Menu.Item>
              <Menu.Item key='report-post'>
                Report post
              </Menu.Item>
              <Menu.Item key='block-ej'>
                Block EJ
              </Menu.Item>
              <Menu.Item key='hide-topic'>
                Hide topic
              </Menu.Item>
              <Menu.Item key='copy-post-id'>
                Copy Post Id
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
                <Menu.Item key='edit-event'>
                  Edit
                </Menu.Item>
                <Menu.Item key='delete-event'>
                  Delete
                </Menu.Item>
                <Menu.Item key='manage-event'>
                  Manage
                </Menu.Item>
              </SubMenu>
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