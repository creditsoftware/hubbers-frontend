import React from 'react';
import {
  Button,
  Col,
  Drawer,
  Row,
  Tabs,
  // Typography
} from 'antd';
import { InvitePane } from './InvitePane';
import { SentInvitePane } from './SentInvitePane';
import { RequestToJoinPane } from './RequestToJoinPane';
const { TabPane } = Tabs;
// const { Text } = Typography;
export const MemberInvitationDrawer = ({ visible, onCloseInvitation, ...props }) => {
  console.log(props);
  return <Drawer
    title={
      <Row>
        <Col span={12}>
          <h2 className="fw-6 fs-3 fc-primary">
            Hubbers Invitation
          </h2>
        </Col>
        <Col span={12} className='text-right'>
          <Button type='hbs-dashed' shape='round' onClick={onCloseInvitation}>&times; Close</Button>
        </Col>
      </Row>
    }
    width={1024}
    className='member-invite-drawer'
    placement="right"
    closable={false}
    onClose={onCloseInvitation}
    visible={visible}
  >
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="Invite" key="1">
        <InvitePane />
      </TabPane>
      <TabPane tab="Sent Invites" key="2">
        <SentInvitePane />
      </TabPane>
      <TabPane tab={
        <span>
          Request to Join&nbsp;
          {/* <Text mark>1</Text> */}
        </span>
      } key="3">
        <RequestToJoinPane />
      </TabPane>
    </Tabs>
  </Drawer>;
};