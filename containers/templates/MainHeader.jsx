import React from 'react';
import { Button, Drawer } from 'antd';
import { Layout } from 'antd';
import Link from 'next/link';
import { LeftMenu } from './LeftMenu';
import { RightMenu } from './RightMenu';
const { Header } = Layout;
export const MainHeader = () => {

  const [state, setState] = React.useState({
    visible: false
  });
  const showDrawer = () => {
    setState({
      visible: true,
    });
  };
  const onClose = () => {
    setState({
      visible: false,
    });
  };
  return (
    <React.Fragment>
      <Header className="main-header">
        <Link href="/">
          <a className="logo">
            <img src="/images/logo/hubbers-logo.png" className="logo" />
          </a>
        </Link>
        <div className="menu-content">
          <LeftMenu menuType='horizontal' />
          <RightMenu menuType='horizontal' />
          <div className="bars-menu-wrapper">
            <Button className="bars-menu" type='hbs-outline-default' onClick={showDrawer}>
              <span className="bars-btn"></span>
            </Button>
          </div>
          <Drawer
            title="Hubbers"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={state.visible}
          >
            <LeftMenu menuType='vertical' />
            <RightMenu menuType='vertical' />
          </Drawer>
        </div>
      </Header>
      <div className="clear-both"></div>
    </React.Fragment>
  );
};
