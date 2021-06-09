import React from 'react';
import { Row, Col, Button } from 'antd';
import { Container } from '../Container';
import Link from 'next/link';
export const Talent = () => {
  return (
    <div className='talent-creators-list'>
      <Container>
        <React.Fragment>
          <div className='talent-creators-list-title mb-5'>
            <span>CREATORS & INVENTORS WELCOME! HUBBERS INTRODUCES 4 PRODUCT DEVELOPMENT TOOLS TO HELP CREATORS SUCCESSFULLY START AND COMPLETE THEIR PRODUCT DEVELOPMENT JOURNEY.</span>
          </div>
          <div className='talent-creators-items'>
            <Row className='text-center'>
              <Col className='br-e text-center pr-3 mb-3' xs={24} sm={24} md={8}>
                <Row>
                  <div className='talent-creators-list-items-left'>
                    <img src='/images/icons/business_event_icon.png' width='50px' height='40px' />
                  </div>
                  <div className='talent-creators-list-items-right text-left'>
                    <div className='mt-1'>
                      <span>HUBBERS COMMUNITY</span>
                    </div>
                    <div className='talent-creators-list-description mt-1'>
                      <p>#ProductDevelopment</p>
                      <p>#ProductCompetition</p>
                      <p>#Creators</p>
                    </div>
                  </div>
                </Row>
              </Col>
              <Col className='br-e text-center pr-3 mb-3' xs={24} sm={24} md={8}>
                <Row>
                  <div className='talent-creators-list-items-left'>
                    <img src='/images/icons/clock_icon.png' width='40px' height='40px' />
                  </div>
                  <div className='talent-creators-list-items-right text-left'>
                    <div className='mt-1'>
                      <span>SEPTEMBER, 22 2019 18:00-20:00</span>
                    </div>
                  </div>
                </Row>
              </Col>
              <Col className='text-center pr-3 mb-3' xs={24} sm={24} md={8}>
                <Row>
                  <div className='talent-creators-list-items-left'>
                    <img src='/images/icons/location_icon.png' width='40px' height='40px' />
                  </div>
                  <div className='talent-creators-list-items-right text-left br-n'>
                    <div className='mt-1'>
                      <span>BUENOS AIRES, ARGENTINA</span>
                    </div>
                    <div className='talent-creators-list-description mt-1'>
                      <p>WeWork, Torre Bellini, Esmeralda 950, Capital Federal , Buenos Aires C1007ABL, Argentina</p>
                    </div>
                  </div>
                </Row>
              </Col>
            </Row>
          </div>
          <div className="text-center mt-3">
            <Button type='hbs-outline-primary' shape='round' size='large'>Attend</Button>
            <div className='mt-3'>
              <Link href='/auth/signin'>
                <a className='primary-link'>
                  <em>Sign in to attend</em>
                </a>
              </Link>
            </div>
          </div>
        </React.Fragment>
      </Container>
    </div>
  );
};