import axios from 'axios';
import {
  withSession
} from '../../../utils/withSession';
import {
  API
} from '../../../constants';

export default withSession(async (req, res) => {
  try {
    const data = await req.body;
    const response = await axios.post(`${API.SIGNUP_API}`, {
      ...data
    });
    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.status(400).json(response.data);
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