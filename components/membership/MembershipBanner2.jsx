import React from 'react';
import { Row, Col } from 'antd';
import Image from 'next/image';
import { MembershipApplyButton } from './MembershipApplyButton';
import { Container } from '../Container';
export const MembershipBanner2 = () => {
  return (
    <div className="bg-white">
      <Container className='py-4'>
        <React.Fragment>
          <h1 className="fw-6 fs-5">
            Hubbers Lifetime membership
          </h1>
          <Row>
            <Col lg={12} md={12} sm={24} className='text-center p-3'>
              <Image width={400} height={300} src='/images/homepage/banner-img.png' />
            </Col>
            <Col lg={12} md={12} sm={24}>
              <p className='fs-2'>
                If you are creators, experts and investors in product development, you can signup as a FREE member of Hubbers and have access to a lot of free resources, tutorials and expand your network in the global product development ecosystem worldwide.
              </p>
              <p className='fs-2'>
                If you want to upgrade to a Lifetime Hubbers Members and become a stakeholder of Hubbers, grow with the community and help Hubbers community to grow, feel free to apply for a lifetime membership.
              </p>
              <div className="text-center mt-5">
                <MembershipApplyButton />
              </div>
            </Col>
          </Row>
        </React.Fragment>
      </Container>
    </div>
  );
};
