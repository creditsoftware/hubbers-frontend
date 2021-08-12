import React from 'react';
import { Row, Col, Button } from 'antd';
import { Container } from '../Container';
import Link from 'next/link';
import dateFormat from 'dateformat';

export const Talent = ({eventData}) => {
  return (
    <div className='talent-creators-list'>
      <Container>
        <React.Fragment>
          <div className='talent-creators-list-title mb-5'>
            <span>{eventData.description}</span>
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
                      <span>{dateFormat(eventData.startDate, 'mmmm dd, yyyy')}<br/>{eventData.startTime?.substring(0,5) + '-' + eventData.endTime?.substring(0,5)}</span>
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
                      <span>{eventData.eventType === 'online' ? 'Online' : eventData.localContent?.location?.name}</span>
                    </div>
                    <div className='talent-creators-list-description mt-1'>
                      <p>{eventData.eventType === 'online' ? '' : eventData.localContent?.location?.streetAddress}</p>
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