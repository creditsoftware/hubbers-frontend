import React from 'react';
// import Image from 'next/image';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
import { Container } from '../../components';
import { jwtDecode } from '../../utils/jwt';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import { Row, Col, Image } from 'antd';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { ContestDrawer } from '../../components/contest/ContestDrawer';
const CrowdsourceDesignProductLogoPackaging = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const { data: card } = useSWR(API.GET_CONTEST_CATEGORY_API, fetcher);
  const [visible, setVisible] = React.useState(false);
  const [contestTypeName, setContestTypeName] = React.useState();
  const toggleVisible = () => {
    setVisible(!visible);
  };
  const handleVisiable = (index) => {
    setContestTypeName(index);
    setVisible(!visible);
  }
  return (
    <DeskPageHoc title='Activities' activeSide={{ active: ['activities'], open: [] }} auth={{ ...data }}>
      <Container className="py-5">
        <React.Fragment>
          <div className="max-w-40 m-auto text-center py-5">
            <h1 className="fw-6 fs-3 pt-3">
              Logo, product, packaging, UI/UI, creating design is at the heart of Hubbers community.
            </h1>
            <p className="fs-1">Creating by yourself is always a very complicated tasks. It is important to have enough feedbacks to make sure you are going in the right directions.</p>
            <p className="fs-1">Hubbers let&apos;s your crowdsource your next design with Hubbers community, start now.</p>
          </div>
          <h1 className="fw-6 fs-2 text-center pt-5">Select what you want to create next?</h1>
          <Row className="pt-5">
            {
              card && card.data && card.data.map((item, index) => {
                return (
                  <Col key={index} lg={12} xs={24} className="p-4">
                    <Row
                      onClick={() => handleVisiable(index)}
                      className="general-card bg-white h-100"
                      style={{
                        borderRadius: '24px',
                        padding: '24px'
                      }}
                    >
                      <Col span={24}><h3 className="fw-6 fs-2">{item.name}</h3></Col>
                      <Col sm={16} xs={24} className="d-flex fjc-center f-align-center">
                        <p className="fs-1 text-center">{item.description}</p>
                      </Col>
                      <Col sm={8} xs={24} className="d-flex f-align-center fjc-center">
                        <Image width={145} height={140} preview={false} src={item.featuredImg} />
                      </Col>
                    </Row>
                  </Col>
                );
              })
            }
          </Row>
          <ContestDrawer visible={visible} onHide={toggleVisible} {...props} contestTypeName={contestTypeName} />
        </React.Fragment>
      </Container>
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
export default CrowdsourceDesignProductLogoPackaging;