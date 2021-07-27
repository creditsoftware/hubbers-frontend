import {
  API
} from '../../../constants';
import {
  REQUEST_TYPE
} from '../../../constants/requestType';
import {
  httpApiServer
} from '../../../utils/httpRequest';
import { jwtDecode } from '../../../utils/jwt';
import {
  withSession
} from '../../../utils/withSession';
export default withSession(async (req, res) => {
  const ctx = {
    req,
    res
  };
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
  try {
    httpApiServer(`${API.IS_EXIST_MY_COMMUNITY_API}/${user.id}`, REQUEST_TYPE.GET, null, ctx)
      .then((response) => {
        res.status(200).json({ data: response, error: null });
      })
      .catch(async (err) => {
        if(err.response && err.response.status === 401) {
          await req.session.destroy();
          res.status(401).json({ error: err.message, data: null });
        }
        res.status(400).json({ error: err.message, data: null });
      });
  } catch (err) {
    res.status(400).json({
      err: err
    });
  }
});