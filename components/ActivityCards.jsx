import React from 'react';
import Image from 'next/image';
import { Space } from 'antd';
import Link from 'next/link';

export const ActivityCards = () => {
  const card = [
    {
      url: '/desk/create-product',
      image: '/images/activity/activity1.png',
      title: 'I want to launch a product',
      content: 'Starting a product from scratch, alone or with a team, get resources from ideation to the market.',
    }, {
      url: '/desk/put-your-skills',
      image: '/images/activity/activity2.png',
      title: 'I want to put my skills in product',
      content: 'Time to put your skills in motion for great product creations.',
    }, {
      url: '/desk/create-expertise',
      image: '/images/activity/activity3.png',
      title: 'I need expert for my project',
      content: 'You got your great idea but need a team for designing, biz dev, legal, Our community of experts is here to help you,',
    }, {
      url: '/desk/crowdsource-design-product-logo-packaging',
      image: '/images/activity/activity4.png',
      title: 'I want to crowdsource something?',
      content: 'Got the idea but not the design. Product, logo, brand name.. Organize a contest and get it done with the community',
    }, {
      url: '',
      image: '/images/activity/activity5.png',
      title: 'I need some fundings for my projects',
      content: 'You have the idea but not the $$$, we have investors ready to contribute in kool ideas.',
    }, {
      url: '',
      image: '/images/activity/activity6.png',
      title: 'I want to mingle with my community',
      content: 'Start to be social and discuss, share and comments on your community ideas and posts',
    }
  ];
  return (
    <Space size={70} wrap align="center" className="d-flex fjc-center py-5 activity-cards">
      {
        card.map((item, index) => {
          return <Link key={index} href={item.url}>
            <a className="text-center">
              <div>
                <h3 className="fw-6 fs-1">{item.title}</h3>
                <p className="fs-1 pt-3">{item.content}</p>
              </div>
              <Image width="250" height="180" src={item.image} />
            </a>
          </Link>;
        })
      }
    </Space>
  );
};