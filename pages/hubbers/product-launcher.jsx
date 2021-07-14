import React from 'react';
import Image from 'next/image';
import { MainPageHoc } from '../../containers';
import { Container, MainBanner } from '../../components';
import { Row, Col, Button, Modal, Input } from 'antd';
import { MenuOutlined, HeartFilled, HeartOutlined, ReloadOutlined, StarFilled } from '@ant-design/icons';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
const ProductLauncher = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [beforeModalVisible, setBeforeModalVisible] = React.useState(false);
  const [startModalVisible, setStartModalVisible] = React.useState(false);
  const [showSuggestion, setShowSuggestion] = React.useState(true);
  const [email, setEmail] = React.useState('');
  // const [stateText, setStateText] = React.useState('Enter your e-mail');
  // const [stateStyle, setStateStyle] = React.useState('warning-text');
  const [like, setLike] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const beforeModal = () => {
    setBeforeModalVisible(true);
  };
  const handleOkBeforeModal = () => {
    setBeforeModalVisible(false);
    setStartModalVisible(true);
  };
  const handleCancelBeforeModal = () => {
    setBeforeModalVisible(false);
  };
  const handleCancelStartModal = () => {
    setStartModalVisible(false);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changeShowSuggestion = () =>{
    setShowSuggestion(!showSuggestion);
  };
  const changeLike = () =>{
    setLike(!like);
  };
  const changeMenu = () =>{
    setMenu(!menu);
  };
  return (
    <MainPageHoc title='Product Launcher' auth={{ ...data }}>
      <React.Fragment>
        <MainBanner
          url='https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/pldt/hero-bg.jpg'
          title={
            <h1 className="fs-6 fw-6 fc-white">PRODUCT LAUNCHER QUIZ</h1>
          }
          date={
            <React.Fragment>
              <p className="fs-2 fw-5 fc-white">Welcome to Hubbers Product Launch Assessment Tool! Fulfill 70% of the quiz and get closer to a great launch.</p>
              <Button type="hbs-primary" size="large" shape="round">GET STARTED</Button>
              <i className="d-block pt-4">14720 product creators have tried it</i>
            </React.Fragment>
          }
        />
        <div className="w-100 bg-white">
          <Container>
            <React.Fragment>
              <div className="product-launcher">
                <Row>
                  <div className="circle">
                    0%
                  </div>
                  <div className="buttons">
                    <Button className="save" type="text" shape="round"onClick={beforeModal}>SAVE DRAFT</Button>
                    <Button className="start" type="text" shape="round">START AGAIN</Button>
                  </div>
                </Row>
                <div className="text-center pt-3">0 OF 0 CATEGORIES COMPLETED</div>
                <Modal
                  visible={beforeModalVisible}
                  onCancel={handleCancelBeforeModal}
                  footer={[
                    <Button key="notNow" type="text" onClick={handleOkBeforeModal}>
                      NOT NOW
                    </Button>,
                    <Button
                      key="proceed"
                      disabled={true}
                      type="hbs-outline-primary"
                      shape="round"
                    >
                      PROCEED
                    </Button>,
                  ]}
                  className="before-modal text-center"
                >
                  <h1>SAVE YOUR PRODUCT LAUNCH QUIZ</h1>
                  <p>Save changes and keep record of it.</p>
                  <p>Come back to complete it.</p>
                  <p>Ease your registration process and get access to hubbers resources.</p>
                  <Input type="text" />
                </Modal>
                <Modal
                  visible={startModalVisible}
                  onCancel={handleCancelStartModal}
                  footer={[]}
                  className="start-modal"
                  width={650}
                >
                  <div className="header">
                    <p className="fs-6 fw-6"><ReloadOutlined className="mr-4"/>0% ... GREAT START!</p>
                    <p className="fs-4 fw-6 mb-1">TRY TO REACH 70%</p>
                    <p className="fs-4 fw-6 mb-1">IT&apos;S A GOOD SIGN OF YOUR PRODUCT LAUNCH READINESS.</p>
                  </div>
                  <div className="content">
                    <h1 className="fs-4 text-center">REGISTER NOW</h1>
                    <Input type="email" placeholder="E-Mail" onChange={changeEmail} />
                    <Row className="py-3">
                      <Col span={12} className="pr-2">
                        <Input type="text" placeholder="Password" />
                        <Row>
                          <Col span={6}></Col>
                          <Col span={6}></Col>
                          <Col span={6}></Col>
                          <Col span={6}></Col>
                        </Row>
                      </Col>
                      <Col span={12} className="pl-2">
                        <Input type="text" placeholder="Repeat Password" />
                      </Col>
                    </Row>
                    {email?<i className="pb-3">I agree to register with {email}</i>:null}
                    <div className="d-flex fjc-space-between f-align-center">
                      <Button
                        type="hbs-outline-primary"
                        shape="round"
                        size="large"
                        // disabled={stateStyle=='success' ? false : true}
                      >
                        REGISTER
                      </Button>
                      {/* <p className={stateStyle}>{stateText}</p> */}
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-center pt-3">Experts on hubbers market place can help you <b>improve your product launch preparation.</b></p>
                    <p className="text-center">It gives you the possibility to enter our product development module to have <b>access to our pool of super-experts and distributors.</b></p>
                    <div className="d-flex fjc-space-between f-align-center pt-3">
                      <label>SUGGESTED EXPERTISE (1)</label>
                      <label onClick={changeShowSuggestion}>Show me suggestions</label>
                    </div>
                    {
                      showSuggestion ? <div className="pt-3" style={{ maxWidth: '180px' }}>
                        <Image width={180} height={120} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS53aGQp7UDrfUfqPn_NK6p6vXw3-Wu817SSq6cSlP8aQHBq9R5" />
                        <p className="pt-2">I will create your brand logo in vector file and I will als...</p>
                        <StarFilled className="mr-1" style={{ color: '#75ac2a' }}/>0 (0)
                        <div className="mt-2 p-2 fs-2 d-flex fjc-space-between f-align-center" style={{ borderTop: '1px solid #ebebeb' }}>
                          <div>
                            <MenuOutlined onClick={changeMenu} style={{ color: menu ? '#75ac2a' : 'black' }} />
                            { like ? <HeartFilled className="mx-3" onClick={changeLike} style={{ color: '#75ac2a' }}/> :<HeartOutlined className="mx-3" onClick={changeLike} /> }
                          </div>
                          <div style={{ fontSize: '13px' }}>from 120 USD</div>
                        </div>
                      </div> : null
                    }
                  </div>
                </Modal>
              </div>
            </React.Fragment>
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
export default ProductLauncher;