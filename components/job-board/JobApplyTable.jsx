import React, { useState } from 'react';
import { Col, Row, Table } from 'antd';
import { LinkedSocial } from './LinkedSocial';
import Link from 'next/link';
import { JobApplyModal } from './JobApplyModal';

const columns = [
  { title: 'Position', dataIndex: 'position', key: 'position' },
  { title: 'Employment type', dataIndex: 'employmentType', key: 'employmentType' },
  { title: 'Location', dataIndex: 'location', key: 'location' },
  { title: 'Duration', dataIndex: 'duration', key: 'duration' },
  { title: 'Started Date', dataIndex: 'startedDate', key: 'startedDate' },
];

const data = [
  {
    key: 1,
    position: <div className='text-center'>
      <div>
        Marketing
      </div>
      <div className="fw-6">
        Community growth &amp; networking &amp; local Event coordinator
      </div>
      <small>
        Published on 18 mar - 2021
      </small>
    </div>,
    employmentType: 'internship',
    location: 'Wherever',
    duration: '6 month',
    startedDate: '05 April 2021',
    detail: <div>
      <div className="job-detail-social-wrap">
        <LinkedSocial name='twitter' title='Tell a friend' />
        <LinkedSocial name='linkedin' title='Share' className='ml-4' />
      </div>
      <Row className='pt-4'>
        <Col lg={16} md={16} sm={24} className='mb-4'>
          <Row>
            <Col lg={12}>
              <span>Started Date:</span>&nbsp;
              <span className="fw-6">April 5th 2021</span>
            </Col>
            <Col lg={12}>
              <span>Duration:</span>&nbsp;
              <span className="fw-6">6 month</span>
            </Col>
          </Row>
          <h3 className="fw-6 mt-3">
            Job Description
          </h3>
          <h3 className="fw-6 mt-3">
            Job Responsibilities
          </h3>
          <h3 className="fw-6 mt-3">
            Qualification/Job requirements
          </h3>
        </Col>
        <Col lg={8} md={8} sm={24}>
          <h3 className="fw-6">
            Skill needed
          </h3>
          <div className="text-center">
            <div className="hbs-tag">Design</div>
            <div className="hbs-tag">Evnet</div>
            <div className="hbs-tag">Social Media</div>
          </div>
          <h3 className="fw-6 mt-3">
            Skill needed
          </h3>
          <div className="text-center">
            <div className="hbs-tag">UX Design</div>
            <div className="hbs-tag">Design</div>
          </div>
          <h3 className="fw-6 mt-3">
            Compensation
          </h3>
          <div>
            {/* Compensation detail */}
          </div>
          <JobApplyModal />
          {/* <Button type='hbs-primary' className='w-100 my-3' shape='round'>Apply</Button> */}
        </Col>
      </Row>
      <div className="text-center">
        Do not you see position that you fit in?&nbsp;
        <Link href=''>
          <a className='primary-link'>
            Send us a message
          </a>
        </Link>
      </div>
    </div>
  },
  {
    key: 2,
    position: <div className='text-center'>
      <div>
        Marketing
      </div>
      <div className="fw-6">
        Community growth &amp; networking &amp; local Event coordinator
      </div>
      <small>
        Published on 20 mar - 2021
      </small>
    </div>,
    employmentType: '',
    location: '',
    duration: '',
    startedDate: '',
    detail: ''
  },
];

export const JobApplyTable = () => {
  const [expandedKey, setExpandedKey] = useState();
  const onRowEvent = (e) => {
    return {
      onClick: () => {
        setExpandedKey(e.key);
      }
    };
  };
  return <Table
    columns={columns}
    onRow={onRowEvent}
    className='job-apply-table'
    expandable={{
      expandedRowKeys: [expandedKey],
      // eslint-disable-next-line react/display-name
      expandedRowRender: record => <p style={{ margin: 0 }}>{record.detail}</p>,
      rowExpandable: record => record.name !== 'Not Expandable',
    }}
    dataSource={data}
  />;
};