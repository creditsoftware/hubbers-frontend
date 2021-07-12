import React from 'react';
export const ContestRulesDetails = props => {
  return (
    <div className="p-5 bg-white" style={{ borderTop: '1px solid #bbb' }}>
      {
        props.data.rules
      }
    </div>
  );
};