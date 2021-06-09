import React from 'react';
import { Container } from '../Container';
import { Table } from 'antd';
const columns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: <span className='fs-2 fw-6'>Free membership</span>,
    dataIndex: 'freeMembership',
    key: 'freeMembership'
  },
  {
    title: <span className='fs-2 fw-6'>Lifetime membership*</span>,
    dataIndex: 'lifetimeMembership',
    key: 'lifetimeMembership'
  }
];
const data = [
  {
    key: 1,
    name: 'Community City',
    freeMembership: '2 cities',
    lifetimeMembership: '6 cities'
  },
  {
    key: 2,
    name: 'Events invitation',
    freeMembership: 'Free or paid',
    lifetimeMembership: 'Free & priority booking'
  },
  {
    key: 3,
    name: 'Webinars',
    freeMembership: 'Free or paid',
    lifetimeMembership: 'all recording webinars for free'
  },
  {
    key: 4,
    name: 'Token holder badge',
    freeMembership: 'No',
    lifetimeMembership: 'Yes'
  },
  {
    key: 5,
    name: 'Observers/investor newsletter',
    freeMembership: 'No',
    lifetimeMembership: 'Yes'
  },
  {
    key: 6,
    name: 'HBB loyalty program',
    freeMembership: 'Gain HBB loyalty points',
    lifetimeMembership: 'Redeem 1.5 times more points'
  },
  {
    key: 7,
    name: <b>Expert market place</b>,
    freeMembership: '',
    lifetimeMembership: ''
  },
  {
    key: 8,
    name: 'Freelancer side',
    freeMembership: 'Standard listing',
    lifetimeMembership: 'Priority listing as experts'
  },
  {
    key: 9,
    name: 'Employer side',
    freeMembership: 'Standard commission',
    lifetimeMembership: 'Employers discount'
  },
  {
    key: 10,
    name: <b>New Project Launch</b>,
    freeMembership: '',
    lifetimeMembership: ''
  },
  {
    key: 11,
    name: 'Project Investments',
    freeMembership: 'Access new projects',
    lifetimeMembership: 'Priority on new projects'
  },
  {
    key: 12,
    name: <b>Hubbers Governance</b>,
    freeMembership: '',
    lifetimeMembership: ''
  },
  {
    key: 13,
    name: 'HBS token',
    freeMembership: '',
    lifetimeMembership: '1000 HBS converted at exchange listing time'
  },
  {
    key: 14,
    name: 'Hubbers monthly workshop',
    freeMembership: 'No',
    lifetimeMembership: 'can be part of 2'
  },
  {
    key: 15,
    name: 'Observers',
    freeMembership: 'No',
    lifetimeMembership: 'Yes'
  },
  {
    key: 16,
    name: <b>Content about you</b>,
    freeMembership: 'No',
    lifetimeMembership: 'from our marketing team'
  },
  {
    key: 17,
    name: <b>Price</b>,
    freeMembership: <b>Free</b>,
    lifetimeMembership: <b>USD 1000</b>
  },
];
export const MembershipBanner7 = () => {
  return (
    <Container className='py-4'>
      <React.Fragment>
        <h1 className="fw-6 text-center fs-5">
          Benefits of Hubbers individual membership VS Free membership
        </h1>
        <p>
          Most of the tools on Hubbers are FREE to use.
        </p>
        <p>
          For members who want to be part of the core engine, you have the possibility to apply.
        </p>
        <Table pagination={false} columns={columns} dataSource={data} />
        <p className="text-center fw-6 fs-2 pt-4">
          *apply to the first 100. Conditions may change later on after the first 100.
        </p>
      </React.Fragment>
    </Container>
  );
};
