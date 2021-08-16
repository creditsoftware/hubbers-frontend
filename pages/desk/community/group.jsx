import { Button, Col, Row } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import {
  CreateNewBtn,
  // GroupManageBtn,
  SwitchCommunity,
} from '../../../components';
import { Space } from 'antd';
import { jwtDecode } from '../../../utils/jwt';
import { DeskPageHoc } from '../../../containers';
import { withSession } from '../../../utils/withSession';
import { API } from '../../../constants/apis';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import JoinInCommunity from './join';
import { useGroupDetail } from '../../../hooks/useSWR/community/useGroupDetail';
import { PostListItem, PostTile } from '../../../components/community';
import { EventListItem } from '../../../components/community/events/EventListItem';
import { BarsOutlined } from '@ant-design/icons';
const Groups = (props) => {
  const router = useRouter();
  const [group, setGroup] = React.useState(null);
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const { data: gDetail } = useGroupDetail(props.query?.group);
  React.useEffect(() => {
    if (gDetail) {
      setGroup(gDetail.data);
    }
  }, [gDetail]);
  return (
    router.query.community === 'join' ?
      <JoinInCommunity auth={{ ...data }} query={{...props.query}}/>
      : <DeskPageHoc title='Group - Hubbers' activeSide={{ active: [`community-${props.query.community}-group`], open: ['community', `community-${props.query.community}-group`] }} auth={{ ...data }} query={{...props.query}}>
        {/* : <DeskPageHoc title='Members' activeSide={{ active: [`community-${router.query.community}-group-${router.query.group}`], open: ['community', `community-${router.query.community}-group`, `community-${router.query.community}-group-${router.query.group}`] }} auth={{ ...data }}> */}
        <React.Fragment>
          <div className='max-w-80 m-auto px-3 pt-5'>
            <Row>
              <Col flex='auto'>
                <span className='text-upper'>group</span>
              </Col>
              <Col flex='auto' className='text-right'>
                <Space>
                  {/* <GroupManageBtn /> */}
                  <CreateNewBtn auth={{ ...data }} group={{ ...group }} query={{ ...props.query }} />
                  <SwitchCommunity />
                </Space>
              </Col>
            </Row>
            <h1 className='fw-6 fs-5 m-0'>{group && group.name}</h1>
            <p>{group && group.tagLine}</p>
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
                          group: router.query.group,
                          postWrapped: router.query.postWrapped * 1 ? 0 : 1
                        }
                      })
                    }
                  />
                </Col>
              </Row>
            </div>
            <div>
              {
                props.query?.postWrapped === '1' &&
                group &&
                group.posts &&
                group.posts.map((p) => {
                  return <PostListItem key={p.id} data={{ ...p }} auth={{ ...data }} query={{ ...props.query }} />;
                })
              }
              {
                (!props.query?.postWrapped ||
                  props.query?.postWrapped === '0') &&
                group &&
                group.posts &&
                group.posts.map((post) => {
                  return <PostTile auth={{ ...data }} key={post.id} post={{ ...post }} query={{ ...props.query }} />;
                })
              }
              {
                props.query?.postWrapped === '1' &&
                group &&
                group.events &&
                group.events.map((p) => {
                  return <EventListItem auth={{ ...data }} {...p} key={p.id} query={{ ...props.query }} />;
                })
              }
            </div>
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
export default Groups;