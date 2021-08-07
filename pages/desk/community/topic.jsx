import { Button, Col, Row } from 'antd';
import React from 'react';
import {
  CreateNewBtn,
  PostTile,
  // HomeFilter,
  // HomeSorter,
  SwitchCommunity,
  // TopicManageBtn,
} from '../../../components';
import { jwtDecode } from '../../../utils/jwt';
import { Space } from 'antd';
import { DeskPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/apis';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import JoinInCommunity from './join';
import { fetchJson } from '../../../utils';
import { PostListItem } from '../../../components';
import { useTopicDetail } from '../../../hooks/useSWR/community/useTopicDetail';
import { EventListItem } from '../../../components/community/events/EventListItem';
// import { usePostList } from '../../../hooks/useSWR/community/usePostList';
import { BarsOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
const TopicDetail = (props) => {
  const [topicData, setTopicData] = React.useState(null);
  // const [posts, setPosts] = React.useState(null);
  const router = useRouter();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const { data: tDetail } = useTopicDetail(props.query?.topic);
  // const { data: postList } = usePostList({ topic: props.query?.topic });
  React.useEffect(() => {
    if (tDetail) {
      setTopicData(tDetail.data);
    }
  }, [tDetail]);
  // React.useEffect(() => {
  //   if (postList) {
  //     setPosts(postList.data);
  //   }
  // }, [postList]);
  return (
    props.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} />
      : <DeskPageHoc
        title={`Topic ${props.data?.name} - Hubbers Community`}
        activeSide={{
          active: [`topics-${props.query.community}`],
          open: ['community']
        }}
        auth={{ ...data }}
      >
        <React.Fragment>
          <div className='max-w-80 m-auto px-3 pt-5'>
            <Row>
              <Col span={12}>
                <span className='text-upper'>topic</span>
                <h1 className='fw-6 fs-5'>{props.data?.name}</h1>
                <p>{props.data?.description}</p>
              </Col>
              <Col span={12} className='text-right'>
                <Space>
                  {/* <TopicManageBtn /> */}
                  <CreateNewBtn {...props} />
                  <SwitchCommunity />
                </Space>
              </Col>
            </Row>
            <div className='mb-3'>
              <Row>
                <Col flex='auto'>
                  {/* <HomeFilter />
                </Col>
                <Col flex='auto'>
                  <HomeSorter /> */}
                </Col>
                <Col flex='3rem' className='text-right'>
                  <Button
                    icon={<BarsOutlined />}
                    size='small'
                    type={router.query.postWrapped * 1 ? 'hbs-outline-primary' : 'hbs-primary'}
                    onClick={
                      () => router.push({
                        query: {
                          community: router.query.community,
                          topic: router.query.topic,
                          postWrapped: router.query.postWrapped * 1 ? 0 : 1
                        }
                      })
                    }
                  />
                </Col>
              </Row>
            </div>
            {
              props.query?.postWrapped === '1' &&
              topicData &&
              topicData.posts &&
              topicData.posts.map((p) => {
                return <PostListItem auth={{ ...data }} data={{ ...p }} key={p.id} query={{ ...props.query }} />;
              })
            }
            {
              (!props.query?.postWrapped ||
              props.query?.postWrapped === '0') &&
              topicData &&
              topicData.posts &&
              topicData.posts.map((post) => {
                return <PostTile auth={{ ...data }} key={post.id} post={{ ...post }} query={{ ...props.query }} />;
              })
            }
            {
              props.query?.postWrapped === '1' &&
              topicData &&
              topicData.events &&
              topicData.events.map((p) => {
                return <EventListItem auth={{ ...data }} {...p} key={p.id} query={{ ...props.query }} />;
              })
            }
          </div>
        </React.Fragment>
      </DeskPageHoc>
  );
};

export const getServerSideProps = withSession(async (ctx) => {
  const { req, query } = ctx;
  let detail = null;
  if (query.topic) {
    detail = await fetchJson(`${API.GET_TOPIC_DETAIL_API}/${query.topic}`);
  }
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (!user) {
    await req.session.destroy();
    return { props: { auth: { isLoggedIn: false, ...user }, query } };
  }
  return { props: { data: detail ? { ...detail.data } : null, error: null, auth: { isLoggedIn: true, ...user }, query } };
});
export default TopicDetail;