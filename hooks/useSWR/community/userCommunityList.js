import useSWR from 'swr';
import {
  API
} from '../../../constants';
import {
  fetcher
} from '../../../utils';
export const useCommunityList = (
  initialValue = {}
) => {
  const {
    data,
    mutate,
    error
  } = useSWR(`${API.LOCAL_GET_COMMUNITY_LIST_API}`, fetcher, initialValue);
  return {
    data,
    loading: !data && !error,
    mutate,
    error
  };
};