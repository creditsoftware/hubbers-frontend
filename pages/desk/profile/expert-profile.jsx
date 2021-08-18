import React from 'react';
import { useState, useEffect } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Form, Input, Select, Radio, Checkbox, Row, Col, Image, Button } from 'antd';
import { API, creatorBio, primaryColor } from '../../../constants/index';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
import { withSession } from '../../../utils/withSession';
import { jwtDecode } from '../../../utils/jwt';
import { fetcher } from '../../../utils/fetcher';
import { fetchJson } from '../../../utils';
import useSWR from 'swr';
import { MainProfile, ProfileNavbar } from '../../../components/profile';
import { Container } from '../../../components/Container';
import { UploadImage } from '../../../components/UploadImage';
import { ExpertProfileSkillSelect } from '../../../components/profile/ExpertProfileSkillSelect';

const { Option } = Select;
const { TextArea } = Input;

const ExpertProfile = ({ ...props }) => {

  const [form] = Form.useForm();
  const [portfolioForm] = Form.useForm();

  const [expertiseCategoryList, setExpertiseCategoryList] = useState([]);
  const [expertProfileData, setExpertProfileData] = useState(null);
  const [portfolioSelect, setPortfolioSelect] = useState(null);
  const [currentPortfolioCategoryArray, setCurrentPortfolioCategoryArray] = useState([]);

  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });

  useEffect(() => {
    fetchJson(`${API.GET_ALL_EXPERTISE_CATEGORY_API}`).then((response) => {
      setExpertiseCategoryList(response.data);
    });
    fetchJson(`${API.GET_EXPERT_PROFILE_API}/${data.id}`).then((response) => {
      setExpertProfileData(response.data);
    });
  }, [data]);

  useEffect(() => {
    if(expertProfileData) {
      form.setFieldsValue({
        ...expertProfileData,
        expertiseCategories: expertProfileData?.expertiseCategories?.map((item) => item.id)
      });
    }
  }, [expertProfileData, form]);

  const [portfolioState, setPortfolioState] = React.useState(null);


  const onSampleBio = () => {
    form.setFieldsValue({ expertBio: creatorBio });
    form.submit();
  };

  const onFormChange = () => {
    form.submit();
  };

  const onSubmit = (values) => {
    fetchJson(`${API.UPDATE_EXPERT_PROFILE_API}/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...values}),
    }).then((response) => {
      if(response.success){
        fetchJson(`${API.GET_EXPERT_PROFILE_API}/${data.id}`).then((response) => {
          setExpertProfileData(response.data);
        });
      }
    });
  };

  const portfolioCategoryChange = (value) => {
    setCurrentPortfolioCategoryArray(value);
  };

  const editPortfolio = (index) => {
    let data = { ...expertProfileData?.expertPortfolios };
    setCurrentPortfolioCategoryArray(data[index].expertiseCategory);
    portfolioForm.setFieldsValue({ ...data[index] });
    setPortfolioState('edit');
    setPortfolioSelect(index);
  };

  const deletePortfolio = (index) => {
    let data = { ...expertProfileData };
    if (data.expertPortfolios[index].id) {
      data.expertPortfolios[index].removed = true;
    }
    else {
      data.expertPortfolios.splice(index, 1);
    }
    setExpertProfileData(data);
    onUpdateExpertPortfolio();
  };

  const onSubmitPortfolio = (values) => {
    let data = { ...expertProfileData };
    if (portfolioState === 'add') {
      data.expertPortfolios.push({ ...values });
    }
    else {
      data.expertPortfolios[portfolioSelect] = { ...data.expertPortfolios[portfolioSelect], ...values };
    }
    setExpertProfileData(data);
    setCurrentPortfolioCategoryArray([]);
    onUpdateExpertPortfolio();
  };

  const onUpdateExpertPortfolio = () => {
    setPortfolioState(null);
    fetchJson(`${API.UPDATE_EXPERT_PORTFOLIO_API}/${data.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({data: expertProfileData.expertPortfolios}),
    }).then((response) => {
      if(response.success){
        fetchJson(`${API.GET_EXPERT_PROFILE_API}/${data.id}`).then((response) => {
          setExpertProfileData(response.data);
        });
      }
    });
  };

  return (
    <DeskPageHoc title='Profile' activeSide={{ active: ['profile'], open: [] }} auth={{ ...data }} query={{...props.query}}>
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
                  <p className="fs-2 fw-6 mb-4">Write your expert bio.<Button onClick={onSampleBio} type="text" size="large" className="fc-primary">Click Here</Button></p>
                  <Form.Item name="expertBio" className="mt-2 mb-5">
                    <TextArea rows={4} className="fs-1" bordered={false} style={{ borderBottom: '1px solid grey' }} />
                  </Form.Item>
                  <p className="fs-2 fw-6 mb-4">Choose categories where you can bring your expertise.</p>
                  <Form.Item name="expertiseCategories" className="fs-1">
                    <Checkbox.Group style={{ width: '100%' }}>
                      <Row className="profile-expertise">
                        {
                          expertiseCategoryList?.map((item) => {
                            return <Col key={item.id} lg={6} sm={12} xs={12}>
                              <Checkbox value={item.id}>
                                <Image preview={false} width={82} height={112} src={item.icon} alt='' />
                                <br />{item.name}
                              </Checkbox>
                            </Col>;
                          })
                        }
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                  <p className="fs-2 fw-6 mt-5 mb-4">
                    Choose skills that match your expertise.
                  </p>
                  {
                    expertProfileData?.expertiseCategories?.map((item) => {
                      return <React.Fragment key={item.id}>
                        <label>{item.name}</label>
                        <Form.Item name={['skill', `${item.id}`]} style={{ marginBottom: '24px' }}>
                          <ExpertProfileSkillSelect onChange={onFormChange} isArray={false} expertiseCategoryId={item.id} />
                        </Form.Item>
                      </React.Fragment>;
                    })
                  }
                  <p className="fs-2 fw-6 mt-5 mb-3">
                    Choose the rate per hour your are ready to work for:
                  </p>
                  <Row style={{ marginBottom: '24px' }}>
                    <Form.Item name="hourlyRate" style={{ display: 'inline-block' }}>
                      <Input type="number" prefix="$&nbsp;" suffix="/ Hour" bordered={false} style={{ width: '126px', borderBottom: '1px solid grey' }} />
                    </Form.Item>
                  </Row>
                  <p className="py-3">Choose your time availability:</p>
                  <Form.Item name="timeAvailability">
                    <Radio.Group>
                      <Radio value="full-time">Full Time</Radio>
                      <Radio value="part-time">Part time hours</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <p className="mt-5 py-3">Will you consider to put your expertise to earn HBB for you and your community.</p>
                  <Row>
                    <Form.Item name="isEarnHbb">
                      <Radio.Group>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item name="hoursPerWeek">
                      <Input type="number" prefix="Hours per week:&nbsp;" suffix="/ Week" bordered={false} style={{ width: '224px', borderBottom: '1px solid grey' }} />
                    </Form.Item>
                  </Row>
                </Form>
                <Row className="py-5">
                  {
                    expertProfileData?.expertPortfolios?.map((item, index) => {
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
export default ExpertProfile;