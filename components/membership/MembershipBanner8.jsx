import React from 'react';
import { Row, Col, Space } from 'antd';
import Image from 'next/image';
import { Container } from '../Container';
export const MembershipBanner8 = () => {
  return (
    <Container className='py-4'>
      <React.Fragment>
        <h1 className="fw-6 fs-5">
          5 good reasons to become a lifetime members.
        </h1>
        <p>
          Hubbers lifetime member are key drivers in what is being built and how we are building it worldwide.
        </p>
        <Row>
          <Col lg={12} md={12} sm={24} className='text-center'>
            <Image width={400} height={300} src='/images/membership/good-reason-img.png' />
          </Col>
          <Col lg={12} md={12} sm={24} className='p-3'>
            <Space>
              <div className='p-rel min-w-4'>
                <Image width={70} height={70} src='/images/polygon/pol6.png' />
                <span className='fs-3 fw-6 fc-white p-abs p-center'>1</span>
              </div>
              <p>
                Lifetime members brainstorm on Hubbers strategy implementation
              </p>
            </Space>
            <Space>
              <div className='p-rel min-w-4'>
                <Image width={70} height={70} src='/images/polygon/pol8.png' />
                <span className='fs-3 fw-6 fc-white p-abs p-center'>2</span>
              </div>
              <p>
                Lifetime members give their thoughts on what is coming next in Hubbers
              </p>
            </Space>
            <Space>
              <div className='p-rel min-w-4'>
                <Image width={70} height={70} src='/images/polygon/pol6.png' />
                <span className='fs-3 fw-6 fc-white p-abs p-center'>3</span>
              </div>
              <p>
                Lifetime members participate in great discussion in implementing community and tools
              </p>
            </Space>
            <Space>
              <div className='p-rel min-w-4'>
                <Image width={70} height={70} src='/images/polygon/pol8.png' />
                <span className='fs-3 fw-6 fc-white p-abs p-center'>4</span>
              </div>
              <p>
                Lifetime members are with like-minded extrapreneurs and networks from our marketing team
              </p>
            </Space>
            <Space>
              <div className='p-rel min-w-4'>
                <Image width={70} height={70} src='/images/polygon/pol6.png' />
                <span className='fs-3 fw-6 fc-white p-abs p-center'>5</span>
              </div>
              <p>
                Lifetime members increase the value of their future tokens.
              </p>
            </Space>
          </Col>
        </Row>
      </React.Fragment>
    </Container>
  );
};
