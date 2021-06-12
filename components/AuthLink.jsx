import { withRouter } from 'next/router';
import Link from 'next/link';
import { fetchJson } from '../utils/fetchJson';
import { API } from '../constants';
import React, { Children } from 'react';
export const AuthLink = withRouter(({ router, children, ...props }) => {
  const [auth, setAuth] = React.useState(null);
  React.useEffect(async () => {
    const response = await fetchJson(`${API.GET_USER_FROM_SESSIOM_API}`);
    setAuth(response);
  }, [router]);
  const child = Children.only(children);
  let className = child.props.className || '';
  if (router.pathname === props.href && props.activeClassName) {
    className = `${className}${props.activeClassName}`.trim();
  }
  delete props.activeClassName;
  return auth && (auth.isLoggedIn
    ? <Link{...props}>{React.cloneElement(child, { className })}</Link>
    : <Link {...props} href={`/auth/signin?redirect=${props.href}`}>{React.cloneElement(child, { className })}</Link>);
});
