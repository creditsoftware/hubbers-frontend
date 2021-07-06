import axios from 'axios';
import {
  withSession
} from '../../../utils/withSession';
import {
  API
} from '../../../constants';

export default withSession(async (req, res) => {
  try {
    const token = await req.body;
    const response = await axios.post(`${API.REFRESH_API}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.data?.success) {
      req.session.set('refreshToken', response.data?.data.refreshToken);
      req.session.set('accessToken', response.data?.data.accessToken);
      req.session.set('user', response.data?.data.user);
      await req.session.save();
      res.status(200).json(response.data?.data.user);
    }
  } catch (err) {
    const {
      response: fetchResponse
    } = err;
    res.status(fetchResponse?.status || 500).json(err.response?.data || {
      message: 'Failed to signin!'
    });
  }
});