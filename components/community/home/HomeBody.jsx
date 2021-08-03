import { useRouter } from 'next/router';
import React from 'react';
import { PostTile } from '../post/PostTile';
import { fetchJson } from '../../../utils/fetchJson';
import { API } from '../../../constants';
import useSWR from 'swr';

export const HomeBody = ({...props}) => {
  const router = useRouter();
  const [data, setData] = React.useState([]);
  const [authUser, setAuthUser] = React.useState(null);
  const { data: d, error: err } = useSWR(
    `${API.LOCAL_GET_POST_LIST_API}`,
    () => {
      if (router.query.community) {
        return fetch(`${API.LOCAL_GET_POST_LIST_API}?communityId=${router.query.community}`)
          .then((response) => {
            let result = response.json();
            return result.data;
          });
      } else {
        return [];
      }
    }
  );
  React.useEffect(() => {
    if (!err && d) {
      setData(d);
    }
  }, [d, err]);
  const getData = React.useCallback(async () => {
    setAuthUser({...props.auth});
    if (router.query.community) {
      fetchJson(`${API.LOCAL_GET_POST_LIST_API}?communityId=${router.query.community}`)
        .then((response) => {
          if(response.success) {
            setData(response.data);
          }
        });
    }
  }, [router]);
  React.useEffect(() => {
    getData();
  }, [router, getData]);
  return <React.Fragment>
    {
      data &&
      data.map((post) => {
        return <PostTile auth={authUser} key={post.id} post={{ ...post }} query={{...props.query}} />;
      })
    }
  </React.Fragment>;
};
