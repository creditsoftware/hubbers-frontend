import React from 'react';
import { MainPageHoc } from '../../containers';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { Container, MainBanner } from '../../components';
import { Row, Col } from 'antd';
import { EyeOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
const ProductCompetition = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const products = [{
    image: "https://hubbers-us.oss-us-west-1.aliyuncs.com/6V1GLLP2-.png",
    title: "Scooter Delivery Case",
    date: "Ended 92 days ago",
    contestants: 4,
    judges: 1,
    view: 181,
    like: 3,
    share: 0
  }, {
    image: "https://hubbers-us.oss-us-west-1.aliyuncs.com/SJgt5sJ8p.jpg",
    title: "Travel Kit",
    date: "Ended 20 days ago",
    contestants: 30,
    judges: 12,
    view: 1938,
    like: 3,
    share: 0
  }]
  return (
    <MainPageHoc title='Product Competition' auth={{ ...data }}>
      <div className="w-100 bg-white">
        <MainBanner
          url='/images/contests-banner.jpg'
          title={
            <h1 style={{ fontSize: '4rem', fontWeight: '700', color: 'white' }}>CONTESTS</h1>
          }
          date={
            <React.Fragment>
              <p className="fs-2">Challenge your creativity and earn cash prize and royalties</p>
            </React.Fragment>
          }
        />
        <Container className="py-5">
          <React.Fragment>
            <h1 className="fs-5 fw-6">{products.length} Ongoing Contests</h1>
            <Row>
              {
                products.map((item, index) => {
                  return <Col key={index} lg={12} xs={24} className="px-3">
                    <div className="product-item">
                      <div className="product-img" style={{ backgroundImage: `url(${item.image})` }}></div>
                      <div className="product-content">
                        <h1 className="fw-6">{item.title}</h1>
                        <p>{item.date}</p>
                        <div className="green-text">
                          <label>{item.contestants}&nbsp;&nbsp;CONTESTANTS</label>
                          <label className="pl-4">{item.judges}&nbsp;&nbsp;JUDGES</label>
                        </div>
                        <div className="gray-text">
                          <label><EyeOutlined />&nbsp;&nbsp;{item.view}</label>
                          <label className="px-4"><HeartOutlined />&nbsp;&nbsp;{item.like}</label>
                          <label><ShareAltOutlined />&nbsp;&nbsp;{item.share}</label>
                        </div>
                      </div>
                    </div>
                  </Col>;
                })
              }
            </Row>
          </React.Fragment>
        </Container>
      </div>
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
export default ProductCompetition;