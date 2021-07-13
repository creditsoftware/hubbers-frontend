import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import Image from 'next/image';
import { topic1Image } from '../../../constants/etc';
import { fetchJson } from '../../../utils/fetchJson';
import { API, primaryColor } from '../../../constants';
import { getUser } from '../../../utils/getUser';
import { contentfulLoaderForNextImg } from '../../../utils/contentFullLoader';

export const DiscoverTopicTile = ({ data }) => {
  const [user, setUser] = React.useState(null);
  const [topic, setTopic] = React.useState(null);
  const getData = React.useCallback(async () => {
    const u = await getUser();
    setUser(u);
  }, []);
  React.useEffect(() => {
    setTopic(data);
    getData();
  }, [getData, data]);
  const onFollow = () => {
    fetchJson(`${API.LOCAL_FOLLOW_TOPIC_API}?topicId=${data.id}`)
      .then((response) => {
        setTopic(response);
      });
  };
  return <div className='p-rel w-100'>
    {
      user &&
      topic &&
      <Tooltip title={topic.name} placement='bottom' color={primaryColor}>
        <Image width={500} height={400} className='discover-topic-tile-image' src={topic.backgroundImageUrl ? topic.backgroundImageUrl : topic1Image} loader={contentfulLoaderForNextImg} alt='' />
        <div className="p-abs l-0 t-0 w-100 h-100 d-flex f-align-center">
          <Space direction='vertical' className='w-100'>
            <div className='text-upper text-center fc-white fw-5 fs-2'>topic</div>
            <div className='text-upper text-center fc-white fw-5 fs-3' style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>{topic.name}</div>
            <div className='text-center'>
              <Button type='hbs-outline-primary' className='bg-transparent fc-white bc-white bg-primary-hover' shape='round' onClick={onFollow}>
                {
                  topic.follow &&
                    topic.follow.length > 0 &&
                    topic.follow.filter((f) => f.userId === user.id).length > 0 ? 'Followed' : 'Follow'
                }
              </Button>
            </div>
          </Space>
        </div>
      </Tooltip>
    }
  </div>;
};