import React from 'react';
import { defaultAvatar } from '../../../constants/etc';
import { Button, Space, Row, Col, Avatar, Input, Select } from 'antd';
import Image from 'next/image';
import { useWindowSize } from '../../../hooks';
import { CKEditor5 } from '../../CKEditor5';
import { API } from '../../../constants';
import { useRouter } from 'next/router';
import { httpRequestLocal, openNotificationWithIcon, fetchJson } from '../../../utils';
import { REQUEST_TYPE } from '../../../constants/requestType';
import { mutate } from 'swr';
import { SettingDrawer } from '../global/SettingDrawer';
const { TextArea } = Input;
const { Option } = Select;

export const PostDrawer = ({ visible, onHide, article, editable = true, content, ...props }) => {
  const size = useWindowSize();
  const [editableContent, setEditableContent] = React.useState(false);
  const [topicList, setTopicList] = React.useState([]);
  const [post, setPost] = React.useState({});
  const router = useRouter();
  React.useEffect(() => {
    if (content) {
      setPost({ ...post, ...content });
    }
    if (router.query.community && router.query.community !== 'join') {
      let p = {
        ...post, communityId: Number(router.query.community)
      };
      if (content) {
        p = { ...p, ...content };
      }
      if (article) {
        p.category = 'article';
      }
      setPost({ ...post, ...p });
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
      });
    onClose();
  };
  return <SettingDrawer
    visible={visible}
    onHide={onHide}
    title='Post'
    headerActions={
      editable || !content &&
      <Button type='hbs-primary' shape='round' className='mr-2' onClick={createPost}>Post</Button>
    }
    {...props}
  >
    <Row>
      <Col lg={4} md={4} sm={4} xs={0} className='text-right pr-3'>
        <Avatar
          size={{ xxl: 100, xl: 100, lg: 100, md: 100, sm: 75, xs: 75 }}
          src={
            <Image
              width={500}
              height={500}
              src={props.auth?.avatar ?? defaultAvatar}
              alt=''
            />
          }
        />
      </Col>
      <Col lg={18} md={18} sm={18} xs={24}>
        <Select
          style={{ width: (size.width > 768 ? 150 : '100%') }}
          placeholder='Select topic'
          allowClear
          disabled={!editable}
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
            disabled={!editable}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        }
        <div className='mt-3'>
          {
            !editableContent && !content
              ? <TextArea
                onFocus={() => setEditableContent(true)}
                placeholder='Share your thoughts'
                autoSize
                disabled={!editable}
              />
              : <Space direction='vertical' style={{ width: '100%' }}>
                {
                  !editable &&
                  <div className='ck-content oy-auto p-3 pb-0' dangerouslySetInnerHTML={{ __html: post.content }}></div>
                }
                {
                  editable &&
                  <CKEditor5 disabled={!editable} onUpload={(e) => { console.log('upload', e); }} value={post.content} onChange={(value) => setPost({ ...post, content: value })} />
                }
              </Space>
          }
        </div>
      </Col>
    </Row>
  </SettingDrawer>;
};