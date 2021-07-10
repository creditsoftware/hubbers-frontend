import React from 'react';
import {
  // Divider,
  Menu,
} from 'antd';
// import SubMenu from 'antd/lib/menu/SubMenu';
export const PostTileCtrlMenu = ({
  // onSavePost,
  // onMutePost,
  // onCopyPostId,
  // onRecommend,
  onEdit,
  onDelete
}) => {
  return (
    <Menu
      mode='inline'
      style={{ width: '10rem' }}
    >
      {/* <Menu.Item key="save" onClick={onSavePost}>
        Save Post
      </Menu.Item>
      <Menu.Item key="mute" onClick={onMutePost}>
        Mute Post
      </Menu.Item>
      <SubMenu
        title='More'
        key='more'
      >
        <Menu.Item key="copy-id" onClick={onCopyPostId}>
          Copy Post ID
        </Menu.Item>
      </SubMenu>
      <Divider className='mt-0 mb-3' />
      <SubMenu
        title='Manage'
        key='manage'
      >
        <Menu.Item key="recommend" onClick={onRecommend}>
          Recommend
        </Menu.Item> */}
      <Menu.Item key="edit" onClick={onEdit}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" onClick={onDelete}>
        Delete
      </Menu.Item>
      {/* </SubMenu> */}
    </Menu>
  );
};