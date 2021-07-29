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
export const MemberInvitationBtn = ({ ...props }) => {
  const [visibleInvitation, setVisibleInvitation] = React.useState(false);
  const onCloseInvitation = () => {
    setVisibleInvitation(false);
  };
  const onOpenInvitation = () => {
    setVisibleInvitation(true);
  };
  return (
    <React.Fragment>
      <Button type='hbs-primary' shape={props.shape ? props.shape : false} onClick={onOpenInvitation}>Invite</Button>
      <Drawer
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
        visible={visibleInvitation}
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
      </Drawer>
    </React.Fragment>
  );
};