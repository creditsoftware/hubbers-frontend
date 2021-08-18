import useSWR from 'swr';
import React, { useState, useEffect } from 'react';
import { Form, Select, Radio, Input, Checkbox, Row, Col, Image, Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchJson } from '../../../utils';
import { jwtDecode } from '../../../utils/jwt';
import { withSession } from '../../../utils/withSession';
import { fetcher } from '../../../utils/fetcher';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
import { API, primaryColor } from '../../../constants/index';
import { Container } from '../../../components/Container';
import { UploadImage } from '../../../components';
import { MainProfile, ProfileNavbar } from '../../../components/profile';
import { ExpertProfileSkillSelect } from '../../../components/profile/ExpertProfileSkillSelect';

const { Option } = Select;
const { TextArea } = Input;

const CreatorProfile = ({ ...props }) => {

  const [form] = Form.useForm();
  const [portfolioForm] = Form.useForm();

  const [expertiseCategoryList, setExpertiseCategoryList] = useState([]);
  const [creatorProfileData, setCreatorProfileData] = useState(null);
  const [portfolioState, setPortfolioState] = React.useState(null);
  const [portfolioSelect, setPortfolioSelect] = useState(null);
  const [currentPortfolioCategoryArray, setCurrentPortfolioCategoryArray] = useState([]);

  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });

  useEffect(() => {
    fetchJson(`${API.GET_ALL_EXPERTISE_CATEGORY_API}`).then((response) => {
      setExpertiseCategoryList(response.data);
    });
    fetchJson(`${API.GET_CREATOR_PROFILE_API}/${data.id}`).then((response) => {
      setCreatorProfileData(response.data);
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      ...creatorProfileData,
      expertiseCategories: creatorProfileData?.expertiseCategories?.map((item) => item.id)
    });
  }, [creatorProfileData]);

  const onFormChange = () => {
    form.submit();
  };

  const onSubmit = (values) => {
    fetchJson(`${API.UPDATE_CREATOR_PROFILE_API}/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then((response) => {
      if (response.success) {
        fetchJson(`${API.GET_CREATOR_PROFILE_API}/${data.id}`).then((response) => {
          setCreatorProfileData(response.data);
        });
      }
    });
  };

  const portfolioCategoryChange = (value) => {
    setCurrentPortfolioCategoryArray(value);
  };

  const editPortfolio = (index) => {
    let data = { ...creatorProfileData?.creatorPortfolios };
    setCurrentPortfolioCategoryArray(data[index].expertiseCategory);
    portfolioForm.setFieldsValue({ ...data[index] });
    setPortfolioState('edit');
    setPortfolioSelect(index);
  };

  const deletePortfolio = (index) => {
    let data = { ...creatorProfileData };
    if (data.creatorPortfolios[index].id) {
      data.creatorPortfolios[index].removed = true;
    }
    else {
      data.creatorPortfolios.splice(index, 1);
    }
    setCreatorProfileData(data);
    onUpdateCreatorPortfolio();
  };

  const onSubmitPortfolio = (values) => {
    let data = { ...creatorProfileData };
    if (portfolioState === 'add') {
      data.creatorPortfolios.push({ ...values });
    }
    else {
      data.creatorPortfolios[portfolioSelect] = { ...data.creatorPortfolios[portfolioSelect], ...values };
    }
    setCreatorProfileData(data);
    setCurrentPortfolioCategoryArray([]);
    onUpdateCreatorPortfolio();
  };

  const onUpdateCreatorPortfolio = () => {
    setPortfolioState(null);
    fetchJson(`${API.UPDATE_CREATOR_PORTFOLIO_API}/${data.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: creatorProfileData.creatorPortfolios }),
    }).then((response) => {
      if (response.success) {
        fetchJson(`${API.GET_CREATOR_PROFILE_API}/${data.id}`).then((response) => {
          setCreatorProfileData(response.data);
        });
      }
    });
  };

  return (
    <DeskPageHoc title='Profile' activeSide={{ active: ['profile'], open: [] }} auth={{ ...data }} query={{ ...props.query }}>
      <React.Fragment>
        <MainProfile auth={data} />
        <Container className="mt-4">
          <React.Fragment>
            <ProfileNavbar auth={data} />
            <div className="bg-white p-5">
              <div className="max-w-50 m-auto">
                <Form
                  form={form}
                  onChange={onFormChange}
                  onFinish={onSubmit}
                >
                  <p className="fs-1 fw-6 mt-2 mb-0">Creating, innovating, inventing new products is what Hubbers community is about.</p>
                  <p className="fs-1 fw-6 mb-4">Let&apos;s see how Hubbers tools and community is going to help your product launch.</p>
                  <p className="fs-1 fw-6 mb-4">Are you thinking to launch or are you in the process of launching a new product?</p>
                  <Form.Item name="isLaunching">
                    <Radio.Group>
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                  {
                    creatorProfileData?.isLaunching &&
                    <Form.Item name="howLong" label="How long have you started?">
                      <Input type="number" suffix="months" bordered={false} className="mx-1 pl-1" style={{ width: '100px', borderBottom: '1px solid black', padding: '0' }} />
                    </Form.Item>
                  }
                  <p className="py-3">If you are about to launch, when do you see the launch of product?</p>
                  <Form.Item name="whenLaunch">
                    <Radio.Group>
                      <Radio value="now">Now</Radio>
                      <Radio value="in-1-3months">in 1~3 months</Radio>
                      <Radio value="after-6-months">after 6 months</Radio>
                      <Radio value="still-thinking">still thinking</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <p className="py-3">Do you have a co-founder/ team working with you?</p>
                  <Form.Item name="withTeam">
                    <Radio.Group>
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                  {
                    creatorProfileData?.withTeam &&
                    <Form.Item name="persons">
                      <Input type="number" prefix="We are&nbsp;" suffix="persons working on our great project." bordered={false} className="profile-input" style={{ width: '350px', borderBottom: '1px solid black', padding: '0', margin: '0 12px' }} />
                    </Form.Item>
                  }
                  <p className="mt-5">Which expertise are you looking outside of your team to accelerate your launch?</p>
                  <Form.Item name="expertiseCategories" className="fs-1">
                    <Checkbox.Group style={{ width: '100%' }}>
                      <Row className="profile-expertise">
                        {
                          expertiseCategoryList?.map((item) => {
                            return <Col key={item.id} lg={6} sm={12} xs={12}>
                              <Checkbox value={item.id}>
                                <Image preview={false} width={82} height={112} src={item.icon} />
                                <br />{item.name}
                              </Checkbox>
                            </Col>;
                          })
                        }
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                  <p className="mt-5 py-3">Let&apos;s talk about your creative past experiences? Have you ever built a product?</p>
                  <Form.Item name="experience">
                    <Radio.Group>
                      <Radio value="not-yet">Not yet</Radio>
                      <Radio value="yes-once">Yes once</Radio>
                      <Radio value="serial">I am a serial inventors/innovator/creators</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Form>
                <p className="mt-5 py-3">That is great. Share with Hubbers what you have created. Create your portfolio.</p>
                <Row className="py-5">
                  {
                    creatorProfileData?.creatorPortfolios?.map((item, index) => {
                      if (!item.removed) {
                        return (
                          <div
                            key={index}
                            className="general-portfolio-item mr-3 mb-3"
                            onClick={() => { editPortfolio(index); }}
                          >
                            <div
                              className="portfolio-image"
                              style={{ backgroundImage: `url(${item.logo})` }}
                            >
                              <div className='general-portfolio-item-actions'>
                                <Button type="text" danger icon={<DeleteOutlined />} onClick={() => { deletePortfolio(index); }} />
                              </div>
                            </div>
                            <div className="portfolio-title">
                              <p className="fw-6 fs-1 mb-0 pt-3 text-center">{item.title}</p>
                            </div>
                          </div>
                        );
                      }
                    })
                  }
                  <div
                    onClick={() => { setPortfolioState('add'); portfolioForm.resetFields(); }}
                    className="d-flex fd-vertical fjc-center f-align-center px-3"
                    style={{
                      cursor: 'pointer',
                      color: `${primaryColor}`,
                      width: '150px',
                      height: '180px',
                      borderRadius: '5px',
                      boxShadow: '2px 4px 8px rgb(0 0 0 / 20%)'
                    }}
                  >
                    <div>
                      <PlusOutlined className="fs-5 mb-2" />
                    </div>
                    <div>
                      <p className="fw-6 fs-1 mb-0">Add Portfolio</p>
                    </div>
                  </div>
                </Row>
                {
                  portfolioState != null ? (
                    <Form
                      hideRequiredMark
                      layout="vertical"
                      form={portfolioForm}
                      onFinish={onSubmitPortfolio}
                    >
                      <Row className="mt-5">
                        <Col lg={6} xs={24}>
                          <Form.Item
                            name="logo"
                          >
                            <UploadImage />
                          </Form.Item>
                        </Col>
                        <Col lg={18} xs={24}>
                          <Row>
                            <Col span={24} className="d-flex py-2 f-align-center">
                              <Form.Item
                                name="title"
                                label="Portfolio Title"
                                className="mb-1"
                                style={{ width: '100%' }}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Title is required',
                                  },
                                ]}
                              >
                                <Input bordered={false} placeholder="Please enter the Portfolio Title." style={{ borderBottom: '1px solid black' }} />
                              </Form.Item>
                            </Col>
                            <Col span={24} className="d-flex py-2 f-align-center">
                              <Form.Item
                                name="description"
                                label="Portfolio Description"
                                className="mb-1"
                                style={{ width: '100%' }}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Description is required',
                                  },
                                ]}
                              >
                                <TextArea bordered={false} placeholder="Please enter the Portfolio Description." style={{ borderBottom: '1px solid black' }} />
                              </Form.Item>
                            </Col>
                            <Col span={12} className="d-flex py-2 pr-2 f-align-center">
                              <Form.Item
                                name="expertiseCategory"
                                label="Expertise Category"
                                className="mb-1"
                                style={{ width: '100%' }}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Expertise category is required',
                                  },
                                ]}
                              >
                                <Select onChange={portfolioCategoryChange} mode="multiple" bordered={false} placeholder="Please select the expertise category." style={{ borderBottom: '1px solid black' }}>
                                  {
                                    expertiseCategoryList?.map((item) => {
                                      return <Option key={item.id} values={item.id}>{item.name}</Option>;
                                    })
                                  }
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={12} className="d-flex py-2 pl-2 f-align-center">
                              <Form.Item
                                name="skills"
                                label="Skills"
                                className="mb-1"
                                style={{ width: '100%' }}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Skill is required',
                                  },
                                ]}
                              >
                                <ExpertProfileSkillSelect isArray={true} expertiseCategoryId={currentPortfolioCategoryArray} bordered={false} placeholder="Please select the skill." style={{ borderBottom: '1px solid black' }} />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={24} className="text-right">
                          <Button onClick={() => { setPortfolioState(null); }} danger className="mr-3" shape="round">Cancel</Button>
                          <Button htmlType="submit" type="hbs-primary" shape="round">{portfolioState === 'add' ? 'Add' : 'Edit'}</Button>
                        </Col>
                      </Row>
                    </Form>
                  ) : null
                }
              </div>
            </div>
          </React.Fragment>
        </Container>
      </React.Fragment>
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
export default CreatorProfile;