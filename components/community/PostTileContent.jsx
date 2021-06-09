import { Button } from 'antd';
import React from 'react';
import { CKEditor5 } from '../CKEditor5';
export const PostTileContent = ({ ...props }) => {
  return (
    props.editable
      ? <React.Fragment>
        <CKEditor5 value={props.post.content} onChange={props.onChange} />
        <div className="text-right py-1">
          <Button
            type='hbs-outline-primary'
            className='mr-3'
            shape='round'
            onClick={props.onCancel}
          >
            Cancel
          </Button>
          <Button
            type='hbs-primary'
            shape='round'
            onClick={props.onSave}
          >
            Save
          </Button>
        </div>
      </React.Fragment>
      : <React.Fragment>
        {
          props.post.category === 'article' &&
          <h1 className="fs-2 fw-6 px-3">{props.post.title}</h1>
        }
        <div className='ck-content oy-auto p-3 pb-0' dangerouslySetInnerHTML={{ __html: props.post.content }}></div>
      </React.Fragment>
  );
};