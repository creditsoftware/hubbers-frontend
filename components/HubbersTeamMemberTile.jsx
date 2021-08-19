import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image } from 'antd';
export const HubbersTeamMemberTile = ({ data, end = false }) => {
  return <React.Fragment>
    {
      !end ?
        <div className={data.isTerminated ? 'hubbers-team-member-tile terminated-tile' : 'hubbers-team-member-tile'}>
          <div style={{ minHeight: '10rem' }}>
            <Image width='100%' height='100%' src={data.user.avatar} preview={false} alt='' />
          </div>
          <p className='text-center fw-5 pt-4'>
            {`${data.user.firstname ? data.user.firstname : ''} ${data.user.lastname ? data.user.lastname : ''}`}
          </p>
          <p className='text-center'>{data.user.detail?.location?.country}</p>
          <p className='text-center' title={data.title}>{data.title}</p>
          {
            !data.isTerminated ?
              <div title={data.description}>{data.description}</div>
              : null
          }
        </div>
        :
        <div className='hubbers-team-member-tile'>
          <div className='join-us-job-board'>
            <PlusOutlined />
          </div>
          <p className="text-center fc-primary">
            You think you should be here <b>JOIN US</b>
          </p>
        </div>
    }
  </React.Fragment>;
};