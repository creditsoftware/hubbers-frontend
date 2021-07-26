import React from 'react';
import {
  Button,
  Col,
  // Dropdown,
  // Menu,
  Row,
  Space
} from 'antd';
// import Link from 'next/link';
import { DEFAULT_COMMUNITY_TOPIC_IMAGE } from '../../../constants/etc';
import Avatar from 'antd/lib/avatar/avatar';
import Image from 'next/image';
import {
  DownOutlined
} from '@ant-design/icons';
import { ViewEventBtn } from './ViewEventBtn';
import { EventContextMenu } from './EventContextMenu';
export const EventListItem = ({ ...props }) => {
  return (
    // <Link href={`/desk/community/event?community=${props.query.community}&event=${props.id}`}>
    <a className='community-child-list-item'>
      <Row style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', backgroundColor: 'white' }}>
        <Col flex="180px">
          <div className='m-3'>
            <div className="text-center">
              <Avatar src={<Image width={100} height={100} src={DEFAULT_COMMUNITY_TOPIC_IMAGE} alt='' />} size={100} style={{ marginBottom: '-8px' }} />
            </div>
          </div>
        </Col>
        <Col flex="auto">
          <div className="text-right">
            {/* <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    Going
                  </Menu.Item>
                  <Menu.Item>
                    Maybe
                  </Menu.Item>
                  <Menu.Item danger>
                    Not going
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
            > */}
            <Button type='hbs-primary' size='small' shape='round' className='not-hover'>
              You&apos;re going
              <DownOutlined />
            </Button>
            {/* </Dropdown> */}
          </div>
          <h4 className="fw-6 fs-3 mb-0 mt-2">{props.title ?? ''}</h4>
          <p>
            {
              props.description ?? ''
            }
          </p>
          <div className='text-right'>
            <Space>
              <ViewEventBtn {...props} />
              <EventContextMenu {...props} />
            </Space>
          </div>
        </Col>
      </Row>
    </a>
    // </Link>
  );
};