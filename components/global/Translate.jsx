import React from 'react';
import { useIntl } from 'react-intl';
export const Translate = ({ name }) => {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id });
  return <React.Fragment>{f(name)}</React.Fragment>;
};
