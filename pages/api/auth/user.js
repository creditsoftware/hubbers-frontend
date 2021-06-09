
import { withSession } from '../../../utils/withSession';

export default withSession(async (req, res) => {
  const user = await req.session.get('user');
  if (user) {
    res.json({
      isLoggedIn: true,
      ...user,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});
