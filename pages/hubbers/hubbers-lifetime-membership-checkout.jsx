import { Col, Row } from 'antd';
import React from 'react';
import {
  Container,
  LifetimeMembershipCheckoutLeft,
  LifetimeMembershipCheckoutRight
} from '../../components';
import { MainPageHoc } from '../../containers';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
const LifetimeMembershipCheckout = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <MainPageHoc title='Hubbers Lifetime Membership Checkout' auth={{ ...data }}>
      <React.Fragment>
        <h1 className="fw-6 fs-5 text-center mt-5">
          Hubbers LifeTime Membership
        </h1>
        <h1 className="fw-6 fs-5 text-center mt-4">
          $1000.00
        </h1>
        <p className="text-center max-w-40 m-auto fs-1">
          Great decision to apply to become Hubbers lifetime individual members. As we want to keep the community focused on what we are building.
        </p>
        <div className="bg-white pt-5 mt-5">
          <Container>
            <Row>
              <Col lg={12} md={12} sm={24}>
                <LifetimeMembershipCheckoutLeft />
              </Col>
              <Col lg={12} md={12} sm={24}>
                <LifetimeMembershipCheckoutRight />
              </Col>
            </Row>
          </Container>
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
export default LifetimeMembershipCheckout;