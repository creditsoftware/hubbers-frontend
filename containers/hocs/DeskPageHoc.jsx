import React from 'react';
import { Layout } from 'antd';

import { MainHeader, DeskFooter, DeskSidebar } from '../templates';
const { Content } = Layout;

export const DeskPageHoc = ({ children, title, activeSide }) => {
  return (
    <Layout>
      <title>
        {title}
      </title>
      <MainHeader />
      <Layout className='desk-body'>
        <DeskSidebar active={activeSide} />
        <Content>
          {children}
        </Content>
      </Layout>
      <DeskFooter />
    </Layout>
  );
};
