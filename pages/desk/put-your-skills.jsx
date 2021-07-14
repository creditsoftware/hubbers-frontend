import React from 'react';
import Image from 'next/image';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
import { Container } from '../../components';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import { Button, Space } from 'antd';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
const PutYourSkills = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const choiceTile = [
    {
      image: '/images/put-your-skills/specific-project.png',
      content: 'Create a specific expertise based on your skills',
    }, {
      image: '/images/put-your-skills/specific-module.png',
      content: 'Bring your expertise in a specific workspace [or product launcher] to help creators and companies complete it',
    }, {
      image: '/images/put-your-skills/work-per-hour.png',
      content: 'Be looked up from your skills and work per hour',
    }, {
      image: '/images/put-your-skills/job-list.png',
      content: 'Find a job in existing job listing',
    }
  ];
  // const jobTile = [
  //   {
  //     image: '/images/marketplace/specific-project.png',
  //     content: 'Create a specific expertise based on your skills',
  //   }, {
  //     image: '/images/marketplace/specific-module.png',
  //     content: 'Bring your expertise in a specific workspace [or product launcher] to help creators and companies complete it',
  //   }, {
  //     image: '/images/marketplace/work-per-hour.png',
  //     content: 'Be looked up from your skills and work per hour',
  //   }, {
  //     image: '/images/marketplace/job-list.png',
  //     content: 'Find a job in existing job listing',
  //   }
  // ];
  return (
    <DeskPageHoc title='Activities' activeSide={{ active: ['activities'], open: [] }} auth={{ ...data }}>
      <Container className="py-5">
        <React.Fragment>
          <div className="max-w-50 m-auto text-center">
            <h1 className="fw-6 fs-3 pt-3">
              Feel you can help the community of creators and companies launching new products with your expertise. Hubbers offers your few opportunities where you can offer your expertise and earn money and/or HBB.
            </h1>
            <p className="fs-1 pt-5">Before jumping into describing your work, first fill better your expert profile only profile with more than 75% completion can offer their expertise.</p>
            <h1 className="fw-6 fs-2 pt-5">There are 4 ways to get a gig/job in Hubbers expert market place.</h1>
          </div>
          <h1 className="text-center fw-6 fs-2 pt-5">There are 4 ways to get a gig/job in Hubbers expert market place.</h1>
          <Space size={70} wrap align="center" className="d-flex fjc-center py-5 mb-1">
            {
              choiceTile.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="general-card d-flex fjc-space-between f-align-center bg-white"
                    style={{
                      minWidth: '500px',
                      height: '230px',
                      borderRadius: '24px',
                      padding: '24px'
                    }}
                  >
                    <p className="fw-6 fs-2 pr-3 mb-0 text-center" style={{ maxWidth: '280px' }}>{item.content}</p>
                    <Image width={175} height={170} src={item.image} className="pb-3" />
                  </div>
                );
              })
            }
          </Space>
          <div className="max-w-50 m-auto text-center">
            <p className="fs-2 pt-5">Select the one you are more interested in and start working Want to have more details about how it works, know more here.</p>
            <p className="fs-2 pt-5">In order to provide our community with recognized experts, Hubbers implement a vetting system. Only experts that already got few reviews [or individual members] can apply for paid job.</p>
            <h1 className="fw-6 fs-2 pt-5">So to get your first review you need to provide few hours of works in your expertise for the community and get rewarded with HBB.</h1>
            <Button type="hbs-primary" className="mt-5" shape="round" size="large">GET REWARDED WITH HBB</Button>
          </div>
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
export default PutYourSkills;