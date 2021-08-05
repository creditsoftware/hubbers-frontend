import axios from 'axios';
import {
  API
} from '../../../../constants';
import { jwtDecode } from '../../../../utils/jwt';
import {
  withSession
} from '../../../../utils/withSession';

export default withSession( async (req, res) => {
  const communityId = req.query.community;
  try {
    const accessToken = await req.session.get('accessToken');
    const apiInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const user = await jwtDecode(accessToken)?.data;
    apiInstance.get(`${API.GET_COMMUNITY_GROUP_LIST_API}/${communityId}/${user.id}`)
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