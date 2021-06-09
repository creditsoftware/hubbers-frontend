import React from 'react';
export const TalkAbout = () => {
  const ourprogramtime = [{
    time: '6:00 PM',
    description: 'Welcome attendees-Networking & Wine'
  }, {
    time: '6:20 PM',
    description: 'Opening, Milano LUISS Hub & Hubbers Introductions'
  }, {
    time: '6:30 PM',
    description: 'Guest Speakers Panels'
  }, {
    time: '7:00 PM',
    description: 'Q & A'
  }, {
    time: '7:40 PM',
    description: 'Networking & Wine'
  }, {
    time: '8:00 PM',
    description: 'Event Ends'
  }];
  return (
    <div className='pt-5 pb-5'>
      <div className='container'>
        <div className='text-center text-upper fw-6 fs-3'>
          we will talk about
        </div>
        <div className='talk-about-description'>
          Juan talks about the future of product development and how crowdsourcing (of resources and expertise) helps creative work. Through Hubbers, a community of creators, investors, and experts where ideas get to be developed into viable products. He talks about how project development can be managed through a network of crowdsourced experts from funding through manufacturing, sales, and distribution.
        </div>
        <div>
          <div className='text-upper fw-6 fs-2 text-center pt-5 lts-1'>
            shedule
          </div>
          {
            ourprogramtime.map((item, index) => (
              <div className='pt-1' key={index}>
                <div className='text-upper fw-6 fs-1 text-center pt-3'>
                  {item.time}
                </div>
                <div className='talk-about-description pt-1'>
                  {item.description}
                </div>
              </div>
            )
            )
          }
        </div>
      </div>
    </div>
  );
};