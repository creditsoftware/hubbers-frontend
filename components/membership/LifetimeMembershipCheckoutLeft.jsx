import React from 'react';
import { Col, Row, Space } from 'antd';
import Image from 'next/image';
export const LifetimeMembershipCheckoutLeft = () => {
  return (
    <React.Fragment>
      <Image width={250} height={200} src='/images/lifetime-membership/lifetime-membership.png' />
      <div className='fs-2 mb-3 mt-4'>
        Apply only if:
      </div>
      <Space className='mb-2'>
        <div className='p-rel w-4'>
          <Image width={70} height={70} src='/images/polygon/pol9.png' />
          <span className='fs-3 fw-6 fc-white p-abs p-center'>1</span>
        </div>
        <p>
          Lifetime members brainstorm on Hubbers strategy implementation
        </p>
      </Space>
      <Space className='mb-2'>
        <div className='p-rel w-4'>
          <Image width={70} height={70} src='/images/polygon/pol10.png' />
          <span className='fs-3 fw-6 fc-white p-abs p-center'>2</span>
        </div>
        <p>
          You are experts in product development in all workspace that Hubbers are building.
        </p>
      </Space>
      <Space className='mb-2'>
        <div className='p-rel w-4'>
          <Image width={70} height={70} src='/images/polygon/pol11.png' />
          <span className='fs-3 fw-6 fc-white p-abs p-center'>3</span>
        </div>
        <p>
          You are a potential investor in product or want to contribute
        </p>
      </Space>
      <div className='fs-2 mb-3 mt-4'>
        What is the next step after you paid?
      </div>
      <Row>
        <Col lg={16} md={18} sm={18} xs={24}>
          <Space className='mb-2'>
            <div className='w-4'>
              <Image width={70} height={70} src='/images/polygon/pol13.png' />
            </div>
            <p>
              Plan a call with Ben if you have not yet done it.
            </p>
          </Space>
          <Space className='mb-2'>
            <p>
              Have an idea on how you want to contribute.<br/>[workshop or others]
            </p>
            <div className='w-4'>
              <Image width={70} height={70} src='/images/polygon/pol14.png' />
            </div>
          </Space>
          <Space className='mb-2'>
            <div className='w-4'>
              <Image width={70} height={70} src='/images/polygon/pol12.png' />
            </div>
            <p>
              Issuance of your lifetime membership certificate.<br/>[including all your benefits]
            </p>
          </Space>
        </Col>
        <Col lg={8} md={6} sm={18} xs={24}>
          <Image width={400} height={500} src='/images/lifetime-membership/dollar-man.png'/>
        </Col>
      </Row>
    </React.Fragment>
  );
};
