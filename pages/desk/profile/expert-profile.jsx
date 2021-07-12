import React from 'react';
import Link from 'next/link';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { MainProfile } from '../../../components/profile';
import { PlusOutlined } from '@ant-design/icons';
import { Container } from '../../../components/Container';
import { Input, Select, Radio, Checkbox, Row, Col, Button } from 'antd';
import { useState } from 'react';
const { Option } = Select;
const { TextArea } = Input;

const ExpertProfile = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const design = ['Logo', 'UX', 'Industrial design'];
  const manufacturing = ['Product followup', 'Industrializaion'];
  const [valueExpert, setValueExpert] = useState([]);
  const [valueAvail, setValueAvail] = useState('full');
  const [valueHBB, setValueHBB] = useState(true);
  const [addState, setAddState] = useState(false);
  const [portfolioTitle, setPortfolioTitle] = useState('');
  const [portfolioDescription, setPortfolioDescription] = useState('');
  const [portfolios, setPortfolios] = useState([{
    image: '/images/accelerator_image.png',
    title: 'test',
    description: 'testestestestestestestestest'
  }]);
  const addEvent = () => {
    let data = portfolios;
    data.push({
      image: '',
      title: portfolioTitle,
      description: portfolioDescription
    });
    setPortfolios(data);
    setAddState(false);
  };
  const delEvent = (index) =>{
    let data = [...portfolios];
    data.splice(index,1);
    setPortfolios(data);
  };
  const titleChange = (e) => {
    setPortfolioTitle(e.target.value);
  };
  const descriptionChange = (e) => {
    setPortfolioDescription(e.target.value);
  };
  const addStateChange = () => {
    setAddState(true);
  };
  const cancelState = () =>{
    setAddState(false);
  };
  const onChangeExpert = (e) => {
    setValueExpert(e);
  };
  const onChangeAvail = (e) =>{
    setValueAvail(e.target.value);
  };
  const onChangeHBB = (e) =>{
    setValueHBB(e.target.value);
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
                <a style={{ display: 'inline-block' }} className="p-3">Creator Profile</a>
              </Link>
              <Link href="/desk/profile/expert-profile">
                <a style={{ display: 'inline-block' }} className="p-3 active-profile">Expert</a>
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
                <p className="fs-2 fw-6 mt-2 mb-4">Write your expert bio.</p>
                <p className="fs-1 mb-4">A good expert bio should give details on your experience, examples of post jobs, what you customers like in you, you, story. More you give, more you get a change to get hired.</p>
                <p className="fs-1 mb-4">Choose categories where you can bring your expertise.</p>
                <Checkbox.Group style={{ width: '100%' }} onChange={onChangeExpert} value={valueExpert}>
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
                    {/* <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="crowd-funding">
                        <img src="/images/expertise/crowd-funding.png" />
                        Crowd-funding
                      </Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="purchasing">
                        <img src="/images/expertise/purchasing.png" />
                        Purchasing
                      </Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="logistic">
                        <img src="/images/expertise/logistic.png" />
                        Logistic
                      </Checkbox>
                    </Col>
                    <Col lg={6} sm={12} xs={12}>
                      <Checkbox value="fundraising">
                        <img src="/images/expertise/fundraising.png" />
                        Fundraising
                      </Checkbox>
                    </Col> */}
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
                <p className="fs-2 fw-6 mt-5 mb-3">
                  Choose skills that match your expertise.
                </p>
                <label>
                  Design
                </label>
                <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                  <Select mode="tags" bordered={false} style={{ width: '100%' }}>
                    {
                      design.map((item, index) => {
                        return <Option key={index}>{item}</Option>;
                      })
                    }
                  </Select>
                </Row>
                <label>
                  Manufacturing
                </label>
                <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                  <Select mode="tags" bordered={false} style={{ width: '100%' }}>
                    {
                      manufacturing.map((item, index) => {
                        return <Option key={index}>{item}</Option>;
                      })
                    }
                  </Select>
                </Row>
                <p className="fs-2 fw-6 mt-5 mb-3">
                  Choose the rate per hour your are ready to work for:
                </p>
                <Row style={{ marginBottom: '24px' }}>
                  $<Input bordered={false} style={{ width: '50px', paddingTop: '0', borderBottom: '1px solid black' }} /> / Hour
                </Row>
                <p className="mt-5 py-3">Choose your time availability:</p>
                <Radio.Group onChange={onChangeAvail} value={valueAvail}>
                  <Radio value="full">Full Time</Radio>
                  <Radio value="part">Part time hours</Radio>
                </Radio.Group>
                <p className="mt-5 py-3">Will you consider to put your expertise to earn HBB for you and your community.</p>
                <Row>
                  <Radio.Group onChange={onChangeHBB} value={valueHBB}>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                  <div>
                    Hours per week:<Input bordered={false} style={{ width: '50px', paddingTop: '0', borderBottom: '1px solid black' }} /> / Week
                  </div>
                </Row>
                <Row className="py-5">
                  {
                    portfolios.map((item, index) => {
                      return <div key={index} className="text-center px-2">
                        <div className="portfolio-image">
                          <button onClick={()=>{delEvent(index);}} className="del">x</button>
                          {
                            item.image?
                              <img width="100%" height="100%" src={item.image} />
                              : <p className="text-center pt-5">No Image</p>
                          }
                        </div>
                        <p className="pt-2">{item.title}</p>
                      </div>;
                    })
                  }
                  <div className="text-center px-2">
                    <button className="add-portfolio" onClick={addStateChange}>
                      <PlusOutlined />
                    </button>
                  </div>
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
                          <input
                            type="text"
                            className="profile-input p-2 mt-1"
                            style={{ borderBottom: '1px solid black', marginBottom: '24px' }}
                            onChange={titleChange}
                          />
                        </Col>
                      </Row>
                      <Row className="mt-4 px-5">
                        <Col span={24}>
                          <label>Description</label>
                          <TextArea
                            className="profile-input mt-3 p-2"
                            style={{ borderBottom: '1px solid black', marginBottom: '24px' }}
                            onChange={descriptionChange}
                          />
                        </Col>
                      </Row>
                      <Row className="fjc-center">
                        <Button type="hbs-outline-danger" size="large" shape="round" onClick={cancelState}>Cancel</Button>
                        <Button type="hbs-primary" size="large" shape="round" className="ml-3" onClick={addEvent}>Add</Button>
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
export default ExpertProfile;