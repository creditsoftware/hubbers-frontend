import React from 'react';
import Image from 'next/image';
export const PageLoading = () => {
  return <div className='hbs-page-loading'>
    <div>
      <Image width={50} height={50} src='/images/favicon.png'/>
    </div>
    <p className="fc-primary fs-3">
      Loading ...
    </p>
  </div>;
};
