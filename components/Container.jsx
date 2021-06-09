import React, { Children } from 'react';
export const Container = ({ children, ...props }) => {
  const child=Children.only(children);
  let className = 'container';
  if(props.className){
    className = `container ${props.className}`;
  }
  return(
    <div {...props} className={className}>{React.cloneElement(child)}</div>
  );
};
