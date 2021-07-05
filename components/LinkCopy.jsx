import { Button, Input, Tooltip } from 'antd';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { primaryColor } from '../constants';

export const LinkCopy = ({ value }) => {
  const [copied, setCopied] = React.useState(false);
  const onCopyHandle = () => {
    setCopied(true);
  };
  return (
    <div className='hbs-clipboard'>
      <Input type='text' size='large' disabled value={value} />
      <CopyToClipboard
        text={value}
        onCopy={onCopyHandle}
      >
        <Tooltip
          title={
            copied ? 'Copied' : 'Click to copy.'
          }
          color={primaryColor}
        >
          <Button type='hbs-primary' size='large' onClick={() => setCopied(true)}>
            Copy
          </Button>
        </Tooltip>
      </CopyToClipboard>
    </div>
  );
};