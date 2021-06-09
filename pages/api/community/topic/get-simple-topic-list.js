import {
  API
} from '../../../../constants';
import {
  REQUEST_TYPE
} from '../../../../constants/requestType';
import {
  httpApiServer
} from '../../../../utils/httpRequest';
import {
  withSession
} from '../../../../utils/withSession';
export default withSession( async (req, res) => {
  const ctx = {req, res};
  try{
    httpApiServer(`${API.SIMPLE_TOPIC_LIST_API}/${req.query.communityId}`, REQUEST_TYPE.GET, null, ctx).then((response) => {
      res.status(200).json(response.data);
    }).catch(async(err) => {
      if(err.response && err.response.status === 401) {
        await req.session.destroy();
        res.status(401).json({err:err.response});
      }
      res.status(400).json(err.response);
    });
  } catch(err) {
    res.status(400).json({err:err});
  }
});