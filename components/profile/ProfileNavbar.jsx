import React from 'react';
import Link from 'next/link';

export const ProfileNavbar = ({ actived = 'general' }) => {
  return <div>
    <Link href="/desk/profile/">
      <a style={{ display: 'inline-block' }} className={actived === 'general' ? 'p-3 active-profile' : 'p-3'}>General Profile</a>
    </Link>
    <Link href="/desk/profile/creator-profile">
      <a style={{ display: 'inline-block' }} className={actived === 'creator' ? 'p-3 active-profile' : 'p-3'}>Creator Profile</a>
    </Link>
    <Link href="/desk/profile/expert-profile">
      <a style={{ display: 'inline-block' }} className={actived === 'expert' ? 'p-3 active-profile' : 'p-3'}>Expert</a>
    </Link>
    <Link href="/desk/profile/investor-profile">
      <a style={{ display: 'inline-block' }} className={actived === 'investor' ? 'p-3 active-profile' : 'p-3'}>Investor</a>
    </Link>
    <Link href="/desk/profile/hubbers-team">
      <a style={{ display: 'inline-block' }} className={actived === 'hubbers-team' ? 'p-3 active-profile' : 'p-3'}>Hubbers Team</a>
    </Link>
  </div>;
};