export const API = {
  //LOCAL APIS : TO SERVER-SIDE
  LOCAL_SIGNIN_API: process.env.LOCAL_API_V1 + '/api/auth/signin',
  LOCAL_REFRESH_API: process.env.LOCAL_API_V1 + '/api/auth/refresh',
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
  LOCAL_GET_GROUP_API: process.env.LOCAL_API_V1 + '/api/community/group/get-list',
  LOCAL_GET_MEMBER_LIST_API: process.env.LOCAL_API_V1 + '/api/community/member/get',
  LOCAL_VERIFY_EMAIL_API: process.env.LOCAL_API_V1 + '/api/auth/verify-email',
  LOCAL_GET_COMMUNITY_MEMBER_ROLES_API: process.env.LOCAL_API_V1 + '/api/community/member/get-roles',
  LOCAL_COMMUNITY_MEMBER_INVITE_API: process.env.LOCAL_API_V1 + '/api/community/member/invite',
  GET_LOCAL_COMMUNITY_MEMBER_INVITE_API: process.env.LOCAL_API_V1 + '/api/community/member/get-invites',
  LOCAL_UPLOAD_IMAGE_API: process.env.LOCAL_API_V1 + '/api/upload/image',
  LOCAL_UPLOAD_AVATAR_API: process.env.LOCAL_API_V1 + '/api/upload/avatar',
  //SERVER APIS : TO BACKEND

  GET_USER_ROLES_API: process.env.API_V1 + 'user-role/',
  USER_SIGN_UP_STEP_ONE: process.env.API_V1 + 'user/sign-up-step-one',  //put
  USER_SIGN_UP_STEP_TWO: process.env.API_V1 + 'user/sign-up-step-two',  //post
  USER_SIGN_UP_STEP_THREE: process.env.API_V1 + 'user/sign-up-step-three',  //put

  SIGNIN_API: process.env.API_V1 + 'auth/user/signin',
  SIGNOUT_API: process.env.API_V1 + 'auth/user/signout',
  REFRESH_API: process.env.API_V1 + 'auth/user/refresh',
  SIGNUP_API: process.env.API_V1 + 'auth/user/signup',
  RESEND_EAMIL_API: process.env.API_V1 + 'auth/user/send-email',
  VERIFY_EMAIL_API: process.env.API_V1 + 'auth/user/verify-email',
  FORGOT_PASSWORD_API: process.env.API_V1 + 'auth/user/forgot-password', //post
  RESET_PASSWORD_API: process.env.API_V1 + 'auth/user/reset-password', //post
  GET_USER_LIST_API: process.env.API_V1 + 'user',//get
  GET_USER_LIST_SEARCH_API: process.env.API_V1 + 'user', //get searched user
  GET_COMMUNITY_LIST_API: process.env.API_V1 + 'community',//get
  GET_THUMB_UP_API: process.env.API_V1 + 'user/thumb-up/home/',
  GET_GENERAL_PROFILE_API: process.env.API_V1 + 'profile/general',
  GET_ALL_EXPERTISE_CATEGORY_API: process.env.API_V1 + 'expertise-category/expertise',
  GET_SKILL_BY_CATEGORY_API: process.env.API_V1 + 'expertise-category/skill-by-category',
  GET_SKILL_BY_CATEGORIES_API: process.env.API_V1 + 'expertise-category/skill-by-categories',

  GET_CREATOR_PROFILE_API: process.env.API_V1 + 'profile/creator',
  UPDATE_CREATOR_PROFILE_API: process.env.API_V1 + 'profile/creator',
  UPDATE_CREATOR_PORTFOLIO_API: process.env.API_V1 + 'profile/creator',

  GET_EXPERT_PROFILE_API: process.env.API_V1 + 'profile/expert',
  UPDATE_EXPERT_PROFILE_API: process.env.API_V1 + 'profile/expert',
  UPDATE_EXPERT_PORTFOLIO_API: process.env.API_V1 + 'profile/expert',

  GET_INVESTOR_PROFILE_API: process.env.API_V1 + 'profile/investor',
  UPDATE_INVESTOR_PROFILE_API: process.env.API_V1 + 'profile/investor',
  UPDATE_INVESTOR_PORTFOLIO_API: process.env.API_V1 + 'profile/investor',

  GET_HUBBERS_TEAM_PROFILE_API: process.env.API_V1 + 'hubbers-team/', // /:userId
  UPDATE_HUBBERS_TEAM_PROFILE_API: process.env.API_V1 + 'profile/hubbers-team/', // /:userId
  GET_HUBBERS_TEAM_LIST_API: process.env.API_V1 + 'hubbers-team',

  GET_PRODUCT_CATTEGORY_API: process.env.API_V1 + 'basic-type/product/',
  GET_INNOVATION_CATTEGORY_API: process.env.API_V1 + 'basic-type/innovation/',
  GET_CONTEST_CATEGORY_API: process.env.API_V1 + 'basic-type/contest/',
  GET_TECH_CATTEGORY_API: process.env.API_V1 + 'basic-type/tech/',

  GET_PRODUCT_LIST_BY_USER_API: process.env.API_V1 + 'project/get-list-by-user', //get/:userId
  GET_PRODUCT_DETAIL_API: process.env.API_V1 + 'project',  //get/:id
  UPDATE_PRODUCT_DETAIL_API: process.env.API_V1 + 'project',  //put/:id
  CREATE_PRODUCT_API: process.env.API_V1 + 'project',  //post

  // CONTEST APIS
  CONTEST_API: process.env.API_V1 + 'contest/contest-list',
  
  GET_CONTEST_DESCRITION_API: process.env.API_V1 + 'contest/contest-description/category',
  //-------------
  // CURRENCY APIS
  GET_CURRENCY_API: process.env.API_V1 + 'payment/currency',
  //--------------
  UPDATE_GENERAL_PROFILE_API: process.env.API_V1 + 'profile/general',
  GET_COUNTRY_LIST_API: process.env.API_V1 + 'country/',
  GET_LANGUAGE_LIST_API: process.env.API_V1 + 'language/',
  GET_ALL_JOB_API: process.env.API_V1 + 'job/',
  CHECK_APPLY_STATE_API: process.env.API_V1 + 'job-application/check',
  CREATE_JOB_APPLICATION_API: process.env.API_V1 + 'job-application',
  IS_EXIST_MY_COMMUNITY_API: process.env.API_V1 + 'community/all', // /:userId
  GET_MY_COMMUNITY_AND_GROUP_LIST_API: process.env.API_V1 + 'community/c-g-list', // /:userId
  COMMUNITY_DETAIL_API: process.env.API_V1 + 'community', // /:id
  JOININ_COMMUNITY_API: process.env.API_V1 + 'community/member/join',//post /:userId
  SIMPLE_TOPIC_LIST_API: process.env.API_V1 + 'community/topic/all', //get /:communityId
  ALL_TOPIC_LIST_API: process.env.API_V1 + 'community/topic/all/detail', //get /:communityId
  ADD_TOPIC_API: process.env.API_V1 + 'community/topic/add', //get /:communityId
  GET_ALL_TOPIC_LIST_API: process.env.API_V1 + 'community/topic', //get
  UPDATE_TOPIC_API: process.env.API_V1 + 'community/topic', //put /:topicId
  GET_TOPIC_DETAIL_API: process.env.API_V1 + 'community/topic', //get /:topicId
  FOLLOW_TOPIC_API: process.env.API_V1 + 'community/topic/follow', //get /:topicId/:userId
  CREATE_EVENT_API: process.env.API_V1 + 'community/event', //post
  DELETE_EVENT_API: process.env.API_V1 + 'community/event', //delete
  GET_EVENT_LIST_API: process.env.API_V1 + 'community/event/all', //get /:communityId
  GET_TIMEZONE_LIST_API: process.env.API_V1 + 'timezone', //get
  CREATE_POST_API: process.env.API_V1 + 'community/post', //post
  UPDATE_POST_API: process.env.API_V1 + 'community/post', //put /:id of post
  REPLY_POST_API: process.env.API_V1 + 'community/post/reply', //post /:parentId
  DELETE_POST_API: process.env.API_V1 + 'community/post', //delete /:postId
  GET_POST_LIST_API: process.env.API_V1 + 'community/post/list', //get /:communityId
  GET_MEMBER_LIST_API: process.env.API_V1 + 'community/member/published', //get /:communityId
  GET_MEMBER_ROLE_LIST_API: process.env.API_V1 + 'community/member-role', //get
  COMMUNITY_MEMBER_INVITE_API: process.env.API_V1 + 'community/member/invite', //post
  GET_COMMUNITY_MEMBER_INVITES_API: process.env.API_V1 + 'community/member-invite', //get /:communityId
  GET_GLOBAL_EVENT_API: process.env.API_V1 + 'community/event/global',
  GET_EVENT_SLUG_API: process.env.API_V1 + 'community/event/single', //get /:slug
  GET_GLOBAL_PARTNER_API: process.env.API_V1 + 'partner/global',
  GET_GLOBAL_LOCAL_PARTNER_API: process.env.API_V1 + 'partner/global-local',  //get /:communityId
  GET_PARTNER_DETAIL_API: process.env.API_V1 + 'partner', //get /:partnerId
  CONTACT_PARTNER_API: process.env.API_V1 + 'partner-contact/send-message',
  GET_TESTIMONIALS_API: process.env.API_V1 + 'testimonials',
  UPLOAD_IMAGE_API: process.env.API_V1 + 'upload/image',
  UPLOAD_AVATAR_API: process.env.API_V1 + 'upload/avatar',
  GET_ALL_POST_LIST_API: process.env.API_V1 + 'community/post/all-list', //get ?community?group?topic
  LINKEDIN_LOGIN_REDIRECT_API: process.env.API_V1 + 'auth/user/linkedin',
  SINGLE_SIGN_ON_API: process.env.API_V1 + 'auth/user/sso',
  GET_PRIVACY_OPTIONS_API: process.env.API_V1 + 'community/privacy-option', //get
  CREATE_COMMUNITY_GROUP_API: process.env.API_V1 + 'community/group', //post /:userId
  REMOVE_COMMUNITY_GROUP_API: process.env.API_V1 + 'community/group/remove', //delete /:id
  GET_COMMUNITY_GROUP_LIST_API: process.env.API_V1 + 'community/group/all', //get /:communityId/:userId
  GET_COMMUNITY_GROUP_DETAIL_API: process.env.API_V1 + 'community/group', //get /:groupId
  JOININ_COMMUNITY_GROUP_API: process.env.API_V1 + 'community/group/join', //patch /:groupId/:userId
  GET_REQUEST_TO_JOIN_LIST_API: process.env.API_V1 + 'community/join-request', //get /:communityId
  REQUEST_TO_JOIN_LIST_API: process.env.API_V1 + 'community/join-request', //post /:communityId/:userId
  SYNC_GET_POST_LIST_API: process.env.LP_API_V1 + 'community/post/list', //get /:communityId
  //socket stream endpoint
  SOCKET_STREAM_API: process.env.SOCKET_STREAM_API_V1
};