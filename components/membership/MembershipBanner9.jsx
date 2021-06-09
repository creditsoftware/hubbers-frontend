import React from 'react';
import Image from 'next/image';
import { MembershipApplyButton } from './MembershipApplyButton';
import { Container } from '../Container';
export const MembershipBanner9 = () => {
  return (
    <Container className='py-4'>
      <React.Fragment>
        <h1 className="fw-6 fs-5">
          8 Hubbers workshop for lifetime member
        </h1>
        <p>
          Collectively drive what is being built for Hubbers community
        </p>
        <Image width={1500} height={2200} src='/images/membership/membership-roadmap.png' />
        <div className="text-center">
          <MembershipApplyButton />
        </div>
      </React.Fragment>
    </Container>
  );
};
