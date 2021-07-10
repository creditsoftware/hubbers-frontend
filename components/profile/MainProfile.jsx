import React from 'react';
import Image from 'next/image';
import { Row, Col, Avatar, Space, Button } from 'antd';
import { Container } from '../Container';
import { primaryColor } from '../../constants';

export const MainProfile = () => {
  return (
    <Container>
      <React.Fragment>
        <h1 className="pt-5 fs-6 fw-6">Profile</h1>
        <div className="bg-white p-4" style={{ borderRadius: '20px' }}>
          <div className="d-flex fjc-space-between f-align-center">
            <img width="36" height="24" src="https://flagcdn.com/h24/ru.png"  style={{ border: '1px solid gray'}} />
            <p className="fs-1 fw-6 mb-0">Liftime member</p>
          </div>
          <Row className="py-3">
            <Col lg={6} sm={24} xs={24}>
              <div className="text-center">
                <div>
                  <Avatar size={124} src="https://hubbers-us.oss-us-west-1.aliyuncs.com/698p6_s0u.png" />
                </div>
                <Space size={15} className="py-4">
                  <Image width={24} height={24} src="/images/social/linkedin.png" />
                  <Image width={24} height={24} src="/images/social/facebook.png" />
                  <Image width={24} height={24} src="/images/social/instagram.png" />
                  <Image width={24} height={24} src="/images/social/twitter.png" />
                </Space>
                <br/>
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
                </Space>
              </div>
              <br/>
              <br/>
            </Col>
            <Col lg={16} sm={24} className="main-profile">
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Location:</p></div>
                <div><b>Kaliningrad, Russian Federation</b></div>
              </Row>
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Member since:</p></div>
                <div><b>Jan. 11 2021</b></div>
              </Row>
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Followers:</p></div>
                <div><b>0 followers</b></div>
              </Row>
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Product I like:</p></div>
                <div>
                  <Space wrap>
                    <b>Product1</b>
                    <b>Product2</b>
                    <b>Product3</b>
                  </Space>
                </div>
              </Row>
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Innovation I like:</p></div>
                <div>
                  <Space wrap>
                    <b>Innovation1</b>
                    <b>Innovation2</b>
                    <b>Innovation3</b>
                  </Space>
                </div>
              </Row>
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Tech I follow:</p></div>
                <div>
                  <Space>
                    <b>Tech1</b>
                    <b>Tech2</b>
                    <b>Tech3</b>
                  </Space>
                </div>
              </Row>
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Members of:</p></div>
                <div>
                  <Space wrap>
                    <div style={{ borderRadius: '20px', border: `1px solid ${primaryColor}`, padding: '2px 8px' }}>
                      Shanghai
                    </div>
                    <div style={{ borderRadius: '20px', border: `1px solid ${primaryColor}`, padding: '2px 8px' }}>
                      Lisbon
                    </div>
                    <div style={{ borderRadius: '20px', border: `1px solid ${primaryColor}`, padding: '2px 8px' }}>
                      Add/Remove
                    </div>
                  </Space>
                </div>
              </Row>
              <Row className="profile-item mb-4">
                <div><p className="mb-0">Bio:</p></div>
                <div><b>“The reasonable man adapts himself to the world; the unreasonable one persists in trying to adapt the world to himself. Therefore all progress depends on the unreasonable man.” George Bernard Shaw (1856-1950), Playwright</b></div>
              </Row>
            </Col>
            <Col lg={2} xs={24} className="text-center">
              <Space wrap size={18} className="fjc-center py-3">
                <div>
                  <Image width={42} height={42} src="/images/creator.png" />
                  <p className="mb-0">Creator</p>
                </div>
                <div>
                  <Image width={42} height={42} src="/images/expert.png" />
                  <p className="mb-0">Expert</p>
                </div>
                <div>
                  <Image width={42} height={42} src="/images/Investor.png" />
                  <p className="mb-0">Investor</p>
                </div>
              </Space>
            </Col>
          </Row>
          <div className="w-100 text-center">
            <Button type="hbs-primary" shape="round">SEE HOW I LOOK FROM OTHERS</Button>
          </div>
        </div>
      </React.Fragment>
    </Container>
  );
};