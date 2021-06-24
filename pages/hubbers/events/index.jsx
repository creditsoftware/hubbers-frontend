import React from 'react';
import { MainPageHoc } from '../../../containers';
import { MainBanner, EventItemSection } from '../../../components';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
const Event = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const event = [
    {
      day: '22',
      month: 'Sep',
      time: '18:00',
      second: '00',
      countryName: 'Buenos Aires, Argentina',
      imgRoute: '/images/icons/map-localization.svg',
      event: 'WeWork, Torre Bellini, Esmeralda 950, Capital Federal , Buenos Aires C1007ABL, Argentina',
      product: 'Product Development 4.0 Buenos Aires, Argentina',
      description: 'Creators & Inventors Welcome! Hubbers introduces 4 product development tools to help creators successfully start and complete their product development journey. ',
      speakers: '/images/icons/chat-bubbles.svg',
      actor: 'Juan Ibagon, Franco Duilio Chimento',
      imgUrl: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/argentina.jpg'
    },
    {
      day: '24',
      month: 'Jul',
      time: '18:30',
      second: '00',
      countryName: 'Milan, Italy',
      imgRoute: '/images/icons/map-localization.svg',
      event: 'Milano LUISS Hub, Massimo D’Azeglio 3 - 20154 Milano',
      product: 'Product Development 4.0 Buenos Aires, Argentina',
      description: 'Creators & Inventors Welcome! Hubbers introduces 4 product development tools to help creators successfully start and complete their product development journey. ',
      speakers: '/images/icons/chat-bubbles.svg',
      actor: 'Juan Ibagon, Franco Duilio Chimento',
      imgUrl: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/milan.jpg'
    },
    {
      day: '22',
      month: 'Sep',
      time: '18:00',
      second: '00',
      countryName: 'Barcelona, Spain',
      imgRoute: '/images/icons/map-localization.svg',
      event: 'WeWork, Torre Bellini, Esmeralda 950, Capital Federal , Buenos Aires C1007ABL, Argentina',
      product: 'Product Development 4.0 Barcelona, Spain',
      description: 'Creators & Inventors Welcome! Hubbers introduces 4 product development tools to help creators successfully start and complete their product development journey. ',
      speakers: '/images/icons/chat-bubbles.svg',
      actor: 'Juan Ibagon, Franco Duilio Chimento',
      imgUrl: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/barcelona.jpg'
    },
    {
      day: '22',
      month: 'Sep',
      time: '18:00',
      second: '00',
      countryName: 'Lisbon, Portugal',
      imgRoute: '/images/icons/map-localization.svg',
      event: 'WeWork, Torre Bellini, Esmeralda 950, Capital Federal , Buenos Aires C1007ABL, Argentina',
      product: 'Product Development 4.0 Lisbon, Portugal',
      description: 'Creators & Inventors Welcome! Hubbers introduces 4 product development tools to help creators successfully start and complete their product development journey. ',
      speakers: '/images/icons/chat-bubbles.svg',
      actor: 'Juan Ibagon, Franco Duilio Chimento',
      imgUrl: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/lisbon.jpg'
    },
    {
      day: '22',
      month: 'Sep',
      time: '18:00',
      second: '00',
      countryName: 'Lisbon, Portugal',
      imgRoute: '/images/icons/map-localization.svg',
      event: 'WeWork, Torre Bellini, Esmeralda 950, Capital Federal , Buenos Aires C1007ABL, Argentina',
      product: 'Product Development 4.0 Lisbon, Portugal',
      description: 'Creators & Inventors Welcome! Hubbers introduces 4 product development tools to help creators successfully start and complete their product development journey. ',
      speakers: '/images/icons/chat-bubbles.svg',
      actor: 'Juan Ibagon, Franco Duilio Chimento',
      imgUrl: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/melbourne.jpg'
    },
    {
      day: '22',
      month: 'Sep',
      time: '18:00',
      second: '00',
      countryName: 'Melbourne, Australia',
      imgRoute: '/images/icons/map-localization.svg',
      event: 'WeWork, Torre Bellini, Esmeralda 950, Capital Federal , Buenos Aires C1007ABL, Argentina',
      product: 'Product Development 4.0 Melbourne, Australia',
      description: 'Creators & Inventors Welcome! Hubbers introduces 4 product development tools to help creators successfully start and complete their product development journey. ',
      speakers: '/images/icons/chat-bubbles.svg',
      actor: 'Juan Ibagon, Franco Duilio Chimento',
      imgUrl: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/jakarta.jpg'
    },
    {
      day: '22',
      month: 'Sep',
      time: '18:00',
      second: '00',
      countryName: 'Jakarta, Indonesia',
      imgRoute: '/images/icons/map-localization.svg',
      event: 'WeWork, Torre Bellini, Esmeralda 950, Capital Federal , Buenos Aires C1007ABL, Argentina',
      product: 'Product Development 4.0 Jakarta, Indonesia',
      description: 'Creators & Inventors Welcome! Hubbers introduces 4 product development tools to help creators successfully start and complete their product development journey. ',
      speakers: '/images/icons/chat-bubbles.svg',
      actor: 'Juan Ibagon, Franco Duilio Chimento',
      imgUrl: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/mumbai.jpg'
    },
    {
      day: '22',
      month: 'Sep',
      time: '18:00',
      second: '00',
      countryName: 'Mumbai, India',
      imgRoute: '/images/icons/map-localization.svg',
      event: 'WeWork, Torre Bellini, Esmeralda 950, Capital Federal , Buenos Aires C1007ABL, Argentina',
      product: 'Product Development 4.0 Mumbai, India',
      description: 'Creators & Inventors Welcome! Hubbers introduces 4 product development tools to help creators successfully start and complete their product development journey. ',
      speakers: '/images/icons/chat-bubbles.svg',
      actor: 'Juan Ibagon, Franco Duilio Chimento',
      imgUrl: 'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/bangkok.jpg'
    }
  ];
  return (
    <MainPageHoc title='Hubers events' auth={{ ...data }}>
      <React.Fragment>
        <MainBanner title={'GLOVAL EVENTS'} date={''} url={'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/home-banner-1.jpg'} />
        <div className='event-group mt-5 mb-5'>
          {
            event.map((item, index) => {
              return <EventItemSection
                {...item}
                key={index}
              />;
            })
          }
        </div>
      </React.Fragment>
    </MainPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req } = ctx;
  const user = await req.session.get('user');
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: false } } };
  }
});
export default Event;