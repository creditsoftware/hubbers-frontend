import React, { useState } from 'react';
import { Col, Row, Table } from 'antd';
// import { LinkedSocial } from './LinkedSocial';
import Link from 'next/link';
import { JobApplyModal } from './JobApplyModal';
import { useRouter } from 'next/router';
import { API } from '../../constants';
import { fetchJson } from '../../utils';
import moment from 'moment';

export const JobApplyTable = ({auth, status=null}) => {
  const router = useRouter();
  const [jobList, setJobList] = useState([]);
  const [expandedKey, setExpandedKey] = useState();
  React.useEffect(()=>{
    fetchJson(`${API.GET_ALL_JOB_API}`).then((response) => {
      setJobList(response);
    });
  }, []);
  React.useEffect(()=>{
    const filterData = jobList?.filter((item) => item.slug === status)[0];
    setExpandedKey(filterData?.id);
  }, [jobList, status]);

  const onRowEvent = (e) => {
    return {
      onClick: () => {
        setExpandedKey(e.id);
        router.push('/hubbers/hubbers-job-board/' + e.slug);
      }
    };
  };

  const columns = [
    {
      title: 'Position',
      dataIndex: 'position',
      /* eslint-disable */
      render: (_, record) => (
        <div className='text-center'>
          <div>{record.companyName}</div>
          <div className="fw-6">{record.title}</div>
          <small>Published on {record.punlishFrom?.split('T')[0]}</small>
        </div>
      ),
      /* eslint-enable */
    },
    {
      title: 'Employment type',
      dataIndex: 'employmentType',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record._country?.name} {record.city} {record.remote}</span>
      ),
      /* eslint-enable */
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.startDate?.split('T')[0]}</span>
      ),
      /* eslint-enable */
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      /* eslint-disable */
      render: (_, record) => (
        <span>{Math.ceil(moment(record.endDate).diff(record.startDate, 'months', true))} month{Math.ceil(moment(record.endDate).diff(record.startDate, 'months', true)) > 1 ? 's' : '' }</span>
      ),
      /* eslint-enable */
    },
  ];

  const details = (id) => {
    const filterData = jobList.filter((item) => item.id === id)[0];
    return (
      <div>
        {/* <div className="job-detail-social-wrap">
          <LinkedSocial name='twitter' title='Tell a friend' />
          <LinkedSocial name='linkedin' title='Share' className='ml-4' />
        </div> */}
        <Row className='pt-4'>
          <Col lg={16} md={16} sm={24} className='mb-4'>
            <Row>
              <Col lg={12}>
                <span>Started Date:</span>&nbsp;
                <span className="fw-6">{filterData.startDate?.split('T')[0]}</span>
              </Col>
              <Col lg={12}>
                <span>Duration:</span>&nbsp;
                <span className="fw-6">{Math.ceil(moment(filterData.endDate).diff(filterData.startDate, 'months', true))} month{Math.ceil(moment(filterData.endDate).diff(filterData.startDate, 'months', true)) > 1 ? 's' : '' }</span>
              </Col>
            </Row>
            <h3 className="fw-6 mt-3">
              Job Description
            </h3>
            <div dangerouslySetInnerHTML={{ __html: filterData.description}} />
            <h3 className="fw-6 mt-3">
              Job Responsibilities
            </h3>
            <div dangerouslySetInnerHTML={{ __html: filterData.responsibilities}} />
            <h3 className="fw-6 mt-3">
              Qualification/Job requirements
            </h3>
            <div dangerouslySetInnerHTML={{ __html: filterData.requirements}} />
          </Col>
          <Col lg={8} md={8} sm={24} className="pl-3">
            <h3 className="fw-6">
              Skills needed
            </h3>
            <div className="text-center">
              {
                filterData?.neededSkill?.map((item)=>{
                  return(
                    <div className="hbs-tag" key={item.id}>{item.name}</div>
                  );
                })
              }
            </div>
            <h3 className="fw-6 mt-3">
              Skills you will learn
            </h3>
            <div className="text-center">
              {
                filterData?.skill?.map((item)=>{
                  return(
                    <div className="hbs-tag" key={item.id}>{item.name}</div>
                  );
                })
              }
            </div>
            <h3 className="fw-6 mt-3">
              Compensation
            </h3>
            <div dangerouslySetInnerHTML={{ __html: filterData?.compensation }} />
            <JobApplyModal data={filterData} auth={auth} />
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
    );
  };

  return(
    <Table
      rowKey="id"
      columns={columns}
      onRow={onRowEvent}
      className='job-apply-table'
      expandable={{
        expandedRowKeys: [expandedKey],
        // eslint-disable-next-line react/display-name
        expandedRowRender: (record) => details(record.id),
      }}
      dataSource={jobList}
    />
  );
};