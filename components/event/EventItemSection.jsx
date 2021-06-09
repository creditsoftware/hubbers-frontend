import React from 'react';
import { Row, Col } from 'antd';
import { Container } from '../Container';
export const EventItemSection = props => {
  return (
    <Container
      className={'mt-5'}
    >
      <div className='event-item-section'>
        <a href={`events/${props.product}`}>
          <Row>
            <Col xs={24} sm={0} md={4}>
              <div className='event-item-section-time text-center'>
                <span className='fw-6'>{props.day}</span>
                <p className='fw-6 fs-4'>{props.month}</p>
                <p className='fw-4 fs-2 mb-1'>{props.time} - </p>
                <p className='fw-4 fs-2'> : {props.second} </p>
              </div>
            </Col>
            <Col xs={24} sm={24} md={15}>
              <div className='event-item-section-content'>
                <div className='event-item-section-content-heading'>
                  <p className='text-upper fc-primary fw-6 fs-4 mb-2'>{props.countryName}</p>
                  <div>
                    <span>
                      <img src={props.imgRoute}></img>
                    </span>
                    {props.event}
                  </div>
                </div>
                <div className='event-item-section-content-content pt-4 pb-4'>
                  <div className='fw-5 fs-4 lh-2'>
                    {props.product}
                  </div>
                  <div className='lh-1_5 fs-1'>
                    {props.description}
                  </div>
                </div>
                <div className='event-item-section-content-footer'>
                  <div>
                    <span className='fc-primary'>
                      <img src={props.speakers} />
                    </span>
                    <span>Speakers: </span>
                  </div>
                  <div className='fw-6 fs-1'>
                    {props.actor}
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={0} md={5}>
              <div className='event-item-section-img'>
                <div style={{ backgroundImage: `url(${props.imgUrl})` }}></div>
              </div>
            </Col>
          </Row>
        </a>
      </div>
    </Container>
  );
};