import axios from 'axios';
import {
  API
} from '../../../../constants';
import {
  withSession
} from '../../../../utils/withSession';

export default withSession((req, res) => {
  try {
    const accessToken = req.session.get('accessToken');
    const apiInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    apiInstance.put(`${API.UPDATE_POST_API}/${req.body.id}`, {...req.body})
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