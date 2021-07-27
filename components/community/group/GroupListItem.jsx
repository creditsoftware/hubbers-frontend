import React from 'react';
import {
  // Button,
  Col,
  Row,
  Image,
  Space
} from 'antd';
import Link from 'next/link';
import { DEFAULT_COMMUNITY_TOPIC_IMAGE } from '../../../constants/etc';
import { GroupContextMenu } from './GroupContextMenu';
import Avatar from 'antd/lib/avatar/avatar';
// import Image from 'next/image';
import {
  LockOutlined,
  // CrownOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { ViewGroupBtn } from './ViewGroupBtn';
export const GroupListItem = ({ ...props }) => {
  return (
    <Link href={`/desk/community/group?community=${props.query.community}&group=${props.id}`}>
      <a className='community-child-list-item'>
        <Row style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', backgroundColor: 'white' }}>
          <Col flex="180px">
            <div className='m-3'>
              <div className="text-center">
                <Avatar src={<Image width={100} height={100} src={props.featuredImage ?? DEFAULT_COMMUNITY_TOPIC_IMAGE} alt='' />} size={100} style={{ marginBottom: '-8px' }} />
                {
                  props.privacyOption.name !== 'Public' &&
                  <Space style={{ backgroundColor: '#aaa', fontWeight: 'bold', color: 'white', padding: '0 5px', position: 'relative' }} className='text-upper'>
                    <LockOutlined />
                    {
                      props.privacyOption.name
                    }
                  </Space>
                }
              </div>
            </div>
          </Col>
          <Col flex="auto">
            <div className="text-right">
              {/* <Space>
              Host
              <CrownOutlined />
            </Space> */}
              <Space>
                Joined
                <SafetyCertificateOutlined />
              </Space>
            </div>
            <h4 className="fw-6 fs-3 mb-0 mt-2">{props.name}</h4>
            <p>
              {
                props.tagLine ?? ''
              }
            </p>
            <div className='text-right'>
              <Space>
                <ViewGroupBtn {...props} />
                {/* <Button type='hbs-outline-primary' shape='round'>
                  Join Us
                </Button> */}
                <GroupContextMenu {...props} />
              </Space>
            </div>
          </Col>
        </Row>
      </a>
    </Link>
  );
};