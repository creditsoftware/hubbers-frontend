import useSWR from 'swr';
import {
  API
} from '../../../constants';
import {
  fetcher
} from '../../../utils';
export const useEventList = (
  communityId,
  initialValue = {}
) => {
  const {
    data,
    mutate,
    error
  } = useSWR(`${API.GET_EVENT_LIST_API}/${communityId}`, fetcher, initialValue);
  return {
    data,
    loading: !data && !error,
    mutate,
    error
  };
};