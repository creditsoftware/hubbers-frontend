import React from 'react';
import { ReplyPostTile } from './ReplyPostTile';
import { PostTileBody } from './PostTileBody';
import { PostTileChild } from './PostTileChild';
export const PostTile = ({ ...props }) => {
  return (
    <div className='post-wrap'>
      <PostTileBody {...props} />
      {
        props.post.children &&
        props.post.children.length > 0 &&
        props.post.children.map((child) => {
          return <PostTileChild key={child.id} auth={{ ...props.auth }} post={{ ...child }} query={{ ...props.query }} />;
        })
      }
      <div className='p-3'>
        <ReplyPostTile {...props} />
      </div>
    </div>
  );
};