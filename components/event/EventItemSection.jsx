import React from 'react';
import { Row, Col, Image } from 'antd';
import { Container } from '../Container';
import { DEFAULT_COMMUNITY_TOPIC_IMAGE } from '../../constants/etc';
import moment from 'moment';

export const EventItemSection = props => {
  console.log(props);
  return (
    <Container
      className={'mt-5'}
    >
      <div className='event-item-section'>
        <a href={`events/${props.slug}`}>
          <Row>
            <Col xs={24} sm={0} md={4}>
              <div className='event-item-section-time text-center'>
                <span className='fw-6'>{moment(props.startDate).format('DD')}</span>
                <p className='fw-6 fs-4 text-upper'>{moment(props.startDate).format('MMM')}</p>
                <p className='fw-4 fs-2'>{props.startTime.split(':')[0] + ':' + props.startTime.split(':')[1]}</p>
                <p className='fw-4 fs-1'>{props.timezoneDetail.abbr}</p>
              </div>
            </Col>
            <Col xs={24} sm={24} md={15}>
              <div className='event-item-section-content'>
                <div className='event-item-section-content-heading'>
                  <p className='text-upper fc-primary fw-6 fs-4 mb-2'>
                    {props.eventType === 'online' ? 'Online' : props.localContent?.location?.name}
                  </p>
                  {
                    props.eventType === 'local' &&
                    <div className="d-flex f-align-center">
                      <Image preview={false} width={24} height={24} src="/images/icons/location_icon.png" />
                      <span className="ml-2">{props.localContent?.location?.streetAddress}</span>
                    </div>
                  }
                </div>
                <div className='event-item-section-content-content pt-4 pb-4'>
                  <div className='fw-5 fs-4 lh-2'>
                    {props.title}
                  </div>
                  <div className='lh-1_5 fs-1'>
                    {props.description}
                  </div>
                </div>
                <div className='event-item-section-content-footer'>
                  <div className="d-flex f-align-center">
                    <Image preview={false} width={24} height={24} src="/images/icons/comment_icon_green.png" />
                    <span className="ml-1">Speakers: </span>
                  </div>
                  <div className='fw-6 fs-1'>
                    {props.speakers?.map((item, index)=>{
                      return <span key={item.id} className="ml-2">{index === props.speakers.length - 1 ? item.name : item.name + ',' }</span>;
                    })}
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={0} md={5}>
              <div className='event-item-section-img'>
                <div style={{ backgroundImage: `url(${props.headerImageUrl ?? DEFAULT_COMMUNITY_TOPIC_IMAGE})`, borderRadius: '5px' }}></div>
              </div>
            </Col>
          </Row>
        </a>
      </div>
    </Container>
  );
};