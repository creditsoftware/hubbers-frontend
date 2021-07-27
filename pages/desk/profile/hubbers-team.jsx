import React from 'react';
import Link from 'next/link';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { MainProfile } from '../../../components/profile';
import { jwtDecode } from '../../../utils/jwt';
import { Container } from '../../../components/Container';
import { Input, Avatar, Row, Col, Button } from 'antd';
import Image from 'next/image';
const {TextArea} = Input;

const HubbersTeam = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const person = {
    name: 'Denis Kravchenko',
    country: 'Russian Federation',
    title: '24/7 CTO',
    description: ''
  };
  return (
    <DeskPageHoc title='Profile' activeSide={{ active: ['profile'], open: [] }} auth={{ ...data }}>
      <React.Fragment>
        <MainProfile auth={data} />
        <Container className="mt-4">
          <React.Fragment>
            <div>
              <Link href="/desk/profile/">
                <a style={{ display: 'inline-block' }} className="p-3">General Profile</a>
              </Link>
              <Link href="/desk/profile/creator-profile">
                <a style={{ display: 'inline-block' }} className="p-3">Creator Profile</a>
              </Link>
              <Link href="/desk/profile/expert-profile">
                <a style={{ display: 'inline-block' }} className="p-3">Expert</a>
              </Link>
              <Link href="/desk/profile/investor-profile">
                <a style={{ display: 'inline-block' }} className="p-3">Investor</a>
              </Link>
              <Link href="/desk/profile/hubbers-team">
                <a style={{ display: 'inline-block' }} className="p-3 active-profile">Hubbers Team</a>
              </Link>
            </div>
            <div className="bg-white p-5">
              <Row>
                <Col sm={18} xs={24}>
                  <Row className="d-flex f-align-center px-5">
                    <Avatar size={200} src="/images/membership/membership2_-min.jpg" />
                    <p className="pl-5 fs-2">Add image you want to<br/>show to your community.</p>
                  </Row>
                  <Row className="mt-5 px-5">
                    <Col span={24}>
                      <label>Name and Last Name</label>
                      <input type="text" name="name" className="profile-input p-2 mt-1" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}/>
                    </Col>
                  </Row>
                  <Row className="mt-4 px-5">
                    <Col span={24}>
                      <label>Title</label>
                      <input type="text" name="title" className="profile-input p-2 mt-1" style={{ borderBottom: '1px solid black', marginBottom: '24px' }} />
                    </Col>
                  </Row>
                  <Row className="mt-4 px-5">
                    <Col span={24}>
                      <label>Description</label>
                      <TextArea name="description" className="profile-input mt-3 p-2" style={{ borderBottom: '1px solid black', marginBottom: '24px' }} />
                    </Col>
                  </Row>
                  <Row className="fjc-center">
                    <Button type="hbs-primary" size="large" shape="round">Active</Button>
                  </Row>
                </Col>
                <Col sm={6} xs={24} className="d-flex fjc-center f-align-center" >
                  <div className="p-4 text-center" style={{ borderRadius: '12px', border: '1px solid green' }}>
                    <Image width={200} height={200} src="/images/membership/banner-img.png" style={{borderRadius: '12px'}}/>
                    <h1 className="mt-4">{person.name}</h1>
                    <p>{person.country}</p>
                    <p>{person.date}</p>
                    <p>{person.title}</p>
                    <p>{person.description}</p>
                  </div>
                </Col>
              </Row>
            </div>
          </React.Fragment>
        </Container>
      </React.Fragment>
    </DeskPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: false } } };
  }
});
export default HubbersTeam;