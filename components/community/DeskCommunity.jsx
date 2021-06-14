import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

export const DeskCommunity = ({ ...props }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow:3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="container">
      <h2 className="blog-title fw-6 fc-white pt-4 pb-5 pl-5">{props.title}</h2>
      <Slider {...settings}>
        {
          props.blog.map((item, index) => {
            return <a key={index} className="text-center" href={item.url}>
              <Image width="320" height="180" src={item.image} />
              <h3>{item.date}</h3>
              <p>{item.content}</p>
            </a>;
          })
        }
      </Slider>
    </div>
  );
};