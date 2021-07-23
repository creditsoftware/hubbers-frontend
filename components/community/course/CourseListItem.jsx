import { Button, Col, Row, Space, Avatar } from 'antd';
import React, { useState } from 'react';
import { DEFAULT_COMMUNITY_COURSE_IMAGE } from '../../../constants/etc';
import { useWindowSize } from '../../../hooks';
import Link from 'next/link';
export const CourseListItem = ({ data }) => {
  const size = useWindowSize();
  const [w, setW] = useState('');
  React.useEffect(() => {
    setW(size.width);
  }, [size]);
  return (
    <Link href="#">
      <a className='community-child-list-item'>
        <Row style={{ padding: '24px', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }}>
          <Col>
            <Avatar
              size={100}
              src={DEFAULT_COMMUNITY_COURSE_IMAGE}
              alt='course'
            />
          </Col>
          <Col flex="auto" style={{ paddingLeft: '20px', backgroundColor: 'white' }}>
            <h4 className="fw-6 fs-4 mb-0 mt-2">{data.contents}</h4>
            <p style={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              width: w ? w > 1023 ? w - 600 : w - 300 : 0,
              maxWidth: 1000
            }}>
              {
                data.description ?? ''
              }
            </p>
            <div className='text-right'>
              <Space>
                <Button shape='round' type='hbs-outline-primary'>More Details</Button>
              </Space>
            </div>
          </Col>
        </Row>
      </a>
    </Link>
  );
};