import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../components';
import { MainPageHoc } from '../containers';

const Custom404 = () => {
  return (
    <MainPageHoc title="404-not-found">
      <Container className='mt-4'>
        <div>
          <div className='not-found-title'>
            Oops!
          </div>
          <div className='text-center mb-2 fs-2' style={{ color: '#5d5f62' }}>
            The page you are looking for was reinvented, innovated, and marketed, or yet to exist.
            <br />
              Try our&nbsp;
            <Link href="/">
              <a className='fc-primary text-upper'>homepage</a>
            </Link>
            &nbsp;instead!
          </div>
          <div className='text-center mt-5 mb-4'>
            <Image src='https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/misc/not-found-2.png' width={600} height={350}>
            </Image>
          </div>
        </div>
      </Container>
    </MainPageHoc>
  );
};

export default Custom404;