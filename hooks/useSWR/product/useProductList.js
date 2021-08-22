import useSWR from 'swr';
import {
  API
} from '../../../constants';
import {
  fetcher
} from '../../../utils';
export const useProductList = (
  userId,
  initialValue = {}
) => {
  const {
    data,
    mutate,
    error
  } = useSWR(`${API.GET_PRODUCT_LIST_BY_USER_API}/${userId}`, fetcher, initialValue);
  return {
    data,
    loading: !data && !error,
    mutate,
    error
  };
};