import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import {
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
import { CreateTopicBtn, TopicListItem } from '../../../components';
const Topics = (props) => {
  const router = useRouter();
  const [topicList, setTopicList] = React.useState([]);
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const getTopics = React.useCallback(async () => {
    const result = await fetchJson(`${API.ALL_TOPIC_LIST_API}/${router.query.community}`);
    setTopicList(result.data);
  }, [router]);
  const refreshList = React.useCallback(async () => {
    const result = await fetchJson(`${API.ALL_TOPIC_LIST_API}/${router.query.community}`);
    setTopicList(result.data);
  }, [router]);
  React.useEffect(() => {
    if (router.query.community) {
      getTopics();
    }
  }, [router, getTopics]);
  return (
    router.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} />
      : <DeskPageHoc title='Topic - Hubbers Community' activeSide={{ active: [`topics-${router.query.community}`], open: ['community'] }} auth={{ ...data }}>
        <React.Fragment>
          <div className='max-w-80 m-auto px-3 pt-5'>
            <Row>
              <Col span={12}>
                <h1 className='fw-6 fs-5'>Topics</h1>
              </Col>
              <Col span={12} className='text-right'>
                <Space>
                  {/* <TopicManageBtn /> */}
                  <CreateTopicBtn auth={{ ...data }} refreshList={refreshList} />
                  <SwitchCommunity />
                </Space>
              </Col>
            </Row>
            {
              topicList &&
              topicList.length > 0 &&
              topicList.map((t) => {
                return <TopicListItem key={t.id} topic={{ ...t }} auth={{ ...data }} query={{ ...props.query }} refreshList={refreshList} />;
              })
            }
          </div>
        </React.Fragment>
      </DeskPageHoc>
  );
};

export const getServerSideProps = withSession(async (ctx) => {
  const { req, query } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (!user) {
    await req.session.destroy();
    return { props: { auth: { isLoggedIn: false, ...user }, query } };
  }
  return { props: { data: null, error: null, auth: { isLoggedIn: true, ...user }, query } };
});
export default Topics;