import React, { useState } from 'react';
import { Row, Col, Input, Select, Button, Form, Radio, Alert } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Container } from '../../Container';
import { SettingDrawer } from '../global';
import { CourseManageItem } from './CourseManageItem';

const {Option} = Select;
const {TextArea} = Input;
const RadioGroup = Radio.Group;

export const CourseSettingDrawer = ({ ...props }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [showDrawer, setShowDrawer] = React.useState();
  const [paymentsType, setPaymentsType] = React.useState(null);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  const showSettings = () => {
    toggleVisible();
    props.onClick();
    setShowDrawer('Course Settings');
  };
  const changeDrawer = (status) => {
    setShowDrawer(status);
  };
  const changePaymentsType = (type) => {
    setPaymentsType(type);
  };
  const onPrev = () => {
    if (showDrawer === 'Course Settings') {
      toggleVisible();
    } else if (showDrawer === 'Course Plans') {
      setShowDrawer('Payments');
    } else if (showDrawer === 'Create New Plan' && paymentsType === null) {
      setShowDrawer('Course Plans');
    } else if (showDrawer === 'Create New Plan' && paymentsType) {
      setPaymentsType(null);
    } else if (showDrawer === 'New External Plan' || showDrawer === 'New External Bundle Plan' || showDrawer === 'New Internal Plan' || showDrawer === 'New Internal Bundle Plan') {
      setShowDrawer('Create New Plan');
    } else {
      setShowDrawer('Course Settings');
    }
  };
  const [benefisList, setBenefisList] = React.useState(['']);
  const handleBenefis = (index) => event => {
    let changeArr = [...benefisList];
    changeArr[index] = event.target.value;
    setBenefisList(changeArr);
  };
  const addBenefis = () => {
    setBenefisList([...benefisList, '']);
  };
  const removeBenefis = (index) => {
    let changeArr = [...benefisList];
    changeArr.splice(index, 1);
    setBenefisList(changeArr);
  };
  const [showRate, setShowRate] = React.useState(false);
  const handlePricyingType = (value) => {
    if(value==='subscription'){
      setShowRate(true);
    }
    else{
      setShowRate(false);
    }
  };
  const [showWeb, setShowWeb] = useState(true);
  const handlePlatforms = (value) => {
    if(value==='ios'){
      setShowWeb(false);
    }
    else{
      setShowWeb(true);
    }
  };
  const onFinish = () => {
    toggleVisible();
  };
  const radioStyle = {
    display: 'block'
  };
  return <React.Fragment>
    <Button type='text' onClick={showSettings}>Settings</Button>
    <SettingDrawer
      visible={visible}
      onHide={toggleVisible}
      title={showDrawer}
      onCoursePrev={onPrev}
      {...props}
    >
      <Container className="pt-4 d-flex fd-vertical f-align-center" style={{ padding: '92px' }}>
        {
          showDrawer === 'Course Settings' ? (
            <React.Fragment>
              <CourseManageItem text="General Settings" onClick={()=>{changeDrawer('General Settings');}} />
              <CourseManageItem text="Course Members" onClick={()=>{changeDrawer('Course Members');}} />
              <CourseManageItem text="Course Content" onClick={()=>{changeDrawer('Course Content');}} />
              <CourseManageItem text="Payments" onClick={()=>{changeDrawer('Payments');}} />
              <Button type="hbs-primary" shape="round" size="large" className="mt-2" onClick={toggleVisible}>Invite to Course</Button>
            </React.Fragment>
          ):showDrawer === 'Group Members' ? (
            <React.Fragment>
              <h1 className="fw-6 fs-3">Current Course Members</h1>
              <CourseManageItem text="See All Members" onClick={toggleVisible} />
              <CourseManageItem text="Welcome New Members" onClick={toggleVisible} />
              <CourseManageItem text="Message All Members" onClick={toggleVisible} />
              <CourseManageItem text="Download Member List" onClick={toggleVisible} />
              <h1 className="fw-6 fs-3 mt-5">Incoming Course Members</h1>
              <CourseManageItem text="Sent Invites" onClick={toggleVisible} />
              <Button type="hbs-primary" shape="round" size="large" className="mt-2" onClick={toggleVisible}>Invite</Button>
            </React.Fragment>
          ):showDrawer === 'Payments' ? (
            <React.Fragment>
              <CourseManageItem text="Course Plans" onClick={()=>{changeDrawer('Course Plans');}} />
              <CourseManageItem text="Past Due Members" onClick={toggleVisible} />
              <Button type="hbs-primary" shape="round" size="large" className="mt-2" onClick={()=>{changeDrawer('Create New Plan');}}>Change for Access</Button>
            </React.Fragment>
          ):showDrawer === 'Course Plans' ? (
            <React.Fragment>
              <div className="p-5 text-center" style={{ border: '1px solid grey' }}>
                <h1 className="fw-6 fs-3">Create Your First Plan</h1>
                <p className="fs-1">Once you&apos;ve created your first plan, it will appear here. To get started, take a quick tour that will show you everything you need to know about creating your first plan and charging members for access to your Mighty Network.</p>
                <Button type="hbs-primary" shape="round" size="large" className="mt-2" onClick={()=>{changeDrawer('Create New Plan');}}>Create Plan</Button>
              </div>
            </React.Fragment>
          ):showDrawer === 'Create New Plan' && paymentsType === null ? (
            <React.Fragment>
              <h1 className="fw-6 fs-3 mb-4">Choose your Target Audience</h1>
              <CourseManageItem onClick={()=>{changePaymentsType('external');}} text="External Audience (Non-Members)" description="Create plans to market and sell to people who are not yet members of KOMPROM. Network Membership will always be included with these plans." />
              <CourseManageItem onClick={()=>{changePaymentsType('internal');}} text="Internal Audience (Members)" description="Create plans to offer and sell to your members inside KOMPROM." />
              <Alert type='warning' message='Heads up! If you choose to create an External Plan, you will be switching your Mighty Network from Private to Paid. This means you are making it available to anyone who wants to purchase membership, and you’ll need to create plans to allow people to join.' />
            </React.Fragment>
          ):showDrawer === 'Create New Plan' && paymentsType === 'external' ? (
            <React.Fragment>
              <h1 className="fw-6 fs-3 mb-4">What do you want to sell?</h1>
              <CourseManageItem onClick={()=>{changeDrawer('New External Plan');}} text="Network Membership" description="Create a plan to sell membership to KOMPROM." />
              <CourseManageItem onClick={()=>{changeDrawer('New External Bundle Plan');}} text="A Bundle" description="Create a plan to sell membership to KOMPROM and access to any number of Groups and/or Courses for one price" />
            </React.Fragment>
          ):showDrawer === 'Create New Plan' && paymentsType === 'internal' ? (
            <React.Fragment>
              <h1 className="fw-6 fs-3 mb-4">What do you want to sell?</h1>
              <CourseManageItem onClick={()=>{changeDrawer('New Internal Plan');}} text="A Single Group or Course" description="Create a plan to sell access to one Group or Course." />
              <CourseManageItem onClick={()=>{changeDrawer('New Internal Bundle Plan');}} text="A Bundle" description="Create a plan to sell access to multiple Group and/or Course for one price" />
            </React.Fragment>
          ):showDrawer === 'New External Plan' || showDrawer === 'New External Bundle Plan' || showDrawer === 'New Internal Plan' || showDrawer === 'New Internal Bundle Plan' ? (
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <div className="text-left">
                <h1 className="fw-6 fs-3">Your Network</h1>
                <p className="fs-1 mb-5" style={{ color: 'grey' }}>KOMPROM has already been selected for this plan.</p>
                <h1 className="fw-6 fs-3">Payments</h1>
                <p className="fs-1 fw-6">Connect Stripe</p>
                <p className="fs-1" style={{ color: 'grey' }}>To make sure you get paid, we process all payments through Stripe, a secure third-party payment processor. Connect your existing Stripe account, or follow their instructions to create a new account with Stripe.</p>
                <Button type="hbs-primary" size="large" className="w-100 mb-5">Connect Stripe</Button>
                <p className="fw-6 fs-1 mt-4">Pricing Type</p>
                <p className="fs-1" style={{ color: 'grey' }}>Choose how you want to charge for this new plan.</p>
                <Form.Item
                  name='pricingType'
                  style={{ width: '300px' }}
                  className={showRate?'mb-2':'mb-5'}
                >
                  <Select onChange={handlePricyingType}>
                    <Option value="one-time">One Time Payment</Option>
                    <Option value="subscription">Subscription</Option>
                    <Option value="free">Free</Option>
                  </Select>
                </Form.Item>
                {
                  showRate ? (
                    <Form.Item
                      name='rateType'
                      style={{ width: '300px' }}
                      className="mb-5"
                    >
                      <Select>
                        <Option value="monthly">Monthly</Option>
                        <Option value="annually">Annually</Option>
                        <Option value="monthly-annually">Monthly and Annually</Option>
                      </Select>
                    </Form.Item>
                  ):null
                }
                <p className="fw-6 fs-1 mt-4">Platforms</p>
                <p className="fs-1" style={{ color: 'grey' }}>Select the platforms you want this plan to be available on. If a Group, Course, or Network is paid and does not have an iOS plan, it will not appear in the iOS App.</p>
                <Form.Item
                  name='platforms'
                  style={{ width: '300px' }}
                  className="mb-5"
                >
                  <Select onChange={handlePlatforms}>
                    <Option value="web-android-ios">Web, Android and iOS</Option>
                    <Option value="web-android">Web and Android</Option>
                    <Option value="ios">iOS</Option>
                  </Select>
                </Form.Item>
                <h1 className="fw-6 fs-3 mt-4"></h1>
                <p className="fs-1 fw-6">Web and Android</p>
                {
                  showWeb ? (
                    <React.Fragment>
                      <p className="fs-1" style={{ color: 'grey' }}>Choose the pricing of plans on Web and Android devices.</p>
                      <Row className="p-4 mb-5" style={{ border: '1px solid grey' }}>
                        <Col span={24} className="mb-4">
                          <label className="fw-6 fs-1">Price</label>
                        </Col>
                        <Col span={12}>
                          <label className="fw-6 fs-1">Monthly Price</label>
                        </Col>
                        <Col span={12}>
                          <label className="fw-6 fs-1">Annual Price</label>
                        </Col>
                      </Row>
                    </React.Fragment>
                  ): <p className="fs-1" style={{ color: 'grey' }}>If a Group, a Course, or the overall Network is not available for purchase on Web and Android via at least one plan, it will still appear in lists and in search, but new members will not be able to purchase it on these platforms.</p>
                }
                <h1 className="fw-6 fs-3 py-4">Fill in the Details</h1>
                <p className="fs-1 fw-6">Plan Name</p>
                <p className="fs-1" style={{ color: 'grey' }}>This is the name displayed to members. Under most circumstances we recommend using the title of the Group and/or Course you&apos;re creating this plan for.</p>
                <Form.Item
                  name='planName'
                  className="mb-5"
                >
                  <Input placeholder="e.g. Premium Plan" />
                </Form.Item>
                <p className="fs-1 fw-6">Target Audience</p>
                <p className="fs-1 mb-5" style={{ color: 'grey' }}>External</p>
                <p className="fs-1 fw-6">Image or Video</p>
                <Form.Item
                  name="image-video"
                  className="mb-5"
                >
                  <RadioGroup>
                    <Radio style={radioStyle} value="network">
                      <React.Fragment>
                        <p style={{ display: 'inline-block' }} className="mb-1 fs-1 fw-6">Network Secondary Image or Video</p>
                        <p className="mb-0 pl-4">Automatically use the image or video for this Network, which can be edited in General Settings.</p>
                      </React.Fragment>
                    </Radio>
                    <Radio style={radioStyle} value="custom">
                      <React.Fragment>
                        <p style={{ display: 'inline-block' }} className="mb-1 fs-1 fw-6">Custom</p>
                        <p className="mb-0 pl-4">Upload a custom image or video just for this plan.</p>
                      </React.Fragment>
                    </Radio>
                  </RadioGroup>
                </Form.Item>
                <p className="fs-1 fw-6">Sales Pitch</p>
                <p className="fs-1" style={{ color: 'grey' }}>The Sales Pitch is a short tagline that appears alongside the plan name. Use this space to share with members why they should buy this plan.</p>
                <Form.Item
                  name='sales-pitch'
                  className="mb-5"
                >
                  <TextArea rows={3} placeholder="e.g. Join us to meet people like you and learn how to make better, more well-informed decisions in your work." />
                </Form.Item>
                <p className="fs-1 fw-6">Benefis List</p>
                <p className="fs-1" style={{ color: 'grey' }}>Create a bulleted list highlighting the benefits your members will receive when they choose this plan. We recommend adding at least three!</p>
                {
                  benefisList.length > 1 && benefisList.map((item, index)=>{
                    if(index < benefisList.length - 1){
                      return <div key={index} className="d-flex mb-3">
                        <Input placeholder="e.g. Be the first to hear about special offers and announcements" value={item} onChange={handleBenefis(index)} />
                        <Button onClick={()=>{removeBenefis(index);}} icon={<CloseOutlined />} className="ml-2" />
                      </div>;
                    }
                  })
                }
                <div className="d-flex mb-5">
                  <Input placeholder="e.g. Be the first to hear about special offers and announcements" value={benefisList[benefisList.length-1]} onChange={handleBenefis(benefisList.length-1)} />
                  <Button onClick={addBenefis} icon={<PlusOutlined />} className="ml-2" />
                </div>
                <p className="fs-1 fw-6 mt-3">Description</p>
                <p className="fs-1 mb-5" style={{ color: 'grey' }}>We will automatically pull in the KOMPROM description as the description for this plan. You can manage the description in the General Settings of the KOMPROM.</p>
                <h1 className="fw-6 fs-3">Preview Your New Plan and Submit</h1>
                <p className="fs-1 fw-6">Plan Preview</p>
                <p className="fs-1 mb-5" style={{ color: 'grey' }}>Below is a preview of what your members will see when they have the option to purchase this plan.</p>
                <Button type="hbs-primary" size="large" style={{ width: '100%' }} htmlType="submit">Create Plan</Button>
              </div>
            </Form>
          ):null
        }
      </Container>
    </SettingDrawer>
  </React.Fragment>;
};