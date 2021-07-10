import React from 'react';
import Image from 'next/image';
export const CommunityProgress = () => {
  return <div className="community-progress-group d-flex fjc-center pt-4">
    <div className="progress-item">
      <div className="p-rel text-center">
        <Image width={100} height={100} src="/images/polygon/pol6.png" alt='' />
        <span className="p-abs p-center fc-white fs-4 fw-6">1</span>
      </div>
      <p className="text-center fs-2 fw-5">Select the community<br />you want to join</p>
    </div>
    <div className="progress-line"></div>
    <div className="progress-item">
      <div className="p-rel text-center">
        <Image width={100} height={100} src="/images/polygon/pol6.png" alt='' />
        <span className="p-abs p-center fc-white fs-4 fw-6">2</span>
      </div>
      <p className="text-center fs-2 fw-5">Sign up</p>
    </div>
    <div className="progress-line"></div>
    <div className="progress-item">
      <div className="p-rel text-center">
        <Image width={100} height={100} src="/images/polygon/pol6.png" alt='' />
        <span className="p-abs p-center fc-white fs-4 fw-6">3</span>
      </div>
      <p className="text-center fs-2 fw-5">Start hubbering</p>
    </div>
  </div>;
};