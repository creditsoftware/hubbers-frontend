import React from 'react';
import { MainPageHoc } from '../../../containers';
import { Container } from '../../../components';
// import { useRouter } from 'next/router';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import Image from 'next/image';
const ContestsDetail = ({ ...props }) => {
  // const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const product = {
    image: 'https://hubbers-us.oss-us-west-1.aliyuncs.com/6V1GLLP2-.png',
    title: 'Scooter Delivery Case',
    date: 'Ended 92 days ago',
    contestants: 4,
    judges: 1,
    view: 181,
    like: 3,
    share: 0,
    slug: 'asdfasd-asdf-asdf',
    startTime: 'July, 8th 03:21 pm',
    finishTime: 'August, 17th 03:21 pm'
  };
  return (
    <MainPageHoc title='Hubers events' auth={{ ...data }}>
      <Container className="contests-detail pt-4">
        <React.Fragment>
          <div className="details-header">
            <h1>{product.title}</h1>
            <p style={{ color: 'gray' }}>{product.date}</p>
            <div className="details-time">
              <div>
                <Image width={24} height={24} src="/images/icons/start-time.png" />
                <label>Start Time:&nbsp;</label>
                <label style={{ color: 'gray' }}>{product.startTime}</label>
              </div>
              <div className="ml-4">
                <Image width={24} height={24} src="/images/icons/end-time.png" />
                <label>Finish Time:&nbsp;</label>
                <label style={{ color: 'gray' }}>{product.finishTime}</label>
              </div>
            </div>
          </div>
          <div className="details-nav">
            <div className="nav-item nav-active">GENERAL</div>
            <div className="nav-item">CRITERIA</div>
            <div className="nav-item">CONTESTANTS </div>
            <div className="nav-item">CONTEST RULES</div>
          </div>
        </React.Fragment>
      </Container>
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
export default ContestsDetail;