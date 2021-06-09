import React from 'react';
import { Col, Row } from 'antd';
import useWindowSize from '../hooks/useWindowSize';
import Image from 'next/image';
import { MailChimp } from './MailChimp';
import { Container } from './Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Scrollbar, A11y } from 'swiper';
export const HomepageMainBanner = () => {
  const size = useWindowSize();
  SwiperCore.use([Pagination, Scrollbar, A11y]);
  return (
    <Swiper
      spaceBetween={0}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 100,
        disableOnInteraction: false
      }}
      loop
      className='homepage-main-banner'
    >
      <SwiperSlide>
        <div className='homepage-banner-item'>
          <Container>
            <Row>
              <Col span={size.width > 991 ? 16 : 24}>
                <h1 className="fw-6 fs-6 text-center pt-5">
                  Community-powered Hub to launch innovative products
                </h1>
                <h2 className="fw-5 fs-4 text-center">
                  Bridging the gap between product creators, experts, resourses
                </h2>
                <div className="my-5">
                  <MailChimp
                    label='Enter your email to stay updated'
                    placeholder='Enter your email to get started ...'
                  />
                </div>
              </Col>
              <Col span={size.width > 991 ? 8 : 0}>
                <div className="d-flex f-align-center w-100 h-100">
                  <Image
                    src="/images/homepage/banner-img.png"
                    alt=""
                    width={500}
                    height={500}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='homepage-banner-item'>
          <Container>
            <Row>
              <Col span={size.width > 991 ? 16 : 24}>
                <h1 className="fw-6 fs-6 text-center pt-5">
                  Access the right tools to launch your product
                </h1>
                <h2 className="fw-5 fs-4">
                  Bridging the gap between product creators, experts, resourses
                </h2>
                <div className="my-5">
                  <MailChimp
                    label='Enter your email to stay updated'
                    placeholder='Enter your email to get started ...'
                  />
                </div>
              </Col>
              <Col span={size.width > 991 ? 8 : 0}>
                <div className="d-flex f-align-center w-100 h-100">
                  <Image
                    src="/images/homepage/banner-img.png"
                    alt=""
                    width={500}
                    height={500}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='homepage-banner-item'>
          <Container>
            <Row>
              <Col span={size.width > 991 ? 16 : 24}>
                <h1 className="fw-6 fs-6 text-center pt-5">
                  Community-powered Hub to launch innovative products
                </h1>
                <h2 className="fw-5 fs-4 text-center">
                  Bridging the gap between product creators, experts, resourses
                </h2>
                <div className="my-5">
                  <MailChimp
                    label='Enter your email to stay updated'
                    placeholder='Enter your email to get started ...'
                  />
                </div>
              </Col>
              <Col span={size.width > 991 ? 8 : 0}>
                <div className="d-flex f-align-center w-100 h-100">
                  <Image
                    src="/images/homepage/banner-img.png"
                    alt=""
                    width={500}
                    height={500}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='homepage-banner-item'>
          <Container>
            <Row>
              <Col span={size.width > 991 ? 16 : 24}>
                <h1 className="fw-6 fs-6 text-center pt-5">
                  Access the right tools to launch your product
                </h1>
                <h2 className="fw-5 fs-4">
                  Bridging the gap between product creators, experts, resourses
                </h2>
                <div className="my-5">
                  <MailChimp
                    label='Enter your email to stay updated'
                    placeholder='Enter your email to get started ...'
                  />
                </div>
              </Col>
              <Col span={size.width > 991 ? 8 : 0}>
                <div className="d-flex f-align-center w-100 h-100">
                  <Image
                    src="/images/homepage/banner-img.png"
                    alt=""
                    width={500}
                    height={500}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
