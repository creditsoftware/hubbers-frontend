import React, { useEffect } from 'react';
import { Layout, Menu, Badge } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { AuthLink } from '../../components';
const { SubMenu } = Menu;
const { Sider } = Layout;
export const DeskSidebar = ({ active }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = React.useState(false);
  const [openKeys, setOpenKeys] = React.useState([]);
  const onChangeOpenKeys = (c) => {
    if (!c) {
      if (active === 'home' || active === 'discover' || active === 'members') {
        setOpenKeys(['community']);
      }
    } else {
      setOpenKeys([]);
    }
  };
  const onCollapse = c => {
    setCollapsed(c);
    onChangeOpenKeys(c);
  };
  useEffect(async () => {
    window.addEventListener('resize', () => {
      onCollapse(window.innerWidth < 1024);
    });
    onCollapse(window.innerWidth < 1024);
  }, []);
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className='desk-sider' width={300}>
      <Menu defaultSelectedKeys={[`${active}`]} mode="inline" openKeys={openKeys}>
        <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
          <AuthLink href='/desk/dashboard'>
            <a>
              Dashboard&nbsp;&nbsp;
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="activities" icon={<DesktopOutlined />}>
          <AuthLink href='/desk/activities'>
            <a>
              Activities&nbsp;&nbsp;
            </a>
          </AuthLink>
        </Menu.Item>
        <SubMenu key="community"
          icon={<TeamOutlined />}
          title={
            <AuthLink href={`/desk/community${router.query.community ? '?community=' + router.query.community : ''}`}>
              <a>
                Community&nbsp;&nbsp;
                <Badge
                  count={120}
                  size='small'
                  style={{ backgroundColor: '#52c41a' }}
                />
              </a>
            </AuthLink>
          }
        >
          <Menu.Item key="home">
            <AuthLink href={`/desk/community/home${router.query.community ? '?community=' + router.query.community : ''}`}>
              <a>
                Home&nbsp;&nbsp;
                <Badge
                  count={23}
                  size='small'
                  style={{ backgroundColor: '#52c41a' }}
                />
              </a>
            </AuthLink>
          </Menu.Item>
          <Menu.Item key="discover">
            <AuthLink href={`/desk/community/discover${router.query.community ? '?community=' + router.query.community : ''}`}>
              <a>
                Discover&nbsp;&nbsp;
                <Badge
                  count={23}
                  size='small'
                  style={{ backgroundColor: '#52c41a' }}
                />
              </a>
            </AuthLink>
          </Menu.Item>
          <Menu.Item key="members">
            <AuthLink href={`/desk/community/members${router.query.community ? '?community=' + router.query.community : ''}`}>
              <a>
                Members&nbsp;&nbsp;
                <Badge
                  count={80}
                  size='small'
                  style={{ backgroundColor: '#52c41a' }}
                />
              </a>
            </AuthLink>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="expertise" icon={<FileOutlined />}>
          <AuthLink href='/desk/expertise'>
            <a>
              Expertise&nbsp;&nbsp;
            </a>
          </AuthLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};