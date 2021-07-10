import { Button } from 'antd';
import React from 'react';
import { CommunityMembersTable } from '../member/CommunityMembersTable';
export const RequestToJoinPane = () => {
  return <React.Fragment>
    <h1 className="fw-6 fs-4 text-center">
      These People Want In
    </h1>
    <p className="text-center">
      Here are all of the people who have requested to join hubby. You can choose to approve or ignore their requests.
    </p>
    <div className="text-center my-5">
      <div className="my-2">
        <Button type='hbs-primary' size='large'>
          Approve All
        </Button>
      </div>
      <div className="my-2">
        <Button type='hbs-outline-primary' size='large'>
          Ignore All
        </Button>
      </div>
    </div>
    <CommunityMembersTable />
  </React.Fragment>;
};