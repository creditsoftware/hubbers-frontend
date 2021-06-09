import React, { Children } from 'react';
import { Layout } from 'antd';
import { MainHeader, MainFooter } from '../templates';
const { Content } = Layout;
export const MainPageHoc = ({ children, title }) => {
  let child = <></>;
  if (children) {
    child = Children.only(children);
  }
  return (
    <Layout>
      <title>
        {title}
      </title>
      <MainHeader />
      <Content className="main-body">
        {React.cloneElement(child)}
      </Content>
      <MainFooter />
    </Layout>
  );
};
