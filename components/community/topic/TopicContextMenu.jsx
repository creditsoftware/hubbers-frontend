import React from 'react';
import { Button, Divider, Menu, Popover, Radio } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { TopicDrawer } from './TopicDrawer';
const { SubMenu } = Menu;
export const TopicContextMenu = (props) => {
  console.log(props);
  const [visible, setVisible] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [editable, setEditable] = React.useState(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  const toggleShow = () => {
    setShow(!show);
  };
  return <React.Fragment>
    <Popover
      placement='bottomRight'
      visible={show}
      content={
        <React.Fragment>
          <Radio.Group>
            <Menu>
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
                <Menu.Item key='edit-topic' onClick={() => { toggleShow(); toggleVisible(); setEditable(true); }}>
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
      <Button type='text' onClick={toggleShow}>
        <MoreOutlined />
      </Button>
    </Popover>
    <TopicDrawer visible={visible} onHide={toggleVisible} editable={editable} {...props} content={{ ...props }} />
  </React.Fragment>;
};