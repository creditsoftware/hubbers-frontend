import React from 'react';
import { MainPageHoc } from '../../../containers';
import { EventsBanner, Talent, GuestSpeakers, TalkAbout, Location } from '../../../components';
import { useRouter } from 'next/router';
export default function detail() {
  const router = useRouter();
  return (
    <MainPageHoc title='Hubers events'>
      <React.Fragment>
        <EventsBanner
          title={router.query.slug}
          date={'18:00-20:00 Sep, 22 2019'}
          url={'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/events/argentina.jpg'}
        />
        <Talent />
        <GuestSpeakers />
        <TalkAbout />
        <Location />
      </React.Fragment>
    </MainPageHoc>
  );
}