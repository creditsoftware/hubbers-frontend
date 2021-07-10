import { Badge, Button, Col, Row, Space } from 'antd';
import React from 'react';
import { primaryColor } from '../../../constants';
import { AlignLeftOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { defaultAvatar } from '../../../constants/etc';
// import { EventContextMenu } from '../events';

export const ListItemTile = ({ type='event', ...props }) => {
  console.log(props);
  return <div className='community-child-list-item'>
    <Row style={{ backgroundColor: 'white', marginBottom: '2rem', borderRadius:'1rem' }}>
      <Col flex='150px'>
        <div style={{ width: '150px', height: '150px', margin: 'auto', backgroundColor: primaryColor, borderRadius: '1rem' }}>
          <AlignLeftOutlined style={{fontSize:'3rem', margin:'3rem', color:'white'}} />
        </div>
      </Col>
      <Col flex='auto' className='px-3 py-2'>
        <div style={{minHeight:'6rem'}}>Just checking in guys! </div>
        <div>
          <Row>
            <Col flex='300px'>
              <Space>
                <Avatar src={defaultAvatar} size='small' />
                <div>Denis Kravchenko</div>
                <Badge status="default" text="Posted 1d ago" />
                {/* <Badge status="success" text="Posted 1d ago" /> */}
              </Space>
            </Col>
            <Col flex='auto'></Col>
            <Col flex='150px'>
              {
                type === 'event' &&
                <Space>
                  <Button type='hbs-outline-primary'>View Event</Button>
                  {/* <EventContextMenu /> */}
                </Space>
              }
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </div>;
};