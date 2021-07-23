import React from 'react';
export const Container = ({ children, ...props }) => {
  let className = 'container';
  if(props.className){
    className = `container ${props.className}`;
  }
  return(
    <div {...props} className={className}>{children}</div>
  );
};
