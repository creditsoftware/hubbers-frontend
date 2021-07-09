import React from 'react';
import Link from 'next/link';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { MainProfile } from '../../../components/profile';
import { Container } from '../../../components/Container';
import { DatePicker, Select, Radio, Space, Image, Checkbox, Avatar, Row, Col, Button } from 'antd';
import { useState } from 'react';
const { RangePicker } = DatePicker;
const { Option } = Select;

const CreatorProfile = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [valueNew, setValueNew] = useState(true);
  const [valuePeriod, setValuePeriod] = useState('now');
  const [valueTeam, setValueTeam] = useState(true);
  const [valueExpertise, setValueExpertise] = useState([]);
  const [valueProduct, setValueProduct] = useState('not');
  const onChangeNew = (e) => {
    setValueNew(e.target.value);
  };
  const onChangePeriod = (e) => {
    setValuePeriod(e.target.value);
  };
  const onChangeTeam = (e) => {
    setValueTeam(e.target.value);
  };
  const onChangeExpertise = (e) => {
    setValueExpertise(e);
  };
  const onChangeProduct = (e) => {
    setValueProduct(e);
  };
  return (
    <DeskPageHoc title='Profile' activeSide={{ active: ['profile'], open: [] }} auth={{ ...data }}>
      <React.Fragment>
        <MainProfile />
        <Container className="mt-4">
          <React.Fragment>
            <div>
              <Link href="/desk/profile/creator-profile">
                <a style={{ display: 'inline-block' }} className="p-3 active-profile">Creator Profile</a>
              </Link>
              <Link href="/desk/profile/">
                <a style={{ display: 'inline-block' }} className="p-3">General Profile</a>
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
                <p className="fs-1 fw-6 mt-2 mb-0">Creating, innovating, inventing new products is what Hubbers community is about.</p>
                <p className="fs-1 fw-6 mb-4">Let's see how Hubbers tools and community is going to help your product launch.</p>
                <p className="fs-1 fw-6 mb-4">Are you thinking to launch or are you in the process of launching a new product?</p>
                <Radio.Group onChange={onChangeNew} value={valueNew}>
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
                <Row style={{  margin: '24px 0' }}>
                  <Col sm={24} xs={24} className="d-flex py-2 f-align-center">
                    <label style={{ whiteSpace: 'nowrap' }}>How long have you started?</label>
                    <Select bordered={false} className="profile-input" className="profile-input" style={{ width: '150px', borderBottom: '1px solid black', padding: '0', margin: '0 12px'}}>
                      <Option value="1">1 month</Option>
                      <Option value="2">2 months</Option>
                      <Option value="3">3 months</Option>
                      <Option value="4">4 months</Option>
                    </Select>
                  </Col>
                </Row>
                <p className="mt-5 py-3">If you are about to launch, when do you see the launch of product?</p>
                <Radio.Group onChange={onChangePeriod} value={valuePeriod}>
                  <Radio value="now">Now</Radio>
                  <Radio value="1~3">in 1~3 months</Radio>
                  <Radio value="6">after 6 months</Radio>
                  <Radio value="still">still thinking</Radio>
                </Radio.Group>
                <p className="mt-5 py-3">Do you have a co-founder/ team working with you?</p>
                <Radio.Group onChange={onChangeTeam} value={valueTeam}>
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
                <Row style={{ margin: '24px 0' }}>
                  <Col sm={24} xs={24} className="d-flex py-2 f-align-center">
                    <label style={{ whiteSpace: 'nowrap' }}>We are</label>
                    <input type="text" name="working-person" className="profile-input" style={{ width: '100px', borderBottom: '1px solid black', padding: '0', margin: '0 12px'}} />
                    <label style={{ whiteSpace: 'nowrap' }}>persons working on our great project.</label>
                  </Col>
                </Row>
                <p>Which expertise are you looking outside of your team to accelerate your launch?</p>
                <Checkbox.Group style={{ width: '100%' }} onChange={onChangeExpertise}>
                  <Row>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="brainstorming">Brainstorming</Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="design">Design</Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="legal">Legal</Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="prototyping">Prototyping</Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="marketing">Marketing</Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="packaging">Packaging</Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="web-app">Web-app</Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="communication">Communication</Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="crowd-funding">Crowd-funding</Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="purchasing">Purchasing</Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="logistic">Logistic</Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="fundraising">Fundraising</Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="manufacturing">Manufacturing</Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="sales-distribution">Sales-distribution</Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="social-media">Social-media</Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={24}>
                      <Checkbox value="project-management">Project-management</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
                <p className="mt-5 py-3">Let's talk about your creative past experiences? Have you ever built a product?</p>
                <Radio.Group onChange={onChangeProduct} value={valueProduct}>
                  <Radio value="not">Not yet</Radio>
                  <Radio value="yes">Yes once</Radio>
                  <Radio value="serial">I am a serial inventors/innovator/creators</Radio>
                </Radio.Group>
                <p className="mt-5 py-3">That is great. Share with Hubbers what you have created. Create your portfolio.</p>
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
export default CreatorProfile;