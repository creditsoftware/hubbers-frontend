import useSWR from 'swr';
import {
  API
} from '../../../constants';
import {
  fetcher
} from '../../../utils';
export const useGetCourseList = (
  communityId,
  userId,
  initialValue = {}
) => {
  const {
    data,
    mutate,
    error
  } = useSWR(communityId && userId ? `${API.GET_COURSE_LIST_API}/${communityId}/${userId}` : null, fetcher, initialValue);
  return {
    data,
    loading: !data && !error,
    mutate,
    error
  };
};