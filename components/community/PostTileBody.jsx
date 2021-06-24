import React from 'react';
import { Button, Space } from 'antd';
import { PostTileContent } from './PostTileContent';
import { PostTileHeader } from './PostTileHeader';
import { REQUEST_TYPE } from '../../constants/requestType';
import { API } from '../../constants';
import { httpRequestLocal, openNotificationWithIcon } from '../../utils';
import {
  HeartOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { mutate } from 'swr';
import { useRouter } from 'next/router';
export const PostTileBody = ({ ...props }) => {
  const [contentEditable, setContentEditable] = React.useState(false);
  const [newPost, setNewPost] = React.useState(null);
  const router = useRouter();
  React.useEffect(() => {
    setNewPost({
      id: props.post.id,
      isReply: props.post.isReply,
      communityId: props.post.communityId,
      topicId: props.post.topicId,
      parentId: props.post.parentId,
      category: props.post.category,
      articleType: props.post.articleType,
      postType: props.post.postType,
      createdBy: props.auth.communityMember.filter((member) => member.communityId === Number(router.query.community))[0].id,
      content: props.post.content
    });
  }, []);
  const headerAction = (action) => {
    switch (action) {
      case 'edit':
        setContentEditable(true);
        break;
      case 'delete':
        deleteHandle();
        break;
      default:
        break;
    }
  };
  const update = () => {
    mutate(`${API.LOCAL_GET_POST_LIST_API}`, async () => {
      if (router.query.community) {
        let response = await fetch(`${API.LOCAL_GET_POST_LIST_API}?communityId=${router.query.community}`);
        response = await response.json();
        return response.data;
      } else {
        return [];
      }
    });
  };
  const editHandle = () => {
    httpRequestLocal(`${API.LOCAL_UPDATE_POST_API}`, REQUEST_TYPE.POST, newPost)
      .then((response) => {
        openNotificationWithIcon('success', 'Success', response.message);
        setContentEditable(false);
        update();
      })
      .catch((err) => {
        openNotificationWithIcon('error', 'Something went wrong', err.response.message);
      });
  };
  const deleteHandle = () => {
    httpRequestLocal(`${API.LOCAL_DELETE_POST_API}?postId=${newPost.id}`, REQUEST_TYPE.GET)
      .then((response) => {
        openNotificationWithIcon('success', 'Success', response.message);
        setContentEditable(false);
        update();
      })
      .catch((err) => {
        openNotificationWithIcon('error', 'Something went wrong', err.response.message);
      });
  };
  return (
    <div>
      <PostTileHeader {...props} onHandleChange={headerAction} />
      <PostTileContent
        post={contentEditable ? newPost : { ...props.post }}
        editable={contentEditable}
        onChange={e => setNewPost({ ...newPost, content: e })}
        onSave={editHandle}
        onCancel={() => setContentEditable(false)}
      />
      <Space className='p-3 pt-0'>
        <Button type='text' onClick={props.onCheer}>
          <HeartOutlined />
        </Button>
        <Button type='text' onClick={props.onReply}>
          <MessageOutlined />
        </Button>
      </Space>
    </div>
  );
};