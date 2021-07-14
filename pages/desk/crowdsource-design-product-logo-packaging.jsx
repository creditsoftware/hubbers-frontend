import React from 'react';
import Image from 'next/image';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
import { Container } from '../../components';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import { Space } from 'antd';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
const CrowdsourceDesignProductLogoPackaging = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const card = [
    {
      image: '/images/activity/crowd1.png',
      title: 'Product design',
      content: 'Already got great product idea but need to make a great 2D/3D design for it and have a designer help you making it?',
    }, {
      image: '/images/activity/crowd2.png',
      title: 'Logo/icon design',
      content: 'Corporate/brand logo or icon to create, test the power of our designer community to make it.',
    }, {
      image: '/images/activity/crowd3.png',
      title: 'Product packaging/packing design',
      content: 'Product without a great packaging is still missing something, our community can help you get your next product packaging.',
    }, {
      image: '/images/activity/crowd4.png',
      title: 'UI/UX for website/app',
      content: 'Need help designing your next website or App, here are a community of great UI/UX designers to bring their best creative ideas in your app/design',
    }
  ];
  return (
    <DeskPageHoc title='Activities' activeSide={{ active: ['activities'], open: [] }} auth={{ ...data }}>
      <Container className="py-5">
        <React.Fragment>
          <div className="max-w-40 m-auto text-center">
            <h1 className="fw-6 fs-3 pt-3">
              Logo, product, packaging, UI/UI, creating design is at the heart of Hubbers community.
            </h1>
            <p className="fs-1">Creating by yourself is always a very complicated tasks. It is important to have enough feedbacks to make sure you are going in the right directions.</p>
            <p className="fs-1">Hubbers let&apos;s your crowdsource your next design with Hubbers community, start now.</p>
            <h1 className="fw-6 fs-2">Select what you want to create next?</h1>
          </div>
          <Space size={70} wrap align="center" className="d-flex fjc-center py-5">
            {
              card.map((item, index) => {
                return(
                  <div key={index} className="activity-crowd-card">
                    <h3 className="fw-6 fs-2">{item.title}</h3>
                    <div className="content">
                      <p className="fs- pt-3" style={{ maxWidth: '280px' }}>{item.content}</p>
                      <Image width={175} height={170} src={item.image} className="pb-3" />
                    </div>
                  </div>
                );
              })
            }
          </Space>
        </React.Fragment>
      </Container>
    </DeskPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req } = ctx;
  const user = await req.session.get('user');
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: false } } };
  }
});
export default CrowdsourceDesignProductLogoPackaging;