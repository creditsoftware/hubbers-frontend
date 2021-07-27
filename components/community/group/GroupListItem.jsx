import React from 'react';
import {
  Col,
  Row,
  Image,
  Space,
  Button
} from 'antd';
import Link from 'next/link';
import { DEFAULT_COMMUNITY_TOPIC_IMAGE } from '../../../constants/etc';
import { GroupContextMenu } from './GroupContextMenu';
import Avatar from 'antd/lib/avatar/avatar';
import {
  LockOutlined,
  CrownOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { ViewGroupBtn } from './ViewGroupBtn';
import { fetchJson } from '../../../utils';
import { API, REQUEST_TYPE } from '../../../constants';
import { useGroupList } from '../../../hooks';
export const GroupListItem = ({ ...props }) => {
  const [joinLoading, setJoinLoading] = React.useState(false);
  // const [requestLoading, setRequestLoading] = React.useState(false);
  const { mutate } = useGroupList(props.query.community);
  const onJoin = () => {
    setJoinLoading(true);
    fetchJson(`${API.JOININ_COMMUNITY_GROUP_API}/${props.id}/${props.auth?.id}`, {
      method: REQUEST_TYPE.PATCH
    }).then(() => {
      setJoinLoading(false);
      mutate();
    }).catch(() => {
      setJoinLoading(false);
    });
  };
  // const onRequest = () => {
  // setRequestLoading(true);
  // fetchJson(`${API.JOININ_COMMUNITY_GROUP_API}/${props.id}/${props.auth?.id}`, {
  //   method: REQUEST_TYPE.PATCH
  // }).then(() => {
  //   setRequestLoading(false);
  //   mutate();
  // }).catch(() => {
  //   setRequestLoading(false);
  // });
  // };
  return (
    <Link href={props.members.filter((m) => m.user?.id === props.auth?.id).length > 0 ? `/desk/community/group?community=${props.query.community}&group=${props.id}` : '#'}>
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
              {
                props.creator?.id === props.auth?.id &&
                <Space>
                  Host
                  <CrownOutlined />
                </Space>
              }
              {
                props.creator?.id !== props.auth?.id &&
                props.members.filter((m) => m.user?.id === props.auth?.id).length > 0 &&
                <Space>
                  Joined
                  <SafetyCertificateOutlined />
                </Space>
              }
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
                {
                  props.members.filter((m) => m.user?.id === props.auth?.id).length === 0 &&
                  props.privacyOption?.name === 'Public' &&
                  <Button loading={joinLoading} type='hbs-outline-primary' shape='round' onClick={onJoin}>
                    Join Us
                  </Button>
                }
                {
                  // props.members.filter((m) => m.user?.id === props.auth?.id).length === 0 &&
                  // props.privacyOption?.name === 'Private' &&
                  // <Button loading={requestLoading} type='hbs-outline-primary' shape='round' onClick={onRequest}>
                  //   Request to Join
                  // </Button>
                }
                <GroupContextMenu {...props} />
              </Space>
            </div>
          </Col>
        </Row>
      </a>
    </Link>
  );
};