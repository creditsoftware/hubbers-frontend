import axios from 'axios';
import {
  API
} from '../../../constants';

const verifyEmail = async (req, res) => {
  try {
    const email = await req.body.email;
    const community = await req.body.community;
    const response = await axios.post(`${API.VERIFY_EMAIL_API}`, {
      email: email,
      community: community
    });
    if (response.data ?.success) {
      res.status(200).json({
        status: 'verified'
      });
    }
  } catch (err) {
    const {
      response: fetchResponse
    } = err;
    res.status(fetchResponse ?.status || 500).json(fetchResponse.data);
  }
};

export default verifyEmail;