import { Button, Dropdown, Input } from 'antd';
import React from 'react';
import { SketchPicker } from 'react-color';

export const ColorPicker =  ({ name, onChange, value = '#ffffff', disabled=false }) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Input
        name={name}
        disabled={disabled}
        prefix={
          <Dropdown
            placement='bottomLeft'
            overlay={
              <SketchPicker
                color={value}
                onChangeComplete={(e) => onChange(e.hex)}
              />
            }
            visible={visible}
            onVisibleChange={() => setVisible(false)}
          >
            <Button
              disabled={disabled}
              style={{ width: '100px', backgroundColor: `${value}`, visibility: 'visible' }}
              onClick={() =>{
                if(!disabled) {
                  setVisible(!visible);
                }
              }}
            />
          </Dropdown>
        }
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </>
  );
};
