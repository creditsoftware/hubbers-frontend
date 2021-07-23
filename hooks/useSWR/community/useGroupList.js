import useSWR from 'swr';
import {
  API
} from '../../../constants';
import {
  fetcher
} from '../../../utils';
export const useGroupList = (
  communityId,
  initialValue = {}
) => {
  const {
    data,
    mutate,
    error
  } = useSWR(`${API.GET_COMMUNITY_GROUP_LIST_API}/${communityId}`, fetcher, initialValue);
  return {
    groups: data,
    loading: !data && !error,
    mutate,
    error
  };
};