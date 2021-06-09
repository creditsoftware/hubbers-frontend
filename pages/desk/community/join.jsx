import React from 'react';
import { withSession } from '../../../utils/withSession';
import { DeskPageHoc } from '../../../containers';
import { useRouter } from 'next/router';
// import { API } from '../../../constants/apis';
// import { REQUEST_TYPE } from '../../../constants/requestType';
// import { httpApiServer } from '../../../utils/httpRequest';
import { Col, Collapse, Empty, Row } from 'antd';
import { CheckBtn, SwitchCommunity } from '../../../components';
import Image from 'next/image';
const { Panel } = Collapse;
const JoinInCommunity = (props) => {
  const router = useRouter();
  const [checked, setChecked] = React.useState(false);
  React.useLayoutEffect(() => {
    if (props.error === 'Unautherized you') {
      router.push('/auth/signin');
    }
  }, [router]);
  return (
    <DeskPageHoc title='Join in Community' activeSide={{ active: ['home'], open: ['community'] }}>
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
                <Panel header='Asia' key='1'>
                  <CheckBtn checked={checked} onChange={(v) => setChecked(v)} label='Singapore' />
                </Panel>
                <Panel header='Europe' key='2'>
                  <Empty />
                </Panel>
                <Panel header='Africa' key='3'>
                  <Empty />
                </Panel>
                <Panel header='North America' key='4'>
                  <Empty />
                </Panel>
                <Panel header='South America' key='5'>
                  <Empty />
                </Panel>
              </Collapse>
            </Col>
            <Col lg={12} md={12} span={24}>
              <div className="text-center h-100">
                <Image src='/images/community/join.png' width={400} height={300} />
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
  if (!user) {
    await req.session.destroy();
    return { props: { error: 'Unautherized you', data: null } };
  }
  return { props: { error: null, data: null } };
  //   return httpApiServer(`${API.COMMUNITY_DETAIL_API}/${communityId}`, REQUEST_TYPE.GET, null, ctx)
  //     .then((response) => {
  //       return { props: { data: response, error: null } };
  //     })
  //     .catch(async (err) => {
  //       if (err.response && err.response.status === 401) {
  //         await req.session.destroy();
  //         return { props: { error: err.message, data: null } };
  //       }
  //       return { props: { data: null, error: err.message } };
  //     });
});
export default JoinInCommunity;