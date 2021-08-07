import useSWR from 'swr';
import {
  API
} from '../../../constants';
import {
  fetcher
} from '../../../utils';
export const useTopicDetail = (
  topicId,
  initialValue = {}
) => {
  const {
    data,
    mutate,
    error
  } = useSWR(topicId ? `${API.GET_TOPIC_DETAIL_API}/${topicId}` : null, fetcher, initialValue);
  return {
    data,
    loading: !data && !error,
    mutate,
    error
  };
};