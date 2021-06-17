import React from 'react';
import Image from 'next/image';

export const ChooseYourLaunchProgress = () => {
  return <div className="launch-progress-group d-flex fjc-center pt-4">
    <div className="progress-item">
      <div className="p-rel text-center">
        <Image width={100} height={100} src="/images/polygon/pol9.png" />
        <span className="p-abs p-center fs-4 fw-6">1</span>
      </div>
      <p className="text-center fs-2 fw-5">General Specifications</p>
    </div>
    <div className="progress-line"></div>
    <div className="progress-item">
      <div className="p-rel text-center">
        <Image width={100} height={100} src="/images/polygon/pol10.png" />
        <span className="p-abs p-center fs-4 fw-6">2</span>
      </div>
      <p className="text-center fs-2 fw-5">Your Team</p>
    </div>
    <div className="progress-line"></div>
    <div className="progress-item">
      <div className="p-rel text-center">
        <Image width={100} height={100} src="/images/polygon/pol22.png" />
        <span className="p-abs p-center fs-4 fw-6">3</span>
      </div>
      <p className="text-center fs-2 fw-5">Choose Your Launch</p>
    </div>
  </div>;
};