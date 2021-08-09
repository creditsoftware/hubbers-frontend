import React from 'react';
import {
  Button,
} from 'antd';
import { MemberInvitationDrawer } from './MemberInvitatonDrawer';
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
      <MemberInvitationDrawer visible={visibleInvitation} onCloseInvitation={onCloseInvitation} query={{...props.query}} auth={{...props.auth}} />
    </React.Fragment>
  );
};