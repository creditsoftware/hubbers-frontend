import { Button, Checkbox } from 'antd';
import React from 'react';
export const CheckBtn = ({ checked, onChange, label }) => {
  return(
    <span className={checked ? 'hbs-check-btn checked-hbs-check-btn' : 'hbs-check-btn'}>
      <Button type={checked ? 'hbs-primary' : 'hbs-outline-primary'} shape='round' onClick={()=>onChange(!checked)}>
        {label}
      </Button>
      <Checkbox checked={checked ? checked : false} onChange={(e)=>onChange(e.target.checked)}/>
    </span>
  );
};