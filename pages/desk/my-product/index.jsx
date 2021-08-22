import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { Row, Col } from 'antd';
import { EyeOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { API } from '../../../constants/index';
import { withSession } from '../../../utils/withSession';
import { jwtDecode } from '../../../utils/jwt';
import { fetcher } from '../../../utils/fetcher';
import { DeskPageHoc } from '../../../containers/hocs/DeskPageHoc';
import { Container } from '../../../components';
import { useProductList } from '../../../hooks/useSWR/product/useProductList';

const MyProduct = ({ ...props }) => {

  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const { data: productList } = useProductList(props.auth.id);

  return (
    <DeskPageHoc title='My Product' activeSide={{ active: ['my-product'], open: ['my-product'] }} auth={{ ...data }} query={{...props.query}}>
      <Container>
        <React.Fragment>
          <h1 className="fs-5 fw-6 py-5 fc-primary">My Products</h1>
          <Row>
            {
              productList?.data?.map((item)=>{
                return <Col lg={12} sm={24} xs={24} key={item.id} className="p-3">
                  <Link href={`/desk/my-product/${item.id}`}>
                    <a>
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '260px',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundImage: `url(${item.featuredImageUrl})`,
                          backgroundColor: 'lightgrey',
                          borderRadius: '8px',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            left: '0',
                            bottom: '0',
                            width: '100%',
                            padding: '12px 24px',
                            backgroundColor: 'lightgreen',
                            borderRadius: '8px',
                            opacity: '0.8',
                          }}
                        >
                          <p className="fs-2 fw-6 mb-0">{item.name}</p>
                          <p className="mb-1">a few seconds ago</p>
                          <div>
                            <label className="mr-3"><EyeOutlined />&nbsp;&nbsp;{item.view?.length ?? 0}</label>
                            <label className="ml-3 mr-3"><HeartOutlined />&nbsp;&nbsp;{item.like?.length ?? 0}</label>
                            <label className="ml-3"><ShareAltOutlined />&nbsp;&nbsp;{item.share?.length ?? 0}</label>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </Col>; 
              })
            }
          </Row>
        </React.Fragment>
      </Container>
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
export default MyProduct;