import useSWR from 'swr';
import {
  API
} from '../../../constants';
import {
  fetcher
} from '../../../utils';
export const useRequestToJoinList = (
  communityId,
  initialValue = {}
) => {
  const {
    data,
    mutate,
    error
  } = useSWR(communityId ? `${API.GET_REQUEST_TO_JOIN_LIST_API}/${communityId}` : null, fetcher, initialValue);
  return {
    data,
    loading: !data && !error,
    mutate,
    error
  };
};