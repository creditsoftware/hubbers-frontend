import React from 'react';
import useSWR from 'swr';
import { Button, Row, Col, Image } from 'antd';
import Link from 'next/dist/client/link';
import { fetchJson } from '../../utils';
import { fetcher } from '../../utils/fetcher';
import { withSession } from '../../utils/withSession';
import { jwtDecode } from '../../utils/jwt';
import { API } from '../../constants/index';
import { DeskPageHoc } from '../../containers/hocs/DeskPageHoc';
import { Container } from '../../components';
import { useWindowSize } from '../../hooks';
import { DEFAULT_COMMUNITY_TOPIC_IMAGE } from '../../constants/etc';

const Dashboard = ({ ...props }) => {
  const displaySize = useWindowSize();
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const [communityList, setCommunityList] = React.useState([]);
  const [rowSize, setRowSize] = React.useState(3);
  const [rowNum, setRowNum] = React.useState(2);

  React.useEffect(() => {
    fetchJson(`${API.IS_EXIST_MY_COMMUNITY_API}/${data.id}`).then((response) => {
      setCommunityList(response.data);
    });
  }, []);

  React.useEffect(() => {
    if(displaySize.width>1500){
      setRowSize(3);
    }
    if(displaySize.width<1500){
      setRowSize(2);
    }
    if(displaySize.width<1150){
      setRowSize(1);
    }
    if(displaySize.width<1024){
      setRowSize(2);
    }
    if(displaySize.width<992){
      setRowSize(1);
    }
  }, [displaySize]);
  
  const addRow = () => {
    setRowNum(rowNum + 1);
  };
  
  return (
    <DeskPageHoc title='Dashboard' activeSide={{ active: ['dashboard'], open: [] }} auth={{ ...data }} query={{...props.query}}>
      <React.Fragment>
        <Container className={displaySize.width > 992 ? 'p-5' : 'p-4'}>
          <Row>
            {
              communityList &&
              communityList.map((item, index) => {
                if(index < rowSize*rowNum){
                  return(
                    <Col key={index} span={24/rowSize} className="text-center py-2">
                      <Link href={`/desk/community/home?community=${item.id}`}>
                        <a>
                          <Image alt='' preview={false} width={320} height={140} src={item.featuredImage ? item.featuredImage : DEFAULT_COMMUNITY_TOPIC_IMAGE} />
                          <h1 className="text-center">{item.name}</h1>
                        </a>
                      </Link>
                    </Col>
                  );
                }
              })
            }
            {
              communityList.length > rowSize*rowNum ? (
                <Col span={24} className="text-right">
                  <Button type="hbs-primary" shap="round" onClick={addRow}>More</Button>
                </Col>
              ): null
            }
          </Row>
        </Container>
      </React.Fragment>
    </DeskPageHoc>
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
export default Dashboard;