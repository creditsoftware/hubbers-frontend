import useSWR from 'swr';
import {
  API
} from '../../../constants';
import {
  fetcher
} from '../../../utils';
export const useGetDraftedCourse = (
  communityId,
  userId,
  initialValue = {}
) => {
  const {
    data,
    mutate,
    error
  } = useSWR(communityId && userId ? `${API.GET_DRAFTED_COURSE_API}/${communityId}/${userId}` : null, fetcher, initialValue);
  return {
    data,
    loading: !data && !error,
    mutate,
    error
  };
};