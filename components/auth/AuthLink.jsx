import { withRouter } from 'next/router';
import Link from 'next/link';
import React, { Children } from 'react';
export const AuthLink = withRouter(({ router, children, ...props }) => {
  const child = Children.only(children);
  let className = child.props.className || '';
  if (router.pathname === props.href && props.activeClassName) {
    className = `${className}${props.activeClassName}`.trim();
  }
  delete props.activeClassName;
  return props.auth && (props.auth.isLoggedIn
    ? <Link{...props}>{React.cloneElement(child, { className })}</Link>
    : <Link {...props} href={`/auth/signin?redirect=${props.href}`}>{React.cloneElement(child, { className })}</Link>);
});
