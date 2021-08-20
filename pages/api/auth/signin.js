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
    const response = await axios.post(`${API.SIGNIN_API}`, {
      ...data
    });
    if(response.data?.success){
      req.session.set('refreshToken',response.data?.res.refreshToken);
      req.session.set('accessToken',response.data?.res.accessToken);
      // req.session.set('user',response.data?.res.user);
      await req.session.save();
      res.status(200).json(response.data?.res.user);
    }
  } catch (err) {
    console.log(err);
    const { response: fetchResponse } = err;
    res.status(fetchResponse?.status || 500).json(err.response?.data || {message: 'Failed to signin!'});
  }
});