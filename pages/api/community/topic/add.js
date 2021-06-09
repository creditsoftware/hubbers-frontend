import axios from 'axios';
import { API } from '../../../../constants';
import {
  withSession
} from '../../../../utils/withSession';

export default withSession((req, res) => {
  const data = req.body;
  try {
    const accessToken = req.session.get('accessToken');
    const user = req.session.get('user');
    const apiInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const d = {
      ...data,
      createdBy: user.communityMember.filter((member) => member.communityId === Number(data.communityId))[0].id,
    };
    apiInstance.post(`${API.ADD_TOPIC_API}/${d.communityId}`, {...d})
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