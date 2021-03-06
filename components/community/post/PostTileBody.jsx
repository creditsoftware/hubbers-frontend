import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import { PostTileContent } from './PostTileContent';
import { PostTileHeader } from './PostTileHeader';
import { REQUEST_TYPE } from '../../../constants/requestType';
import { API, primaryColor } from '../../../constants';
import { httpRequestLocal, openNotificationWithIcon } from '../../../utils';
import {
  HeartOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { mutate } from 'swr';
import { useTopicDetail } from '../../../hooks/useSWR/community/useTopicDetail';
import { useGroupDetail } from '../../../hooks/useSWR/community/useGroupDetail';
export const PostTileBody = ({ ...props }) => {
  const [contentEditable, setContentEditable] = React.useState(false);
  const [newPost, setNewPost] = React.useState(null);
  const { mutate: updateTDetail } = useTopicDetail(props.query.topic ?? null);
  const { mutate: updateGDetail } = useGroupDetail(props.query.group ?? null);
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
      createdBy: props.auth.communityMember.filter((member) => member.communityId === Number(props.query.community))[0].id,
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
      if (props.query.community) {
        let response = await fetch(`${API.LOCAL_GET_POST_LIST_API}?communityId=${props.query.community}`);
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
        updateTDetail();
        updateGDetail();
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
        updateTDetail();
        updateGDetail();
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
        <Tooltip title='Cheer' color={primaryColor}>
          <Button type='text' onClick={props.onCheer}>
            <HeartOutlined />
          </Button>
        </Tooltip>
        <Tooltip title='Reply' color={primaryColor}>
          <Button type='text' onClick={props.onReply}>
            <MessageOutlined />
          </Button>
        </Tooltip>
      </Space>
    </div>
  );
};