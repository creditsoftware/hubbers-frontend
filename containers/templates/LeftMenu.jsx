import React from 'react';
import { Menu } from 'antd';
import { BLOG_SITE_URL } from '../../constants/urls';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthLink, Translate } from '../../components';
const { SubMenu } = Menu;
export const LeftMenu = ({ menuType, ...props }) => {
  const router = useRouter();
  return (
    <Menu mode={menuType} className="left-menu" defaultSelectedKeys={router.pathname}>
      <SubMenu key="hubbers-tools" title={<Translate name='Hubbers Tools' />}>
        <Menu.Item key="/product-launcher">
          <Link href="/hubbers/product-launcher">
            <a>
              {<Translate name='Product launcher' />}
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/marketplace">
          <Link href="/hubbers/marketplace">
            <a>
              {<Translate name='Marketplace' />}
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/product-competition">
          <Link href="/hubbers/contests">
            <a>
              {<Translate name='Product Competition' />}
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/product-developement-tools">
          <Link href="/hubbers/product-developement-tools">
            <a>
              {<Translate name='Product Development Tools' />}
            </a>
          </Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="/hubbers-lifetime-membership">
        <Link href="/hubbers/hubbers-lifetime-membership">
          <a>
            {<Translate name='Membership' />}
          </a>
        </Link>
      </Menu.Item>
      {
        props.auth && (
          props.auth.isLoggedIn ?
            <Menu.Item key="/desk/community/home">
              <AuthLink href='/desk/community/home' {...props}>
                <a>
                  {<Translate name='Community' />}
                </a>
              </AuthLink>
            </Menu.Item>
            :
            <Menu.Item key="/hubbers/community">
              <Link href='/hubbers/community'>
                <a>
                  {<Translate name='Community' />}
                </a>
              </Link>
            </Menu.Item>
        )
      }
      <Menu.Item key="/hubbers/events">
        <Link href="/hubbers/events">
          <a>
            {<Translate name='Event' />}
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="/blog">
        <Link href={BLOG_SITE_URL}>
          <a>
            {<Translate name='Blog' />}
          </a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};
