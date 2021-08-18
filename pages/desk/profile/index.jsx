import React from 'react';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
import { withSession } from '../../../utils/withSession';
import { API, creatorBio, primaryColor } from '../../../constants/index';
import useSWR from 'swr';
import { fetchJson } from '../../../utils';
import { jwtDecode } from '../../../utils/jwt';
import { fetcher } from '../../../utils/fetcher';
import { MainProfile, ProfileNavbar, CountrySelect, UploadImage } from '../../../components';
import { Container } from '../../../components/Container';
import { DatePicker, Select, Row, Form, Input, Col, Button } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const Profile = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [form] = Form.useForm();
  const [pastJobForm] = Form.useForm();
  const [educationForm] = Form.useForm();
  const [birthday, setBirthday] = React.useState('');
  const [techCategory, setTechCategory] = React.useState([]);
  const [generalProfile, setGeneralProfile] = React.useState({});
  const [productCategory, setProductCategory] = React.useState([]);
  const [innovationCategory, setInnovationCategory] = React.useState([]);
  const [pastJobState, setPastJobState] = React.useState(null);
  const [pastJobSelect, setPastJobSelect] = React.useState(null);
  const [educationState, setEducationState] = React.useState(null);
  const [educationSelect, setEducationSelect] = React.useState(null);
  React.useEffect(() => {
    fetchJson(`${API.GET_PRODUCT_CATTEGORY_API}`).then((response) => {
      setProductCategory(response.data);
    });
    fetchJson(`${API.GET_INNOVATION_CATTEGORY_API}`).then((response) => {
      setInnovationCategory(response.data);
    });
    fetchJson(`${API.GET_TECH_CATTEGORY_API}`).then((response) => {
      setTechCategory(response.data);
    });
    fetchJson(`${API.GET_GENERAL_PROFILE_API}/${data.id}`).then((response) => {
      setGeneralProfile(response.data);
    });
  }, []);
  React.useEffect(() => {
    let bio = generalProfile?.detail?.bio ? generalProfile?.detail?.bio : creatorBio;
    let productCategoryList = [];
    if (generalProfile?.productCategory && generalProfile?.productCategory.length) {
      productCategoryList = generalProfile?.productCategory.map((i) => {
        return i.productCategoryId;
      });
    }
    let innovationCategoryList = [];
    if (generalProfile?.innovationCategory && generalProfile?.innovationCategory.length) {
      innovationCategoryList = generalProfile?.innovationCategory.map((i) => {
        return i.innovationCategoryId;
      });
    }
    let techCategoryList = [];
    if (generalProfile?.techCategory && generalProfile?.techCategory.length) {
      techCategoryList = generalProfile?.techCategory.map((i) => {
        return i.techCategoryId;
      });
    }
    setBirthday(generalProfile?.detail?.birthday ? moment(generalProfile?.detail?.birthday) : '');
    form.setFieldsValue({
      ...generalProfile,
      detail: {
        ...generalProfile?.detail,
        bio: bio,
        birthday: generalProfile?.detail?.birthday ? moment(generalProfile?.detail?.birthday) : ''
      },
      productCategory: productCategoryList,
      innovationCategory: innovationCategoryList,
      techCategory: techCategoryList,
    });
  }, [generalProfile, form]);
  const onSubmit = (values) => {
    const v = { ...values, ...values.detail, birthday, education: generalProfile?.detail.education, pastJob: generalProfile?.pastJob };
    delete v.detail;
    fetchJson(`${API.UPDATE_GENERAL_PROFILE_API}/${data.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(v),
    });
  };
  const onChangeMainForm = () => {
    form.submit();
  };
  const onChangeBirthDay = (m, d) => {
    setBirthday(d);
    form.submit();
  };
  const editPastJob = (index) => {
    let data = { ...generalProfile?.pastJob };
    pastJobForm.setFieldsValue({ ...data[index], startDate: moment(data[index].from), endDate: moment(data[index].to) });
    setPastJobState('edit');
    setPastJobSelect(index);
  };
  const deletePastJob = (index) => {
    let data = { ...generalProfile };
    if (data.pastJob[index].id) {
      data.pastJob[index].removed = true;
    }
    else {
      data.pastJob.splice(index, 1);
    }
    setGeneralProfile(data);
    form.submit();
  };
  const onSubmitPastJob = (values) => {
    let data = { ...generalProfile };
    if (pastJobState === 'add') {
      data.pastJob.push({ ...values });
    }
    else {
      data.pastJob[pastJobSelect] = { ...values };
    }
    setGeneralProfile(data);
    pastJobForm.resetFields();
    form.submit();
  };
  const editEducation = (index) => {
    let data = { ...generalProfile?.detail.education };
    educationForm.setFieldsValue({ ...data[index] });
    setEducationState('edit');
    setEducationSelect(index);
  };
  const deleteEducation = (index) => {
    let data = { ...generalProfile };
    data.detail.education.splice(index, 1);
    setGeneralProfile(data);
    form.submit();
  };
  const onSubmitEducation = (values) => {
    let data = { ...generalProfile };
    if (educationState === 'add') {
      data.detail.education.push({ ...values });
    }
    else {
      data.detail.education[educationSelect] = { ...values };
    }
    setGeneralProfile(data);
    educationForm.resetFields();
    form.submit();
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
                <p className="fs-1 pb-3">
                  Let&apos;s the community know a little more about you.
                  <br />
                  Let&apos;s start with your profile picture. Click on the picture above and upload your best shot of you.
                </p>
                <Form
                  hideRequiredMark
                  form={form}
                  onFinish={onSubmit}
                >
                  <Row>
                    <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <Form.Item
                        name="lastname"
                        label="My surname is"
                        className="mb-0"
                        style={{ width: '100%' }}
                      >
                        <Input bordered={false} placeholder="Please enter the surname." onBlur={onChangeMainForm} />
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <Form.Item
                        name="firstname"
                        label="and my name is"
                        className="mb-0"
                        style={{ width: '100%' }}
                      >
                        <Input bordered={false} placeholder="Please enter the name." onBlur={onChangeMainForm} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <Form.Item
                        name={['detail', 'nationality']}
                        label="I am from"
                        className="mb-0"
                        style={{ width: '100%' }}
                      >
                        <Input bordered={false} placeholder="Please enter the nationality." onBlur={onChangeMainForm} />
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <Form.Item
                        name={['detail', 'location', 'city']}
                        label="and live in"
                        className="mb-0"
                        style={{ width: '100%' }}
                      >
                        <Input bordered={false} placeholder="Please enter the city." onBlur={onChangeMainForm} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                    <Col sm={24} xs={24} className="d-flex py-2 f-align-center">
                      <Form.Item
                        name={['detail', 'location', 'country']}
                        label="From this beautiful country"
                        className="mb-0"
                        style={{ width: '100%' }}
                      >
                        <CountrySelect idValue={false} bordered={false} onChange={onChangeMainForm} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <Form.Item
                        name={['detail', 'gender']}
                        label="I am a"
                        className="mb-0"
                        style={{ width: '100%' }}
                      >
                        <Select bordered={false} onChange={onChangeMainForm}>
                          <Option value="man">Man</Option>
                          <Option value="woman">Woman</Option>
                          <Option value="both">Both</Option>
                          <Option value="guess">Guess</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <Form.Item
                        name={['detail', 'birthday']}
                        label="and I am born on"
                        className="mb-0"
                        style={{ width: '100%' }}
                      >
                        <DatePicker bordered={false} style={{ width: '100%' }} onChange={onChangeBirthDay} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <p className="fs-1 py-3">
                    And as you know, Hubbers community is all about product creation, contributting to projects with your experience and resources. Share a bit about your passion.
                  </p>
                  <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                    <Col sm={24} xs={24} className="d-flex py-2 f-align-center">
                      <Form.Item
                        name="productCategory"
                        label="Product categories I am fond it:"
                        className="mb-0"
                        style={{ width: '100%' }}
                      >
                        <Select mode="multiple" bordered={false} onChange={onChangeMainForm}>
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
                        <Select mode="multiple" bordered={false} onChange={onChangeMainForm}>
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
                        <Select mode="multiple" bordered={false} onChange={onChangeMainForm}>
                          {
                            techCategory?.map((item, index) => {
                              return <Option key={index} value={item.id}>{item.name}</Option>;
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* <label>
                      Hubbers member will be interested to hear about what you are doing now:
                    </label> */}
                  {/* <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                      <Select bordered={false} style={{ width: '100%' }}>
                        <Option value="web">Web Development</Option>
                        <Option value="mobile">Mobile Development</Option>
                      </Select>
                    </Row> */}
                  <p className="fs-1 py-3 mt-4">
                    As you are being creative, leave a message to the community or we will pick on for you:
                  </p>
                  <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                    <Col sm={24} xs={24} className="d-flex py-2 f-align-center">
                      <Form.Item
                        name={['detail', 'bio']}
                        className="mb-0"
                        style={{ width: '100%' }}
                      >
                        <TextArea rows={3} bordered={false} onBlur={onChangeMainForm} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                {/* <p className="fs-1 fw-6 mb-0">Now let´s go for a bitt of social media, sharing is caring.</p>
                  <p>Share your Id or Link your account</p>
                  <Space size={24} className="py-4">
                    <img width="42" height="42" src="/images/social/linkedin.png" />
                    <img width="42" height="42" src="/images/social/facebook.png" />
                    <img width="42" height="42" src="/images/social/instagram.png" />
                    <img width="42" height="42" src="/images/social/twitter.png" />
                  </Space> */}
                {/* <p>If you want your coomunity to know all about you, feel free to share your past jobs and education.<br />(best for experts as employers like to know more about you)</p> */}
                <div className="mt-5">
                  <p className="fs-2 fw-6">Your Past Jobs</p>
                  <Row>
                    {
                      generalProfile?.pastJob?.map((item, index) => {
                        if (!item.removed) {
                          return (
                            <div
                              key={index}
                              className="general-portfolio-item mr-3 mb-3"
                              onClick={() => { editPastJob(index); }}
                            >
                              <div
                                className="portfolio-image"
                                style={{ backgroundImage: `url(${item.logo})` }}
                              >
                                <div className='general-portfolio-item-actions'>
                                  <Button type="text" danger icon={<DeleteOutlined />} onClick={() => { deletePastJob(index); }} />
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
                      onClick={() => { setPastJobState('add'); pastJobForm.resetFields(); }}
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
                        <p className="fw-6 fs-1 mb-0">Add Past Job</p>
                      </div>
                    </div>
                  </Row>
                  {
                    pastJobState != null ? (
                      <Form
                        hideRequiredMark
                        form={pastJobForm}
                        onFinish={onSubmitPastJob}
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
                              <Col span={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                                <Form.Item
                                  name="title"
                                  label="Job title"
                                  className="mb-1"
                                  style={{ width: '100%' }}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Title is required',
                                    },
                                  ]}
                                >
                                  <Input bordered={false} placeholder="Please enter the Job Title." />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                                <Form.Item
                                  name="startDate"
                                  label="From"
                                  className="mb-1"
                                  style={{ width: '100%' }}
                                >
                                  <DatePicker bordered={false} style={{ width: '100%' }} />
                                </Form.Item>
                              </Col>
                              <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                                <Form.Item
                                  name="endDate"
                                  label="to"
                                  className="mb-1"
                                  style={{ width: '100%' }}
                                >
                                  <DatePicker bordered={false} style={{ width: '100%' }} />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                              <Col sm={24} xs={24} className="d-flex py-2 f-align-center">
                                <Form.Item
                                  name="location"
                                  label="Location"
                                  className="mb-1"
                                  style={{ width: '100%' }}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Country is required',
                                    },
                                  ]}
                                >
                                  <CountrySelect idValue={false} bordered={false} />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                                <Form.Item
                                  name="state"
                                  label="State"
                                  className="mb-1"
                                  style={{ width: '100%' }}
                                >
                                  <Input bordered={false} placeholder="Please enter the state" />
                                </Form.Item>
                              </Col>
                              <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                                <Form.Item
                                  name="city"
                                  label="City"
                                  className="mb-1"
                                  style={{ width: '100%' }}
                                >
                                  <Input bordered={false} placeholder="Please enter the year" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                                <Form.Item
                                  name="companyName"
                                  label="Company"
                                  className="mb-1"
                                  style={{ width: '100%' }}
                                >
                                  <Input bordered={false} placeholder="Please enter the Company Name" />
                                </Form.Item>
                              </Col>
                              <Col sm={12} xs={24} className="d-flex py-2 f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                                <Form.Item
                                  name="companySize"
                                  label="Company Size"
                                  className="mb-1"
                                  style={{ width: '100%' }}
                                >
                                  <Input type="number" bordered={false} placeholder="Please enter the Company Size" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={24} className="text-right">
                                <Button onClick={() => { setPastJobState(null); }} danger className="mr-3" shape="round">Cancel</Button>
                                <Button htmlType="submit" type="hbs-primary" shape="round">{pastJobState === 'add' ? 'Add' : 'Edit'}</Button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Form>
                    ) : null
                  }
                </div>
                <div className="mt-5">
                  <p className="fs-2 fw-6">Your Education</p>
                  <Row>
                    {
                      generalProfile?.detail?.education?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="general-portfolio-item mr-3 mb-3"
                            onClick={() => { editEducation(index); }}
                          >
                            <div
                              className="portfolio-image"
                              style={{ backgroundImage: `url(${item.logo})` }}
                            >
                              <div className='general-portfolio-item-actions'>
                                <Button type="text" danger icon={<DeleteOutlined />} onClick={() => { deleteEducation(index); }} />
                              </div>
                            </div>
                            <div className="portfolio-title">
                              <p className="fw-6 fs-1 mb-0 pt-3 text-center">{item.title}</p>
                            </div>
                          </div>
                        );
                      })
                    }
                    <div
                      onClick={() => { setEducationState('add'); educationForm.resetFields(); }}
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
                          <Col lg={6} xs={24}>
                            <Form.Item
                              name="logo"
                            >
                              <UploadImage />
                            </Form.Item>
                          </Col>
                          <Col lg={18} xs={24}>
                            <Row>
                              <Col sm={12} xs={24} className="d-flex f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                                <Form.Item
                                  name="country"
                                  label="Country"
                                  className="mb-1"
                                  style={{ width: '100%' }}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Country is required',
                                    },
                                  ]}
                                >
                                  <CountrySelect idValue={false} bordered={false} placeholder="Please choose a country" />
                                </Form.Item>
                              </Col>
                              <Col sm={12} xs={24} className="d-flex f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                                <Form.Item
                                  name="university"
                                  label="College/University"
                                  className="mb-1"
                                  style={{ width: '100%' }}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'University is required',
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
                                  name="title"
                                  label="Title"
                                  className="mb-1"
                                  style={{ width: '100%' }}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Title is required',
                                    },
                                  ]}
                                >
                                  <Input bordered={false} placeholder="Please enter the title" />
                                </Form.Item>
                              </Col>
                              <Col sm={12} xs={24} className="d-flex f-align-center" style={{ borderBottom: '1px solid black', marginBottom: '24px' }}>
                                <Form.Item
                                  name="degree"
                                  label="Degree"
                                  className="mb-1"
                                  style={{ width: '100%' }}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Degree is required',
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
                                  <Input type="number" bordered={false} placeholder="Please enter the year" />
                                </Form.Item>
                              </Col>
                              <Col sm={12} xs={24} className="text-right mt-2">
                                <Button onClick={() => { setEducationState(null); }} danger className="mr-3" shape="round">Cancel</Button>
                                <Button htmlType="submit" type="hbs-primary" shape="round">{educationState === 'add' ? 'Add' : 'Edit'}</Button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Form>
                    ) : null
                  }
                </div>
                <p className="mt-4">Great Job! We are done with the intro. Time to involve as a <Link href="/desk/profile/creator-profile"><a className="primary-link">creator</a></Link>, <Link href="/desk/profile/expert-profile"><a className="primary-link">expert</a></Link>, or <Link href="/desk/profile/investor-profile"><a className="primary-link">investor</a></Link> in products. Fill in the role you want to play to be considered.</p>
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
export default Profile;