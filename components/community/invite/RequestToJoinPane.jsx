// import { Button } from 'antd';
import React from 'react';
import { RequestToJoinTable } from '../member/RequestToJoinTable';
export const RequestToJoinPane = ({...props}) => {
  return <React.Fragment>
    <h1 className="fw-6 fs-4 text-center mt-5">
      These People Want In
    </h1>
    <p className="text-center mb-5">
      Here are all of the people who have requested to join hubby. You can choose to approve or ignore their requests.
    </p>
    {/* <div className="text-center my-5">
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
    </div> */}
    <RequestToJoinTable {...props} />
  </React.Fragment>;
};