import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
SwiperCore.use([Navigation]);
export const GuestSpeakers = () => {
  return (
    <div className='guest-speaker'>
      <div className='text-center mb-4'>
        <span className='text-upper fw-6 fs-3'>OUR GUEST SPEAKERS</span>
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        observer
        loop
        observeParents
      >
        <SwiperSlide>
          <div className='text-center'>
            <Avatar
              size={{ xs: 40, sm: 60, md: 80, lg: 80, xl: 80, xxl: 80 }}
              icon={<AntDesignOutlined />}
            />
            <div className='guest-speaker-name pt-3 text-center fw-5 fs-3'>
              Franco Duilio Chimento
            </div>
          </div>
          <div className='guest-speaker-desig'>
            Product designer; Research scholar and teacher at the National University of Mar del Plata.
          </div>
          <div className='guest-speaker-description'>
            Franco is an industrial Designer who graduated from the National University of Mar del Plata (FAUD), and the Federal University of Minas Gerais, Brazil (UFMG). Currently he is sharing his time between Mar del Plata and Buenos Aires, and working as a concept designer in furniture and product design and as a researcher in the field of design strategies from local culture and tradition. In the past several years, Franco has been awarded in -- Selected for INNOVAR National Innovation Contest Exhibition. Usina del Arte, Buenos Aires; First Solo exhibition called: “Cuerpos Cosidos”. Link between theater, art and design. ROXY Art Center. Mar del Plata; Selected for Deseo Project. Salón Enlace; Experimental Design Salon for furniture Innovation. Paseo Alcorta, Buenos Aires; Selected for INNOVAR National Innovation Contest Exhibition. Technopolis, Buenos Aires; Tok &amp; Stok University Design Award. São Paulo, Brazil; Selected for INNOVAR National Innovation Contest Exhibition. Technopolis, Buenos Aires.
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='text-center'>
            <Avatar
              size={{ xs: 40, sm: 60, md: 80, lg: 80, xl: 80, xxl: 80 }}
              icon={<AntDesignOutlined />}
            />
            <div className='guest-speaker-name pt-3 text-center fw-5 fs-3'>
              Franco Duilio Chimento
            </div>
          </div>
          <div className='guest-speaker-desig'>
            Product designer; Research scholar and teacher at the National University of Mar del Plata.
          </div>
          <div className='guest-speaker-description'>
            Franco is an industrial Designer who graduated from the National University of Mar del Plata (FAUD), and the Federal University of Minas Gerais, Brazil (UFMG). Currently he is sharing his time between Mar del Plata and Buenos Aires, and working as a concept designer in furniture and product design and as a researcher in the field of design strategies from local culture and tradition. In the past several years, Franco has been awarded in -- Selected for INNOVAR National Innovation Contest Exhibition. Usina del Arte, Buenos Aires; First Solo exhibition called: “Cuerpos Cosidos”. Link between theater, art and design. ROXY Art Center. Mar del Plata; Selected for Deseo Project. Salón Enlace; Experimental Design Salon for furniture Innovation. Paseo Alcorta, Buenos Aires; Selected for INNOVAR National Innovation Contest Exhibition. Technopolis, Buenos Aires; Tok &amp; Stok University Design Award. São Paulo, Brazil; Selected for INNOVAR National Innovation Contest Exhibition. Technopolis, Buenos Aires.
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='text-center'>
            <Avatar
              size={{ xs: 40, sm: 60, md: 80, lg: 80, xl: 80, xxl: 80 }}
              icon={<AntDesignOutlined />}
            />
            <div className='guest-speaker-name pt-3 text-center fw-5 fs-3'>
              Franco Duilio Chimento
            </div>
          </div>
          <div className='guest-speaker-desig'>
            Product designer; Research scholar and teacher at the National University of Mar del Plata.
          </div>
          <div className='guest-speaker-description'>
            Franco is an industrial Designer who graduated from the National University of Mar del Plata (FAUD), and the Federal University of Minas Gerais, Brazil (UFMG). Currently he is sharing his time between Mar del Plata and Buenos Aires, and working as a concept designer in furniture and product design and as a researcher in the field of design strategies from local culture and tradition. In the past several years, Franco has been awarded in -- Selected for INNOVAR National Innovation Contest Exhibition. Usina del Arte, Buenos Aires; First Solo exhibition called: “Cuerpos Cosidos”. Link between theater, art and design. ROXY Art Center. Mar del Plata; Selected for Deseo Project. Salón Enlace; Experimental Design Salon for furniture Innovation. Paseo Alcorta, Buenos Aires; Selected for INNOVAR National Innovation Contest Exhibition. Technopolis, Buenos Aires; Tok &amp; Stok University Design Award. São Paulo, Brazil; Selected for INNOVAR National Innovation Contest Exhibition. Technopolis, Buenos Aires.
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};