import React from 'react';
import Image from 'next/image';
import { CustomSlider1 } from './CustomSlider1';

export const GlobalEventSlider = () => {
  const events = [
    {
      url: '/hubbers/events/5d80d5a158de1b001ffaf69a/product-development-40-buenos-aires-argentina',
      image:'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/argentina.jpg',
      date:'Sep 22 2019',
      content:'Creators & Inventors Welcome! Hubbers introduces 4 product development tools to help creators successfully start and complete their product development journey.',
    },{
      url: '/hubbers/events/5d7756ae58de1b001ffad536/product-development-40-milan-italy',
      image:'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/milan.jpg',
      date:'Sep 16 2019',
      content:'Creators & Inventors Welcome! Hubbers introduces 4 product development tools to help creators successfully start and complete their product development journey.',
    },{
      url: '/hubbers/events/5d6662f07f1961001fe6fead/product-development-40-barcelona-spain',
      image:'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/barcelona.jpg',
      date:'Sep 9 2019',
      content:'Creators & Inventors Welcome! Hubbers introduces 4 product development tools to help creators successfully start and complete their product development journey.',
    },{
      url: 'https://blog.hubbers.io/the-world-of-commercial-video-production-with-nausheen-ishtiaq-chen/',
      image:'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/lisbon.jpg',
      date:'Sep 1 2019',
      content:'Creators & Inventors Welcome! Hubbers introduces 4 product development tools to help creators successfully start and complete their product development journey.',
    },{
      url: '/hubbers/events/5d512077581e14001f48d272/product-development-40-melbourne-australia',
      image:'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/melbourne.jpg',
      date:'Aug 14 2019',
      content:'Creators & Inventors Welcome! Hubbers introduces 4 product development tools to help creators successfully start and complete their product development journey.',
    }
  ];
  
  return (
    <React.Fragment>
      <h2 className="fw-6 pt-4 pb-5 fs-5">Latest Events</h2>
      <CustomSlider1>
        {
          events.map((item, index) => {
            return <a key={index} className="text-center" href={item.url}>
              <Image width="320" height="180" src={item.image} />
              <h3>{item.date}</h3>
              <p>{item.content}</p>
            </a>;
          })
        }
      </CustomSlider1>
    </React.Fragment>
  );
};