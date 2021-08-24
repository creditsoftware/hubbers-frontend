import React from 'react';
import { Row, Col, Image } from 'antd';
import { Container } from '../../components';
import { Footer } from 'antd/lib/layout/layout';
import { InstagramOutlined, LinkedinOutlined, FacebookFilled, TwitterOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { BLOG_ENDPOINT, HELP_CENTER_ENDPOINT } from '../../constants/etc';
export const MainFooter = ({ className, ...props }) => {
  let classname = 'main-footer';
  if (className) {
    classname = 'main-footer ' + className;
  }
  return (
    <div className={classname}>
      <Footer className="footer-top">
        <Container>
          <Row>
            <Col lg={6} sm={12} xs={24} className='mt-3'>
              <div>
                <h3>
                  Creators
                </h3>
              </div>
              <div>
                <Link href='/hubbers/become-a-creator'>
                  <a>
                    Are you a creator?
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/product-launcher">
                  <a>
                    Use the product launcher
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/auth/signup">
                  <a>
                    Sign up
                  </a>
                </Link>
              </div>
            </Col>
            <Col lg={6} sm={12} xs={24} className='mt-3'>
              <div>
                <h3>
                  Experts
                </h3>
              </div>
              <div>
                <Link href="/">
                  <a>
                    Marketplace
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/hubbers/become-an-expert">
                  <a>
                    Become an expert
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/auth/signup">
                  <a>
                    Sign up
                  </a>
                </Link>
              </div>
            </Col>
            <Col lg={6} sm={12} xs={24} className='mt-3'>
              <div>
                <h3>
                  Competition
                </h3>
              </div>
              <div>
                <Link href="/">
                  <a>
                    How to join
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/">
                  <a>
                    Designer of the year
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/">
                  <a>
                    Prize
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/">
                  <a>
                    Product contest
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/hubbers/become-a-judge">
                  <a>
                    Become a judge
                  </a>
                </Link>
              </div>
            </Col>
            <Col lg={6} sm={12} xs={24} className='mt-3'>
              <div>
                <h3>
                  Hubbers
                </h3>
              </div>
              <div>
                <Link href="/hubbers/who-we-are">
                  <a>
                    Who we are
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/hubbers/hubbers-job-board/jobs">
                  <a>
                    Hubbers job board
                  </a>
                </Link>
              </div>
              <div>
                <a href={`${BLOG_ENDPOINT}`}>
                  Blog
                </a>
              </div>
              <div>
                <a href={`${HELP_CENTER_ENDPOINT}`}>
                  Help center
                </a>
              </div>
              <div>
                <Link href={props.auth?.isLoggedIn ? '/hubbers/grab-a-share' : '/hubbers/request-investor-access'}>
                  <a>
                    Grab a share
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/hubbers/get-our-app">
                  <a>
                    Get our app
                  </a>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </Footer>
      <Footer className="footer-bottom">
        <Container>
          <Row>
            <Col xs={24} sm={24} md={18} lg={18}>
              <div className="footer-bottom-left">
                <Row>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <Image src="/images/logo/logo_b_w.png" preview={false} alt='' />
                  </Col>
                  <Col xs={24} sm={24} md={18} lg={18}>
                    <div className='mt-2'>
                      <Link href="/">
                        <a>
                          Privacy Policy
                        </a>
                      </Link>
                      <span>|</span>
                      <Link href="/">
                        <a>
                          Terms of service
                        </a>
                      </Link>
                      <span className='copy-operator'>
                        &copy;
                        2018-{new Date().getFullYear()}
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6}>
              <div className="footer-bottom-right">
                <Row>
                  <Col lg={6}>
                    <Link href="/">
                      <a>
                        <InstagramOutlined />
                      </a>
                    </Link>
                  </Col>
                  <Col lg={6}>
                    <Link href="/">
                      <a>
                        <LinkedinOutlined />
                      </a>
                    </Link>
                  </Col>
                  <Col lg={6}>
                    <Link href="/">
                      <a>
                        <FacebookFilled />
                      </a>
                    </Link>
                  </Col>
                  <Col lg={6}>
                    <Link href="/">
                      <a>
                        <TwitterOutlined />
                      </a>
                    </Link>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </Footer>
    </div>
  );
};
