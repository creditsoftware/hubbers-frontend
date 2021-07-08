import Image from 'next/image';
import React from 'react';
import { defaultAvatar } from '../constants/etc';
import { PlusOutlined } from '@ant-design/icons';
export const HubbersTeamMemberTile = ({ end = false }) => {
  return <div className='hubbers-team-member-tile'>
    {
      !end ?
        <React.Fragment>
          <div>
            <Image width={200} height={200} src={defaultAvatar} />
          </div>
          <p className='text-center fw-5'>Benjamin Vignon</p>
          <p className='text-center'>France</p>
          <p className='text-center'>Hubbers architect [& CEO]</p>
          <div>
            Full-stack developer on large scale projects, I am here to make sure with my team that we are building the best tools for Hubbers community.
          </div>
        </React.Fragment>
        :
        <React.Fragment>
          <div className='join-us-job-board'>
            <PlusOutlined />
          </div>
          <p className="text-center fc-primary">
            You think you should be here <b>JOIN US</b>
          </p>
        </React.Fragment>
    }
  </div>;
};