import React from 'react';
import { Tooltip, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { MainFooter } from './MainFooter';
import { primaryColor } from '../../constants';
export const DeskFooter = ({ ...props }) => {
  const [showFooter, setShowFooter] = React.useState(0);
  return (
    <React.Fragment>
      <Tooltip title={showFooter ? 'Hide footer' : 'Show footer'} placement='topLeft' color={primaryColor}>
        <Button
          type="hbs-dashed"
          className='desk-footer-action'
          shape="circle"
          icon={
            showFooter
              ? <ArrowDownOutlined />
              : <ArrowUpOutlined />
          }
          onClick={() => setShowFooter(!showFooter)}
        />
      </Tooltip>
      <MainFooter {...props} className={showFooter ? 'desk-footer show' : 'desk-footer'} />
    </React.Fragment>
  );
};
