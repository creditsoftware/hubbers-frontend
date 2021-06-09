import React from 'react';
import { Select } from 'antd';
const { Option } = Select;
export const HomeSorter = ({className}) => {
  const [cn, setCn] = React.useState('');
  React.useEffect(()=>{
    if(className){
      setCn(className);
    } else {
      setCn('');
    }
  },[]);
  return <React.Fragment>
    <Select className={cn} defaultValue="last-activity" style={{ width: '20rem' }} allowClear>
      <Option value="last-activity">Last Activity</Option>
      <Option value="date-created">Date Created</Option>
      <Option value="popular-now">Popular Now</Option>
      <Option value="distance">Distance</Option>
    </Select>
  </React.Fragment>;
};