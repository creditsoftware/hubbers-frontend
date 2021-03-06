import { Button, Col, Row, Space, Image } from 'antd';
import React, { useState } from 'react';
// import Image from 'next/image';
import { DEFAULT_COMMUNITY_TOPIC_IMAGE } from '../../../constants/etc';
import { useWindowSize } from '../../../hooks';
import Link from 'next/link';
import { API, primaryColor } from '../../../constants';
import { fetchJson, openNotificationWithIcon } from '../../../utils';
import { TopicContextMenu } from './TopicContextMenu';
export const TopicListItem = ({ ...props }) => {
  const size = useWindowSize();
  const [data, setData] = React.useState({ ...props.topic });
  const [loadingToFollow, setLoadingToFollow] = useState(false);
  const [w, setW] = useState('');
  React.useEffect(() => {
    setW(size.width);
  }, [size]);
  React.useEffect(() => {
    setData({ ...props.topic });
  }, [props.topic]);
  const followTopic = (e) => {
    e.preventDefault();
    setLoadingToFollow(true);
    if (props.auth) {
      fetchJson(`${API.FOLLOW_TOPIC_API}/${props.topic.id}/${props.auth.id}`).then((res) => {
        setLoadingToFollow(false);
        const d = { ...data, ...res.result };
        setData({ ...d });
      }).catch(() => {
        setLoadingToFollow(false);
      });
    } else {
      openNotificationWithIcon('error', 'Something went wrong!', 'Failed to follow this topic.');
      setLoadingToFollow(false);
    }
  };
  return (
    <Link href={`/desk/community/topic?community=${props.query?.community}&topic=${data.id}`}>
      <a className='community-child-list-item'>
        <Row style={{ borderLeft: `8px solid ${data.color ? data.color : primaryColor}`, borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }}>
          <Col flex="180px">
            <div style={{ display: 'flex' }}>
              <Image
                width={180}
                height={130}
                src={data.backgroundImageUrl ?? DEFAULT_COMMUNITY_TOPIC_IMAGE}
                alt='topic'
                preview={false}
              />
            </div>
          </Col>
          <Col flex="auto" style={{ padding: '0 1rem', backgroundColor: 'white' }}>
            <h4 className="fw-6 fs-3 mb-0 mt-2">{data.name}</h4>
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
                <Button shape='round' loading={loadingToFollow} type='hbs-outline-primary' onClick={followTopic}>{data.follow && data.follow.filter((f) => f.userId === props.auth?.id).length > 0 ? 'Following' : 'Follow'}</Button>
                <TopicContextMenu refreshList={props.refreshList ? props.refreshList : null} {...data} />
              </Space>
            </div>
          </Col>
        </Row>
      </a>
    </Link>
  );
};