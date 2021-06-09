import { Button, Col, Drawer, Row } from 'antd';
import React from 'react';
import { MemberInvitationBtn } from './MemberInvitationBtn';
export const CommunityManageBtn = () => {
  const [visible, setVisible] = React.useState(false);
  return <React.Fragment>
    <Button type='hbs-primary' shape='round' onClick={() => setVisible(true)}>
      Manage
    </Button>
    <Drawer
      visible={visible}
      onClose={() => setVisible(false)}
      closable={false}
      width={1024}
      title={
        <Row>
          <Col span={12}>
            <h2 className="fw-6 fs-3 fc-primary">
              Community Setting
            </h2>
          </Col>
          <Col span={12} className='text-right'>
            <MemberInvitationBtn />
            <Button type='hbs-dashed' className='ml-2' shape='round' onClick={() => setVisible(false)}>&times; Close</Button>
          </Col>
        </Row>
      }
    >
    </Drawer>
  </React.Fragment>;
};