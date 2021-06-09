import {
  withIronSession
} from 'next-iron-session';

export const withSession = (handler) => {
  return withIronSession(handler, {
    password: process.env.SESSION_PASSWORD,
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      maxAge:process.env.COOKIE_EXPIRED_TIME
    },
  });
};