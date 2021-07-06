import React from 'react';
import Link from 'next/link';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { MainProfile } from '../../../components/profile';
import { Container } from '../../../components/Container';
import { DatePicker, Select, Space, Row, Col } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;

const Profile = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const product = ['Furniture', 'Clothing and apparel'];
  const innovation = ['Innovation1', 'Innovation2', 'Innovation3'];
  const tech = ['Tech1', 'Tech2', 'Tech3'];
  return (
    <DeskPageHoc title='Profile' activeSide={{ active: ['profile'], open: [] }} auth={{ ...data }}>
      <React.Fragment>
        <MainProfile />
        <Container className="mt-4">
          <React.Fragment>
            <div>
              <Link href="/">
                <a style={{ display: 'inline-block' }} className="p-3 active-profile">General Profile</a>
              </Link>
              <Link href="/creator-profile">
                <a style={{ display: 'inline-block' }} className="p-3">Creator Profile</a>
              </Link>
              <Link href="/expert-profile">
                <a style={{ display: 'inline-block' }} className="p-3">Expert</a>
              </Link>
              <Link href="/investor-profile">
                <a style={{ display: 'inline-block' }} className="p-3">Investor</a>
              </Link>
              <Link href="/hubbers-team">
                <a style={{ display: 'inline-block' }} className="p-3">Hubbers Team</a>
              </Link>
            </div>
            <div className="bg-white p-5">
              <div className="max-w-50 m-auto">
                <p className="fs-1 pb-3">
                  Let's the community know a little more about you.
                  <br />
                  Let's start with your profile picture. Click on the picture above and upload your best shot of you.
                </p>
                <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                  <Col sm={12} xs={24} className="d-flex py-2 f-align-center">
                    <label style={{ whiteSpace: 'nowrap' }}>My surname is</label>
                    <input type="text" name="surname" className="profile-input" />
                  </Col>
                  <Col sm={12} xs={24} className="d-flex py-2 f-align-center">
                    <label style={{ whiteSpace: 'nowrap' }}>and my name is</label>
                    <input type="text" name="name" className="profile-input" />
                  </Col>
                </Row>
                <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                  <Col sm={12} xs={24} className="d-flex py-2 f-align-center">
                    <label style={{ whiteSpace: 'nowrap' }}>I am from</label>
                    <input type="text" name="nationality" className="profile-input" />
                  </Col>
                  <Col sm={12} xs={24} className="d-flex py-2 f-align-center">
                    <label style={{ whiteSpace: 'nowrap' }}>and live in</label>
                    <input type="text" name="city" className="profile-input" />
                  </Col>
                </Row>
                <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                  <Col sm={24} xs={24} className="d-flex py-2 f-align-center">
                    <label style={{ whiteSpace: 'nowrap' }}>From this beautiful country</label>
                    <Select bordered={false} className="profile-input">
                      <Option value="ch">China</Option>
                      <Option value="in">India</Option>
                      <Option value="ru">Russia</Option>
                      <Option value="uk">Ukraine</Option>
                    </Select>
                  </Col>
                </Row>
                <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                  <Col sm={12} xs={24} className="d-flex py-2 f-align-center">
                    <label style={{ whiteSpace: 'nowrap' }}>I am a</label>
                    <Select bordered={false} className="profile-input">
                      <Option value="man">Man</Option>
                      <Option value="woman">Woman</Option>
                      <Option value="both">Both</Option>
                      <Option value="guess">Guess</Option>
                    </Select>
                  </Col>
                  <Col sm={12} xs={24} className="d-flex py-2 f-align-center">
                    <label style={{ whiteSpace: 'nowrap' }}>and I am born on</label>
                    <DatePicker className="profile-input" />
                  </Col>
                </Row>
                <p className="fs-1 py-3">
                  Ans as you know, Hubbers community is all about product creation, contributting to projects with your experience and resources. Share a bit about your passion
                </p>
                <label>
                  Product categories I am fond it:
                </label>
                <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                  <Select mode="tags" bordered={false} style={{ width: '100%' }}>
                    {
                      product.map((item, index) => {
                        return <Option key={index}>{item}</Option>;
                      })
                    }
                  </Select>
                </Row>
                <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                  <Col sm={24} xs={24} className="d-flex py-2 f-align-center">
                    <label style={{ whiteSpace: 'nowrap' }}>Type of innovation that I like:</label>
                    <Select mode="tags" bordered={false} className="profile-input">
                      {
                        innovation.map((item, index) => {
                          return <Option key={index}>{item}</Option>;
                        })
                      }
                    </Select>
                  </Col>
                </Row>
                <Row style={{ borderBottom: '1px solid black', marginBottom: '36px' }}>
                  <Col sm={24} xs={24} className="d-flex py-2 f-align-center">
                    <label style={{ whiteSpace: 'nowrap' }}>Tech I follow:</label>
                    <Select mode="tags" bordered={false} className="profile-input">
                      {
                        tech.map((item, index) => {
                          return <Option key={index}>{item}</Option>;
                        })
                      }
                    </Select>
                  </Col>
                </Row>
                <label>
                  Hubbers member will be interested to hear about what you are doing now:
                </label>
                <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                  <Select bordered={false} style={{ width: '100%' }}>
                    <Option value="web">Web Development</Option>
                    <Option value="mobile">Mobile Development</Option>
                  </Select>
                </Row>
              </div>
            </div>
          </React.Fragment>
        </Container>
      </React.Fragment>
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
export default Profile;