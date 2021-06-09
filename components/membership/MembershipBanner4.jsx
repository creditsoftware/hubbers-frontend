import React from 'react';
import { Row, Col } from 'antd';
import Image from 'next/image';
import { Container } from '../Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Scrollbar, A11y } from 'swiper';
export const MembershipBanner4 = () => {
  SwiperCore.use([Pagination, Scrollbar, A11y]);
  return (
    <Container className='py-4'>
      <React.Fragment>
        <h1 className="fw-6 text-center fs-5">
          Collaborative spirit and love sharing experiences.
        </h1>
        <Row>
          <Col lg={12} md={12} sm={0}>
            <Image
              width={700}
              height={500}
              src='/images/membership/membership2_-min.jpg'
              placeholder={
                <Image
                  preview={false}
                  src="/images/membership/membership2_-min.jpg?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                  width={200}
                />
              }
            />
          </Col>
          <Col lg={12} md={12} sm={0}>
            <Image
              width={700}
              height={500}
              src='/images/membership/picture_for_membership1-min.jpg'
              placeholder={
                <Image
                  preview={false}
                  src="/images/membership/picture_for_membership1-min.jpg?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                  width={200}
                />
              }
            />
          </Col>
          <Col lg={0} md={0} sm={24}>
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
                <Image
                  width={700}
                  height={500}
                  src='/images/membership/membership2_-min.jpg'
                  placeholder={
                    <Image
                      preview={false}
                      src="/images/membership/membership2_-min.jpg?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                      width={200}
                    />
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  width={700}
                  height={500}
                  src='/images/membership/picture_for_membership1-min.jpg'
                  placeholder={
                    <Image
                      preview={false}
                      src="/images/membership/picture_for_membership1-min.jpg?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                      width={200}
                    />
                  }
                />
              </SwiperSlide>
            </Swiper>
          </Col>
        </Row>
      </React.Fragment>
    </Container>
  );
};
