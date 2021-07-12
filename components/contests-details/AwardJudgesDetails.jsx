import React from 'react';
import Avatar from 'antd/lib/avatar/avatar';
export const AwardJudgesDetails = props => {
  return (
    <div className="w-100 bg-white text-center mb-4" style={{ borderTop: '1px solid #bbb' }}>
      {
        props.data.judges.map((item, index) => {
          return <div key={index} className="pt-5 pb-4">
            <Avatar size={100} src={item.avatar} />
            <h1 className="pt-3">{item.name}</h1>
          </div>;
        })
      }
    </div>
  );
};