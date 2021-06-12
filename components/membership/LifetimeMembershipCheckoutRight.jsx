import React from 'react';
import { Button, Col, Divider, Form, Input, Row, Select } from 'antd';
import Image from 'next/image';
import { countryList } from '../../constants/index';
import { Option } from 'antd/lib/mentions';
import Link from 'next/link';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Promise } from '../../utils/promise';
import MaskedInput from 'antd-mask-input';

export const LifetimeMembershipCheckoutRight = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <React.Fragment>
      <Button type='text' style={{ padding: 0, overflow: 'auto', height: 'auto' }}>
        <Image
          width={1000}
          height={200}
          src='/images/lifetime-membership/pay.png'
        />
      </Button>
      <Divider style={{ border: 3, margin: '2rem 0' }}>
        Or pay with card
      </Divider>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="fs-3 fw-6">
          Shipping information:
        </div>
        <Form.Item
          name='linkedinUrl'
          rules={
            [
              {
                required: true,
                message: 'Please input your linkedin url!'
              }
            ]
          }
        >
          <Input
            size='large'
            placeholder="Linkedin URL"
          />
        </Form.Item>
        <div className="fs-2 fw-6">
          Shipping address
        </div>
        <Form.Item
          name='name'
          rules={
            [
              {
                required: true,
                message: 'Please input your name!'
              }
            ]
          }
        >
          <Input
            size='large'
            placeholder="Name"
          />
        </Form.Item>
        <Form.Item
          name='country'
          rules={
            [
              {
                required: true,
                message: 'Please select country!'
              }
            ]
          }
        >
          <Select
            allowClear
            size='large'
            placeholder='Country'
          >
            {
              countryList.map((country, index) => {
                return (
                  <Option value={country.shortName} key={index}>{country.label}</Option>
                );
              })
            }
          </Select>
        </Form.Item>
        <Form.Item
          name='address'
          rules={
            [
              {
                required: true,
                message: 'Please input your address!'
              }
            ]
          }
        >
          <Input
            size='large'
            placeholder="Address"
          />
        </Form.Item>
        <Link href='#'>
          <a className='primary-link'>
            Enter address manually
          </a>
        </Link>
        <div className="fs-3 fw-6 mt-4">
          Payment details:
        </div>
        <div className="fs-2 fw-6">
          Card detail
        </div>
        <Form.Item
          name='cardNumber'
          rules={
            [
              {
                required: true,
                message: 'Please input your card number!'
              },
              () => ({
                validator(rule, value) {
                  let v = value.replace(/[^0-9]/g, '');
                  if (v.length === 16)
                    return Promise.resolve();
                  return Promise.reject('Please input exact CVC!');
                },
              }),
            ]
          }
        >
          <MaskedInput
            mask="1111 1111 1111 1111"
            placeholder="1111 1111 1111 1111"
            name="card"
            size="20"
          // onChange={_onChange}
          />
        </Form.Item>
        <Row>
          <Col lg={11} md={11} sm={24}>
            <Form.Item
              name='mmyy'
              rules={
                [
                  {
                    required: true,
                    message: 'Please input your expired date!'
                  }
                ]
              }
            >
              <MaskedInput
                mask="11/1111"
                name="expiry"
                placeholder="mm/yyyy"
              // onChange={_onChange}
              />
            </Form.Item>
          </Col>
          <Col lg={2} md={2} sm={0} />
          <Col lg={11} md={11} sm={24}>
            <Form.Item
              name='cvc'
              rules={
                [
                  {
                    required: true,
                    message: 'Please input your CVC!',
                  },
                  () => ({
                    validator(rule, value) {
                      if (value < 1000)
                        return Promise.resolve();
                      return Promise.reject('It is too long. Please input exact CVC!');
                    },
                  }),
                ]
              }
            >
              <MaskedInput
                mask="111"
                placeholder="111"
                name="cvc"
              // onChange={_onChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name='billingAddress'
        >
          <Checkbox>
            Billing address is a same as shipping
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type='hbs-primary' htmlType='submit' size='large' shape='round' className='text-upper w-100'>
            Apply $66 now
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};
