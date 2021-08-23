import { Radio } from 'antd';
import Link from 'next/link';
import React from 'react';
export const CourseFilter = ({ value }) => {
  return (
    <div className='member-filter-btns'>
      <Radio.Group value={value}>
        <Radio.Button value="all">
          <Link href='#'>
            <a>
              All
            </a>
          </Link>
        </Radio.Button>
        <Radio.Button value="top">
          <Link href='#'>
            <a>
              Top
            </a>
          </Link>
        </Radio.Button>
        <Radio.Button value="yours">
          <Link href='#'>
            <a>
              Yours
            </a>
          </Link>
        </Radio.Button>
        <Radio.Button value="newest">
          <Link href='#'>
            <a>
              Newest
            </a>
          </Link>
        </Radio.Button>
        <Radio.Button value="inactive">
          <Link href='#'>
            <a>
              Inactive
            </a>
          </Link>
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};