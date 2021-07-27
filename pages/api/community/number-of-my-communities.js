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
  const ctx = {req, res};
  try{
    const user = jwtDecode(await req.session.get('accessToken'))?.data;
    const response = await httpApiServer(`${API.IS_EXIST_MY_COMMUNITY_API}/${user.id}`, REQUEST_TYPE.GET, null, ctx);
    res.status(200).json(response);
  } catch(err) {
    await req.session.destroy();
    res.status(400).json({err:err});
  }
});