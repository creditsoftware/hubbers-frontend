import axios from 'axios';
import {
  API
} from '../../../../constants';
import {
  withSession
} from '../../../../utils/withSession';

// export default withSession((req, res) => {
//   const communityId = req.query.communityId;
//   const maxCount = req.query.maxCount;
//   try {
//     const accessToken = req.session.get('accessToken');
//     const apiInstance = axios.create({
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`
//       }
//     });
//     apiInstance.get(`${API.SYNC_GET_POST_LIST_API}/${communityId}/${maxCount}`)
//       .then((response) => {
//         res.status(200).json(response.data);
//       })
//       .catch(async (err) => {
//         if (err.response && err.response.status === 401) {
//           await req.session.destroy();
//           res.status(401).json({
//             err: err.response
//           });
//         } else if (err.response && (err.response.status === 504 || err.response.status === 502)) { //server timeout
//           res.status(200).json({
//             success: false,
//             data: null,
//             error: err.response.statusText
//           });
//         } else {
//           res.status(400).json(err);
//         }
//       });
//   } catch (err) {
//     res.status(400).json({
//       err: err
//     });
//   }
// });
export default withSession((req, res) => {
  const communityId = req.query.communityId;
  try {
    const accessToken = req.session.get('accessToken');
    const apiInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    apiInstance.get(`${API.GET_POST_LIST_API}/${communityId}`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch(async (err) => {
        if (err.response && err.response.status === 401) {
          await req.session.destroy();
          res.status(401).json({
            err: err.response
          });
        }
        res.status(400).json(err);
      });
  } catch (err) {
    res.status(400).json({
      err: err
    });
  }
});