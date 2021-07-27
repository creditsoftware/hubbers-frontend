import {
  Badge,
  Button,
  Col,
  Row,
  Space
} from 'antd';
import React from 'react';
import { primaryColor } from '../../../constants';
import {
  AlignLeftOutlined,
  // HeartOutlined,
  // MessageOutlined
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { defaultAvatar } from '../../../constants/etc';
import {
  PostContextMenu,
  PostDrawer
} from '../post';
import { EventContextMenu } from '../events';
import moment from 'moment';

export const ListItemTile = ({ type = 'event', ...props }) => {
  const [visible, setVisible] = React.useState({
    post: false,
    event: false
  });
  const onChangeVisible = () => {
    switch (type) {
      case 'post':
        setVisible({ ...visible, post: !visible.post });
        break;
      case 'event':
        setVisible({ ...visible, event: !visible.event });
        break;
      default:
        break;
    }
  };
  return <React.Fragment>
    <div className='community-child-list-item cursor-pointer' onClick={onChangeVisible}>
      <Row style={{ backgroundColor: 'white', marginBottom: '2rem', borderRadius: '1rem' }}>
        <Col flex='150px'>
          <div style={{ width: '150px', height: '150px', margin: 'auto', backgroundColor: primaryColor, borderRadius: '1rem' }}>
            <AlignLeftOutlined style={{ fontSize: '3rem', margin: '3rem', color: 'white' }} />
          </div>
        </Col>
        <Col flex='auto' className='px-3 py-2'>
          {
            type === 'post' &&
            <div className='ck-content' style={{ height: '6rem', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: props.data?.content }}></div>
          }
          <div>
            <Row>
              <Col flex='auto'>
                {
                  props.data?.creator?.user &&
                  <Space>
                    <Avatar src={props.data?.creator?.user.avatar ?? defaultAvatar} size='small' />
                    <div>{props.data?.creator?.user.firstname ?? ''} {props.data?.creator?.user.lastname ?? ''}</div>
                    <Badge status="default" text={`Posted ${moment(props.data?.createdAt).fromNow()}`} />
                    {/* <Badge status="success" text="Posted 1d ago" /> */}
                  </Space>
                }
              </Col>
              <Col flex='auto'></Col>
              <Col flex='150px'>
                {
                  type === 'event' &&
                  <Space>
                    <Button shape='round' type='hbs-outline-primary'>View Event</Button>
                    <EventContextMenu />
                  </Space>
                }
                {
                  type === 'post' &&
                  <div className="text-right">
                    <Space onClick={(e) => e.stopPropagation()}>
                      {/* <Button type='text' onClick={(e)=>e.stopPropagation()}>
                        <HeartOutlined />
                      </Button>
                      <Button type='text' onClick={(e)=>e.stopPropagation()}>
                        <MessageOutlined />
                      </Button> */}
                      <PostContextMenu onClick={(e) => e.stopPropagation()} {...props} />
                    </Space>
                  </div>
                }
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
    <PostDrawer visible={visible.post} editable={false} onHide={onChangeVisible} content={{ ...props.data }} {...props} />
  </React.Fragment>;
};