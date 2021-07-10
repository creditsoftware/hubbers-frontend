import React, { useState } from 'react';
import { Menu, Dropdown, Button, Empty } from 'antd';
import { useRouter } from 'next/router';
import { fetchJson } from '../../../utils/fetchJson';
import { API } from '../../../constants';

export const SwitchCommunity = () => {
  const router = useRouter();
  const [communityList, setCommunityList] = useState([]);
  const handleClick = (id) => {
    router.push({ query: { community: id } });
  };
  React.useEffect(() => {
    fetchJson(`${API.LOCAL_GET_COMMUNITY_LIST_API}`)
      .then((response) => {
        setCommunityList(response.data.data);
        if (response.data && response.data.data?.length > 0) {
          if (!router.query.community) {
            router.push({ query: { ...router.query, community: response.data?.data[0].id } });
          }
        } else {
          router.push({ query: { community: 'join' } });
        }
      })
      .catch(() => {
        setCommunityList([]);
      });
  }, []);
  return <Dropdown
    overlay={
      router.query.community ?
        <Menu defaultSelectedKeys={['-']}>
          {
            communityList &&
            communityList.length > 0 &&
            communityList.map((community) => (
              <Menu.Item key={`${community.id}`} onClick={() => handleClick(`${community.id}`)}>
                {
                  community.name
                }
              </Menu.Item>
            ))
          }
          <Menu.Item key='join' onClick={() => handleClick('join')}>
            Join in ...
          </Menu.Item>
        </Menu>
        :
        <Empty />
    }
    placement="bottomRight" arrow trigger={['click']}>
    <Button type='text'>
      {
        communityList &&
        communityList.length > 0 &&
        router.query.community &&
        communityList.filter((community) => community.id === router.query.community * 1)[0] &&
        communityList.filter((community) => community.id === router.query.community * 1)[0].name
      }
      {
        router.query.community &&
        router.query.community === 'join' &&
        'Join'
      }
    </Button>
  </Dropdown>;
};