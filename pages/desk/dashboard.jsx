import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import useSWR from 'swr';
// import { Badge } from 'antd';
import { fetchJson } from '../../utils';
import { fetcher } from '../../utils/fetcher';
import { withSession } from '../../utils/withSession';
import { jwtDecode } from '../../utils/jwt';
import { API } from '../../constants/index';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
import { Container } from '../../components';

const Dashboard = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [communityList, setCommunityList] = React.useState([]);
  React.useEffect(() => {
    fetchJson(`${API.GET_MY_COMMUNITY_AND_GROUP_LIST_API}/${data.id}`).then((response) => {
      setCommunityList(response.data?.filter((item) => item.roleId === 1));
    });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 4,
    responsive: [
      {
        breakpoint: 1375,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 766,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  const defaultImageURL = '/images/community/join.png';

  return (
    <DeskPageHoc title='Dashboard' activeSide={{ active: ['dashboard'], open: [] }} auth={{ ...data }}>
      <React.Fragment>
        <Container className="p-5">
          <Slider {...settings}>
            {
              communityList.map((item, index) => {
                return(
                  <div key={index} className="text-center">
                    <Image width={200} height={170} src={item.featuredImage ? item.featuredImage : defaultImageURL} />
                    <h1 className="text-center">{item.name}</h1>
                  </div>
                );
              })
            }
          </Slider>
        </Container>
      </React.Fragment>
    </DeskPageHoc>
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
export default Dashboard;