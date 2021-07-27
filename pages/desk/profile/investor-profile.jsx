import React from 'react';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import useSWR from 'swr';
import { jwtDecode } from '../../../utils/jwt';
import { fetcher } from '../../../utils/fetcher';
import { MainProfile } from '../../../components/profile';
import { Container } from '../../../components/Container';
import { Input, Select, Radio, Slider, InputNumber, Row, Col, Button } from 'antd';
import { useState } from 'react';
const { Option } = Select;
const { TextArea } = Input;

const InvestorProfile = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [valueCategory, setValueCategory] = useState('product');
  const [valueConsider, setValueConsider] = useState(false);
  const [valueAmount, setValueAmount] = useState(50);
  const [valueCountry, setValueCountry] = useState('all');
  const [valueProject, setValueProject] = useState(true);
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
  const onChangeCategory = (e) =>{
    setValueCategory(e.target.value);
  };
  const onChangeConsider = (e) =>{
    setValueConsider(e.target.value);
  };
  const onChangeAmount = (e) =>{
    setValueAmount(e);
  };
  const onChangeCountry = (e) => {
    setValueCountry(e.target.value);
  };
  const onChangeProject = (e) => {
    setValueProject(e.target.value);
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
                <a style={{ display: 'inline-block' }} className="p-3 active-profile">Investor</a>
              </Link>
              <Link href="/desk/profile/hubbers-team">
                <a style={{ display: 'inline-block' }} className="p-3">Hubbers Team</a>
              </Link>
            </div>
            <div className="bg-white p-5">
              <div className="max-w-50 m-auto">
                <p className="fs-1 mt-2 mb-4">Hubbers community crowd funds great promising inventions, innovations and products, Would you consider contributing financially to a project that matches your interest?</p>
                <Radio.Group onChange={onChangeConsider} value={valueConsider}>
                  <Radio value={false}>No</Radio>
                  <Radio value={true}>Yes (will enable you to receive regular offers based on your preference.)</Radio>
                </Radio.Group>
                <p className="fs-1 mt-5 mb-3">
                  What categories of products, innovation and tech would you favor contributing to?
                </p>
                <Radio.Group onChange={onChangeCategory} value={valueCategory}>
                  <Radio value="product">Product</Radio>
                  <Radio value="innovation">Innovation</Radio>
                  <Radio value="tech">Tech</Radio>
                </Radio.Group>
                <p className="fw-6 fs-2 my-4">
                  Up to which amount would you consider to invest on project that match your interest?
                </p>
                <Row>
                  <Col span={12}>
                    <Slider
                      min={50}
                      max={2000}
                      onChange={onChangeAmount}
                      value={typeof valueAmount === 'number' ? valueAmount : 0}
                    />
                  </Col>
                  <Col span={12}>
                    &nbsp;&nbsp;&nbsp;More?
                    <InputNumber
                      min={50}
                      max={2000}
                      style={{ margin: '0 16px' }}
                      value={valueAmount}
                      onChange={onChangeAmount}
                    />
                    USD
                  </Col>
                </Row>
                <p className="fs-1 mt-5 mb-3">
                  Would you have any geographical preference
                </p>
                <Row>
                  <Radio.Group onChange={onChangeCountry} value={valueCountry}>
                    <Radio value="all">All</Radio>
                    <Radio value="mycountry">My Country</Radio>
                  </Radio.Group>
                  <Select bordered={false} style={{ width: '100px', borderBottom: '1px solid grey' }}>
                    <Option value="ch">China</Option>
                    <Option value="in">India</Option>
                    <Option value="ru">Russia</Option>
                    <Option value="uk">Ukraine</Option>
                  </Select>
                </Row>
                <p className="fs-1 mt-5 mb-3">
                  Have you ever invested in promising project in the past [outside Hubbers community?
                </p>
                <Radio.Group onChange={onChangeProject} value={valueProject}>
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
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
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: false } } };
  }
});
export default InvestorProfile;