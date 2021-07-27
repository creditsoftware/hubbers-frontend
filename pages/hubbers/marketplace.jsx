import { Button, Row, Col, Dropdown, Space, Slider, Card, Avatar } from 'antd';
import { CaretDownOutlined, StarFilled } from '@ant-design/icons';
import React from 'react';
import Image from 'next/image';
import { MainBanner, Container } from '../../components';
import { MainPageHoc } from '../../containers';
import Link from 'next/link';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import useSWR from 'swr';
import { jwtDecode } from '../../utils/jwt';
import { fetcher } from '../../utils/fetcher';
const categories = [
  {
    name: 'brainstorming',
    icon: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/ideation.png',
  }, {
    name: 'design',
    icon: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/design.png'
  }, {
    name: 'legal',
    icon: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/legal.png'
  }, {
    name: 'prototyping',
    icon: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/prototyping.png'
  }, {
    name: 'manufacturing',
    icon: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/manufacturing.png'
  }, {
    name: 'sales distribution',
    icon: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/sales.png'
  }, {
    name: 'marketing',
    icon: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/marketing.png'
  }, {
    name: 'packaging',
    icon: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/packaging.png'
  }
];
const countries = [
  {
    name: 'china',
    flag: 'https://www.countryflags.io/CN/flat/64.png'
  },
  {
    name: 'united state',
    flag: 'https://www.countryflags.io/US/flat/64.png'
  },
  {
    name: 'france',
    flag: 'https://www.countryflags.io/FR/flat/64.png'
  },
  {
    name: 'germany',
    flag: 'https://www.countryflags.io/DE/flat/64.png'
  },
  {
    name: 'south korea',
    flag: 'https://www.countryflags.io/KR/flat/64.png'
  },
  {
    name: 'hong kong',
    flag: 'https://www.countryflags.io/HK/flat/64.png'
  },
  {
    name: 'united kingdom',
    flag: 'https://www.countryflags.io/UK/flat/64.png'
  },
  {
    name: 'spain',
    flag: 'https://www.countryflags.io/ES/flat/64.png'
  },
  {
    name: 'australia',
    flag: 'https://www.countryflags.io/AU/flat/64.png'
  },
  {
    name: 'singapore',
    flag: 'https://www.countryflags.io/SG/flat/64.png'
  },
  {
    name: 'japan',
    flag: 'https://www.countryflags.io/JP/flat/64.png'
  },
  {
    name: 'canada',
    flag: 'https://www.countryflags.io/CA/flat/64.png'
  },
  {
    name: 'italy',
    flag: 'https://www.countryflags.io/IT/flat/64.png'
  },
  {
    name: 'india',
    flag: 'https://www.countryflags.io/IN/flat/64.png'
  },
  {
    name: 'sweden',
    flag: 'https://www.countryflags.io/SE/flat/64.png'
  },
  {
    name: 'switzerland',
    flag: 'https://www.countryflags.io/CH/flat/64.png'
  },
  {
    name: 'belgium',
    flag: 'https://www.countryflags.io/BE/flat/64.png'
  }
];
const expertises = [
  {
    backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZAmjoTxspONhxxaJJLM6fZ1HyszZZjtnSmtlQ6bqyjPVPisct',
    avatar: 'https://hubbers-us.oss-us-west-1.aliyuncs.com/TO47iqPE3.png',
    name: 'Willow Bowen',
    level: '2',
    description: 'I write a clear solution to the problem your product want to...',
    star: '5',
    star1: '12',
    price: '500'
  },
  {
    backgroundImage: 'https://cdn.pixabay.com/photo/2016/06/05/16/02/crowd-1437612_960_720.png',
    avatar: 'https://hubbers-us.oss-us-west-1.aliyuncs.com/iN7uX-HQy.jpeg',
    name: 'George Brown',
    level: '1',
    description: 'I Will Be Your Crowdfunding Consultant',
    star: '5',
    star1: '11',
    price: '150'
  },
  {
    backgroundImage: 'https://fiverr-res.cloudinary.com/t_main2_video,q_auto,f_auto/v1/vzrthumb/12620837/image',
    avatar: 'https://hubbers-us.oss-us-west-1.aliyuncs.com/9IzQgA3gI.jpeg',
    name: 'Corey Stills',
    level: '0',
    description: 'I Will Do 3d Rendering And Animation Of Your Product Profess...',
    star: '5',
    star1: '3',
    price: '275'
  },
  {
    backgroundImage: 'https://images.pexels.com/photos/257949/pexels-photo-257949.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
    avatar: 'https://hubbers-us.oss-us-west-1.aliyuncs.com/HcJa6ito_.jpeg',
    name: 'Render Master',
    level: '2',
    description: 'I Will Do A Comprehensive Market Research',
    star: '5',
    star1: '18',
    price: '50'
  },
  {
    backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToXdOCl6Q-YGXsPwOEB8VYhb6hxkEdkToTuThECpK3upmKWz-N',
    avatar: 'https://hubbers-us.oss-us-west-1.aliyuncs.com/mQmtxwiMv.jpeg',
    name: 'Seo Star',
    level: '2',
    description: 'I Will create premium brand and business name, with domain',
    star: '5',
    star1: '16',
    price: '130'
  },
];
const Marketplace = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [overlayIndex, setOverlayIndex] = React.useState(null);
  return (
    <MainPageHoc title='Marketplace' auth={{ ...data }}>
      <React.Fragment>
        <MainBanner
          title='EXPLORE THE MARKETPLACE'
          url='https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/pldt/expert-packages-hero-bg%281%29.png'
          date={<Button type='hbs-primary' shape='round' size='large'>START EXPLORING</Button>}
        />
        <Container>
          <React.Fragment>
            <Dropdown
              overlay={
                <div className='bg-white br-1 p-4'>
                  {
                    overlayIndex === 'category' &&
                    <Row>
                      {
                        categories.map((item, index) => {
                          return <Col key={index} lg={4}>
                            <Link href='#'>
                              <a>
                                <Space direction='vertical' className='text-center w-100'>
                                  <Image width={70} height={70} src={item.icon} />
                                  <p className='text-center text-upper'>{item.name}</p>
                                </Space>
                              </a>
                            </Link>
                          </Col>;
                        })
                      }
                    </Row>
                  }
                  {
                    overlayIndex === 'expert' &&
                    <Row>
                      {
                        countries.map((item, index) => {
                          return <Col key={index} lg={4}>
                            <Link href='#'>
                              <a>
                                <Space direction='vertical' className='text-center w-100'>
                                  <Image width={70} height={70} src={item.flag} />
                                  <p className='text-center text-upper'>{item.name}</p>
                                </Space>
                              </a>
                            </Link>
                          </Col>;
                        })
                      }
                    </Row>
                  }
                  {
                    overlayIndex === 'budget' &&
                    <React.Fragment>
                      <div className="text-center fs-3">Select your budget?</div>
                      <Slider range defaultValue={[50, 5000]} min={0} max={8000} marks={{ 0: '0', 8000: '8000' }} />
                    </React.Fragment>
                  }
                </div>
              }
              trigger='click'
            >
              <Row className='my-4'>
                <Col lg={8} md={8}>
                  <Button type='text' style={{ height: 'auto', width: '100%' }} onClick={() => setOverlayIndex('category')}>
                    <div className='fs-1' style={{ color: '#838383' }}>
                      What is the category of your products?
                    </div>
                    <div className='fs-2 fc-primary'>
                      SELECT CATEGORY
                      <CaretDownOutlined />
                    </div>
                  </Button>
                </Col>
                <Col lg={8} md={8}>
                  <Button type='text' style={{ height: 'auto', width: '100%' }} onClick={() => setOverlayIndex('expert')}>
                    <div className='fs-1' style={{ color: '#838383' }}>
                      Search for localize experts
                    </div>
                    <div className='fs-2 fc-primary'>
                      ADD LOCATION
                      <CaretDownOutlined />
                    </div>
                  </Button>
                </Col>
                <Col lg={8} md={8}>
                  <Button type='text' style={{ height: 'auto', width: '100%' }} onClick={() => setOverlayIndex('budget')}>
                    <div className='fs-1' style={{ color: '#838383' }}>
                      Do you have a budget?
                    </div>
                    <div className='fs-2 fc-primary'>
                      ADD BUDGET
                      <CaretDownOutlined />
                    </div>
                  </Button>
                </Col>
              </Row>
            </Dropdown>
            <Card title='1 Expertise Found'>
              <Row>
                {
                  expertises.map((item, index) => {
                    return <Col key={index} lg={6} md={4} sm={2} xs={1} className='p-1'>
                      <Card actions={[<div className='text-right pr-4' key='1'>from {item.price}USD</div>]}>
                        <div>
                          <Image width={500} height={300} src={item.backgroundImage} />
                        </div>
                        <Space>
                          <Avatar size={50} src={item.avatar} />
                          <Space direction='vertical'>
                            <p className='m-0'>{item.name}</p>
                            <p className='m-0'>{item.level !== '0' ? `Level ${item.level}` : 'New'}</p>
                          </Space>
                        </Space>
                        <p>
                          {
                            item.description
                          }
                        </p>
                        <Space>
                          <StarFilled className='fc-primary' />
                          <span className='fc-primary'>{item.star}</span>
                          <span>({item.star1})</span>
                        </Space>
                      </Card>
                    </Col>;
                  })
                }
              </Row>
            </Card>
          </React.Fragment>
        </Container>
      </React.Fragment>
    </MainPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: false } } };
  }
});
export default Marketplace;