import React from 'react';
export const EventsBanner = ({ title, date, url }) => {
  return (
    <div className='event-banner-bg-image' style={{ backgroundImage: `url(${url})` }}>
      <div className=''>
        <p className='mb-1'>{title}</p>
        <p className='mb-1 fs-2 fw-4'>{date}</p>
      </div>
    </div>
  );
};
