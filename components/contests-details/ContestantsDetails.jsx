import React from 'react';
import { Table, Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
export const ContestantsDetails = props => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      /* eslint-disable */
      render: (_, record) => {
        {record.id}
      }
      /* eslint-enable */
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      /* eslint-disable */
      render: (_, record) => {
        {record.rank? record.rank : '-'}
      }
      /* eslint-enable */
    },
    {
      dataIndex: 'avatar',
      /* eslint-disable */
      render: (_, record) => (
        <Space>
          <Avatar size={30} src={record.avatar}/>
          {`${record.firstname ? record.firstname : ''} ${
            record.lastname ? record.lastname : ''
          }`}
        </Space>
      ),
      /* eslint-enable */
    },
    {
      title: 'DESIGN',
      dataIndex: 'design',
      /* eslint-disable */
      render: (_, record) => {
        {record.design? record.design : '-'}
      }
      /* eslint-enable */
    },
    {
      title: 'FUNCTIONALITY',
      dataIndex: 'functionality',
      /* eslint-disable */
      render: (_, record) => {
        {record.functionality? record.functionality : '-'}
      }
      /* eslint-enable */
    },
    {
      title: 'USABILITY',
      dataIndex: 'usability',
      /* eslint-disable */
      render: (_, record) => {
        {record.usability? record.usability : '-'}
      }
      /* eslint-enable */
    },
    {
      title: 'MARKET POTENTIAL',
      dataIndex: 'marketPotential',
      /* eslint-disable */
      render: (_, record) => {
        {record.marketPotential? record.marketPotential : '-'}
      }
      /* eslint-enable */
    },
    {
      title: 'AVERAGE',
      dataIndex: 'average',
      /* eslint-disable */
      render: (_, record) => {
        {record.average? record.average : '-'}
      }
      /* eslint-enable */
    },
  ];
  return (
    <React.Fragment>
      <Table rowKey='id' dataSource={props.data.contestants} columns={columns} />
    </React.Fragment>
  );
};