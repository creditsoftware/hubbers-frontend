import { Button, Col, Row, Space } from 'antd';
import React, { useState } from 'react';
import { useWindowSize } from '../../../hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DEFAULT_COMMUNITY_TOPIC_IMAGE } from '../../../constants/etc';
import { GroupContextMenu } from './GroupContextMenu';
import Avatar from 'antd/lib/avatar/avatar';
import Image from 'next/image';
import {LockOutlined, CrownOutlined} from '@ant-design/icons';
export const GroupListItem = ({ ...props }) => {
  const size = useWindowSize();
  const router = useRouter();
  const [w, setW] = useState('');
  React.useEffect(() => {
    setW(size.width);
  }, [size]);
  return (
    <Link href={`/desk/community/group?community=${router.query.community}&group=${props.id}`}>
      <a>
        <Row style={{ padding: '0.5rem 1rem', marginBottom:'1rem',border:'1px solid #ddd', backgroundColor: 'white' }}>
          <Col flex="180px">
            <div className='m-3'>
              <div className="text-center">
                <Avatar src={<Image width={100} height={100} src={DEFAULT_COMMUNITY_TOPIC_IMAGE} alt='' />} size={100} style={{marginBottom:'-8px'}} />
                {
                  props.privacyOption.name !== 'Public' &&
                  <Space style={{backgroundColor:'#aaa', fontWeight:'bold', color:'white', padding:'0 5px', position:'relative'}} className='text-upper'>
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
              <Space>
                Host
                <CrownOutlined />
              </Space>
            </div>
            <h4 className="fw-6 fs-3 mb-0 mt-2">{props.name}</h4>
            <p style={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              width: w ? w > 1023 ? w - 600 : w - 300 : 0,
              maxWidth: 1000
            }}>
              {
                props.tagLine ?? ''
              }
            </p>
            <div className='text-right'>
              <Space>
                <Button shape='round' type='hbs-outline-primary' onClick={(e)=>e.preventDefault()}>View Group</Button>
                <GroupContextMenu {...props} />
              </Space>
            </div>
          </Col>
        </Row>
      </a>
    </Link>
  );
};