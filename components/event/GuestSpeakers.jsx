import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';

SwiperCore.use([Navigation]);

export const GuestSpeakers = ({ eventData }) => {
  return (
    <div className='guest-speaker mt-5'>
      <div className='text-center mb-4'>
        <span className='text-upper fw-6 fs-3'>OUR GUEST SPEAKERS</span>
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        observer
        observeParents
      >
        {
          eventData.speakers?.map((item) => {
            return <SwiperSlide key={item.id}>
              <div className='text-center'>
                <Avatar
                  size={{ xs: 40, sm: 60, md: 80, lg: 80, xl: 80, xxl: 80 }}
                  icon={<AntDesignOutlined />}
                  src={item.imageUrl}
                />
                <div className='guest-speaker-name pt-3 text-center fw-5 fs-3'>
                  {item.name}
                </div>
              </div>
              <div className='guest-speaker-desig'>
                {item.position}
              </div>
              <div className='guest-speaker-description text-center'>
                {item.bio}
              </div>
            </SwiperSlide>;
          })
        }
      </Swiper>
    </div>
  );
};