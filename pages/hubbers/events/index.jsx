import React from 'react';
import { MainPageHoc } from '../../../containers';
import { MainBanner, EventItemSection } from '../../../components';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { jwtDecode } from '../../../utils/jwt';
import { fetchJson } from '../../../utils';

const Event = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    fetchJson(`${API.GET_GLOBAL_EVENT_API}`).then((response) => {
      setList(response);
    });
  }, []);
  return (
    <MainPageHoc title='Hubbers Events' auth={{ ...data }} query={{...props.query}}>
      <React.Fragment>
        <MainBanner title={'GLOBAL EVENTS'} date={''} url={'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/home-banner-1.jpg'} />
        <div className='event-group mt-5 mb-5'>
          {
            list.map((item, index) => {
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
  const { req, query } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user }, query } };
  } else {
    return { props: { auth: { isLoggedIn: false }, query } };
  }
});
export default Event;