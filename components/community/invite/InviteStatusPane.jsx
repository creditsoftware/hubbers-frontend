import React from 'react';
import { Col, Row } from 'antd';
export const InviteStatusPane = () => {
  return <Row className='invite-status-values my-5'>
    <Col span={6} className='text-center py-4'>
      <h1 className='fw-6 fc-primary m-0'>
        2
      </h1>
      <small className='fw-6 text-upper'>sent</small>
    </Col>
    <Col span={6} className='text-center py-4'>
      <h1 className='fw-6 fc-primary m-0'>
        2
      </h1>
      <small className='fw-6 text-upper'>opened</small>
    </Col>
    <Col span={6} className='text-center py-4'>
      <h1 className='fw-6 fc-primary m-0'>
        2
      </h1>
      <small className='fw-6 text-upper'>joined</small>
    </Col>
    <Col span={6} className='text-center py-4'>
      <h1 className='fw-6 fc-primary m-0'>
        100%
      </h1>
      <small className='fw-6 text-upper'>conversion</small>
    </Col>
  </Row>;
};
