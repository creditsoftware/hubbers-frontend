import { Col, Row } from 'antd';
import React from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Container, HubbersTeamMemberTile } from '../../components';
import { MainPageHoc } from '../../containers';
import Link from 'next/link';
const Marketplace = () => {
  const size = useWindowSize();
  return (
    <MainPageHoc title='Who We Are'>
      <Container>
        <React.Fragment>
          <h1 className="fw-6 mt-5 fs-5">
            We are making Hubbers: working, mentoring, volunteering for the community
          </h1>
          <Row>
            <Col lg={6} className='p-3'>
              <HubbersTeamMemberTile />
            </Col>
            <Col lg={6} className='p-3'>
              <HubbersTeamMemberTile />
            </Col>
            <Col lg={6} className='p-3'>
              <HubbersTeamMemberTile />
            </Col>
            <Col lg={6} className='p-3'>
              <HubbersTeamMemberTile />
            </Col>
            <Col lg={6} className='p-3'>
              <HubbersTeamMemberTile />
            </Col>
            <Col lg={6} className='p-3'>
              <HubbersTeamMemberTile />
            </Col>
            <Col lg={6} className='p-3'>
              <Link href='/hubbers/hubbers-job-board'>
                <a>
                  <HubbersTeamMemberTile end={true} />
                </a>
              </Link>
            </Col>
          </Row>
          <div className="text-center fs-2 my-5">
            They were here! HOMMAGE to the ones that have contributed and participated to the success of Hubbers.
          </div>
          <Swiper
            spaceBetween={20}
            slidesPerView={
              size.width > 1024 ? 6 : size.width > 768 ? 4 : size.width > 576 ? 2 : 1
            }
            pagination={{ clickable: true }}
            autoplay={{
              delay: 100,
              disableOnInteraction: false
            }}
            loop
            className='mb-5'
          >
            <SwiperSlide>
              <HubbersTeamMemberTile />
            </SwiperSlide>
            <SwiperSlide>
              <HubbersTeamMemberTile />
            </SwiperSlide>
            <SwiperSlide>
              <HubbersTeamMemberTile />
            </SwiperSlide>
            <SwiperSlide>
              <HubbersTeamMemberTile />
            </SwiperSlide>
            <SwiperSlide>
              <HubbersTeamMemberTile />
            </SwiperSlide>
            <SwiperSlide>
              <HubbersTeamMemberTile />
            </SwiperSlide>
            <SwiperSlide>
              <HubbersTeamMemberTile />
            </SwiperSlide>
            <SwiperSlide>
              <HubbersTeamMemberTile />
            </SwiperSlide>
          </Swiper>
        </React.Fragment>
      </Container>
    </MainPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Marketplace;