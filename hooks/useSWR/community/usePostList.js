import useSWR from 'swr';
import {
  API
} from '../../../constants';
import {
  fetcher
} from '../../../utils';
export const usePostList = (
  query,
  initialValue = {}
) => {
  const {
    data,
    mutate,
    error
  } = useSWR(`${API.GET_ALL_POST_LIST_API}${query.community ? '?community=' + query.community : ''}${query.group ? '?group=' + query.group : ''}${query.topic ? '?topic=' + query.topic : ''}`, fetcher, initialValue);
  return {
    data,
    loading: !data && !error,
    mutate,
    error
  };
};