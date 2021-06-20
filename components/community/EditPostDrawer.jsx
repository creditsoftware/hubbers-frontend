import React from 'react';
import { denisAvatar } from '../../constants/etc';
import { ArrowsAltOutlined } from '@ant-design/icons';
import { Button, Drawer, Space, Row, Col, Avatar, Input, Select } from 'antd';
import Image from 'next/image';
import { useWindowSize } from '../../hooks';
import { CKEditor5 } from '../CKEditor5';
import { fetchJson } from '../../utils/fetchJson';
import { API } from '../../constants';
import { useRouter } from 'next/router';
import { httpRequestLocal } from '../../utils/httpRequestLocal';
import { REQUEST_TYPE } from '../../constants/requestType';
import openNotificationWithIcon from '../../utils/openNotificationWithIcon';
import { mutate } from 'swr';
const { TextArea } = Input;
const { Option } = Select;

export const EditPostDrawer = ({ visible, onHide, article }) => {
  const [fullWidth, setFullWidth] = React.useState(false);
  const size = useWindowSize();
  const [editableContent, setEditableContent] = React.useState(false);
  const [topicList, setTopicList] = React.useState([]);
  const [post, setPost] = React.useState({});
  const router = useRouter();
  React.useEffect(() => {
    if (router.query.community && router.query.community !== 'join') {
      let p = {
        ...post, communityId: Number(router.query.community)
      };
      if (article) {
        p.category = 'article';
      }
      setPost({ ...p });
    }
    fetchJson(`${API.LOCAL_SIMPLE_TOPIC_LIST_API}?communityId=${router.query.community}`).then((response) => {
      setTopicList(response);
    }).catch(() => {
      setTopicList([]);
    });
  }, [router]);
  const clear = () => {
    setPost({ ...post, topicId: '', content: '', title: '' });
  };
  const onClose = () => {
    clear();
    onHide();
  };
  const createPost = () => {
    if (!post.title && article) {
      openNotificationWithIcon('error', 'Something went wrong!', 'Please enter title');
      return;
    }
    if (!post.content) {
      openNotificationWithIcon('error', 'Something went wrong!', 'Please enter description');
      return;
    }
    httpRequestLocal(`${API.LOCAL_CREATE_POST_API}`, REQUEST_TYPE.POST, post)
      .then((response) => {
        openNotificationWithIcon('success', 'Success', response.message);
        mutate(`${API.LOCAL_GET_POST_LIST_API}`, async () => {
          if (router.query.community) {
            let response = await fetch(`${API.LOCAL_GET_POST_LIST_API}?communityId=${router.query.community}`);
            response = await response.json();
            return response.data;
          } else {
            return [];
          }
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
    onClose();
  };
  return <Drawer
    title={
      <Row>
        <Col span={12}>
          <h2 className='fw-6 fs-3 fc-primary'>Create {!article ? 'a Post' : 'an Article'}</h2>
        </Col>
        <Col span={12} className='text-right'>
          <Button type='hbs-link' style={{ padding: 0, marginRight: '1rem' }} onClick={() => setFullWidth(!fullWidth)}>
            <ArrowsAltOutlined style={{ fontSize: '18px', fontWeight: '600', color: '#c4c4c4' }} />
          </Button>
          <Button type='hbs-primary' shape='round' className='mr-2' onClick={createPost}>Post</Button>
          <Button type='hbs-dashed' shape='round' onClick={onClose}>&times;&nbsp;Close</Button>
        </Col>
      </Row>
    }
    closable={false}
    visible={visible}
    onClose={onClose}
    key='1'
    width={fullWidth || size.width <= 1024 ? '100%' : 1024}
  >
    <Row>
      <Col lg={4} md={4} sm={4} xs={0} className='text-right pr-3'>
        <Avatar
          size={{ xxl: 100, xl: 100, lg: 100, md: 100, sm: 75, xs: 75 }}
          src={
            <Image
              width={500}
              height={500}
              src={denisAvatar}
            />
          }
        />
      </Col>
      <Col lg={18} md={18} sm={18} xs={24}>
        <Select
          style={{ width: (size.width > 768 ? 150 : '100%') }}
          placeholder='Select topic'
          allowClear
          value={post.topicId}
          onChange={(value) => setPost({ ...post, topicId: value })}
        >
          {
            topicList &&
            topicList.length > 0 &&
            topicList.map((topic) => <Option key={topic.id} value={topic.id}>{topic.name}</Option>)
          }
        </Select>
        {
          article &&
          <Input
            type='text'
            name='title'
            size='large'
            bordered={false}
            placeholder='Title'
            className='mt-3'
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        }
        <div className='mt-3'>
          {
            !editableContent
              ? <TextArea
                onFocus={() => setEditableContent(true)}
                placeholder='Share your thoughts'
                autoSize
              />
              : <Space direction='vertical' style={{ width: '100%' }}>
                <CKEditor5 onUpload={(e) => { console.log('upload', e); }} value={post.content} onChange={(value) => setPost({ ...post, content: value })} />
              </Space>
          }
        </div>
      </Col>
    </Row>
  </Drawer>;
};