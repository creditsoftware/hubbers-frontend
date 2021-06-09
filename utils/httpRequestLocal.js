import {
  REQUEST_TYPE
} from '../constants/requestType';
import { fetchJson } from './fetchJson';

export async function httpRequestLocal(path, method, data) {
  const config = {
    method: REQUEST_TYPE.GET,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (method) config.method = method;
  if (data) config.body = JSON.stringify(data);
  return fetchJson(path, config);
}