import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import {
  CreateNewBtn,
  // HomeFilter,
  // HomeSorter,
  SwitchCommunity,
  TopicManageBtn,
} from '../../../components';
import { Space } from 'antd';
import { DeskPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/apis';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import JoinInCommunity from './join';
import { fetchJson } from '../../../utils';
import { ListItemTile } from '../../../components/community/global/ListItemTile';
const TopicDetail = (props) => {
  const router = useRouter();
  const [topicData, setTopicData] = React.useState(null);
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const getTopicDetail = React.useCallback(async () => {
    const result = await fetchJson(`${API.GET_TOPIC_DETAIL_API}/${router.query.topic}`);
    setTopicData(result.data);
  }, [router]);
  React.useEffect(() => {
    if (router.query.community) {
      getTopicDetail();
    }
  }, [router, getTopicDetail]);
  return (
    router.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} />
      : <DeskPageHoc title={`Topic ${props.data?.name} - Hubbers Community`} activeSide={{ active: [`topics-${router.query.community}`], open: ['community'] }} auth={{ ...data }}>
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
                  <TopicManageBtn />
                  {/* <Button type='hbs-primary'>+</Button> */}
                  <CreateNewBtn />
                  <SwitchCommunity />
                </Space>
              </Col>
            </Row>
            {/* <div>
              <HomeFilter />
              <HomeSorter className='ml-2' />
            </div> */}
            {
              topicData &&
              topicData.posts &&
              topicData.posts.map((p) => {
                return <ListItemTile type='post' auth={{...data}} data={{...p}} key={p.id} />;
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
  const user = await req.session.get('user');
  if (!user) {
    await req.session.destroy();
    return { props: { auth: { isLoggedIn: false, ...user } } };
  }
  return { props: { data: detail ? { ...detail.data } : null, error: null, auth: { isLoggedIn: true, ...user } } };
});
export default TopicDetail;