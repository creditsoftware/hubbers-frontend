import { Col, Row } from 'antd';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import { Container, HubbersTeamMemberTile } from '../../components';
import { MainPageHoc } from '../../containers';
import Link from 'next/link';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import useSWR from 'swr';
import { fetchJson } from '../../utils';
import { fetcher } from '../../utils/fetcher';
const HubbersTeam = ({ ...props }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const [current, setCurrent] = React.useState([]);
  const [terminated, setTerminated] = React.useState([]);

  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  React.useEffect(()=>{
    fetchJson(`${API.GET_HUBBERS_TEAM_LIST_API}`).then((response) => {
      setCurrent(response.data.filter((item) => item.isTerminated === false));
      setTerminated(response.data.filter((item) => item.isTerminated === true));
    });
  }, []);
  return (
    <MainPageHoc title='Who We Are' auth={{ ...data }}>
      <Container>
        <React.Fragment>
          <h1 className="fw-6 mt-5 fs-5">
            We are making Hubbers: working, mentoring, volunteering for the community
          </h1>
          <Row>
            {
              current.map((item, index) => {
                return <Col lg={6} className='p-3' key={index}>
                  <HubbersTeamMemberTile data={item} />
                </Col>;
              })
            }
            <Col lg={6} className='p-3'>
              <Link href='/hubbers/hubbers-job-board'>
                <a>
                  <HubbersTeamMemberTile end={true} />
                </a>
              </Link>
            </Col>
          </Row>
          <div className="text-center fs-2 my-5">
            They were here! HOMMAGE to the ones that have contributed and participated to the success of Hubbers.
          </div>
          <Slider {...settings}>
            {
              terminated.map((item, index) => {
                return <HubbersTeamMemberTile key={index} data={item} /> ;
              })
            }
          </Slider>
        </React.Fragment>
      </Container>
    </MainPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req } = ctx;
  const user = await req.session.get('user');
  const hubbersTeamMemberList = {};
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user }, list: hubbersTeamMemberList } };
  } else {
    return { props: { auth: { isLoggedIn: false }, list: hubbersTeamMemberList } };
  }
});
export default HubbersTeam;