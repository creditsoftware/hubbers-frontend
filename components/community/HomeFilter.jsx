import { Select } from 'antd';
import React from 'react';
export const HomeFilter = ({className}) => {
  const [value, setValue] = React.useState([]);
  const [cn, setCn] = React.useState('');
  const options = [
    {
      label:'Everything',
      value:'everything'
    },
    {
      label:'Personal Feed',
      value:'personal-feed'
    },
    {
      label:'Your Activity',
      value:'your-activity'
    },
    {
      label:'From Your Hosts',
      value:'from-your-hosts'
    },
    {
      label:'Near You',
      value:'near-you'
    },
    {
      label:'Unanswered',
      value:'unanswered'
    },
    {
      label:'Quick Posts',
      value:'quick-posts'
    },
    {
      label:'Articles',
      value:'articles'
    }
  ];
  const selectProps = {
    mode: 'multiple',
    style: { width: '100%' },
    value,
    options,
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder: 'Select Item...',
    maxTagCount: 'responsive',
  };
  React.useEffect(()=>{
    if(className){
      setCn('home-filter-btn ' + className);
    } else {
      setCn('home-filter-btn');
    }
  },[]);
  return <React.Fragment>
    <Select className={cn} {...selectProps} />
  </React.Fragment>;
};