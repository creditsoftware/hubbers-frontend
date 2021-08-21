import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
import { Container } from '../../components';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import { Button, Row, Col } from 'antd';
import useSWR from 'swr';
import { jwtDecode } from '../../utils/jwt';
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
  const jobTile = [
    {
      image: '/images/marketplace/fundraising.png',
      content: 'Fundraising',
    }, {
      image: '/images/marketplace/logistic.png',
      content: 'Logistic',
    }, {
      image: '/images/marketplace/legal.png',
      content: 'Legal',
    }, {
      image: '/images/marketplace/design.png',
      content: 'Design',
    }
  ];
  return (
    <DeskPageHoc title='Activities' activeSide={{ active: ['activities'], open: [] }} auth={{ ...data }} query={{...props.query}}>
      <Container className="py-5">
        <React.Fragment>
          <div className="max-w-50 m-auto text-center py-5">
            <h1 className="fw-6 fs-3 pt-3">
              Feel you can help the community of creators and companies launching new products with your expertise. Hubbers offers your few opportunities where you can offer your expertise and earn money and/or HBB.
            </h1>
            <p className="fs-1">Before jumping into describing your work, first fill better your expert profile only profile with more than 75% completion can offer their expertise.</p>
          </div>
          <h1 className="text-center fw-6 fs-2 pt-5">There are 4 ways to get a gig/job in Hubbers expert market place.</h1>
          <Row className="py-5">
            {
              jobTile.map((item,index)=>{
                return(
                  <Col key={index} lg={6} sm={12} xs={24} className="p-3">
                    <div
                      className="general-card bg-white py-3"
                      style={{
                        height: '172px',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100px',
                          backgroundImage: `url(${item.image})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'contain',
                          backgroundPosition: 'center'
                        }}
                      ></div>
                      <div className="fs-2 fw-6 pt-3 text-center">{item.content}</div>
                    </div>
                  </Col>
                );
              })
            }
          </Row>
          <h1 className="text-center fw-6 fs-2 pt-5">There are 4 ways to get a gig/job in Hubbers expert market place.</h1>
          <Row className="py-5">
            {
              choiceTile.map((item, index) => {
                return (
                  <Col key={index} lg={12} xs={24} className="p-4">
                    <Row
                      className="general-card bg-white h-100"
                      style={{
                        borderRadius: '24px',
                        padding: '24px'
                      }}
                    >
                      <Col sm={16} xs={24} className="d-flex fjc-center f-align-center">
                        <p className="fs-1 text-center">{item.content}</p>
                      </Col>
                      <Col sm={8} xs={24} className="d-flex f-align-center fjc-center">
                        <Image width={145} height={140} src={item.image} alt='' />
                      </Col>
                    </Row>
                  </Col>
                );
              })
            }
          </Row>
          <div className="max-w-50 m-auto text-center">
            <p className="fs-2 pt-5">Select the one you are more interested in and start working Want to have more details about how it works, know more here.</p>
            <p className="fs-2 pt-5">In order to provide our community with recognized experts, Hubbers implement a vetting system. Only experts that already got few reviews [or individual members] can apply for paid job.</p>
            <h1 className="fw-6 fs-2 pt-5">So to get your first review you need to provide few hours of works in your expertise for the community and get rewarded with HBB.</h1>
            <Link href="/hubbers/hbb-hubbers-blockchain-community-token">
              <a>
                <Button type="hbs-primary" className="mt-5" shape="round" size="large">GET REWARDED WITH HBB</Button>
              </a>
            </Link>
          </div>
        </React.Fragment>
      </Container>
    </DeskPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req, query } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user }, query } };
  } else {
    return { props: { auth: { isLoggedIn: false }, query } };
  }
});
export default PutYourSkills;