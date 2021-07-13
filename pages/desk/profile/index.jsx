import React from 'react';
import Link from 'next/link';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { MainProfile } from '../../../components/profile';
import { Container } from '../../../components/Container';
import { DatePicker, Select, Space, Row, Col, Avatar, Button } from 'antd';
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
              <Link href="/desk/profile/">
                <a style={{ display: 'inline-block' }} className="p-3 active-profile">General Profile</a>
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
                <a style={{ display: 'inline-block' }} className="p-3">Hubbers Team</a>
              </Link>
            </div>
            <div className="bg-white p-5">
              <div className="max-w-50 m-auto">
                <p className="fs-1 pb-3">
                  Let&apos;s the community know a little more about you.
                  <br />
                  Let&apos;s start with your profile picture. Click on the picture above and upload your best shot of you.
                </p>
                <Row>
                  <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                    <label style={{ whiteSpace: 'nowrap' }}>My surname is</label>
                    <input type="text" name="surname" className="profile-input" />
                  </Col>
                  <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                    <label style={{ whiteSpace: 'nowrap' }}>and my name is</label>
                    <input type="text" name="name" className="profile-input" />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                    <label style={{ whiteSpace: 'nowrap' }}>I am from</label>
                    <input type="text" name="nationality" className="profile-input" />
                  </Col>
                  <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
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
                <Row>
                  <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                    <label style={{ whiteSpace: 'nowrap' }}>I am a</label>
                    <Select bordered={false} className="profile-input">
                      <Option value="man">Man</Option>
                      <Option value="woman">Woman</Option>
                      <Option value="both">Both</Option>
                      <Option value="guess">Guess</Option>
                    </Select>
                  </Col>
                  <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                    <label style={{ whiteSpace: 'nowrap' }}>and I am born on</label>
                    <DatePicker className="profile-input" />
                  </Col>
                </Row>
                <p className="fs-1 py-3">
                  Ans as you know, Hubbers community is all about product creation, contributting to projects with your experience and resources. Share a bit about your passion
                </p>
                <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                  <Col sm={24} xs={24} className="d-flex py-2 f-align-center">
                    <label style={{ whiteSpace: 'nowrap' }}>
                      Product categories I am fond it:
                    </label>
                    <Select mode="tags" bordered={false} style={{ width: '100%' }}>
                      {
                        product.map((item, index) => {
                          return <Option key={index}>{item}</Option>;
                        })
                      }
                    </Select>
                  </Col>
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
                <p className="fs-1 fw-6 mb-0">Now let´s go for a bitt of social media, sharing is caring.</p>
                <p>Share your Id or Link your account</p>
                <Space size={24} className="py-4">
                  <img width="42" height="42" src="/images/social/linkedin.png" />
                  <img width="42" height="42" src="/images/social/facebook.png" />
                  <img width="42" height="42" src="/images/social/instagram.png" />
                  <img width="42" height="42" src="/images/social/twitter.png" />
                </Space>
                <p>If you want your coomunity to know all about you, feel free to share your past jobs and education.<br />(best for experts as employers like to know more about you)</p>
                <div className="mt-4">
                  <Row>
                    <Col span={24} className="d-flex py-3 f-align-center">
                      <p className="fs-2 fw-6 mb-0 mr-5">Your Past Jobs</p>
                      <Avatar size={86} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <label style={{ whiteSpace: 'nowrap' }}>Job title</label>
                      <input type="text" name="job-title" className="profile-input" />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <label style={{ whiteSpace: 'nowrap' }}>Frome</label>
                      <input type="text" name="job-from" className="profile-input" />
                    </Col>
                    <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <label style={{ whiteSpace: 'nowrap' }}>To</label>
                      <input type="text" name="job-to" className="profile-input" />
                    </Col>
                  </Row>
                  <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                    <Col sm={24} xs={24} className="d-flex py-2 f-align-center">
                      <label style={{ whiteSpace: 'nowrap' }}>Location</label>
                      <Select bordered={false} className="profile-input">
                        <Option value="ch">China</Option>
                        <Option value="in">India</Option>
                        <Option value="ru">Russia</Option>
                        <Option value="uk">Ukraine</Option>
                      </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <label style={{ whiteSpace: 'nowrap' }}>State</label>
                      <input type="text" name="job-state" className="profile-input" />
                    </Col>
                    <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <label style={{ whiteSpace: 'nowrap' }}>City</label>
                      <input type="text" name="job-city" className="profile-input" />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <label style={{ whiteSpace: 'nowrap' }}>Company</label>
                      <input type="text" name="job-company" className="profile-input" />
                    </Col>
                    <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <label style={{ whiteSpace: 'nowrap' }}>Company Size</label>
                      <input type="text" name="job-size" className="profile-input" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="text-right">
                      <Button type="hbs-primary" size="large" shape="round">Add</Button>
                    </Col>
                  </Row>
                </div>
                <div className="mt-4">
                  <p className="fs-2 fw-6">Your Education</p>
                  <Row>
                    <Col sm={24} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <label style={{ whiteSpace: 'nowrap' }}>Country</label>
                      <Select bordered={false} className="profile-input">
                        <Option value="ch">China</Option>
                        <Option value="in">India</Option>
                        <Option value="ru">Russia</Option>
                        <Option value="uk">Ukraine</Option>
                      </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <label style={{ whiteSpace: 'nowrap' }}>College/University name</label>
                      <input type="text" name="education-university" className="profile-input" />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <label style={{ whiteSpace: 'nowrap' }}>Title</label>
                      <input type="text" name="education-title" className="profile-input" />
                    </Col>
                    <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <label style={{ whiteSpace: 'nowrap' }}>Digree</label>
                      <input type="text" name="education-digree" className="profile-input" />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <label style={{ whiteSpace: 'nowrap' }}>Year</label>
                      <input type="text" name="education-year" className="profile-input" />
                    </Col>
                    <Col sm={12} xs={24} className="text-right mt-2">
                      <Button type="hbs-primary" size="large" shape="round">Add</Button>
                    </Col>
                  </Row>
                </div>
                <p className="mt-4">Great Job! We are done with the intro. Time to involve as a creator, expert, or investor in products. Fill in the role you want to play to be considered.</p>
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