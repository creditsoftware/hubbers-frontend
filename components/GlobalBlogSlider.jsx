import React from 'react';
import Image from 'next/image';
import { CustomSlider1 } from './CustomSlider1';

export const GlobalBlogSlider = () => {
  const blogs = [
    {
      url: 'https://blog.hubbers.io/the-story-of-an-inspiring-creator-and-his-career-through-iot/',
      image: 'http://blog.hubbers.io/content/images/2020/12/Ware-2017--1-.JPG',
      date: 'Apr 13 2019',
      content: 'The story of an Inspiring Creator & career through IoT',
    }, {
      url: 'https://blog.hubbers.io/inventor-communities-create-a-better-future-through-co-creation/',
      image: 'http://blog.hubbers.io/content/images/2020/12/GF05.gif',
      date: 'Jun 6 2019',
      content: 'How inventor communities create a better future through co-creation',
    }, {
      url: 'https://blog.hubbers.io/conscious-product-development/',
      image: 'http://blog.hubbers.io/content/images/2020/12/rubbish.jpg',
      date: 'Jul 11 2019',
      content: 'How to lead conscious product development and create the future?',
    }, {
      url: 'https://blog.hubbers.io/the-world-of-commercial-video-production-with-nausheen-ishtiaq-chen/',
      image: 'http://blog.hubbers.io/content/images/2020/12/P1622486.jpg',
      date: 'Jul 31 2019',
      content: 'The world of commercial video production with Nausheen Ishtiaq-Chen',
    }, {
      url: 'https://blog.hubbers.io/dropshipping-done-differently/',
      image: 'http://blog.hubbers.io/content/images/2020/12/7Y8A3810.JPG',
      date: 'Aug 15 2019',
      content: 'Dropshipping done differently',
    }, {
      url: 'https://blog.hubbers.io/hubbers-guide-to-prototyping/',
      image: 'http://blog.hubbers.io/content/images/2020/12/Prototyping01.jpg',
      date: 'Aug 21 2019',
      content: 'Hubbers\' Guide to Prototyping',
    }, {
      url: 'https://blog.hubbers.io/product-development-and-innovation-in-italy-vs-asia/',
      image: 'http://blog.hubbers.io/content/images/2020/12/stefano1.png',
      date: 'Sep 14 2019',
      content: 'Product Development & Innovation in Italy, versus Asia',
    }
  ];
  return (
    <React.Fragment>
      <h2 className="fw-6 pt-4 pb-5 fs-5">Latest Blog Articles</h2>
      <CustomSlider1>
        {
          blogs.map((item, index) => {
            return <a key={index} className="text-center" href={item.url}>
              <Image width="320" height="180" src={item.image} alt='' />
              <h3>{item.date}</h3>
              <p>{item.content}</p>
            </a>;
          })
        }
      </CustomSlider1>
    </React.Fragment>
  );
};