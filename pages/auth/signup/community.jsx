import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Collapse, Empty, Space, Col, Row, Button } from 'antd';
import { MainPageHoc } from '../../../containers/hocs/MainPageHoc';
import { jwtDecode } from '../../../utils/jwt';
import { Container, CheckBtn, SingupProgress } from '../../../components';
import { API, CONTINENTS } from '../../../constants';
import { fetchJson } from '../../../utils';
import { withSession } from '../../../utils/withSession';
import { fetcher } from '../../../utils/fetcher';

const { Panel } = Collapse;

const SignupCommunity = ({ ...props }) => {
  const router = useRouter();
  const email = router.query.email;
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [communityList, setCommunityList] = React.useState([]);
  const [selectedCommunities, setSelectedCommunities] = React.useState([]);

  React.useEffect(() => {
    fetchJson(`${API.GET_COMMUNITY_LIST_API}`).then((response) => {
      setCommunityList(response.data);
    });
  }, []);

  const next = () => {
    fetchJson(`${API.USER_SIGN_UP_STEP_TWO}/${email}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ community: selectedCommunities }),
    });
    router.push(`/auth/signup/profile?email=${email}`);
  };

  const prev = () => {
    router.push(`/auth/signup/basic?email=${email}`);
  };

  const selectCommunityEvnet = (e) => {
    if (selectedCommunities.includes(e)) {
      setSelectedCommunities([...selectedCommunities.filter((i) => i !== e)]);
    } else {
      setSelectedCommunities([...selectedCommunities, e]);
    }
  };

  return (
    <MainPageHoc title="Signup Community" auth={{ ...data }} query={{ ...props.query }}>
      <Container>
        <div className="max-w-40 m-auto py-5">
          <SingupProgress current={1} percent={30} />
          <div className='pt-5'>
            <p>
              The power of our community is at the core of Hubbers.<br />
              In your community, you can share, exchange ideas, participate to events.
            </p>
            <p>
              As a new free member, you can be part of 2 communities.
            </p>
            <p>
              Pick the one you want to be part of:
            </p>
            <Collapse>
              {
                CONTINENTS.map((item) => {
                  return <Panel key={item} header={item}>
                    <Space wrap>
                      {
                        communityList && communityList.filter((c) => c.country?.continent === item).map((c) => {
                          return <CheckBtn
                            key={c.id}
                            disabled={(selectedCommunities.length > 1) && !selectedCommunities.includes(c.id)}
                            checked={selectedCommunities.includes(c.id)}
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
            <Row className='my-4'>
              <Col span={12}>
                <Button type="hbs-outline-primary" size='large' shape="round" onClick={prev}>
                  Prev
                </Button>
              </Col>
              <Col span={12} className='text-right'>
                <Button type="hbs-primary" size='large' shape="round" onClick={next}>
                  Next
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </MainPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req, query } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user }, query } };
  } else {
    return { props: { auth: { isLoggedIn: false }, query } };
  }
});
export default SignupCommunity;