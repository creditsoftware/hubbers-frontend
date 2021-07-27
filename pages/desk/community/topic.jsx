import { Col, Row } from 'antd';
import React from 'react';
import {
  CreateNewBtn,
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
import { ListItemTile } from '../../../components/community/global/ListItemTile';
import { useTopicDetail } from '../../../hooks/useSWR/community/useTopicDetail';
const TopicDetail = (props) => {
  const [topicData, setTopicData] = React.useState(null);
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const { data: tDetail } = useTopicDetail(props.query?.topic);
  React.useEffect(() => {
    if (tDetail) {
      setTopicData(tDetail.data);
    }
  }, [tDetail]);
  return (
    props.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} />
      : <DeskPageHoc title={`Topic ${props.data?.name} - Hubbers Community`} activeSide={{ active: [`topics-${props.query.community}`], open: ['community'] }} auth={{ ...data }}>
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
            {/* <div>
              <HomeFilter />
              <HomeSorter className='ml-2' />
            </div> */}
            {
              topicData &&
              topicData.posts &&
              topicData.posts.map((p) => {
                return <ListItemTile type='post' auth={{ ...data }} data={{ ...p }} key={p.id} query={{ ...props.query }} />;
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