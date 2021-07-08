import React from 'react';
import { Menu } from 'antd';
import { BLOG_SITE_URL } from '../../constants/urls';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { AuthLink } from '../../components';
const { SubMenu } = Menu;
export const LeftMenu = ({ menuType, ...props }) => {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id });
  return (
    <Menu mode={menuType} className="left-menu" defaultSelectedKeys={router.pathname}>
      <SubMenu key="hubbers-tools" title={f('Hubbers Tools')}>
        <Menu.Item key="/product-launcher">
          <Link href="/hubbers/product-launcher">
            <a>
              {f('Product launcher')}
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/marketplace">
          <Link href="/hubbers/marketplace">
            <a>
              {f('Marketplace')}
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/product-competition">
          <Link href="/hubbers/product-competition">
            <a>
              {f('Product Competition')}
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/product-developement-tools">
          <Link href="/hubbers/product-developement-tools">
            <a>
              {f('Product Development Tools')}
            </a>
          </Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="/hubbers-lifetime-membership">
        <Link href="/hubbers/hubbers-lifetime-membership">
          <a>
            {f('Membership')}
          </a>
        </Link>
      </Menu.Item>
      {
        props.auth && (
          props.auth.isLoggedIn ?
            <Menu.Item key="/desk/community/home">
              <AuthLink href='/desk/community/home' {...props}>
                <a>
                  {f('Community')}
                </a>
              </AuthLink>
            </Menu.Item>
            :
            <Menu.Item key="/hubbers/community">
              <Link href='/hubbers/community'>
                <a>
                  {f('Community')}
                </a>
              </Link>
            </Menu.Item>
        )
      }
      <Menu.Item key="/hubbers/events">
        <Link href="/hubbers/events">
          <a>
            {f('Event')}
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="/blog">
        <Link href={BLOG_SITE_URL}>
          <a>
            {f('Blog')}
          </a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};
