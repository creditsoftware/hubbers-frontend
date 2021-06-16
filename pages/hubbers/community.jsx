import React from 'react';
import Image from 'next/image';
import { Button, Space } from 'antd';
import { Row, Col } from 'antd';
import { MainPageHoc } from '../../containers';
import { Userdata, CommunityProgress, Container, GlobalEventSlider, GlobalBlogSlider } from '../../components';
import Slider from 'react-slick';

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
    arrows: false,
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
        <Container className='pt-5 px-4 pb-4'>
          <React.Fragment>
            <h1 className="text-center fs-6 fw-6">Jump in a great community of innovators,<br/>experts and contributors</h1>
            <CommunityProgress />
            <Space size={16} wrap align="center" className="my-4 fjc-center w-100">
              <Button style={{ background: '#A9A5D1', borderColor: '#A9A5D1', color: 'white' }} size="large" shape="round">SINGAPORE</Button>
              <Button className="hbs-outline-orange" size="large" shape="round">AND 38 OTHERS</Button>
            </Space>
            <h2 className="text-center fs-5 fw-6">Singapore Community</h2>
            <div className="hubbers-hbb d-flex fjc-center">
              <div className="d-flex f-align-center mr-3">
                <div className="p-rel">
                  <Image width={80} height={80} src="/images/polygon/pol7.png"/>
                  <span className="p-abs p-center fs-1 fw-6 fc-white">11</span>
                </div>
                <div className="fw-6 fs-1">HUBBERS</div>
              </div>
              <div className="d-flex f-align-center ml-3">
                <div className="p-rel">
                  <Image width={80} height={80} src="/images/polygon/pol5.png"/>
                  <span className="p-abs p-center fs-1 fw-6 fc-white">123455</span>
                </div>
                <div className="fw-6 fs-1">HBB collected</div>
              </div>
            </div>
            <div className="text-center px-3">
              <Image width={800} height={400} src='/images/community/schanghai_2.png'/>
            </div>
            <Space size={16} wrap align="center" className="my-3 fjc-center w-100">
              <Button type="hbs-outline-primary" size="large" shape="round">SHARE AN ARTICLE</Button>
              <Button type="hbs-outline-primary" size="large" shape="round">SHARE AN ARTICLE</Button>
              <Button type="hbs-outline-primary" size="large" shape="round">HBB REWARD</Button>
            </Space>
          </React.Fragment>
        </Container>
        <div className="community-leader bg-white pt-5 px-4">
          <Container>
            <React.Fragment>
              <h2 className="text-center fs-5 fw-6">Community leaders</h2>
              <Slider {...settings}>
                {
                  leaders.map((leader, index) => {
                    return <Userdata  key={index} image={leader.image} name={leader.name} country={leader.country} date={leader.date}/>;
                  })
                }
              </Slider>
              <h2 className="text-center fs-5 fw-6">They have just joined Hubbers Singapore</h2>
              <Slider {...settings}>
                {
                  hubbers.map((hubber, index) => {
                    return <Userdata key={index} image={hubber.image} name={hubber.name} country={hubber.country} date={hubber.date}/>;
                  })
                }
              </Slider>
            </React.Fragment>
          </Container>
        </div>
        <Container>
          <Row className="py-5 mx--3">
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
        </Container>
        <div className="bg-white">
          <Container>
            <GlobalBlogSlider/>
          </Container>
        </div>
        <Container>
          <GlobalEventSlider/>
        </Container>
        <div className="bg-white py-5">
          <Container>
            <React.Fragment>
              <h2 className="fw-6 fs-5">Sponsors & Partners</h2>
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
            </React.Fragment>
          </Container>
        </div>
      </React.Fragment>
    </MainPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Community;