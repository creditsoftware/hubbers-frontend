import React from 'react';
import { Layout } from 'antd';

import { MainHeader, DeskFooter, DeskSidebar } from '../templates';
const { Content } = Layout;

export const DeskPageHoc = ({ children, title, activeSide, ...props }) => {
  return (
    <Layout>
      <title>
        {title}
      </title>
      <MainHeader {...props} />
      <Layout className='desk-body'>
        <DeskSidebar active={activeSide} {...props} />
        <Content>
          {children}
        </Content>
      </Layout>
      <DeskFooter {...props} />
    </Layout>
  );
};
