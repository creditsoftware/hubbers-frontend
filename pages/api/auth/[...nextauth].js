import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';
import {
  API
} from '../../../constants';

async function refreshAccessToken(token) {
  // console.log('refresh');
  // console.log(token);
  try {
    const response = await axios.post(`${API.REFRESH_API}`, null, {
      headers: {
        Authorization: `Bearer ${token.refreshToken}`
      }
    });
    // console.log(response.data);
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
    console.log(error);

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
      console.log(credentials);
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
        console.log(e);
        const errorMessage = e.response.data.message;
        // Redirecting to the login page with error messsage in the URL
        throw new Error(errorMessage + '&email=' + credentials.email);
      }

    }
  })
];

const callbacks = {
  async jwt(token, user) {
    // console.log('jwt');
    // console.log(user);
    // console.log(token);
    if (user && user.data) {
      token.accessToken = user.data.accessToken;
      token.refreshToken = user.data.refreshToken;
      token.accessTokenExpires = Date.now() + user.data.expiresIn * 1000;
    }
    // Return previous token if the access token has not expired yet
    if (Date.now() < token.accessTokenExpires) {
      return token;
    }
    return refreshAccessToken(token);
  },

  async redirect(url) {
    return url;
  },

  async session(session, token) {
    // console.log('session');
    // console.log(session);
    // console.log(token);
    session.accessToken = token.accessToken;
    return session;
  }
};

const options = {
  providers,
  callbacks,
  pages: {
    error: '/auth/signin' // Changing the error redirect page to our custom login page
  }
};

export default (req, res) => NextAuth(req, res, options);