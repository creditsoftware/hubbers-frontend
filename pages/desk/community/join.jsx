import React from 'react';
import { withSession } from '../../../utils/withSession';
import { DeskPageHoc } from '../../../containers';
import { Col, Collapse, Empty, Row, Button, Space } from 'antd';
import { CheckBtn, SwitchCommunity } from '../../../components';
import Image from 'next/image';
import { API, CONTINENTS } from '../../../constants/index';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { openNotificationWithIcon } from '../../../utils';
const { Panel } = Collapse;
const JoinInCommunity = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [communityList, setCommunitylist] = React.useState(null);
  const [selectedCommunities, setSelectedCommunities] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const getData = React.useCallback(async () => {
    const communities = await (await fetch(`${API.GET_COMMUNITY_LIST_API}`)).json();
    setCommunitylist(communities.data);
  }, []);
  React.useEffect(() => {
    getData();
  }, [getData]);
  const selectCommunityEvnet = (e) => {
    // if(data.communityMember.length > 1) return;
    // if(data.communityMember.length + selectedCommunities.length > 1) return;
    if (selectedCommunities.filter((i) => i === e).length > 0) {
      setSelectedCommunities([...selectedCommunities.filter((i) => i !== e)]);
    } else {
      setSelectedCommunities([...selectedCommunities, e]);
    }
  };
  const joinIn = () => {
    setLoading(true);
    fetch(`${API.JOININ_COMMUNITY_API}/${data.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedCommunities),
    }).then(async (response) => {
      setLoading(false);
      const result = await response.json();
      openNotificationWithIcon('success', 'Success', result[0]?.message);
    }).catch((err) => {
      setLoading(false);
      console.log(err);
      openNotificationWithIcon('error', 'Failed', 'Failed to join in the Community');
    });
  };
  return (
    <DeskPageHoc title='Join in Community' activeSide={{ active: ['home'], open: ['community'] }} auth={{ ...data }}>
      <div className="h-100 bg-white">
        <div className='bg-hbs-primary'>
          <div className='max-w-80 m-auto px-3 pt-4 pb-5'>
            <h1 className="fw-6 fs-5 mt-5 text-center mb-4">
              All start with selecting your community.
            </h1>
            <div className="text-center fs-2">
              Hubbers community are exciting places where creators, innovators, experts in product development and contributors share their stories, contribute to other projects, learn and launch new products on the market.
            </div>
          </div>
        </div>
        <div className="max-w-80 m-auto py-4 px-3">
          <div className="f-right" style={{ right: 10, top: 70 }}>
            <SwitchCommunity />
          </div>
          <h1 className="fw-6 fs-5 text-center">
            Select the community you want to join.
          </h1>
          <Row>
            <Col lg={12} md={12} span={24}>
              <Collapse>
                {
                  CONTINENTS.map((item) => {
                    return <Panel key={item} header={item}>
                      <Space wrap>
                        {
                          communityList &&
                          communityList
                            .filter((c) => c.country?.continent === item)
                            .map((c) => {
                              return <CheckBtn
                                key={c.id}
                                disabled={data.communityMember?.filter((m) => m.communityId === c.id).length > 0}
                                checked={selectedCommunities.filter((i) => i === Number(c.id)).length > 0}
                                onChange={() => selectCommunityEvnet(Number(c.id))}
                                label={c.name} />;
                            })
                        }
                      </Space>
                      {
                        communityList &&
                        communityList.filter((c) => c.country?.continent === item).length === 0 &&
                        <Empty />
                      }
                    </Panel>;
                  })
                }
              </Collapse>
            </Col>
            <Col lg={12} md={12} span={24}>
              <div className="text-center h-100">
                <Image src='/images/community/join.png' width={400} height={300} alt='' />
                <Button loading={loading} type='hbs-outline-primary' shape='round' size='large' disabled={selectedCommunities.length === 0} onClick={joinIn}>
                  Join
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </DeskPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req } = ctx;
  const user = await req.session.get('user');
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: false } } };
  }
});
export default JoinInCommunity;