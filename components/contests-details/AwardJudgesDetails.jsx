import React from 'react';
import { Avatar } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
export const AwardJudgesDetails = props => {
  const [judges, setJudges] = React.useState(null);
  React.useEffect(() => {
    if(props.data) {
      let v = props.data.contestMembers.filter((judge) => judge.role ==='judge');
      if(v) setJudges(v);
    }
  },[props.data])
  return (
    <div className="w-100 bg-white text-center mb-4" style={{ borderTop: '1px solid #bbb' }}>
        <Swiper
          modules={[Scrollbar]}
          spaceBetween={5}
          slidesPerView={5}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {
            judges && judges.map((item, index) =>
              <SwiperSlide style={{width: "20%"}}>
                <div key={index} className="pt-5 pb-4">
                  <Avatar size={100} src={item.user.avatar} />
                  <h1 className="pt-3">{item.user.firstname} {item.user.lastname}</h1>
                </div>
              </SwiperSlide>
            )
          }
        </Swiper>
    </div>
  );
};