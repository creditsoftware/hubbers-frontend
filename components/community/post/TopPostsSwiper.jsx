import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DiscoverPostTile } from './DiscoverPostTile';
import { useWindowSize } from '../../../hooks';
export const TopPostSwiper = () => {
  const size = useWindowSize();
  return <Swiper
    spaceBetween={20}
    slidesPerView={
      size.width > 1024 ? 4 : size.width > 768 ? 3 : size.width > 576 ? 2 : 1
    }
    autoplay={{
      delay: 100,
      disableOnInteraction: false
    }}
    loop
    className='homepage-main-banner'
  >
    <SwiperSlide>
      <DiscoverPostTile />
    </SwiperSlide>
    <SwiperSlide>
      <DiscoverPostTile />
    </SwiperSlide>
    <SwiperSlide>
      <DiscoverPostTile />
    </SwiperSlide>
    <SwiperSlide>
      <DiscoverPostTile />
    </SwiperSlide>
    <SwiperSlide>
      <DiscoverPostTile />
    </SwiperSlide>
    <SwiperSlide>
      <DiscoverPostTile />
    </SwiperSlide>
    <SwiperSlide>
      <DiscoverPostTile />
    </SwiperSlide>
    <SwiperSlide>
      <DiscoverPostTile />
    </SwiperSlide>
  </Swiper>;
};