import {
  API
} from '../../../constants';
import { httpApiServer } from '../../../utils/httpRequest';
import {
  withSession
} from '../../../utils/withSession';

export default withSession(async (req, res) => {
  try{
    await httpApiServer(`${API.SIGNOUT_API}`, 'POST', null, {req, res}, req.session.get('refreshToken'));
    req.session.destroy();
    res.json({
      isLoggedIn:false
    });
  } catch(err) {
    req.session.destroy();
    res.json({
      isLoggedIn:false
    });
  }
});