export const API = {
  //LOCAL APIS : TO SERVER-SIDE
  LOCAL_SIGNIN_API: process.env.LOCAL_API_V1 + '/api/auth/signin',
  LOCAL_SIGNUP_API: process.env.LOCAL_API_V1 + '/api/auth/signup',
  LOCAL_SIGNOUT_API: process.env.LOCAL_API_V1 + '/api/auth/signout',
  GET_USER_FROM_SESSIOM_API: process.env.LOCAL_API_V1 + '/api/auth/user',
  LOCAL_IS_EXIST_MY_COMMUNITY_API: process.env.LOCAL_API_V1 + '/api/community/number-of-my-communities',
  LOCAL_SIMPLE_TOPIC_LIST_API: process.env.LOCAL_API_V1 + '/api/community/topic/get-simple-topic-list',
  LOCAL_ALL_TOPIC_LIST_API: process.env.LOCAL_API_V1 + '/api/community/topic/get-all',
  LOCAL_ADD_TOPIC_API: process.env.LOCAL_API_V1 + '/api/community/topic/add',
  LOCAL_FOLLOW_TOPIC_API: process.env.LOCAL_API_V1 + '/api/community/topic/follow',
  LOCAL_CREATE_POST_API: process.env.LOCAL_API_V1 + '/api/community/post/create',
  LOCAL_UPDATE_POST_API: process.env.LOCAL_API_V1 + '/api/community/post/update',
  LOCAL_REPLY_POST_API: process.env.LOCAL_API_V1 + '/api/community/post/reply', //post /:parentId
  LOCAL_DELETE_POST_API: process.env.LOCAL_API_V1 + '/api/community/post/delete', //get /:postId
  LOCAL_GET_COMMUNITY_LIST_API: process.env.LOCAL_API_V1 + '/api/community/get-simple-community-list',
  LOCAL_GET_POST_LIST_API: process.env.LOCAL_API_V1 + '/api/community/post/get-list',
  LOCAL_GET_MEMBER_LIST_API: process.env.LOCAL_API_V1 + '/api/community/member/get',
  LOCAL_VERIFY_EMAIL_API: process.env.LOCAL_API_V1 + '/api/auth/verify-email',
  LOCAL_GET_COMMUNITY_MEMBER_ROLES_API: process.env.LOCAL_API_V1 + '/api/community/member/get-roles',
  LOCAL_COMMUNITY_MEMBER_INVITE_API: process.env.LOCAL_API_V1 + '/api/community/member/invite',
  GET_LOCAL_COMMUNITY_MEMBER_INVITE_API: process.env.LOCAL_API_V1 + '/api/community/member/get-invites',
  LOCAL_UPLOAD_IMAGE_API: process.env.LOCAL_API_V1 + '/api/upload/image',
  LOCAL_UPLOAD_AVATAR_API: process.env.LOCAL_API_V1 + '/api/upload/avatar',
  //SERVER APIS : TO BACKEND
  SIGNIN_API: process.env.API_V1 + 'auth/user/signin',
  SIGNOUT_API: process.env.API_V1 + 'auth/user/signout',
  REFRESH_API: process.env.API_V1 + 'auth/user/refresh',
  SIGNUP_API: process.env.API_V1 + 'auth/user/signup',
  RESEND_EAMIL_API: process.env.API_V1 + 'auth/user/send-email',
  VERIFY_EMAIL_API: process.env.API_V1 + 'auth/user/verify-email',
  FORGOT_PASSWORD_API: process.env.API_V1 + 'auth/user/forgot-password', //post
  RESET_PASSWORD_API: process.env.API_V1 + 'auth/user/reset-password', //post
  GET_COMMUNITY_LIST_API: process.env.API_V1 + 'community',//get
  IS_EXIST_MY_COMMUNITY_API: process.env.API_V1 + 'community/all', // /:userId
  COMMUNITY_DETAIL_API: process.env.API_V1 + 'community', // /:id
  JOININ_COMMUNITY_API: process.env.API_V1 + 'community/member/join',//post /:userId
  SIMPLE_TOPIC_LIST_API: process.env.API_V1 + 'community/topic/all', //get /:communityId
  ALL_TOPIC_LIST_API: process.env.API_V1 + 'community/topic/all/detail', //get /:communityId
  ADD_TOPIC_API: process.env.API_V1 + 'community/topic/add', //get /:communityId
  GET_ALL_TOPIC_LIST_API: process.env.API_V1 + 'community/topic', //get
  FOLLOW_TOPIC_API: process.env.API_V1 + 'community/topic/follow', //get /:communityId
  CREATE_EVENT_API: process.env.API_V1 + 'community/event', //post
  CREATE_POST_API: process.env.API_V1 + 'community/post', //post
  UPDATE_POST_API: process.env.API_V1 + 'community/post', //put /:id of post
  REPLY_POST_API: process.env.API_V1 + 'community/post/reply', //post /:parentId
  DELETE_POST_API: process.env.API_V1 + 'community/post', //delete /:postId
  GET_POST_LIST_API: process.env.API_V1 + 'community/post/list', //get /:communityId
  GET_MEMBER_LIST_API: process.env.API_V1 + 'community/member/published', //get /:communityId
  GET_MEMBER_ROLE_LIST_API: process.env.API_V1 + 'community/member-role', //get
  COMMUNITY_MEMBER_INVITE_API: process.env.API_V1 + 'community/member/invite', //post
  GET_COMMUNITY_MEMBER_INVITES_API: process.env.API_V1 + 'community/member-invite', //get /:communityId
  UPLOAD_IMAGE_API: process.env.API_V1 + 'upload/image',
  UPLOAD_AVATAR_API: process.env.API_V1 + 'upload/avatar',
  SYNC_GET_POST_LIST_API: process.env.LP_API_V1 + 'community/post/list', //get /:communityId
  LINKEDIN_LOGIN_REDIRECT_API: process.env.API_V1 + 'auth/user/linkedin',
  SINGLE_SIGN_ON_API: process.env.API_V1 + 'auth/user/sso',
  GET_COMMUNITY_GROUP_PRIVACY_OPTIONS_API: process.env.API_V1 + 'community/group-privacy-option', //get
  CREATE_COMMUNITY_GROUP_API: process.env.API_V1 + 'community/group', //post
  //socket stream endpoint
  SOCKET_STREAM_API: process.env.SOCKET_STREAM_API_V1
};