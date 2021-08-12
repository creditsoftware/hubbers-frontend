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
import { useWindowSize } from '../../../hooks';
import { useGroupList } from '../../../hooks';
import { MemberInvitationBtn } from '../invite';
export const GroupListItem = ({ ...props }) => {
  const [joinLoading, setJoinLoading] = React.useState(false);
  const [isJoined, setIsJoined] = React.useState(false);
  const [requestLoading, setRequestLoading] = React.useState(false);
  const [w, setW] = React.useState('');

  const size = useWindowSize();
  const { mutate } = useGroupList(props.query.community);

  React.useEffect(() => {
    setW(size.width);
  }, [size]);
  React.useEffect(() => {
    setIsJoined(props.data.members.filter((m) => m.user?.id === props.auth?.id).length > 0);
  }, [props]);

  const onJoin = () => {
    setJoinLoading(true);
    fetchJson(`${API.JOININ_COMMUNITY_GROUP_API}/${props.data.id}/${props.auth?.id}`, {
      method: REQUEST_TYPE.PATCH
    }).then(() => {
      setJoinLoading(false);
      mutate();
    }).catch(() => {
      setJoinLoading(false);
    });
  };
  const onRequest = () => {
    setRequestLoading(true);
    fetchJson(`${API.REQUEST_TO_JOIN_LIST_API}/${props.data.id}/${props.auth?.id}`, {
      method: REQUEST_TYPE.POST
    }).then(() => {
      setRequestLoading(false);
      mutate();
    }).catch(() => {
      setRequestLoading(false);
    });
  };
  return (
    <Link href={isJoined ? `/desk/community/group?community=${props.query.community}&group=${props.data.id}` : '#'}>
      <a className='community-child-list-item'>
        <Row style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', backgroundColor: 'white' }}>
          <Col flex="180px">
            <div className='m-3'>
              <div className="text-center">
                <Avatar src={<Image width={100} height={100} preview={false} src={props.data.featuredImage ?? DEFAULT_COMMUNITY_TOPIC_IMAGE} alt='' />} size={100} style={{ marginBottom: '-8px' }} />
                {
                  props.data.privacyOption.name !== 'Public' &&
                  <Space style={{ backgroundColor: '#aaa', fontWeight: 'bold', color: 'white', padding: '0 5px', position: 'relative' }} className='text-upper'>
                    <LockOutlined />
                    {
                      props.data.privacyOption.name
                    }
                  </Space>
                }
              </div>
            </div>
          </Col>
          <Col flex="auto">
            <div className="text-right">
              {
                props.data.creator?.id === props.auth?.id &&
                <Space>
                  Host
                  <CrownOutlined />
                </Space>
              }
              {
                props.data.creator?.id !== props.auth?.id &&
                isJoined &&
                <Space>
                  Joined
                  <SafetyCertificateOutlined />
                </Space>
              }
            </div>
            <h4
              className="fw-6 fs-3 mb-0 mt-2"
              style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: w ? w > 1023 ? w - 600 : w - 300 : 0,
                maxWidth: 1000
              }}
            >
              {props.data.name}
            </h4>
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
                props.data.tagLine ?? ''
              }
            </p>
            <div className='text-right'>
              <Space>
                {
                  isJoined &&
                  <ViewGroupBtn {...props} />
                }
                {
                  !isJoined &&
                  props.data.privacyOption?.name === 'Public' &&
                  <Button loading={joinLoading} type='hbs-outline-primary' shape='round' onClick={onJoin}>
                    Join Us
                  </Button>
                }
                {
                  props.data.members.filter((m) => m.roleId === 1 && m.user?.id === props.auth?.id).length > 0 &&
                  <MemberInvitationBtn {...props} type='hbs-outline-primary' shape='round' gid={props.data.id} />
                }
                {
                  !isJoined &&
                  props.data.privacyOption?.name === 'Private' &&
                  <Button loading={requestLoading} type='hbs-outline-primary' shape='round' onClick={onRequest}>
                    {
                      props.data.requested && props.data.requestStatus === 'PENDING' ?
                        <React.Fragment>
                          Requested
                        </React.Fragment>
                        :
                        <React.Fragment>
                          Request to Join
                        </React.Fragment>
                    }
                  </Button>
                }
                {
                  props.data.members.filter((m) => m.roleId === 1 && m.user?.id === props.auth?.id).length > 0 &&
                  <GroupContextMenu {...props} />
                }
              </Space>
            </div>
          </Col>
        </Row>
      </a>
    </Link>
  );
};