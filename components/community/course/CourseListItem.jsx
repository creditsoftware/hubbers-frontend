import { Button, Col, Row, Space, Avatar } from 'antd';
import React, { useState } from 'react';
import { DEFAULT_COMMUNITY_COURSE_IMAGE } from '../../../constants/etc';
import { useWindowSize } from '../../../hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CourseContextMenu } from './CourseContextMenu';

export const CourseListItem = ({ ...props }) => {
  const router = useRouter();
  const size = useWindowSize();
  const [w, setW] = useState('');
  React.useEffect(() => {
    setW(size.width);
  }, [size]);
  return (
    <Row className='course-list-item' style={{ padding: '24px', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', backgroundColor: 'white' }}>
      <Col className="d-flex fjc-center f-align-center">
        <Avatar
          size={100}
          src={DEFAULT_COMMUNITY_COURSE_IMAGE}
          alt='course'
        />
      </Col>
      <Col flex="auto" style={{ paddingLeft: '20px' }}>
        <h4 className="fw-6 fs-4 mb-0 mt-2">{props.data.contents}</h4>
        <p style={{
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 1,
          width: w ? w > 1023 ? w - 600 : w - 300 : 0,
          maxWidth: 1000
        }}>
          {
            props.data.description ?? ''
          }
        </p>
        <div className='text-right'>
          <Space>
            <Link href={`/desk/community/course?community=${router.query.community}&course=${props.data.id}`}>
              <a>
                <Button shape='round' type='hbs-outline-primary'>More Details</Button>
              </a>
            </Link>
            <CourseContextMenu {...props}/>
          </Space>
        </div>
      </Col>
    </Row>
  );
};