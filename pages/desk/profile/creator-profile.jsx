import React from 'react';
import Link from 'next/link';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import useSWR from 'swr';
import { PlusOutlined } from '@ant-design/icons';
import { fetcher } from '../../../utils/fetcher';
import { MainProfile } from '../../../components/profile';
import { Container } from '../../../components/Container';
import { Select, Radio, Input, Checkbox, Row, Col, Button } from 'antd';
import { useState } from 'react';
const { Option } = Select;
const { TextArea } = Input;

const CreatorProfile = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [valueNew, setValueNew] = useState(true);
  const [valuePeriod, setValuePeriod] = useState('now');
  const [valueTeam, setValueTeam] = useState(true);
  const [valueExpertise, setValueExpertise] = useState([]);
  const [valueProduct, setValueProduct] = useState('not');
  const [addState, setAddState] = useState(false);
  const addStateChange = () => {
    setAddState(true);
  };
  const cancelState = () =>{
    setAddState(false);
  };
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
  console.log(valueExpertise);
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
              <Link href="/desk/profile/">
                <a style={{ display: 'inline-block' }} className="p-3">General Profile</a>
              </Link>
              <Link href="/desk/profile/creator-profile">
                <a style={{ display: 'inline-block' }} className="p-3 active-profile">Creator Profile</a>
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
                <p className="fs-1 fw-6 mb-4">Let&apos;s see how Hubbers tools and community is going to help your product launch.</p>
                <p className="fs-1 fw-6 mb-4">Are you thinking to launch or are you in the process of launching a new product?</p>
                <Radio.Group onChange={onChangeNew} value={valueNew}>
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
                <Row style={{  margin: '24px 0' }}>
                  <Col sm={24} xs={24} className="d-flex py-2 f-align-center">
                    <label style={{ whiteSpace: 'nowrap' }}>How long have you started?</label>
                    <Select bordered={false} className="profile-input profile-input" style={{ width: '150px', borderBottom: '1px solid black', padding: '0', margin: '0 12px'}}>
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
                <Checkbox.Group style={{ width: '100%' }} onChange={onChangeExpertise} value={valueExpertise}>
                  <Row className="profile-expertise">
                    <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="brainstormin">
                        <img src="/images/expertise/brainstormin.png" />
                        Brainstormin
                      </Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="design">
                        <img src="/images/expertise/design.png" />
                        Design
                      </Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="legal">
                        <img src="/images/expertise/legal.png" />
                        Legal
                      </Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="prototyping">
                        <img src="/images/expertise/prototyping.png" />
                        Prototyping
                      </Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="marketing">
                        <img src="/images/expertise/marketing.png" />
                        Marketing
                      </Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="packaging">
                        <img src="/images/expertise/packaging.png" />
                        Packaging
                      </Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="web-app">
                        <img src="/images/expertise/web-app.png" />
                        Web-app
                      </Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="communication">
                        <img src="/images/expertise/communication.png" />
                        Communication
                      </Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="manufacturing">
                        <img src="/images/expertise/manufacturing.png" />
                        Manufacturing
                      </Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="sales-distribution">
                        <img src="/images/expertise/sales-distribution.png" />
                        Sales distribution
                      </Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="social-media">
                        <img src="/images/expertise/social-media.png" />
                        Social media
                      </Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="project-management">
                        <img src="/images/expertise/project-management.png" />
                        Project management
                      </Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
                <p className="mt-5 py-3">Let&apos;s talk about your creative past experiences? Have you ever built a product?</p>
                <Radio.Group onChange={onChangeProduct} value={valueProduct}>
                  <Radio value="not">Not yet</Radio>
                  <Radio value="yes">Yes once</Radio>
                  <Radio value="serial">I am a serial inventors/innovator/creators</Radio>
                </Radio.Group>
                <p className="mt-5 py-3">That is great. Share with Hubbers what you have created. Create your portfolio.</p>
                <Row className="py-5">
                  <button className="add-portfolio" onClick={addStateChange}>
                    <PlusOutlined />
                  </button>
                </Row>
                {addState ? (
                  <Row>
                    <Col span={10} className="d-flex fjc-center f-align-center">
                      <button className="add-portfolio" onClick={addStateChange}>
                        <PlusOutlined />
                        <p className="mt-3">Add pic of project</p>
                      </button>
                    </Col>
                    <Col span={14}>
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
                        <Button type="hbs-outline-danger" size="large" shape="round" onClick={cancelState}>Cancel</Button>
                        <Button type="hbs-primary" size="large" shape="round" className="ml-3">Add</Button>
                      </Row>
                    </Col>                    
                  </Row>
                ) : null}
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