import React from 'react';
import { MainPageHoc } from '../../containers';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { MainBanner } from '../../components';
const ProductCompetition = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  return (
    <MainPageHoc title='Product Competition' auth={{ ...data }}>
      <React.Fragment>
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
export default ProductCompetition;