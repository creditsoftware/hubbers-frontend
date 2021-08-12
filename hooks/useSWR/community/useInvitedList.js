import useSWR from 'swr';
import {
  API
} from '../../../constants';
import {
  fetcher
} from '../../../utils';
export const useInvitedList = (
  communityId,
  initialValue = {}
) => {
  const {
    data,
    mutate,
    error
  } = useSWR(communityId ? `${API.GET_LOCAL_COMMUNITY_MEMBER_INVITE_API}?communityId=${communityId}` : null, fetcher, initialValue);
  return {
    data,
    loading: !data && !error,
    mutate,
    error
  };
};