import React from 'react';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
import { withSession } from '../../../utils/withSession';
import { API, primaryColor } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { MainProfile, ProfileNavbar } from '../../../components';
import { Container } from '../../../components/Container';
import { DatePicker, Select, Space, Row, Form, Input, Col, Avatar, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

const Profile = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const product = ['Furniture', 'Clothing and apparel'];
  const innovation = ['Innovation1', 'Innovation2', 'Innovation3'];
  const tech = ['Tech1', 'Tech2', 'Tech3'];
  const [educationState, setEducationState] = React.useState(null);
  const [educationSelect, setEducationSelect] = React.useState(null);
  const [education, setEducation] = React.useState([{
    logo: '/images/accelerator_image.png',
    country: 'ru',
    university: 'university',
    title: 'title',
    degree: 'degree',
    year: 'year'
  }]);
  const [educationForm] = Form.useForm();
  const addEducation = () => {
    setEducationState('add');
    educationForm.resetFields();
  };
  const editEducation = (id) => {
    setEducationState('edit');
    setEducationSelect(id);
    let filterData = education.filter((item) => item.id === id);
    educationForm.setFieldsValue({
      country: filterData[0].country,
      university: filterData[0].university,
      title: filterData[0].title,
      degree: filterData[0].degree,
      year: filterData[0].year,
    });
  };
  const onSubmitEducation = (values) => {
    let newData = [...education];
    if (educationState === 'add') {
      newData.push({ ...values, id: null });
    }
    else {
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].id === educationSelect) {
          newData[i] = { ...values, id: educationSelect };
          return;
        }
      }
    }
    setEducation([...newData]);
    setEducationState(null);
  };
  return (
    <DeskPageHoc title='Profile' activeSide={{ active: ['profile'], open: [] }} auth={{ ...data }}>
      <React.Fragment>
        <MainProfile />
        <Container className="mt-4">
          <React.Fragment>
            <ProfileNavbar />
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
                    {
                      education?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="general-portfolio-item mr-3 mb-3"
                            style={{ backgroundImage: `url(${item.logo})` }}
                          >
                            <div className="portfolio-mask px-3">
                              <div>
                                <p className="fw-6 fs-1 fc-white">{item.title}</p>
                              </div>
                              <div>
                                <Button className="mr-2" type="primary" icon={<EditOutlined />} onClick={() => editEducation(item.id)} />
                                <Button className="ml-2" danger icon={<DeleteOutlined />} />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    }
                    <div
                      onClick={addEducation}
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
                        <p className="fw-6 fs-1 mb-0">Add Education</p>
                      </div>
                    </div>
                  </Row>
                  {
                    educationState != null ? (
                      <Form
                        hideRequiredMark
                        form={educationForm}
                        onFinish={onSubmitEducation}
                      >
                        <Row className="mt-5">
                          <Col span={6}>

                          </Col>
                          <Col span={18}>
                            <Row>
                              <Col sm={12} xs={24} className="d-flex f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                                <Form.Item
                                  className="mb-2"
                                  name="country"
                                  label="Country"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please choose country',
                                    },
                                  ]}
                                >
                                  <Select bordered={false} placeholder="Please choose a country">
                                    <Option value="ch">China</Option>
                                    <Option value="in">India</Option>
                                    <Option value="ru">Russia</Option>
                                    <Option value="uk">Ukraine</Option>
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col sm={12} xs={24} className="d-flex f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                                <Form.Item
                                  className="mb-2"
                                  name="university"
                                  label="College/University"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter the college/university name',
                                    },
                                  ]}
                                >
                                  <Input bordered={false} placeholder="Please enter the college/university name." />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={12} xs={24} className="d-flex f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                                <Form.Item
                                  className="mb-2"
                                  name="title"
                                  label="Title"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter the title',
                                    },
                                  ]}
                                >
                                  <Input bordered={false} placeholder="Please enter the title" />
                                </Form.Item>
                              </Col>
                              <Col sm={12} xs={24} className="d-flex f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                                <Form.Item
                                  className="mb-2"
                                  name="degree"
                                  label="Degree"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter the degree',
                                    },
                                  ]}
                                >
                                  <Input bordered={false} placeholder="Please enter the degree" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={12} xs={24} className="d-flex f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                                <Form.Item
                                  className="mb-2"
                                  name="year"
                                  label="Year"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter the year',
                                    },
                                  ]}
                                >
                                  <Input bordered={false} placeholder="Please enter the year" />
                                </Form.Item>
                              </Col>
                              <Col sm={12} xs={24} className="text-right mt-2">
                                <Button onClick={() => setEducationState(null) } danger className="mr-3" shape="round">Cancel</Button>
                                {
                                  educationState === 'add' ? <Button htmlType="submit" type="hbs-primary" shape="round">Add</Button>
                                    : <Button htmlType="submit" type="hbs-primary" shape="round" onClick={() => updateEducation(item.id) }>Edit</Button>
                                }
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Form>
                    ) : null
                  }
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