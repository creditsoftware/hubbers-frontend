import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';
import {
  API
} from '../../../constants';

async function refreshAccessToken(token) {
  try {
    const response = await axios.post(`${API.REFRESH_API}`, null, {
      headers: {
        Authorization: `Bearer ${token.refreshToken}`
      }
    });
    if (!response.data) {
      throw refreshedTokens;
    }

    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      switch (credentials.provider) {
        case 'email':
          console.log('email-provider');
          try {
            const response = await axios.post(`${API.SIGNIN_API}`, {
              email: credentials.email,
              password: credentials.password,
            });
            if (response) {
              return {
                status: 'success',
                data: response.data.res
              };
            }
          } catch (e) {
            const errorMessage = e.response?.data?.message;
            throw new Error(errorMessage + '&email=' + credentials.email);
          }
          break;
        case 'sso':
          console.log('sso-provider');
          try {
            const response = await axios.get(`${API.SINGLE_SIGN_ON_API}?email=${credentials.email}&sig=${credentials.sig}&payload=${credentials.sso}`);
            if (response && response.data?.data?.redirectUrl) {
              return {...response.data.data, sso: true};
            }
          } catch (e) {
            const errorMessage = e.response?.data?.message;
            throw new Error(errorMessage + '&email=' + credentials.email);
          }
          break;
        default:
          break;
      }
    }
  })
];

const callbacks = {
  async jwt(token, user) {
    if(user && user.sso) {
      token.redirectUrl = user.redirectUrl;
      return token;
    }
    if (user && user.data) {
      token.accessToken = user.data.accessToken;
      token.refreshToken = user.data.refreshToken;
      token.accessTokenExpires = Date.now() + user.data.expiresIn * 1000;
    }
    if (Date.now() < token.accessTokenExpires) {
      return token;
    }
    return refreshAccessToken(token);
  },

  async redirect(url) {
    return url;
  },

  async session(session, token) {
    if(token.redirectUrl) {
      session.redirectUrl = token.redirectUrl;
      return session;
    }
    session.accessToken = token.accessToken;
    session.refreshToken = token.refreshToken;
    return session;
  }
};

const options = {
  providers,
  callbacks,
  pages: {
    error: '/auth/signin'
  }
};

const nextAuth = (req, res) => NextAuth(req, res, options);

export default nextAuth;