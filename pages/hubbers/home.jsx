import { Button, Col, Row } from 'antd';
import { Container, HomepageMainBanner } from '../../components';
import Image from 'next/image';
import React from 'react';
// import { useIntl } from 'react-intl';
import { MainPageHoc } from '../../containers';
import Link from 'next/link';
const Home = () => {
  // const { formatMessage } = useIntl();
  // const f = id => formatMessage({ id });
  return (
    <MainPageHoc title="Hubbers">
      <React.Fragment>
        <HomepageMainBanner />
        <Container>
          <React.Fragment>
            <h1 className="fs-6 pt-5 fw-6 text-center">
              You have an innovative product ready to be launched?
            </h1>
            <h2 className="fs-5 pb-5 text-center">
              Get Hubbers community of creators, experts and contributors to help your design, prototype and launch it
            </h2>
            <Row>
              <Col lg={12} mc={12}>
                <div className='m-auto max-w-20'>
                  <Image
                    src="/images/homepage/index_first_image.png"
                    alt=""
                    width={500}
                    height={500}
                  />
                </div>
                <h1 className="fw-6 fs-5 text-center fc-primary">
                  Individual Creator?
                </h1>
                <h2 className="fw-5 fs-3 text-center">
                  Find mentoring, experts and fundings for your product launch
                </h2>
                <div className="my-4 text-center">
                  <Button type='hbs-primary' shape='round' size='large'>
                    Enter the accelerator program
                  </Button>
                </div>
                <Row className='mb-3'>
                  <Col span={2}>
                    <div className="max-w-1_5">
                      <Image src='/images/homepage/right_sign.png' width={100} height={100} />
                    </div>
                  </Col>
                  <Col span={22}>
                    <h3 className="fs-1">
                      Access to all of the product development modules
                    </h3>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col span={2}>
                    <div className="max-w-1_5">
                      <Image src='/images/homepage/right_sign.png' width={100} height={100} />
                    </div>
                  </Col>
                  <Col span={22}>
                    <h3 className="fs-1">
                      Onboard a “Super Expert” as your mentor as well as your project manager to lead and support your creator journey from ideation to launching your product/ business.
                    </h3>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col span={2}>
                    <div className="max-w-1_5">
                      <Image src='/images/homepage/right_sign.png' width={100} height={100} />
                    </div>
                  </Col>
                  <Col span={22}>
                    <h3 className="fs-1">
                      Get the opportunity to connect with investors and find the financial resources that you need to complete your project.
                    </h3>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col span={2}>
                    <div className="max-w-1_5">
                      <Image src='/images/homepage/right_sign.png' width={100} height={100} />
                    </div>
                  </Col>
                  <Col span={22}>
                    <h3 className="fs-1">
                      Gain access to the worldwide Hubbers community; hire experts from all over the world in the area of expertise you need.
                    </h3>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col span={2}>
                    <div className="max-w-1_5">
                      <Image src='/images/homepage/right_sign.png' width={100} height={100} />
                    </div>
                  </Col>
                  <Col span={22}>
                    <h3 className="fs-1">
                      Create in an efficient, collaborative, and resourceful space.
                    </h3>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col span={2}>
                    <div className="max-w-1_5">
                      <Image src='/images/homepage/right_sign.png' width={100} height={100} />
                    </div>
                  </Col>
                  <Col span={22}>
                    <h3 className="fs-1">
                      Work fast, lean and crowd source your project.
                    </h3>
                  </Col>
                </Row>
              </Col>
              <Col lg={12} mc={12}>
                <div className='m-auto max-w-20'>
                  <Image
                    src="/images/homepage/index_second_image.png"
                    alt=""
                    width={500}
                    height={500}
                  />
                </div>
                <h1 className="fw-6 fs-5 text-center fc-primary">
                  Business or Creator Looking For Expertise?
                </h1>
                <h2 className="fw-5 fs-3 text-center">
                  Find experts and get access to our collaborative tools
                </h2>
                <div className="my-4 text-center">
                  <Button type='hbs-primary' shape='round' size='large'>
                    Access to Hubbers platform
                  </Button>
                </div>
                <Row className='mb-3'>
                  <Col span={2}>
                    <div className="max-w-1_5">
                      <Image src='/images/homepage/right_sign.png' width={100} height={100} />
                    </div>
                  </Col>
                  <Col span={22}>
                    <h3 className="fs-1">
                      Work though a wide range of modules especially designed to cover all aspects of the product development and creator journey
                    </h3>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col span={2}>
                    <div className="max-w-1_5">
                      <Image src='/images/homepage/right_sign.png' width={100} height={100} />
                    </div>
                  </Col>
                  <Col span={22}>
                    <h3 className="fs-1">
                      Work in an efficient, collaborative, and resourceful space.
                    </h3>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col span={2}>
                    <div className="max-w-1_5">
                      <Image src='/images/homepage/right_sign.png' width={100} height={100} />
                    </div>
                  </Col>
                  <Col span={22}>
                    <h3 className="fs-1">
                      Gain access to the worldwide Hubbers community and find the experts your project needs.
                    </h3>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col span={2}>
                    <div className="max-w-1_5">
                      <Image src='/images/homepage/right_sign.png' width={100} height={100} />
                    </div>
                  </Col>
                  <Col span={22}>
                    <h3 className="fs-1">
                      Connect with rising stars, find new product ideas, and meet talented creators from all over the world.
                    </h3>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col span={2}>
                    <div className="max-w-1_5">
                      <Image src='/images/homepage/right_sign.png' width={100} height={100} />
                    </div>
                  </Col>
                  <Col span={22}>
                    <h3 className="fs-1">
                      Keep up with international market and benefit from the wide variety of resources.
                    </h3>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col span={2}>
                    <div className="max-w-1_5">
                      <Image src='/images/homepage/right_sign.png' width={100} height={100} />
                    </div>
                  </Col>
                  <Col span={22}>
                    <h3 className="fs-1">
                      Work and create fast, lean, and efficiently.
                    </h3>
                  </Col>
                </Row>
              </Col>
            </Row>
          </React.Fragment>
        </Container>
        <Container>
          <React.Fragment>
            {/* thumb-up */}
          </React.Fragment>
        </Container>
        <Container>
          <React.Fragment>
            <h1 className="fw-6 fs-6 my-5 text-center">
              Co-create with Hubbers Community
            </h1>
            <Row>
              <Col lg={8} md={8} sm={8} xs={24}>
                <div className='text-center'>
                  <Image width={100} height={100} src='/images/homepage/ideate_icon_img.png' />
                  <h2 className="fw-5 fs-4">
                    Ideate
                  </h2>
                </div>
              </Col>
              <Col lg={8} md={8} sm={8} xs={24}>
                <div className='text-center'>
                  <Image width={100} height={100} src='/images/homepage/design_icon_img.png' />
                  <h2 className="fw-5 fs-4">
                    Design
                  </h2>
                </div>
              </Col>
              <Col lg={8} md={8} sm={8} xs={24}>
                <div className='text-center'>
                  <Image width={100} height={100} src='/images/homepage/make_icon_img.png' />
                  <h2 className="fw-5 fs-4">
                    Make
                  </h2>
                </div>
              </Col>
            </Row>
            <h2 className="fw-5 text-center fs-4 my-4">
              Co-create with our community of 15000 innovators, industrial designers, makers, inventors and innovation experts from 35 countries.
            </h2>
            <Row className='py-3'>
              <Col lg={12} md={12} sm={12} xs={24}>
                <Row className="mb-3">
                  <Col span={4}>
                    <Image width={100} height={100} src='/images/homepage/create-community_icon_one.png' />
                  </Col>
                  <Col span={20}>
                    <h2 className="fw-5 fs-2">
                      Get new product ideas, product functionalites and user experience
                    </h2>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col span={4}>
                    <Image width={100} height={100} src='/images/homepage/create-community_icon_two.png' />
                  </Col>
                  <Col span={20}>
                    <h2 className="fw-5 fs-2">
                      Prototype and implement with a network of 2000 agile experts in product development
                    </h2>
                  </Col>
                </Row>
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
                <Row className="mb-3">
                  <Col span={4}>
                    <Image width={100} height={100} src='/images/homepage/create-community_icon_three.png' />
                  </Col>
                  <Col span={20}>
                    <h2 className="fw-5 fs-2">
                      Crowdsource design through product contest
                    </h2>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col span={4}>
                    <Image width={100} height={100} src='/images/homepage/create-community_icon_four.png' />
                  </Col>
                  <Col span={20}>
                    <h2 className="fw-5 fs-2">
                      Communicate your innovation value to a powerful community of global designers, creators and influencers
                    </h2>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="text-center py-5">
              <Button type='hbs-primary' shape='round' size='large'>
                Get in touch with us
              </Button>
            </div>
          </React.Fragment>
        </Container>
        <div className="bg-white">
          <Container>
            <React.Fragment>
              <h1 className="fw-6 fs-6 pt-5 text-center">
                Hubbers Community
              </h1>
              <h2 className="fw-5 fs-3 mb-5 text-center">
                1200 product creators helped by 1300 experts and 135 contributors to launch new products. Be part of your Hubbers community.
              </h2>
              <h1 className="fw-6 fs-4 text-center mb-4">
                Community Features List
              </h1>
              <Row className='py-3'>
                <Col lg={12} md={12} sm={12} xs={24}>
                  <Row className="mb-3">
                    <Col span={4}>
                      <Image width={100} height={100} src='/images/homepage/community_feature_icon_one.png' />
                    </Col>
                    <Col span={20}>
                      <h2 className="fw-5 fs-2">
                        Share your knowledge on product creation product development
                      </h2>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col span={4}>
                      <Image width={100} height={100} src='/images/homepage/community_feature_icon_two.png' />
                    </Col>
                    <Col span={20}>
                      <h2 className="fw-5 fs-2">
                        Mingle with people that have common interest in making projects come to the market
                      </h2>
                    </Col>
                  </Row>
                </Col>
                <Col lg={12} md={12} sm={12} xs={24}>
                  <Row className="mb-3">
                    <Col span={4}>
                      <Image width={100} height={100} src='/images/homepage/community_feature_icon_three.png' />
                    </Col>
                    <Col span={20}>
                      <h2 className="fw-5 fs-2">
                        Learn from others through events, Webinars and products development.
                      </h2>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col span={4}>
                      <Image width={100} height={100} src='/images/homepage/community_feature_icon_four.png' />
                    </Col>
                    <Col span={20}>
                      <h2 className="fw-5 fs-2">
                        Be rewarded as an active member of Hubbers with&nbsp;
                        <Link href='#'>
                          <a className="primary-link">
                            HBB comunity points.
                          </a>
                        </Link>
                      </h2>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div>
                <img width='100%' src='/images/homepage/map.png' />
              </div>
              <h2 className="fw-5 fs-4">
                Find your Hubbers community in Shanghai, Singapore, Paris, Berlin, Seoul and many other Cities.
              </h2>
            </React.Fragment>
          </Container>
        </div>
        <Container>
          <React.Fragment>
            {/* ongoing product competition */}
          </React.Fragment>
        </Container>
        <Container>
          <React.Fragment>
            {/* expert marketplace */}
          </React.Fragment>
        </Container>
        <Container>
          <React.Fragment>
            {/* hubbers worldwide events */}
          </React.Fragment>
        </Container>
        <Container>
          <React.Fragment>
            {/* sponsors */}
          </React.Fragment>
        </Container>
      </React.Fragment>
    </MainPageHoc>
  );
};
export async function getServerSideProps() {
  return { props: {} };
}
export default Home;
