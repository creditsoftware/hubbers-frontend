import React from 'react';
import { Space } from 'antd';
import Image from 'next/image';
import { Container } from '../Container';
export const MembershipBanner6 = () => {
  return (
    <Container className='py-4'>
      <React.Fragment>
        <h1 className="fw-6 text-center fs-5">
          Hubbers at glance?
        </h1>
        <Space className='w-100 fjc-space-between'>
          <div className='text-center'>
            <h1 className="fs-4 fw-6 m-0">
              5400
            </h1>
            <p className='fs-2 fw-6'>
              Innovators
            </p>
          </div>
          <div className='text-center'>
            <h1 className="fs-4 fw-6 m-0">
              1500
            </h1>
            <p className='fs-2 fw-6'>
              Experts
            </p>
          </div>
          <div className='text-center'>
            <h1 className="fs-4 fw-6 m-0">
              1600
            </h1>
            <p className='fs-2 fw-6'>
              Investors
            </p>
          </div>
          <div className='text-center'>
            <h1 className="fs-4 fw-6 m-0">
              48
            </h1>
            <p className='fs-2 fw-6'>
              Lifetime members and investors
            </p>
          </div>
          <div className='text-center'>
            <h1 className="fs-4 fw-6 m-0">
              15
            </h1>
            <p className='fs-2 fw-6'>
              Hubs having activities
            </p>
          </div>
        </Space>
        <Image width={1500} height={700} src='/images/membership/hubber-glance-map.png' />
      </React.Fragment>
    </Container>
  );
};
