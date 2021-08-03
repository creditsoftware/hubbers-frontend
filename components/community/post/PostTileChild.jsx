import React from 'react';
import { PostTileBody } from './PostTileBody';
import { ReplyPostTile } from './ReplyPostTile';
export const PostTileChild = ({ ...props }) => {
  const [showAddReply, setShowAddReply] = React.useState(false);
  return (
    <div className="post-child-wrap">
      <PostTileBody {...props} onCheer={e => console.log(e)} onReply={() => setShowAddReply(true)} />
      {
        props.post.children &&
        props.post.children.length > 0 &&
        props.post.children.map((child) => {
          return <PostTileChild key={child.id} auth={{ ...props.auth }} post={{ ...child }} query={{...props.query}} />;
        })
      }
      {
        showAddReply &&
        <ReplyPostTile {...props} onCancel={() => setShowAddReply(false)} />
      }
    </div>
  );
};