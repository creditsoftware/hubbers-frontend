import React from 'react';
import { CommunityMembersTable } from './member/CommunityMembersTable';
// import { InviteStatusPane } from './InviteStatusPane';
export const SentInvitePane = () => {
  return <React.Fragment>
    <h1 className="fw-6 fs-4 text-center">
      What&apos;s the Status of Your Sent Invites?
    </h1>
    <p className="text-center">
      Here&apos;s a list of the people that have been invited to join hubby.
    </p>
    {/* <InviteStatusPane /> */}
    <CommunityMembersTable />
  </React.Fragment>;
};