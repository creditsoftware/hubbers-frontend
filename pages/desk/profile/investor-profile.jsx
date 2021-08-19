import React, { useState, useEffect } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
import { withSession } from '../../../utils/withSession';
import { API, primaryColor } from '../../../constants/index';
import { fetchJson } from '../../../utils';
import useSWR from 'swr';
import { jwtDecode } from '../../../utils/jwt';
import { fetcher } from '../../../utils/fetcher';
import { MainProfile, ProfileNavbar } from '../../../components/profile';
import { Container } from '../../../components/Container';
import { CountrySelect, UploadImage } from '../../../components';
import { Form, Input, Select, Radio, Slider, InputNumber, Row, Col, Button } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const InvestorProfile = ({ ...props }) => {

  const [form] = Form.useForm();
  const [portfolioForm] = Form.useForm();

  const [techCategory, setTechCategory] = React.useState([]);
  const [productCategory, setProductCategory] = React.useState([]);
  const [innovationCategory, setInnovationCategory] = React.useState([]);
  const [investorProfileData, setInvestorProfileData] = useState(null);
  const [portfolioState, setPortfolioState] = React.useState(null);
  const [portfolioSelect, setPortfolioSelect] = useState(null);

  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });

  useEffect(() => {
    fetchJson(`${API.GET_PRODUCT_CATTEGORY_API}`).then((response) => {
      setProductCategory(response.data);
    });
    fetchJson(`${API.GET_INNOVATION_CATTEGORY_API}`).then((response) => {
      setInnovationCategory(response.data);
    });
    fetchJson(`${API.GET_TECH_CATTEGORY_API}`).then((response) => {
      setTechCategory(response.data);
    });
    fetchJson(`${API.GET_INVESTOR_PROFILE_API}/${data.id}`).then((response) => {
      setInvestorProfileData(response.data);
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      ...investorProfileData,
      considerNum: investorProfileData?.consider,
      productCategory: investorProfileData?.productCategory?.map((item) => item.productCategoryId),
      innovationCategory: investorProfileData?.innovationCategory?.map((item) => item.innovationCategoryId),
      techCategory: investorProfileData?.techCategory?.map((item) => item.techCategoryId)
    });
  }, [investorProfileData]);

  const onFormChange = () => {
    form.submit();
  };

  const onSubmit = (values) => {
    fetchJson(`${API.UPDATE_INVESTOR_PROFILE_API}/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then(() => {
      fetchJson(`${API.GET_INVESTOR_PROFILE_API}/${data.id}`).then((response) => {
        setInvestorProfileData(response.data);
      });
    });
  };

  const editPortfolio = (index) => {
    let data = { ...investorProfileData?.investorPortfolios };
    portfolioForm.setFieldsValue({ ...data[index] });
    setPortfolioState('edit');
    setPortfolioSelect(index);
  };

  const deletePortfolio = (index) => {
    let data = { ...investorProfileData };
    if (data.investorPortfolios[index].id) {
      data.investorPortfolios[index].removed = true;
    }
    else {
      data.investorPortfolios.splice(index, 1);
    }
    setInvestorProfileData(data);
    onUpdateInvestorPortfolio();
  };

  const onSubmitPortfolio = (values) => {
    let data = { ...investorProfileData };
    if (portfolioState === 'add') {
      data.investorPortfolios.push({ ...values });
    }
    else {
      data.investorPortfolios[portfolioSelect] = { ...data.investorPortfolios[portfolioSelect], ...values };
    }
    setInvestorProfileData(data);
    onUpdateInvestorPortfolio();
  };

  const onUpdateInvestorPortfolio = () => {
    setPortfolioState(null);
    fetchJson(`${API.UPDATE_INVESTOR_PORTFOLIO_API}/${data.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: investorProfileData.investorPortfolios }),
    }).then(() => {
      fetchJson(`${API.GET_INVESTOR_PROFILE_API}/${data.id}`).then((response) => {
        setInvestorProfileData(response.data);
        setPortfolioState(null);
      });
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
                  <p className="fs-1 mt-2 mb-4">Hubbers community crowd funds great promising inventions, innovations and products, Would you consider contributing financially to a project that matches your interest?</p>
                  <Form.Item name="contribut">
                    <Radio.Group>
                      <Radio value={false}>No</Radio>
                      <Radio value={true}>Yes (will enable you to receive regular offers based on your preference.)</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <p className="fs-1 mt-5 mb-3">
                    What categories of products, innovation and tech would you favor contributing to?
                  </p>
                  <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                    <Col sm={24} xs={24} className="d-flex py-2 f-align-center">
                      <Form.Item
                        name="productCategory"
                        label="Product categories I am fond it:"
                        className="mb-0"
                        style={{ width: '100%' }}
                      >
                        <Select mode="multiple" bordered={false} onChange={onFormChange}>
                          {
                            productCategory?.map((item, index) => {
                              return <Option key={index} value={item.id}>{item.name}</Option>;
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                    <Col sm={24} xs={24} className="d-flex py-2 f-align-center">
                      <Form.Item
                        name="innovationCategory"
                        label="Type of innovation that I like:"
                        className="mb-0"
                        style={{ width: '100%' }}
                      >
                        <Select mode="multiple" bordered={false} onChange={onFormChange}>
                          {
                            innovationCategory?.map((item, index) => {
                              return <Option key={index} value={item.id}>{item.name}</Option>;
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                    <Col sm={24} xs={24} className="d-flex py-2 f-align-center">
                      <Form.Item
                        name="techCategory"
                        label="Tech I follow:"
                        className="mb-0"
                        style={{ width: '100%' }}
                      >
                        <Select mode="multiple" bordered={false} onChange={onFormChange}>
                          {
                            techCategory?.map((item, index) => {
                              return <Option key={index} value={item.id}>{item.name}</Option>;
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <p className="fw-6 fs-2 my-4">
                    Up to which amount would you consider to invest on project that match your interest?
                  </p>
                  <Row>
                    <Col span={12}>
                      <Form.Item name="considerNum">
                        <Slider
                          min={50}
                          max={20000}
                          onChange={(value)=>{
                            form.setFieldsValue({ consider: value});
                            onFormChange();
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} className="d-flex pl-3">
                      <Form.Item
                        name="consider"
                        label="More?"
                      >
                        <InputNumber
                          min={50}
                          max={2000}
                        />
                      </Form.Item>
                      <label className="pt-2 pl-2">USD</label>
                    </Col>
                  </Row>
                  <p className="fs-1 mt-5 mb-3">
                    Would you have any geographical preference
                  </p>
                  <Row>
                    <Form.Item name="allGeographical">
                      <Radio.Group>
                        <Radio value={true}>All</Radio>
                        <Radio value={false}>My Country</Radio>
                      </Radio.Group>
                    </Form.Item>
                    {
                      !investorProfileData?.allGeographical &&
                      <Form.Item name="country">
                        <CountrySelect bordered={false} style={{ width: '200px', borderBottom: '1px solid grey' }} onChange={onFormChange} />
                      </Form.Item>
                    }
                  </Row>
                  <p className="fs-1 mt-5 mb-3">
                    Have you ever invested in promising project in the past [outside Hubbers community?
                  </p>
                  <Form.Item name="invested">
                    <Radio.Group>
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Form>
                {
                  investorProfileData?.invested &&
                  <React.Fragment>
                    <Row className="py-5">
                      {
                        investorProfileData?.investorPortfolios?.map((item, index) => {
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
                                rules={[
                                  {
                                    required: true,
                                    message: 'The image is required',
                                  },
                                ]}
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
                                <Col span={24} className="d-flex py-2 f-align-center">
                                  <Form.Item
                                    name="year"
                                    label="Year"
                                    className="mb-1"
                                    style={{ width: '100%' }}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Year is required',
                                      },
                                    ]}
                                  >
                                    <InputNumber min={1900} max={2100} bordered={false} placeholder="Please enter the portfolio year." style={{ with: '100%', borderBottom: '1px solid black' }} />
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
                  </React.Fragment>
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
export default InvestorProfile;