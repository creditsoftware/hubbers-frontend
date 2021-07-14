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
import { fetchJson } from '../../utils/fetchJson';
import { API } from '../../constants';
const { SubMenu } = Menu;
const { Sider } = Layout;
export const DeskSidebar = ({ active, ...props }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = React.useState(false);
  const [communityId, setCommunityId] = React.useState(null);
  const [communityList, setCommunityList] = React.useState([]);
  const [activeKey, setActiveKey] = React.useState([]);
  const [openKeys, setOpenKeys] = React.useState([]);
  const onCollapse = c => {
    setCollapsed(c);
  };
  const getData = React.useCallback(async () => {
    if (router.query.community) {
      setCommunityId(router.query.community);
      if (router.pathname) {
        let paths = router.pathname.split('/');
        if (paths && paths[paths.length - 1]) {
          setActiveKey([`${paths[paths.length - 1]}-${router.query.community}`]);
        }
      }
    }
    fetchJson(`${API.LOCAL_GET_COMMUNITY_LIST_API}`)
      .then((response) => {
        setCommunityList(response.data.data);
        if (router.pathname.indexOf('community') > 0) {
          if (response.data && response.data.data?.length > 0) {
            if (!router.query.community) {
              router.push({ query: { ...router.query, community: response.data?.data[0].id } });
            }
          } else {
            if (router.query.community !== 'join') {
              router.push({ query: { community: 'join' } });
            }
          }
        }
      })
      .catch(() => {
        setCommunityList([]);
      });
    window.addEventListener('resize', () => {
      onCollapse(window.innerWidth < 1024);
    });
    onCollapse(window.innerWidth < 1024);
  }, [router]);
  useEffect(() => {
    getData();
  }, [router, getData]);
  const onChangeOpenKeys = (k) => {
    if (openKeys.filter((key) => key === k).length) {
      setOpenKeys([...openKeys.filter((key) => key !== k)]);
    } else {
      setOpenKeys([...openKeys, k]);
    }
  };
  useEffect(() => {
    setOpenKeys([...active.open, `community-${communityId}`]);
  }, [communityId, active]);
  return (
    <Sider collapsible collapsedWidth={0} collapsed={collapsed} onCollapse={onCollapse} className='desk-sider' width={300}>
      <Menu
        defaultSelectedKeys={[...active.active, ...activeKey]}
        defaultOpenKeys={[...active.open, `community-${communityId}`]}
        openKeys={collapsed ? [] : [...openKeys]}
        mode="inline"
        style={{
          height: '100%',
          overflowX: 'hidden'
        }}
      >
        <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
          <AuthLink href='/desk/dashboard' {...props}>
            <a>
              Dashboard&nbsp;&nbsp;
            </a>
          </AuthLink>
        </Menu.Item>
        <SubMenu key="community"
          icon={<TeamOutlined />}
          onTitleClick={() => {
            onChangeOpenKeys('community');
            if (communityList &&
              communityList.length === 0) {
              router.push('/desk/community/join');
            }
          }}
          title={
            <div>
              Community&nbsp;&nbsp;
              <Badge
                // count={7}
                size='small'
                style={{ backgroundColor: '#52c41a' }}
              />
            </div>
          }
        >
          {
            communityList &&
            communityList.length > 0 &&
            communityList.map((community) => {
              console.log(community);
              return <SubMenu
                key={`community-${community.id}`}
                icon={<TeamOutlined />}
                onTitleClick={() => onChangeOpenKeys(`community-${community.id}`)}
                title={
                  <AuthLink href={`/desk/community/home?community=${community.id}`} {...props}>
                    <a>
                      {community.name}&nbsp;&nbsp;
                      <Badge
                        // count={120}
                        size='small'
                        style={{ backgroundColor: '#52c41a' }}
                      />
                    </a>
                  </AuthLink>
                }
              >
                <Menu.Item key={`home-${community.id}`}>
                  <AuthLink href={`/desk/community/home?community=${community.id}`} {...props}>
                    <a>
                      Home&nbsp;&nbsp;
                      <Badge
                        // count={23}
                        size='small'
                        style={{ backgroundColor: '#52c41a' }}
                      />
                    </a>
                  </AuthLink>
                </Menu.Item>
                <Menu.Item key={`discover-${community.id}`}>
                  <AuthLink href={`/desk/community/discover?community=${community.id}`} {...props}>
                    <a>
                      Discover&nbsp;&nbsp;
                      <Badge
                        // count={23}
                        size='small'
                        style={{ backgroundColor: '#52c41a' }}
                      />
                    </a>
                  </AuthLink>
                </Menu.Item>
                <Menu.Item key={`members-${community.id}`}>
                  <AuthLink href={`/desk/community/members?community=${community.id}`} {...props}>
                    <a>
                      Members&nbsp;&nbsp;
                      <Badge
                        count={community.members?.length}
                        size='small'
                        style={{ backgroundColor: '#52c41a' }}
                        className='middle-badge'
                      />
                    </a>
                  </AuthLink>
                </Menu.Item>
                {
                  community.events &&
                  community.events.length > 0 &&
                  <Menu.Item key={`events-${community.id}`}>
                    <AuthLink href={`/desk/community/events?community=${community.id}`} {...props}>
                      <a>
                        Events&nbsp;&nbsp;
                        <Badge
                          // count={80}
                          size='small'
                          style={{ backgroundColor: '#52c41a' }}
                        />
                      </a>
                    </AuthLink>
                  </Menu.Item>
                }
                {
                  community.topics &&
                  community.topics.length > 0 &&
                  <Menu.Item key={`topics-${community.id}`}>
                    <AuthLink href={`/desk/community/topics?community=${community.id}`} {...props}>
                      <a>
                        Topics&nbsp;&nbsp;
                        <Badge
                          // count={80}
                          size='small'
                          style={{ backgroundColor: '#52c41a' }}
                        />
                      </a>
                    </AuthLink>
                  </Menu.Item>
                }
                {
                  community.groups &&
                  community.groups.length > 0 &&
                  <SubMenu
                    key={`community-${community.id}-group`}
                    icon={<TeamOutlined />}
                    onTitleClick={() => onChangeOpenKeys(`community-${community.id}-group`)}
                    title={
                      <AuthLink href={`/desk/community/groups?community=${community.id}`} {...props}>
                        <a>
                          Groups&nbsp;&nbsp;
                          <Badge
                            // count={120}
                            size='small'
                            style={{ backgroundColor: '#52c41a' }}
                          />
                        </a>
                      </AuthLink>
                    }
                  >
                    {
                      community.groups &&
                      community.groups.length > 0 &&
                      community.groups.map((g) => {
                        return <SubMenu
                          key={`community-${community.id}-group-${g.id}`}
                          icon={<TeamOutlined />}
                          onTitleClick={() => onChangeOpenKeys(`community-${community.id}-group-${g.id}`)}
                          title={
                            <AuthLink href={`/desk/community/group?community=${community.id}&group=${g.id}`} {...props}>
                              <a>
                                {g.name}&nbsp;&nbsp;
                                <Badge
                                  // count={120}
                                  size='small'
                                  style={{ backgroundColor: '#52c41a' }}
                                />
                              </a>
                            </AuthLink>
                          }
                        >
                          <Menu.Item key={`group-activity-feed-${g.id}`}>
                            <AuthLink href={'#'} {...props}>
                              <a>
                                Activity Feed&nbsp;&nbsp;
                                <Badge
                                  // count={80}
                                  size='small'
                                  style={{ backgroundColor: '#52c41a' }}
                                />
                              </a>
                            </AuthLink>
                          </Menu.Item>
                          <Menu.Item key={`group-discovery-${g.id}`}>
                            <AuthLink href={'#'} {...props}>
                              <a>
                                Discovery&nbsp;&nbsp;
                                <Badge
                                  // count={80}
                                  size='small'
                                  style={{ backgroundColor: '#52c41a' }}
                                />
                              </a>
                            </AuthLink>
                          </Menu.Item>
                          <Menu.Item key={`group-members-${g.id}`}>
                            <AuthLink href={'#'} {...props}>
                              <a>
                                Members&nbsp;&nbsp;
                                <Badge
                                  // count={80}
                                  size='small'
                                  style={{ backgroundColor: '#52c41a' }}
                                />
                              </a>
                            </AuthLink>
                          </Menu.Item>
                          <Menu.Item key={`group-about-${g.id}`}>
                            <AuthLink href={'#'} {...props}>
                              <a>
                                About&nbsp;&nbsp;
                                <Badge
                                  // count={80}
                                  size='small'
                                  style={{ backgroundColor: '#52c41a' }}
                                />
                              </a>
                            </AuthLink>
                          </Menu.Item>
                          <Menu.Item key={`group-invite-${g.id}`}>
                            <AuthLink href={'#'} {...props}>
                              <a>
                                Invite&nbsp;&nbsp;
                                <Badge
                                  // count={80}
                                  size='small'
                                  style={{ backgroundColor: '#52c41a' }}
                                />
                              </a>
                            </AuthLink>
                          </Menu.Item>
                        </SubMenu>;
                      })
                    }
                  </SubMenu>
                }
              </SubMenu>;
            })
          }
        </SubMenu>
        <Menu.Item key="activities" icon={<StarOutlined />}>
          <AuthLink href='/desk/activities' {...props}>
            <a>
              Activities&nbsp;&nbsp;
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="choose-your-launch" icon={<SelectOutlined />}>
          <AuthLink href='/desk/choose-your-launch' {...props}>
            <a>
              Choose your launch
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="profile" icon={<ProfileOutlined />}>
          <AuthLink href='/desk/profile' {...props}>
            <a>
              Profile
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="account-preference" icon={<AccountBookOutlined />}>
          <AuthLink href='/desk/account-preference' {...props}>
            <a>
              Account preference
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="assessment" icon={<SmileOutlined />}>
          <AuthLink href='/desk/assessment' {...props}>
            <a>
              Assessment
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="contacts" icon={<ContactsOutlined />}>
          <AuthLink href='/desk/contacts' {...props}>
            <a>
              Contacts
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="messages" icon={<CommentOutlined />}>
          <AuthLink href='/desk/messages' {...props}>
            <a>
              Messages
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="project-setting" icon={<SettingOutlined />}>
          <AuthLink href='/desk/project-setting' {...props}>
            <a>
              Project setting
            </a>
          </AuthLink>
        </Menu.Item>
        <Menu.Item key="modules" icon={<BuildOutlined />}>
          <AuthLink href='/desk/modules' {...props}>
            <a>
              Modules
            </a>
          </AuthLink>
        </Menu.Item>
        <SubMenu
          key="my-product"
          icon={<GiftOutlined />}
          onTitleClick={() => onChangeOpenKeys('my-product')}
          title={
            <AuthLink href='/desk/my-product' {...props}>
              <a>
                My Product&nbsp;&nbsp;
                <Badge
                  // count={1}
                  size='small'
                  style={{ backgroundColor: '#52c41a' }}
                />
              </a>
            </AuthLink>
          }
        >
          <SubMenu
            key="product1"
            onTitleClick={() => onChangeOpenKeys('product1')}
            icon={<TeamOutlined />}
            title={
              <AuthLink href='/desk/my-product/product1' {...props}>
                <a>
                  Product1&nbsp;&nbsp;
                  <Badge
                    // count={1}
                    size='small'
                    style={{ backgroundColor: '#52c41a' }}
                  />
                </a>
              </AuthLink>
            }
          >
            <Menu.Item key="product-detail">
              <AuthLink href='/desk/my-product/product1/detail' {...props}>
                <a>
                  Product Detail&nbsp;&nbsp;
                  <Badge
                    // count={0}
                    size='small'
                    style={{ backgroundColor: '#52c41a' }}
                  />
                </a>
              </AuthLink>
            </Menu.Item>
            <Menu.Item key="team-setting">
              <AuthLink href='/desk/my-product/product1/team-setting' {...props}>
                <a>
                  Team &amp; Setttings&nbsp;&nbsp;
                  <Badge
                    // count={0}
                    size='small'
                    style={{ backgroundColor: '#52c41a' }}
                  />
                </a>
              </AuthLink>
            </Menu.Item>
            <Menu.Item key="workspace">
              <AuthLink href='/desk/my-product/product1/workspace' {...props}>
                <a>
                  Workspace&nbsp;&nbsp;
                  <Badge
                    // count={0}
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
          onTitleClick={() => onChangeOpenKeys('my-expertise')}
          title={
            <AuthLink href='/desk/my-expertise' {...props}>
              <a>
                My Expertise&nbsp;&nbsp;
                <Badge
                  // count={3}
                  size='small'
                  style={{ backgroundColor: '#52c41a' }}
                />
              </a>
            </AuthLink>
          }
        >
          <Menu.Item key="expertise1">
            <AuthLink href='/desk/my-expertise/expertise1' {...props}>
              <a>
                Expertise1&nbsp;&nbsp;
                <Badge
                  // count={3}
                  size='small'
                  style={{ backgroundColor: '#52c41a' }}
                />
              </a>
            </AuthLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
      {/* <div style={{ height: '4rem' }}></div> */}
    </Sider>
  );
};