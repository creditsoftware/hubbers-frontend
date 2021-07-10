import { Radio } from 'antd';
import Link from 'next/link';
import React from 'react';
export const MemberFilter = ({ value }) => {
  return (
    <div className='member-filter-btns'>
      <Radio.Group value={value}>
        <Radio.Button value="all">
          <Link href='/desk/community/members?filter=all'>
            <a>
              All
            </a>
          </Link>
        </Radio.Button>
        <Radio.Button value="near-you">
          <Link href='/desk/community/members?filter=near-you'>
            <a>
              Near You
            </a>
          </Link>
        </Radio.Button>
        <Radio.Button value="newest">
          <Link href='/desk/community/members?filter=newest'>
            <a>
              Newest
            </a>
          </Link>
        </Radio.Button>
        <Radio.Button value="hosts">
          <Link href='/desk/community/members?filter=hosts'>
            <a>
              Hosts
            </a>
          </Link>
        </Radio.Button>
        <Radio.Button value="online-now">
          <Link href='/desk/community/members?filter=online-now'>
            <a>
              Online Now
            </a>
          </Link>
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};