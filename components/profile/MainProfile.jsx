import React from 'react';
import Image from 'next/image';
import {
  Row,
  Col,
  Avatar,
  Space,
  Image as AImage
} from 'antd';
import { Container } from '../Container';
import {
  API,
  // primaryColor
} from '../../constants/index';
import { fetchJson } from '../../utils';

export const MainProfile = (props) => {
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    fetchJson(`${API.GET_GENERAL_PROFILE_API}/${props.auth.id}`).then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <Container>
      <React.Fragment>
        <div className="bg-white pt-4 mt-5" style={{ borderRadius: '20px' }}>
          {/* <div className="d-flex fjc-space-between f-align-center">
            <Image width={36} height={24} src={`https://flagcdn.com/h24/${data.detail?.nationality}`} style={{ border: '1px solid gray' }} />
            <p className="fs-1 fw-6 mb-0">Liftime member</p>
          </div> */}
          <Row className="py-3">
            <Col lg={6} sm={24} xs={24}>
              <div className="text-center">
                <div>
                  <Avatar size={124} src={<AImage src={data?.avatar} />} />
                </div>
                {/* <Space size={15} className="py-4">
                  <Image width={24} height={24} src="/images/social/linkedin.png" alt='' />
                  <Image width={24} height={24} src="/images/social/facebook.png" alt='' />
                  <Image width={24} height={24} src="/images/social/instagram.png" alt='' />
                  <Image width={24} height={24} src="/images/social/twitter.png" alt='' />
                </Space>
                <br />
                <Space wrap className="fjc-center">
                  <div style={{ borderRadius: '20px', border: `1px solid ${primaryColor}`, padding: '2px 8px' }}>
                    Design
                  </div>
                  <div style={{ borderRadius: '20px', border: `1px solid ${primaryColor}`, padding: '2px 8px' }}>
                    3D
                  </div>
                  <div style={{ borderRadius: '20px', border: `1px solid ${primaryColor}`, padding: '2px 8px' }}>
                    UX design
                  </div>
                  <div style={{ borderRadius: '20px', border: `1px solid ${primaryColor}`, padding: '2px 8px' }}>
                    Prototyping
                  </div>
                </Space> */}
              </div>
              <br />
              <br />
            </Col>
            <Col lg={16} sm={24} className="main-profile">
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Location:</p></div>
                <div><b>
                  {data?.detail?.location?.city ? data?.detail.location.city + ', ' : ''}
                  {data?.detail?.location?.country}
                </b></div>
              </Row>
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Member since:</p></div>
                <div><b>{data?.detail?.joinedDate?.split('T')[0]}</b></div>
              </Row>
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Followers:</p></div>
                <div><b>0 followers</b></div>
              </Row>
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Product I like:</p></div>
                <div>
                  <Space wrap>
                    {
                      data?.productCategory?.map((item, index) => {
                        return (
                          <b key={index}>{item.productCategory?.name}</b>
                        );
                      })
                    }
                  </Space>
                </div>
              </Row>
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Innovation I like:</p></div>
                <div>
                  <Space wrap>
                    {
                      data?.innovationCategory?.map((item, index) => {
                        return (
                          <b key={index}>{item.innovationCategory?.name}</b>
                        );
                      })
                    }
                  </Space>
                </div>
              </Row>
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Tech I follow:</p></div>
                <div>
                  <Space wrap>
                    {
                      data?.techCategory?.map((item, index) => {
                        return (
                          <b key={index}>{item.techCategory?.name}</b>
                        );
                      })
                    }
                  </Space>
                </div>
              </Row>
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Members of:</p></div>
                <div>
                  <Space wrap>
                    {/* <div style={{ borderRadius: '20px', border: `1px solid ${primaryColor}`, padding: '2px 8px' }}>
                      Shanghai
                    </div>
                    <div style={{ borderRadius: '20px', border: `1px solid ${primaryColor}`, padding: '2px 8px' }}>
                      Lisbon
                    </div> */}
                    {/* <div style={{ borderRadius: '20px', border: `1px solid ${primaryColor}`, padding: '2px 8px' }}>
                      Add/Remove
                    </div> */}
                  </Space>
                </div>
              </Row>
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Bio:</p></div>
                <div><b>{data?.detail?.bio}</b></div>
              </Row>
            </Col>
            <Col lg={2} xs={24} className="text-center">
              <Space wrap size={18} className="fjc-center py-3">
                {
                  data?.roles?.map((item, index) => {
                    return (
                      <div key={index}>
                        <Image width={42} height={42} src={`/images/${item.name.toLowerCase()}.png`} alt='' />
                        <p className="mb-0">{item.name}</p>
                      </div>
                    );
                  })
                }
              </Space>
            </Col>
          </Row>
          {/* <div className="w-100 text-center">
            <Button type="hbs-primary" shape="round">SEE HOW I LOOK FROM OTHERS</Button>
          </div> */}
        </div>
      </React.Fragment>
    </Container>
  );
};