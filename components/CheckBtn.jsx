import { Button, Checkbox } from 'antd';
import React from 'react';
export const CheckBtn = ({ checked, onChange, label, disabled }) => {
  return(
    <span className={checked ? 'hbs-check-btn checked-hbs-check-btn' : 'hbs-check-btn'}>
      <Button type={checked ? 'hbs-primary' : 'hbs-outline-primary'} disabled={disabled} shape='round' onClick={()=>onChange(!checked)}>
        {label}
      </Button>
      <Checkbox checked={checked ? checked : false} onChange={(e)=>onChange(e.target.checked)} disabled={disabled}/>
    </span>
  );
};