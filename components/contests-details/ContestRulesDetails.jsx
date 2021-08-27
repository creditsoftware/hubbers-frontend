import React from 'react';
export const ContestRulesDetails = ({data}) => {
  return (
    <div className="p-5 bg-white" style={{ borderTop: '1px solid #bbb' }} dangerouslySetInnerHTML={{__html: data.officialRules}}>
    </div>
  );
};