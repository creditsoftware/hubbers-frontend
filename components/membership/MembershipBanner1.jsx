import React from 'react';
import { Row, Col } from 'antd';
import Image from 'next/image';
import { MembershipApplyButton } from './MembershipApplyButton';
import {Container} from '../../components';
export const MembershipBanner1 = () => {
  return (
    <Container className='py-4'>
      <Row>
        <Col lg={12} md={12} sm={24} className='text-center'>
          <h1 className="fs-6 fw-6 my-5">
            Lifetime Membership
          </h1>
          <h4 className="fs-3 fw-6 my-5">
            Where member become real Hubbers
          </h4>
          <MembershipApplyButton />
        </Col>
        <Col lg={12} md={12} sm={24} className='text-center p-3'>
          <Image width={400} height={300} src='/images/membership/banner-img.png' />
        </Col>
      </Row>
    </Container>
  );
};
