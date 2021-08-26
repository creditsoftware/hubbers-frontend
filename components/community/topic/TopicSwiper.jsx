import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useWindowSize } from '../../../hooks';
import { useRouter } from 'next/router';
import { fetchJson } from '../../../utils/fetchJson';
import { API } from '../../../constants';
import { DiscoverTopicTile } from './DiscoverTopicTile';
export const TopicSwiper = () => {
  const size = useWindowSize();
  const router = useRouter();
  const [topicList, setTopicList] = React.useState([]);
  React.useEffect(() => {
    fetchJson(`${API.LOCAL_ALL_TOPIC_LIST_API}?communityId=${router.query.community}`).then((response) => {
      setTopicList(response);
    }).catch(() => {
      setTopicList([]);
    });
  }, [router]);
  return <Swiper
    spaceBetween={20}
    slidesPerView={
      size.width > 1024 ? 4 : size.width > 768 ? 3 : size.width > 576 ? 2 : 1
    }
    autoplay={{
      delay: 100,
      disableOnInteraction: false
    }}
    style={{ marginBottom: '50px' }}
  >
    {
      topicList &&
      topicList.length > 0 &&
      topicList.map((topic, index) => {
        return (
          <SwiperSlide key={index}>
            <DiscoverTopicTile data={topic} />
          </SwiperSlide>
        );
      })
    }
  </Swiper>;
};