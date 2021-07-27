import jwt from 'jsonwebtoken';
import {
  ENV
} from '../constants/env';

export const jwtDecode = (token) => {
  return jwt.decode(token, ENV.ACCESS_TOKEN_SECRET_KEY);
};