import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import { primaryColor } from '../../../constants';

const EntryPublish = ({disable, handleStep}) => {
  const handleClick = () => {
    handleStep('end');
  }
  return (
    <React.Fragment>
      <div className="p-5" style={{height: '530px'}}>
        <p className="fs-4 mb-3 text-center" style={{color: primaryColor}}>CONGRATULATIONS!</p>
        <p className="fw-6 mb-3 text-center">You are almost there!</p>
        <p className="mb-3 text-center">Before you submit your entry, use this <Link href=""><a style={{color: primaryColor}}>checklist</a></Link> to make sure that it is as completed according to the expectations of the Awards Judges and Hubbers standards.</p>
        <p className="mb-3 text-center">Once the entry is published, all Award Judges for this contest will be notified.</p>
        <div className="text-center">
          <Button type="hbs-primary" disabled={disable} shape="round" onClick={handleClick}>SUBMIT</Button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default EntryPublish;