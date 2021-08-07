import useSWR from 'swr';
import {
  API
} from '../../../constants';
import {
  fetcher
} from '../../../utils';
export const useGroupDetail = (
  groupId,
  initialValue = {}
) => {
  const {
    data,
    mutate,
    error
  } = useSWR(groupId ? `${API.GET_COMMUNITY_GROUP_DETAIL_API}/${groupId}` : null, fetcher, initialValue);
  return {
    data,
    loading: !data && !error,
    mutate,
    error
  };
};