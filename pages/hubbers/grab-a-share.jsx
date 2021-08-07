import React from 'react';
import { Space } from 'antd';
import { LinkedinFilled } from '@ant-design/icons';
import { MainPageHoc } from '../../containers';
import { Container, MainBanner } from '../../components';
import { withSession } from '../../utils/withSession';
import { API } from '../../constants/index';
import { jwtDecode } from '../../utils/jwt';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';import Avatar from 'antd/lib/avatar/avatar';
import Link from 'next/link';
1;
const GrabAShare = ({ ...props }) => {
  const { data } = useSWR(API.GET_USER_FROM_SESSIOM_API, fetcher, { initialData: props.auth });
  const investors = [{
    avatar: 'https://hubbers-us.oss-us-west-1.aliyuncs.com/HJH6dR7r4.jpeg',
    firstname: 'Benjamn',
    lastname: 'Vignon',
    country: 'France',
    hbs: '5,100,000',
    linkedin: true,
  },{
    avatar: 'https://hubbers-us.oss-us-west-1.aliyuncs.com/HJZrJ0GBV.jpeg',
    firstname: 'Udit',
    lastname: 'Veerwanie',
    country: 'India',
    hbs: '615,000',
    linkedin: false,
  },{
    avatar: 'https://hubbers-us.oss-us-west-1.aliyuncs.com/HJH6dR7r4.jpeg',
    firstname: 'Benjamn',
    lastname: 'Vignon',
    country: 'France',
    hbs: '5,100,000',
    linkedin: true,
  },{
    avatar: 'https://hubbers-us.oss-us-west-1.aliyuncs.com/HJZrJ0GBV.jpeg',
    firstname: 'Udit',
    lastname: 'Veerwanie',
    country: 'India',
    hbs: '615,000',
    linkedin: false,
  }];

  return (
    <MainPageHoc title="Grab a share" auth={{ ...data }}>
      <React.Fragment>
        <MainBanner
          url='https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/grab-a-share-banner.jpg'
          title={ 
            <h1 className="fs-6 fw-6 fc-white">SHARE & VALUE STATISTICS</h1>    
          }
          date={
            <p className="fs-2 fw-5 fc-white">Find out our dynamics of growing<br/>hubbers business</p>
          }
        />
        <Container className="py-5">
          <React.Fragment>
            <h1 className="text-center fs-3 fw-6">HBS TOKEN VALUE</h1>
            <div>
              <label>HBS VALUE</label>
              <p className="fs-3 fm-5">USD</p>
              <label>NO. OF HBS I OWN</label>
              <p className="fs-3 fm-5">10,000</p>
              <label>CURRENT VALUE OF MY HBS TOKENS</label>
              <p className="fs-3 fm-5">USD NaN</p>
              <label>TOTAL NUMBER OF HBS TOKENS</label>
              <p className="fs-3 fm-5">10,000,000</p>
            </div>
          </React.Fragment>
        </Container>
        <div className="pt-5 pb-5" style={{ backgroundColor: '#232323', textTransform: 'capitalize' }}>
          <Container>
            <React.Fragment>
              <h1 className="text-center pt-3 pb-5 fs-3 fw-6 fc-white">HUBBERS INVESTORS & TOKEN HOLDERS</h1>
              <Space size={50} className="d-flex fjc-center pb-5" align="center" wrap>
                {
                  investors?.map((item,index)=>{
                    return <div key={index} className="grab-holder bg-white">
                      <Avatar size={170} src={item.avatar} />
                      <h1 className="mt-4" title={`${item.firstname ? item.firstname : ''} ${item.lastname ? item.lastname : ''}`}>
                        {`${item.firstname ? item.firstname : ''} ${item.lastname ? item.lastname : ''}`}
                      </h1>
                      <p className="fs-2 mb-1">{item.country}</p>
                      <div className="d-flex fjc-space-between">
                        <div className="text-left">
                          <label>HBS</label>
                          <p className="fs-2">{item.hbs}</p>
                        </div>
                        {
                          item.linkedin && <Link href="#">
                            <a>
                              <LinkedinFilled className="fs-4" />
                            </a>
                          </Link>
                        }
                      </div>
                    </div>;
                  })
                }
              </Space>
            </React.Fragment>
          </Container>
        </div>
        <div className="pt-5 pb-5" style={{ textTransform: 'capitalize' }}>
          <Container>
            <React.Fragment>
              <h1 className="text-center pt-3 pb-5 fs-3 fw-6">HUBBERS OBSERVERS</h1>
              <Space size={50} className="d-flex fjc-center pb-5" align="center" wrap>
                {
                  investors?.map((item,index)=>{
                    return <div key={index} className="grab-holder" style={{ backgroundColor: 'lightgrey' }}>
                      <Avatar size={170} src={item.avatar} />
                      <h1 className="mt-4" title={`${item.firstname ? item.firstname : ''} ${item.lastname ? item.lastname : ''}`}>
                        {`${item.firstname ? item.firstname : ''} ${item.lastname ? item.lastname : ''}`}
                      </h1>
                      <p className="fs-2 mb-1">{item.country}</p>
                      <div className="d-flex fjc-space-between">
                        <div className="text-left">
                          <label>HBS</label>
                          <p className="fs-2">{item.hbs}</p>
                        </div>
                        {
                          item.linkedin && <Link href="#">
                            <a>
                              <LinkedinFilled className="fs-4" />
                            </a>
                          </Link>
                        }
                      </div>
                    </div>;
                  })
                }
              </Space>
            </React.Fragment>
          </Container>
        </div>
      </React.Fragment>
    </MainPageHoc>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const { req } = ctx;
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  if (user) {
    return { props: { auth: { isLoggedIn: true, ...user } } };
  } else {
    return { props: { auth: { isLoggedIn: false } } };
  }
});
export default GrabAShare;