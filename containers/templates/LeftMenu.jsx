import React from 'react';
import { Menu } from 'antd';
import { BLOG_SITE_URL } from '../../constants/urls';
import Link from 'next/link';
import { fetchJson } from '../../utils/fetchJson';
import { API } from '../../constants';
import { useRouter } from 'next/router';
import { AuthLink } from '../../components';
const { SubMenu } = Menu;
export const LeftMenu = ({ menuType }) => {
  const router = useRouter();
  const [auth, setAuth] = React.useState(null);
  React.useEffect(async () => {
    const response = await fetchJson(`${API.GET_USER_FROM_SESSIOM_API}`);
    setAuth(response);
  }, [router]);
  return (
    <Menu mode={menuType} className="left-menu" defaultSelectedKeys={router.pathname}>
      <SubMenu key="hubbers-tools" title="Hubbers Tools">
        <Menu.Item key="/product-launcher">
          <Link href="/hubbers/product-launcher">
            <a>
              Product launcher
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/marketplace">
          <Link href="/hubbers/marketplace">
            <a>
              Marketplace
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/product-competition">
          <Link href="/product-competition">
            <a>
              Product Competition
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/product-developement-tools">
          <Link href="/product-developement-tools">
            <a>
              Product Development Tools
            </a>
          </Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="/hubbers/hubbers-lifetime-membership">
        <Link href="/hubbers/hubbers-lifetime-membership">
          <a>
            Membership
          </a>
        </Link>
      </Menu.Item>
      {
        auth && (
          auth.isLoggedIn ?
            <Menu.Item key="/desk/community">
              <AuthLink href='/desk/community'>
                <a>
                  Community
                </a>
              </AuthLink>
            </Menu.Item>
            :
            <Menu.Item key="/hubbers/community">
              <Link href='/hubbers/community'>
                <a>
                  Community
                </a>
              </Link>
            </Menu.Item>
        )
      }
      <Menu.Item key="/hubbers/events">
        <Link href="/hubbers/events">
          <a>
            Event
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="/blog">
        <Link href={BLOG_SITE_URL}>
          <a>
            Blog
          </a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};
