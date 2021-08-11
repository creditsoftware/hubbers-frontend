import React from 'react';
export const TalkAbout = ({eventData}) => {
  return (
    <div className='pt-5 pb-5'>
      <div className='container'>
        <div className='text-center text-upper fw-6 fs-3'>
          we will talk about
        </div>
        <div className='talk-about-description'>
          {eventData.agenda}
        </div>
        <div>
          <div className='text-upper fw-6 fs-2 text-center pt-5 lts-1'>
            shedule
          </div>
          {
            eventData.schedules?.map((item, index) => (
              <div className='pt-1' key={index}>
                <div className='text-upper fw-6 fs-1 text-center pt-3'>
                  {item.time}
                </div>
                <div className='talk-about-description pt-1'>
                  {item.description}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};