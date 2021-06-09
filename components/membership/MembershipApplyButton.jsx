import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
export const MembershipApplyButton = () => {
  return(
    <Link href='/hubbers/hubbers-lifetime-membership-checkout'>
      <a>
        <Button type='hbs-primary' size='large' shape='round'>
          Apply Now
        </Button>
      </a>
    </Link>
  );
};
