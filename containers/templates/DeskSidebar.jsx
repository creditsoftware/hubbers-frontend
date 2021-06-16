import React, { useEffect } from 'react';
import { Layout, Menu, Badge } from 'antd';
import {
  StarOutlined,
  PieChartOutlined,
  GoldOutlined,
  TeamOutlined,
  SelectOutlined,
  ProfileOutlined,
  AccountBookOutlined,
  SmileOutlined,
  ContactsOutlined,
  CommentOutlined,
  SettingOutlined,
  BuildOutlined,
  GiftOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { AuthLink } from '../../components';
// import { fetchJson } from '../../utils/fetchJson';
// import { API } from '../../constants';
const { SubMenu } = Menu;
const { Sider } = Layout;
export const DeskSidebar = ({ active }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = React.useState(false);
  const [communityId, setCommunityId] = React.useState(null);
  // const [communityList, setCommunityList] = React.useState([]);
  const [activeKey, setActiveKey] = React.useState([]);
  const onCollapse = c => {
    setCollapsed(c);
  };
  useEffect(async () => {
    if(router.query.community){
      setCommunityId(router.query.community);
      if(router.pathname) {
        let paths = router.pathname.split('/');
        if(paths && paths[paths.length-1]) {
          setActiveKey([`${paths[paths.length-1]}-${router.query.community}`]);
        }
      }
    }
    // fetchJson(`${API.LOCAL_GET_COMMUNITY_LIST_API}`)
    //   .then((response) => {
    //     setCommunityList(response.data.data);
    //     if (response.data && response.data.data?.length > 0) {
    //       if (!router.query.community) {
    //         router.push({ query: { ...router.query, community: response.data?.data[0].id } });
    //       }
    //     } else {
    //       router.push({ query: { community: 'join' } });
    //     }
    //   })
    //   .catch(() => {
    //     setCommunityList([]);
    //   });
    window.addEventListener('resize', () => {
      onCollapse(window.innerWidth < 1024);
    });
    onCollapse(window.innerWidth < 1024);
  }, [router]);
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className='desk-sider' width={300}>
      <Menu
        defaultSelectedKeys={[...active.active, ...activeKey]}
        defaultOpenKeys={[...active.open, `community-${communityId}`]}
        mode="inline"
      >
        <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
          <AuthLink href='/desk/dashboard'>
            <a>
              Dashboard&nbsp;&nbsp;
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="activities" icon={<StarOutlined />}>
          <AuthLink href='/desk/activities'>
            <a>
              Activities&nbsp;&nbsp;
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="choose-your-launch" icon={<SelectOutlined />}>
          <AuthLink href='/desk/choose-your-launch'>
            <a>
              Choose your launch
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="profile" icon={<ProfileOutlined />}>
          <AuthLink href='/desk/profile'>
            <a>
              Profile
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="account-preference" icon={<AccountBookOutlined />}>
          <AuthLink href='/desk/account-preference'>
            <a>
              Account preference
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="assessment" icon={<SmileOutlined />}>
          <AuthLink href='/desk/assessment'>
            <a>
              Assessment
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="contacts" icon={<ContactsOutlined />}>
          <AuthLink href='/desk/contacts'>
            <a>
              Contacts
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="messages" icon={<CommentOutlined />}>
          <AuthLink href='/desk/messages'>
            <a>
              Messages
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="project-setting" icon={<SettingOutlined />}>
          <AuthLink href='/desk/project-setting'>
            <a>
              Project setting
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="modules" icon={<BuildOutlined />}>
          <AuthLink href='/desk/modules'>
            <a>
              Modules
            </a>
          </AuthLink>
        </Menu.Item>
        <SubMenu
          key="my-product"
          icon={<GiftOutlined />}
          title={
            <AuthLink href='/desk/my-product'>
              <a>
                My Product
                <Badge
                  count={120}
                  size='small'
                  style={{ backgroundColor: '#52c41a' }}
                />
              </a>
            </AuthLink>
          }
        >
          <SubMenu
            key="product1"
            icon={<TeamOutlined />}
            title={
              <AuthLink href='/desk/my-product/product1'>
                <a>
                  Product1
                  <Badge
                    count={120}
                    size='small'
                    style={{ backgroundColor: '#52c41a' }}
                  />
                </a>
              </AuthLink>
            }
          >
            <Menu.Item key="product-detail">
              <AuthLink href='/desk/my-product/product1/detail'>
                <a>
                  Product Detail
                  <Badge
                    count={23}
                    size='small'
                    style={{ backgroundColor: '#52c41a' }}
                  />
                </a>
              </AuthLink>
            </Menu.Item>
            <Menu.Item key="team-setting">
              <AuthLink href='/desk/my-product/product1/team-setting'>
                <a>
                  Team &amp; Setttings
                  <Badge
                    count={23}
                    size='small'
                    style={{ backgroundColor: '#52c41a' }}
                  />
                </a>
              </AuthLink>
            </Menu.Item>
            <Menu.Item key="workspace">
              <AuthLink href='/desk/my-product/product1/workspace'>
                <a>
                  Workspace
                  <Badge
                    count={23}
                    size='small'
                    style={{ backgroundColor: '#52c41a' }}
                  />
                </a>
              </AuthLink>
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="my-expertise"
          icon={<GoldOutlined />}
          title={
            <AuthLink href='/desk/my-expertise'>
              <a>
                My Expertise
                <Badge
                  count={120}
                  size='small'
                  style={{ backgroundColor: '#52c41a' }}
                />
              </a>
            </AuthLink>
          }
        >
          <Menu.Item key="expertise1">
            <AuthLink href='/desk/my-expertise/expertise1'>
              <a>
                Expertise1
                <Badge
                  count={23}
                  size='small'
                  style={{ backgroundColor: '#52c41a' }}
                />
              </a>
            </AuthLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="community"
          icon={<TeamOutlined />}
          title={
            // <AuthLink href={`/desk/community${router.query.community ? '?community=' + router.query.community : ''}`}>
            //   <a>
            <div>
              Community&nbsp;&nbsp;
              <Badge
                count={120}
                size='small'
                style={{ backgroundColor: '#52c41a' }}
              />
            </div>
            //   </a>
            // </AuthLink>
          }
        >
          {/* {
            communityList &&
            communityList.length > 0 &&
            communityList.map((community) => {
              return <SubMenu
                key={`community-${community.id}`}
                icon={<TeamOutlined />}
                title={
                  <AuthLink href={`/desk/community?community=${community.id}`}>
                    <a>
                      {community.name}&nbsp;&nbsp;
                      <Badge
                        count={120}
                        size='small'
                        style={{ backgroundColor: '#52c41a' }}
                      />
                    </a>
                  </AuthLink>
                }
              >
                <Menu.Item key={`home-${community.id}`}>
                  <AuthLink href={`/desk/community/home?community=${community.id}`}>
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
                <Menu.Item key={`discover-${community.id}`}>
                  <AuthLink href={`/desk/community/discover?community=${community.id}`}>
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
                <Menu.Item key={`members-${community.id}`}>
                  <AuthLink href={`/desk/community/members?community=${community.id}`}>
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
              </SubMenu>;
            })
          } */}
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
      </Menu>
      <div style={{ height: '4rem' }}></div>
    </Sider>
  );
};