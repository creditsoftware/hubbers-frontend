import { API } from '../constants';
import { fetchJson } from './fetchJson';
export const getUser = () => {
  return fetchJson(`${API.GET_USER_FROM_SESSIOM_API}`);
};