import React from 'react';
import { Language } from '../../components/Language';
import { Badge, Image, Menu, Avatar, Popover, Button, Row, Col, Divider, List, Typography } from 'antd';
import Link from 'next/link';
import { fetchJson } from '../../utils/fetchJson';
import { API } from '../../constants';
import { useRouter } from 'next/router';
import { defaultAvatar } from '../../constants/etc';
import { socket } from '../../utils';
// import NImage from 'next/image';
export const RightMenu = ({ menuType, ...props }) => {
  const { auth } = props;
  const [notifications, setNotifications] = React.useState(null);
  const router = useRouter();
  const signout = async () => {
    const response = await fetchJson(`${API.LOCAL_SIGNOUT_API}`);
    if (response?.isLoggedIn === false) {
      router.push('/auth/signin');
    }
  };
  React.useEffect(() => {
    socket.emit('get-notifications-notify', { userId: props.auth.id });
    socket.on('get-notifications', (e) => {
      let nls = [];
      for (const n of Object.values(e)) {
        if (n.rUserId === props.auth.id) {
          if (!nls?.length) {
            nls = [
              {
                id: n.id,
                type: n.category,
                content: n.content
              }
            ];
            continue;
          }
          nls = [
            ...nls,
            {
              id: n.id,
              type: n.category,
              content: n.content
            }
          ];
        }
      }
      if (notifications) {
        nls = [...nls, ...notifications];
      }
      let distinct = [];
      for (let i of nls) {
        if (distinct.filter((d) => d.id === i.id)?.length === 0) {
          distinct.push(i);
        }
      }
      setNotifications([...distinct]);
    });
  }, [props.auth.id, notifications]);
  const messages = [
    // {
    //   title: 'Denis Kravchenko'
    // },
    // {
    //   title: 'Denis Kravchenko'
    // },
    // {
    //   title: 'Denis Kravchenko'
    // },
    // {
    //   title: 'Denis Kravchenko'
    // },
  ];
  const msgTitle = <span>New Messages</span>;
  const msgContent = (
    <React.Fragment>
      <List
        itemLayout="horizontal"
        dataSource={messages ? messages : []}
        renderItem={item => (
          <List.Item style={{ width: '15rem' }}>
            <Link href='#'>
              <a style={{ width: '100%' }}>
                <List.Item.Meta
                  avatar={<Avatar src="https://hubbers-us.oss-us-west-1.aliyuncs.com/698p6_s0u.png" />}
                  title={item.title}
                  description="Hi Benjamin, How are you?"
                />
              </a>
            </Link>
          </List.Item>
        )}
      />
    </React.Fragment>
  );
  const notifyTitle = <span>Notifications</span>;
  const onClickNotification = (id) => (event) => {
    event.preventDefault();
    socket.emit('read-notifications-notify', { id });
  };
  const notifyContent = (
    <React.Fragment>
      <List
        bordered
        dataSource={notifications ? notifications : []}
        style={{ maxHeight: '300px', overflow: 'auto' }}
        renderItem={item => (
          <List.Item style={{ width: '15rem' }}>
            <Link href='#'>
              <a className='primary-link' onClick={onClickNotification(item.id)}>
                <Typography.Text mark>[{item.type}]</Typography.Text> {item.content}
              </a>
            </Link>
          </List.Item>
        )}
      />
    </React.Fragment>
  );
  const userTitle = (
    <React.Fragment>
      {
        auth &&
        auth.isLoggedIn &&
        <React.Fragment>
          <Avatar size='large' src={<Image src={auth.isLoggedIn ? auth.avatar !== null ? auth.avatar : defaultAvatar : ''} alt='' />} />
          <Link href='/desk/profile'>
            <a className='ml-2 primary-link'>
              {
                auth.isLoggedIn && (auth.firstname || auth.lastname ? (auth.firstname !== null ? auth.firstname : '') + ' ' + (auth.lastname !== null ? auth.lastname : '') : auth.email)
              }
            </a>
          </Link>
        </React.Fragment>
      }
    </React.Fragment>
  );
  const userContent = (
    <React.Fragment>
      <Row>
        <Col span={12}>
          <Link href='/desk/dashboard'>
            <a className='primary-link'>
              Desk
            </a>
          </Link>
        </Col>
        <Col span={12} className='text-right'>
          <Link href='/desk/activities'>
            <a className='primary-link'>
              Activities
            </a>
          </Link>
        </Col>
      </Row>
      <Divider className='my-1' />
      <Row>
        <Col span={12}>
          <Link href='/desk/community/home'>
            <a className='primary-link'>
              Community
            </a>
          </Link>
        </Col>
        <Col span={12} className='text-right'>
          <Link href='/desk/chat'>
            <a className='primary-link'>
              Chat
            </a>
          </Link>
        </Col>
      </Row>
      <Divider className='my-1' />
      <Link href='/grab-a-share'>
        <a className='primary-link w-100'>
          <Row>
            <Col span={12}>
              Assets:
            </Col>
            <Col span={12} className='text-right'>
              $20,000
            </Col>
          </Row>
        </a>
      </Link>
      <Divider className='my-1' />
      <Link href='/desk/account-preference'>
        <a className='primary-link'>
          Account Preference
        </a>
      </Link>
      <Divider className='my-1' />
      <div className='text-right'>
        <Button shape='round' type='hbs-dashed' onClick={signout}>
          Sign out
        </Button>
      </div>
    </React.Fragment>
  );
  return (
    <Menu mode={menuType} className="right-menu">
      <Menu.Item key="language" className="disable">
        <Language />
      </Menu.Item>
      {
        auth.isLoggedIn
          ? <React.Fragment>
            <Menu.Item key="message" className="disable">
              <Popover
                placement="bottomRight"
                title={msgTitle}
                content={msgContent}
                trigger="click"
              >
                <Badge
                  count={0}
                  size='small'
                  style={{ backgroundColor: '#52c41a' }}
                >
                  <div style={{ height: '14px', display: 'flex' }}>
                    <Image preview={false} src='/images/icons/message.png' alt='' />
                  </div>
                </Badge>
              </Popover>
            </Menu.Item>
            <Menu.Item key="notification" className="disable">
              <Popover
                placement="bottomRight"
                title={notifyTitle}
                content={notifyContent}
                trigger="click"
              >
                <Badge
                  count={notifications?.length}
                  size='small'
                  style={{ backgroundColor: '#52c41a' }}
                >
                  <div style={{ height: '17px', display: 'flex' }}>
                    <Image preview={false} src='/images/icons/notification.png' alt='' />
                  </div>
                </Badge>
              </Popover>
            </Menu.Item>
            <Menu.Item key="avatar" className="disable">
              <Popover
                placement="bottomRight"
                title={userTitle}
                content={userContent}
                trigger="click"
              >
                <Avatar size="large" src={auth.isLoggedIn ? auth.avatar !== null ? auth.avatar : defaultAvatar : ''} />
              </Popover>
            </Menu.Item>
          </React.Fragment>
          : <React.Fragment>
            <Menu.Item key="signin">
              <Link href="/auth/signin">
                <a>
                  Sign in
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link href="/auth/signup">
                <a>
                  Register
                </a>
              </Link>
            </Menu.Item>
          </React.Fragment>
      }
    </Menu>
  );
};
