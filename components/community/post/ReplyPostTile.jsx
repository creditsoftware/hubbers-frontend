import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Input,
  Space
} from 'antd';
import { httpRequestLocal, openNotificationWithIcon } from '../../../utils';
import { REQUEST_TYPE } from '../../../constants/requestType';
import { API } from '../../../constants';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CKEditor5 } from '../../CKEditor5';
import { mutate } from 'swr';
import { useTopicDetail } from '../../../hooks/useSWR/community/useTopicDetail';
export const ReplyPostTile = ({ ...props }) => {
  const [editableReply, setEditableReply] = React.useState(false);
  const [replyData, setReplyData] = React.useState();
  const{mutate:mutateTDetail} = useTopicDetail(props.query.topic);
  const router = useRouter();
  React.useEffect(() => {
    setReplyData({
      isReply: true,
      communityId: props.post.communityId,
      topicId: props.post.topicId,
      parentId: props.post.id,
      category: props.post.category,
      articleType: props.post.articleType,
      postType: props.post.postType,
      createdBy: props.auth.communityMember.filter((member) => member.communityId === Number(router.query.community))[0].id,//communityMemberId
    });
  }, []);
  const reply = () => {
    httpRequestLocal(`${API.LOCAL_REPLY_POST_API}`, REQUEST_TYPE.POST, replyData)
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
        mutateTDetail();
      });
    cancel();
  };
  const cancel = () => {
    setEditableReply(false);
    if (props.onCancel) {
      props.onCancel();
    }
  };
  return (
    <Space className='response-wrap p-3'>
      <Avatar size='large' src={<Image width={100} height={100} src={props && props.auth && props.auth.avatar} alt='' />} />
      {
        !editableReply
          ? <Input
            onFocus={() => setEditableReply(true)}
            prefix={
              <Button shape='circle' type='hbs-outline-primary' style={{ border: 'none' }} onClick={() => setEditableReply(true)}>
                <PlusOutlined />
              </Button>
            }
            placeholder='Share your thought ...'
          />
          : <Space direction='vertical' style={{ width: '100%' }}>
            <CKEditor5 onChange={(e) => setReplyData({ ...replyData, content: e })} />
            <div className='text-right'>
              <Button type='hbs-outline-primary' className='mr-3' shape='round' onClick={cancel}>Cancel</Button>
              <Button type='hbs-primary' shape='round' onClick={reply}>Reply</Button>
            </div>
          </Space>
      }
    </Space>
  );
};