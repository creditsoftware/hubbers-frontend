import React from 'react';
import { Row, Col } from 'antd';
import Image from 'next/image';
import { Container } from '../Container';
export const MembershipBanner3 = () => {
  return (
    <Container className='py-4'>
      <Row>
        <Col lg={8} md={8} sm={24}>
          <Row>
            <Col lg={6} md={24} sm={6} xs={24} className='f-align-center d-flex p-2'>
              <div className='m-auto max-w-6'>
                <Image width={200} height={200} src='/images/membership/mindset-icon-1.png' />
              </div>
            </Col>
            <Col lg={18} md={24} sm={18} xs={24}>
              <div>
                <h3 className="fw-6 fs-4 m-0">
                  Creative mindset
                </h3>
                <p>
                  You like progress in tech, have ideas on products and want to accompany it by bringing your knowledge and ideas on the next big thing.
                </p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={8} md={8} sm={24}>
          <Row>
            <Col lg={6} md={24} sm={6} xs={24} className='f-align-center d-flex p-2'>
              <div className='m-auto max-w-6'>
                <Image width={200} height={200} src='/images/membership/mindset-icon-2.png' />
              </div>
            </Col>
            <Col lg={18} md={24} sm={18} xs={24}>
              <div>
                <h3 className="fw-6 fs-4 m-0">
                  Collaborative mindset
                </h3>
                <p>
                  If you can earn money while having fun with great people it is even better.
                </p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={8} md={8} sm={24}>
          <Row>
            <Col lg={6} md={24} sm={6} xs={24} className='f-align-center d-flex p-2'>
              <div className='m-auto max-w-6'>
                <Image width={200} height={200} src='/images/membership/mindset-icon-3.png' />
              </div>
            </Col>
            <Col lg={18} md={24} sm={18} xs={24}>
              <div>
                <h3 className="fw-6 fs-4 m-0">
                  Positive mindset
                </h3>
                <p>
                  You have a “can-do” and “do-it-together” mindset.
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
