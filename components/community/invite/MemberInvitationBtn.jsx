import React from 'react';
import {
  Button,
} from 'antd';
import { MemberInvitationDrawer } from './MemberInvitatonDrawer';
export const MemberInvitationBtn = ({ type = 'hbs-primary', ...props }) => {
  const [visibleInvitation, setVisibleInvitation] = React.useState(false);
  const onCloseInvitation = () => {
    setVisibleInvitation(false);
  };
  const onOpenInvitation = (e) => {
    e.preventDefault();
    setVisibleInvitation(true);
  };
  return (
    <React.Fragment>
      <Button type={type} shape={props.shape ? props.shape : false} onClick={onOpenInvitation} {...props}>Invite</Button>
      <MemberInvitationDrawer visible={visibleInvitation} onCloseInvitation={onCloseInvitation} {...props} />
    </React.Fragment>
  );
};