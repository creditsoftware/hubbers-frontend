import React from 'react';
import { Table, Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
export const ContestantsDetails = props => {
  console.log(props)
  const [contestants, setContestants] = React.useState(null);
  const [marks, setMarks] = React.useState(null);
  React.useEffect(() => {
    if(props.data) {
      let v = props.data.contestMembers.filter((contestant) => contestant.role ==='contestant');
      if(v) setContestants(v);
    }
  },[props.data])
  React.useEffect(() => {
    if(contestants) {
      let mark = [];
      contestants.map((contestant, index) => {
        let e = props.data.entry.filter((i) => i.userId === contestant.userId);
        console.log(e)
        let design = 0, functionality = 0, manuFacturability = 0, marketPotential = 0, average;
        e.map((entry) => {
          let mark = props.data.entryMarks.filter((m) => entry.id === m.entryId)[0];
          design += mark.designMark;
          functionality += mark.functionalityMark;
          manuFacturability += mark.manuFacturabilityMark;
          marketPotential += mark.marketPotentialMark;
        })
        design = design/e.length;
        functionality = functionality/e.length;
        manuFacturability = manuFacturability/e.length;
        marketPotential = marketPotential/e.length;
        average = (design+functionality+manuFacturability+marketPotential)/4;
        mark = [...mark, {avatar: contestant.user.avatar, firstname: contestant.user.firstname, lastname: contestant.user.lastname, design: design.toFixed(2), functionality: functionality.toFixed(2), usability: manuFacturability.toFixed(2), marketPotential: marketPotential.toFixed(2), average: average.toFixed(2)}];
      })
      setMarks(mark);
    }
  },[contestants])
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
        console.log(record)
        return (
        <span>{record.design !== 'NaN' ? record.design : '-'}</span>
      )}
      /* eslint-enable */
    },
    {
      title: 'FUNCTIONALITY',
      dataIndex: 'functionality',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.functionality !== 'NaN' ? record.functionality : '-'}</span>
      )
      /* eslint-enable */
    },
    {
      title: 'USABILITY',
      dataIndex: 'usability',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.usability !== 'NaN' ? record.usability : '-'}</span>
      )
      /* eslint-enable */
    },
    {
      title: 'MARKET POTENTIAL',
      dataIndex: 'marketPotential',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.marketPotential !== 'NaN' ? record.marketPotential : '-'}</span>
      )
      /* eslint-enable */
    },
    {
      title: 'AVERAGE',
      dataIndex: 'average',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.average !== 'NaN' ? record.average : '-'}</span>
      )
      /* eslint-enable */
    },
  ];
  return (
    <React.Fragment>
      <Table rowKey='id' dataSource={marks} columns={columns} />
    </React.Fragment>
  );
};