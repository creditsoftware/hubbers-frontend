import React from 'react';
import Link from 'next/link';
import { Image } from 'antd';
import { API } from '../constants/index';
import { fetchJson } from '../utils';
import { CustomSlider1 } from './CustomSlider1';

export const GlobalEventSlider = () => {
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    fetchJson(`${API.GET_GLOBAL_EVENT_API}`).then((response) => {
      setList(response);
    });
  }, []);
  console.log(list);
  return (
    <React.Fragment>
      <h2 className="fs-5 fw-6 mt-5">Hubbers worldwide events</h2>
      <CustomSlider1>
        {
          list?.map((item, index) => {
            return (
              <Link key={index} href={`/hubbers/events/${item.slug}`}>
                <a className="d-block text-center">
                  <Image width={300} height={200} src={item.headerImageUrl} preview={false} style={{ borderRadius: '15px' }} />
                  <h3 className="mt-3 fs-2">{item.title}</h3>
                  <div className="d-flex f-align-center fjc-center">
                    <Image width={16} height={16} src="/images/icons/calender_icon.png" preview={false} />
                    <p className="mt-1 ml-2 mr-3 mb-0">{item.startDate?.split('T')[0]}</p>
                    <Image width={16} height={16} src="/images/icons/location_icon.png" preview={false} />
                    <p className="mt-1 ml-2 mr-3 mb-0">{item.eventType === 'online' ? 'Online' : item.localContent?.location?.name}</p>
                  </div>
                </a>
              </Link>
            );
          })
        }
      </CustomSlider1>
    </React.Fragment>
  );
};