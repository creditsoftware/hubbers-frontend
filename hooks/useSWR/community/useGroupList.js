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
  } = useSWR(communityId ? `${API.LOCAL_GET_GROUP_API}?community=${communityId}` : null, fetcher, initialValue);
  return {
    data,
    loading: !data && !error,
    mutate,
    error
  };
};