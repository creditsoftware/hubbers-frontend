
import { jwtDecode } from '../../../utils/jwt';
import { withSession } from '../../../utils/withSession';

export default withSession(async (req, res) => {
  const user = jwtDecode(await req.session.get('accessToken'))?.data;
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
