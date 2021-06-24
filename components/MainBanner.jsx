import React from 'react';
export const MainBanner = ({ className, title, date, url }) => {
  return (
    <div className={`main-banner-bg-image ${className}`} style={{ backgroundImage: `url(${url})` }}>
      <div className=''>
        <p className='mb-1'>{title}</p>
        <p className='mb-1 fs-2 fw-4'>{date}</p>
      </div>
    </div>
  );
};
