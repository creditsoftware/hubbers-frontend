import React from 'react';
import Link from 'next/link';
import { Image } from 'antd';
import { API } from '../constants/index';
import { fetchJson } from '../utils';
import { CustomSlider1 } from './CustomSlider1';

export const GlobalPartnerSlider = ({ community = null }) => {
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    if (community) {
      fetchJson(`${API.GET_GLOBAL_LOCAL_PARTNER_API}/${community}`).then((response) => {
        setList(response);
      });
    } else {
      fetchJson(`${API.GET_GLOBAL_PARTNER_API}`).then((response) => {
        setList(response);
      });
    }
  }, []);
  return (
    <React.Fragment>
      {
        list?.length > 0 &&
        <div className="pb-4">
          <h2 className="fs-5 fw-6 my-4">Partners & Sponsors</h2>
          <CustomSlider1>
            {
              list.map((item, index) => {
                return (
                  <Link key={index} href={`/hubbers/sponsor/${item.slug}`}>
                    <a className="d-block text-center">
                      <Image width={300} height={200} src={item.featuredImageUrl} preview={false} />
                      <h3 className="mt-3 fs-2">{item.name}</h3>
                    </a>
                  </Link>
                );
              })
            }
          </CustomSlider1>
        </div>
      }
    </React.Fragment>
  );
};