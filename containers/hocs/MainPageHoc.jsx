import React, { Children } from 'react';
import { Layout } from 'antd';
import { MainHeader, MainFooter } from '../templates';
const { Content } = Layout;
export const MainPageHoc = ({ children, title, ...props }) => {
  let child = <></>;
  if (children) {
    child = Children.only(children);
  }
  return (
    <Layout>
      <title>
        {title}
      </title>
      <MainHeader {...props} />
      <Content className="main-body">
        {React.cloneElement(child)}
      </Content>
      <MainFooter {...props} />
    </Layout>
  );
};
