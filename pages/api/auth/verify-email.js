import axios from 'axios';
import {
  API
} from '../../../constants';

export default async (req, res) => {
  try {
    const email = await req.body.email;
    const response = await axios.post(`${API.VERIFY_EMAIL_API}`, {
      email: email
    });
    if (response.data?.success) {
      res.status(200).json({
        status: 'verified'
      });
    }
  } catch (err) {
    const {
      response: fetchResponse
    } = err;
    res.status(fetchResponse?.status || 500).json(err.data);
  }
};