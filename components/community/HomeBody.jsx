import { useRouter } from 'next/router';
import React from 'react';
import { PostTile } from './PostTile';
import { fetchJson } from '../../utils/fetchJson';
import { API } from '../../constants';
import useSWR from 'swr';

export const HomeBody = () => {
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
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        return [];
      }
    }
  );
  React.useEffect(() => {
    if (!d) {
      console.log('loading ...');
    }
    if (!err && d) {
      setData(d);
    }
  }, [d, err]);
  React.useEffect(async () => {
    const user = await fetchJson(`${API.GET_USER_FROM_SESSIOM_API}`);
    setAuthUser(user);
    if (router.query.community) {
      fetchJson(`${API.LOCAL_GET_POST_LIST_API}?communityId=${router.query.community}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [router]);
  return <React.Fragment>
    {
      data &&
      data.map((post) => {
        return <PostTile auth={authUser} key={post.id} post={{ ...post }} />;
      })
    }
  </React.Fragment>;
};

// const HomeBody = () => {
//   const router = useRouter();
//   const [data, setData] = React.useState([]);
//   const [authUser, setAuthUser] = React.useState(null);
//   const fetchData = (communityId, count) => {
//     return fetchJson(`${API.LOCAL_GET_POST_LIST_API}?communityId=${communityId}&maxCount=${count}`);
//   };
//   React.useEffect(async () => {
//     const user = await fetchJson(`${API.GET_USER_FROM_SESSIOM_API}`);
//     setAuthUser(user);
//     if (router.query.community) {
//       let flag = true;
//       let count = -1;
//       while (flag === true) {
//         let result = await fetchData(router.query.community, count);
//         if (result && result.success) {
//           count = result.data.count === null ? 0 : result.data.count;
//           setData(result.data.posts);
//         } else {
//           if (count === -1) {
//             count = 0;
//           }
//         }
//       }
//     }
//   }, [router]);
//   return <React.Fragment>
//     {
//       data &&
//       data.map((post) => {
//         return <PostTile auth={authUser} key={post.id} post={{ ...post }} />;
//       })
//     }
//   </React.Fragment>;
// };

// export default HomeBody;