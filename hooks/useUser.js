import {
  useEffect
} from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import {
  API
} from '../constants';

export const useUser = ({
  redirectTo = false,
  redirectIfFound = false,
} = {}) => {
  const {
    data: user,
    mutate: mutateUser
  } = useSWR(`${API.GET_USER_FROM_SESSIOM_API}`);
  useEffect(() => {
    if (!redirectTo || !user) return;
    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);
  return {
    user,
    mutateUser
  };
};