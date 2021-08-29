import React from 'react';
import Link from 'next/link';
import { Space, Button } from 'antd';
import { API } from '../constants/index';
import { fetchJson } from '../utils';
import { Userdata } from '../components';
import moment from 'moment';

export const Thumbup = () => {

  const [thumbUp, setThumbup] = React.useState([]);
  React.useEffect(() => {
    fetchJson(`${API.GET_THUMB_UP_API}`).then((response) => {
      setThumbup(response);
    });
  }, []);

  return (
    <React.Fragment>
      <h1 className="fw-6 fs-6 mt-5 mb-2">
        Thumb up!...
      </h1>
      <p className="fw-6 fs-2 mb-5">They just joined us.</p>
      <Space wrap size={42}>
        {
          thumbUp &&
          thumbUp.map((item, index) => {
            return <Userdata
              key={index}
              image={item.avatar}
              name={`${item.firstname ? item.firstname : ''} ${item.lastname ? item.lastname : ''}`}
              country={item.detail.nationality}
              date={moment(item.detail.joinedDate).format('MMM - yyyy')}
            />;
          })
        }
      </Space>
      <div className="mt-5">
        <Link href="/auth/signin">
          <a>
            <Button type="hbs-primary" shape="round" size="large">Thumb up</Button>
          </a>
        </Link>
      </div>
    </React.Fragment>
  );
};