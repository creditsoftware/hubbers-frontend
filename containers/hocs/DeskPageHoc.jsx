import React from 'react';
import { Layout } from 'antd';

import { MainHeader, DeskFooter, DeskSidebar } from '../templates';
import { useRouter } from 'next/router';
const { Content } = Layout;

export const DeskPageHoc = ({ children, title, activeSide, ...props }) => {
  const router = useRouter();
  React.useEffect(()=>{
    if(props.auth?.isLoggedIn === false){
      router.push(`/auth/signin?redirect=${router.asPath}`);
    }
  }, [props, router]);
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
