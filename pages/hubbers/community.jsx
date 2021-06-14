import React from 'react';
import Image from 'next/image';
import { Button, Space } from 'antd';
import { Row, Col } from 'antd';
import { MainPageHoc } from '../../containers';
import { Userdata, DeskCommunity } from '../../components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const leaders = [
  {
    image:'https://hubbers-us.oss-us-west-1.aliyuncs.com/HJH6dR7r4.jpeg',
    name:'Benjamin Vignon',
    country:'France',
    date:'Dec - 2017',
  },{
    image:'https://hubbers-us.oss-us-west-1.aliyuncs.com/HJfo814Dr.jpg',
    name:'Himanshi',
    country:'Singapore',
    date:'Apr - 2021',
  },{
    image:'https://hubbers-us.oss-us-west-1.aliyuncs.com/Bkd0oUZVS.jpg',
    name:'David Kung',
    country:'China',
    date:'Apr - 2017',
  }
];
const hubbers = [
  {
    image:'https://hubbers-us.oss-us-west-1.aliyuncs.com/HJH6dR7r4.jpeg',
    name:'Benjamin Vignon',
    country:'France',
    date:'Dec - 2017',
  },{
    image:'https://hubbers-us.oss-us-west-1.aliyuncs.com/HJfo814Dr.jpg',
    name:'Himanshi',
    country:'Singapore',
    date:'Apr - 2021',
  },{
    image:'https://ui-avatars.com/api/?background=444444&size=200&font-size=0.4&color=fff&name=selimbarkan',
    name:'Selim Barkan',
    country:'Singapore',
    date:'Dec - 2017',
  },{
    image:'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/H12cSpnZm.jpg',
    name:'Thomas Alix',
    country:'Viet Nam',
    date:'Jan - 2021',
  },{
    image:'https://hubbers-us.oss-us-west-1.aliyuncs.com/AVf7pEP7Z.png',
    name:'Max Henry',
    country:'China',
    date:'Jan - 2021',
  },{
    image:'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/rktekaIRX.jpg',
    name:'Rakesh  Murali',
    country:'Singapore',
    date:'Apr - 2021',
  }
];
const articles = [
  {
    url: 'https://blog.hubbers.io/the-story-of-an-inspiring-creator-and-his-career-through-iot/',
    image:'http://blog.hubbers.io/content/images/2020/12/Ware-2017--1-.JPG',
    date:'Apr 13 2019',
    content:'The story of an Inspiring Creator & career through IoT',
  },{
    url: 'https://blog.hubbers.io/inventor-communities-create-a-better-future-through-co-creation/',
    image:'http://blog.hubbers.io/content/images/2020/12/GF05.gif',
    date:'Jun 6 2019',
    content:'How inventor communities create a better future through co-creation',
  },{
    url: 'https://blog.hubbers.io/conscious-product-development/',
    image:'http://blog.hubbers.io/content/images/2020/12/rubbish.jpg',
    date:'Jul 11 2019',
    content:'How to lead conscious product development and create the future?',
  },{
    url: 'https://blog.hubbers.io/the-world-of-commercial-video-production-with-nausheen-ishtiaq-chen/',
    image:'http://blog.hubbers.io/content/images/2020/12/P1622486.jpg',
    date:'Jul 31 2019',
    content:'The world of commercial video production with Nausheen Ishtiaq-Chen',
  },{
    url: 'https://blog.hubbers.io/dropshipping-done-differently/',
    image:'http://blog.hubbers.io/content/images/2020/12/7Y8A3810.JPG',
    date:'Aug 15 2019',
    content:'Dropshipping done differently',
  },{
    url: 'https://blog.hubbers.io/hubbers-guide-to-prototyping/',
    image:'http://blog.hubbers.io/content/images/2020/12/Prototyping01.jpg',
    date:'Aug 21 2019',
    content:'Hubbers\' Guide to Prototyping',
  },{
    url: 'https://blog.hubbers.io/product-development-and-innovation-in-italy-vs-asia/',
    image:'http://blog.hubbers.io/content/images/2020/12/stefano1.png',
    date:'Sep 14 2019',
    content:'Product Development & Innovation in Italy, versus Asia',
  }
];
const events = [
  {
    url: '/hubbers/events/5d80d5a158de1b001ffaf69a/product-development-40-buenos-aires-argentina',
    image:'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/argentina.jpg',
    date:'Sep 22 2019',
    content:'Creators & Inventors Welcome! Hubbers introduces 4 product development tools to help creators successfully start and complete their product development journey.',
  },{
    url: '/hubbers/events/5d7756ae58de1b001ffad536/product-development-40-milan-italy',
    image:'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/milan.jpg',
    date:'JSep 16 2019',
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
const partners = [
  {
    url: '/hubbers/sponsor/5fc648e517706a0018c61a23',
    image:'https://hubbers-us.oss-us-west-1.aliyuncs.com/OeT5X1rU6.png',
    name:'Komaspec',
  }
];
const Community = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1082,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <MainPageHoc title="Community">
      <React.Fragment>
        <div className="pt-5 px-4">
          <h1 className="text-center fs-6 fw-6">Jump in a great community of innovators,<br/>experts and contributors</h1>
          <div className="progress-group d-flex fjc-center pt-4">
            <div className="progress-item">
              <div className="p-rel text-center">
                <Image width={100} height={100} src="/images/polygon/pol6.png"/>
                <span className="p-abs p-center fc-white fs-4 fw-6">1</span>
              </div>
              <p className="text-center fs-2 fw-5">Select the community<br/>you want to join</p>
            </div>
            <div className="progress-line"></div>
            <div className="progress-item">
              <div className="p-rel text-center">
                <Image width={100} height={100} src="/images/polygon/pol6.png"/>
                <span className="p-abs p-center fc-white fs-4 fw-6">2</span>
              </div>
              <p className="text-center fs-2 fw-5">Sign up</p>
            </div>
            <div className="progress-line"></div>
            <div className="progress-item">
              <div className="p-rel text-center">
                <Image width={100} height={100} src="/images/polygon/pol6.png"/>
                <span className="p-abs p-center fc-white fs-4 fw-6">3</span>
              </div>
              <p className="text-center fs-2 fw-5">Start hubbering</p>
            </div>
          </div>
          <Space size={16} wrap align="center" className="my-4 fjc-center w-100">
            <Button style={{ background: '#A9A5D1', borderColor: '#A9A5D1', color: 'white' }} size="large" shape="round">SINGAPORE</Button>
            <Button className="outline-orange" size="large" shape="round">AND 38 OTHERS</Button>
          </Space>
          <h2 className="text-center fs-5 fw-6">Singapore Community</h2>
          <div className="hubbers-hbb d-flex fjc-center">
            <div className="hubbers d-flex f-align-center mr-3">
              <div className="p-rel">
                <Image width={80} height={80} src="/images/polygon/pol7.png"/>
                <span className="p-abs p-center fs-1 fw-6 fc-white">11</span>
              </div>
              <div className="fw-6 fs-1">HUBBERS</div>
            </div>
            <div className="hbb d-flex f-align-center ml-3">
              <div className="p-rel">
                <Image width={80} height={80} src="/images/polygon/pol5.png"/>
                <span className="p-abs p-center fs-1 fw-6 fc-white">123455</span>
              </div>
              <div className="fw-6 fs-1">HBB collected</div>
            </div>
          </div>
          <div className="main-image text-center px-3">
            <img width="100%" src="/images/community/schanghai_2.png"/>
          </div>
          <Space size={16} wrap align="center" className="my-3 fjc-center w-100">
            <Button type="hbs-outline-primary" size="large" shape="round">SHARE AN ARTICLE</Button>
            <Button type="hbs-outline-primary" size="large" shape="round">SHARE AN ARTICLE</Button>
            <Button type="hbs-outline-primary" size="large" shape="round">HBB REWARD</Button>
          </Space>
        </div>
        <div className="community-leader bg-white pt-4 px-4">
          <h2 className="text-center fs-5 fw-6">Community leaders</h2>
          <Slider {...settings}>
            {
              leaders.map((leader, index) => {
                return <Userdata  key={index} image={leader.image} name={leader.name} country={leader.country} date={leader.date}/>;
              })
            }
          </Slider>
        </div>
        <div className="hubbers-singapore bg-white pt-4 px-4">
          <h2 className="text-center fs-5 fw-6">They have just joined Hubbers Singapore</h2>
          <Slider {...settings}>
            {
              hubbers.map((hubber, index) => {
                return <Userdata key={index} image={hubber.image} name={hubber.name} country={hubber.country} date={hubber.date}/>;
              })
            }
          </Slider>
        </div>
        <Row className="container py-5">
          <Col lg={12} xs={24} className="px-3">
            <h2 className="fs-5 fw-6">Latest activities</h2>
            <p>Benjamin has submitted a new entry on the contest Scooter Delivery Case</p>
            <p>Benjamin has submitted a new entry on the contest Scooter Delivery Case</p>
            <p>Benjamin has submitted a new entry on the contest Scooter Delivery Case</p>
            <p>Benjamin has submitted a new entry on the contest Scooter Delivery Case</p>
          </Col>
          <Col lg={12} xs={24} className="px-3">
            <h2 className="fs-5 fw-6">Latest threads</h2>
            <p>Benjamin has submitted a new entry on the contest Scooter Delivery Case</p>
            <p>Benjamin has submitted a new entry on the contest Scooter Delivery Case</p>
            <p>Benjamin has submitted a new entry on the contest Scooter Delivery Case</p>
            <p>Benjamin has submitted a new entry on the contest Scooter Delivery Case</p>
          </Col>
        </Row>
        <div className="w-100 bg-white">
          <DeskCommunity title="Latest Blog Article" blog={articles}/>
        </div>
        <div className="w-100">
          <DeskCommunity title="Upcoming Events" blog={events}/>
        </div>
        <div className="w-100 bg-white py-5">
          <div className="container">
            <h2 className="fw-6 fs-4">Sponsors & Partners</h2>
            <Slider {...settings}>
              {
                partners.map((partner, index) => {
                  return <a key={index} href={partner.url} className="text-center">
                    <Image width="210" height="220" src={partner.image} />
                    <h3>{partner.name}</h3>
                  </a>;
                })
              }
            </Slider>
          </div>
        </div>
      </React.Fragment>
    </MainPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Community;