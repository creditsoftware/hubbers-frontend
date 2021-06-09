import React from 'react';
import { Row, Col } from 'antd';
import Image from 'next/image';
import { Container } from '../Container';
export const MembershipBanner5 = () => {
  return (
    <Container className='py-4'>
      <React.Fragment>
        <h1 className="fw-6 text-center fs-5">
          Collaborative spirit and love sharing experiences.
        </h1>
        <Row>
          <Col lg={12} md={12} sm={24} className='text-center p-3'>
            <Image width={400} height={300} src='/images/membership/hubber-community-image-1.png' />
            <div className='fs-2'>
              Hubbers offers help to create and launch innovative products on the market. Our community assists in planning, design, project managment and production through a cloud-based, blockchain-powered online platform and mobile app.
            </div>
          </Col>
          <Col lg={12} md={12} sm={24} className='text-center p-3'>
            <div className='fs-2'>
              Hubbers,hub of makers is an online HUB where individuals and companies co-create. It is also an offline community where people meet, share ideas, help and inspire each other. We provide opportunity and rich platform to creative minds to connect and combine valuable skills and resources.
            </div>
            <Image width={400} height={300} src='/images/membership/hubber-community-image-2.png' />
          </Col>
        </Row>
      </React.Fragment>
    </Container>
  );
};
