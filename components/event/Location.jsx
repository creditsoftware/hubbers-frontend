import React from 'react';
import { Row, Col } from 'antd';
import GoogleMapReact from 'google-map-react';
import { TwitterOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';
export const Location = ({eventData}) => {
  return (
    <div>
      <div className='text-center fw-6 fs-3 text-upper lts-1 pb-5'>
        Location
      </div>
      <div style={{ height: '400px'}}>
        <LocationMap/>
      </div>
      <div className='location-address mt-2 mb-4'>
        <p>{eventData.eventType === 'online' ? 'Online' : eventData.localContent?.location?.streetAddress}</p>
        <Row className='text-center'>
          <Col xs={24} lg={12}>
            <span className='fs-2 fc-primary'>Share event on</span>
          </Col>
          <Col xs={24} lg={12}>
            <FacebookOutlined style={{ fontSize: '1.5rem', fontStyle: 'normal', fontWeight: 'normal', color: '#75AC2A', marginRight: '6px'}} />
            <TwitterOutlined style={{ fontSize: '1.5rem', fontStyle: 'normal', fontWeight: 'normal', color: '#75AC2A', marginRight: '6px'}} />
            <LinkedinOutlined style={{ fontSize: '1.5rem', fontStyle: 'normal', fontWeight: 'normal', color: '#75AC2A'}} />
          </Col>
        </Row>
      </div>
    </div>
  );
};
const LocationMap = () => {
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API_KEY}}
        defaultCenter={{lat:48.8566,lng:2.3522}}
        defaultZoom={11}
      />
    </>
  );
};