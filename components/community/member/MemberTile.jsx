import React from 'react';
import Avatar from 'antd/lib/avatar/avatar';
// import { MoreOutlined } from '@ant-design/icons';
import {
  // Button,
  // Popover,
  Space,
  // Menu,
  // Divider,
  // Radio
} from 'antd';
import Image from 'next/image';
// import { useRouter } from 'next/router';
// const { SubMenu } = Menu;
export const MemberTile = ({
  showActions,
  // id,
  avatar,
  name,
  role,
  // ...props
}) => {
  const [show, setShow] = React.useState(0);
  // const router = useRouter();
  // const [memberId, setMemberId] = React.useState(null);
  // useEffect(()=>{
  //   setMemberId(id);
  // },[]);
  const onShowActions = () => {
    if (showActions) {
      setShow(1);
    }
  };
  const onHideActions = () => {
    setShow(0);
  };
  return (
    <React.Fragment>
      <div onMouseEnter={onShowActions} onMouseLeave={onHideActions}>
        <Space className='member-tile p-2 mt-3 bg-white'>
          <div>
            <Avatar size='large' src={<Image width={100} height={100} src={avatar} />} />
          </div>
          <div>
            <div className="fw-5 fs-2 text-center">
              {name}
            </div>
            <div className='fs-1 fc-primary text-center'>
              {role}
            </div>
          </div>
          <div className={show ? 'transition-4 opacity-1' : 'transition-4 opacity-0'}>
            {/* <Button type='hbs-outline-primary' shape='round'>
              Follow
            </Button> */}
            {/* <Popover
              placement='bottomRight'
              title={''}
              content={
                <Radio.Group value={router.query.role}>
                  <Menu mode="inline">
                    <Menu.Item key="say-hello" {...props}>
                      Say Hello
                    </Menu.Item>
                    <SubMenu key="more"
                      title={
                        <span>
                          Community
                        </span>
                      }
                    >
                      <Menu.Item key="home" {...props}>
                        Block XXX
                      </Menu.Item>
                    </SubMenu>
                    <Divider className='mt-0 mb-3' />
                    <span style={{ color: 'grey' }}>Manage</span>
                    <SubMenu key="change-role"
                      title={
                        <span>
                          Change Role
                        </span>
                      }
                    >
                      <Menu.Item key="host" {...props}>
                        <Radio value='host'>
                          Network Host
                        </Radio>
                      </Menu.Item>
                      <Menu.Item key="moderator" {...props}>
                        <Radio value='moderator'>
                          Network Merderator
                        </Radio>
                      </Menu.Item>
                      <Menu.Item key="member" {...props}>
                        <Radio value='member'>
                          Network Member
                        </Radio>
                      </Menu.Item>
                    </SubMenu>
                    <SubMenu key="manage-more"
                      title={
                        <span>
                          More
                        </span>
                      }
                    >
                      <Menu.Item key="home" {...props}>
                        Remove from Metwork
                      </Menu.Item>
                    </SubMenu>
                  </Menu>
                </Radio.Group>
              }
              trigger='click'
            >
              <Button type='hbs-outline-primary' shape='circle' className='ml-1'>
                <MoreOutlined />
              </Button>
            </Popover> */}
          </div>
        </Space>
      </div>
    </React.Fragment>
  );
};