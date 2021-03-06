import React from 'react';
import { MainPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { Container, MainBanner } from '../../../components';
import { Row, Col } from 'antd';
import { ContestTile } from '../../../components';
import { jwtDecode } from '../../../utils/jwt';
const ProductCompetition = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const { data: contests } = useSWR(API.CONTEST_API, fetcher);
  return (
    <MainPageHoc title='Product Competition' auth={{ ...data }} query={{...props.query}}>
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
            <h1 className="fs-5 fw-6">{contests && contests.result && contests.result.length} Ongoing Contests</h1>
            <Row>
              {
                contests && contests.result &&
                contests.result.map((item, index) => {
                  return <Col key={index} lg={12} xs={24} className="px-3">
                    <ContestTile {...item} {...props} />
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
  const { req, query } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user }, query } };
  } else {
    return { props: { auth: { isLoggedIn: false }, query } };
  }
});
export default ProductCompetition;