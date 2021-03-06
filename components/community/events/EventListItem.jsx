import React from 'react';
import {
  Button,
  Col,
  // Dropdown,
  // Menu,
  Row,
  Space,
  Image
} from 'antd';
// import Link from 'next/link';
import { DEFAULT_COMMUNITY_TOPIC_IMAGE } from '../../../constants/etc';
import Avatar from 'antd/lib/avatar/avatar';
// import Image from 'next/image';
import { useWindowSize } from '../../../hooks';
// import {
//   DownOutlined
// } from '@ant-design/icons';
import { ViewEventBtn } from './ViewEventBtn';
import { EventContextMenu } from './EventContextMenu';
export const EventListItem = ({ ...props }) => {
  const size = useWindowSize();
  const [w, setW] = React.useState('');
  React.useEffect(() => {
    setW(size.width);
  }, [size]);
  return (
    // <Link href={`/desk/community/event?community=${props.query.community}&event=${props.id}`}>
    <a className='community-child-list-item'>
      <Row style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', backgroundColor: 'white' }}>
        <Col flex="180px">
          <div className='m-3'>
            <div className="text-center">
              <Avatar
                src={
                  <Image
                    preview={false}
                    width={100}
                    height={100}
                    src={
                      props.headerImageUrl ?
                        props.headerImageUrl :
                        DEFAULT_COMMUNITY_TOPIC_IMAGE
                    }
                    alt=''
                  />
                }
                size={100}
                style={{ marginBottom: '-8px' }}
              />
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
              {/* <DownOutlined /> */}
            </Button>
            {/* </Dropdown> */}
          </div>
          <h4 className="fw-6 fs-3 mb-0 mt-2">{props.title ?? ''}</h4>
          <p
            style={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              width: w ? w > 1023 ? w - 600 : w - 300 : 0,
              maxWidth: 1000
            }}
          >
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