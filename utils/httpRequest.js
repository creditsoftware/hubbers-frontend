// import axios from 'axios';
// import {
//   API
// } from '../constants';
import {
  REQUEST_TYPE
} from '../constants/requestType';
import { fetchJson } from './fetchJson';
// import { Promise } from './promise';

export async function httpApiServer(path, method, data, ctx, signout = false) {
  const config = {
    method: REQUEST_TYPE.GET,
    headers:{
      'Content-Type': 'application/json',
    }
  };
  // config.url = path;
  if (method) config.method = method;
  if (data) config.body = data;
  if (ctx) config.ctx = ctx;
  const accessToken = ctx.req.session.get('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if(signout){
    config.headers.Authorization = `Bearer ${signout}`;
  }
  // console.log(config);
  return fetchJson(path, config);
  // try{
  //   const mainInstance = axios.create(config);
  //   //Request intercepter with access token
  //   mainInstance.interceptors.request.use(async config => {
  //     const accessToken = config.ctx?config.ctx.req.session.get('accessToken'):null;
  //     if(accessToken){
  //       console.log(config);
  //       config.headers = { 
  //         'Authorization': `Bearer ${accessToken}`,
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       };
  //     } else {
  //       config.headers = {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       };
  //     }
  //     return config;
  //   },
  //   err => {
  //     console.log(err);
  //     Promise.reject(err);
  //   });
  //   mainInstance.interceptors.response.use(response => {
  //     console.log(response);
  //     return response;
  //   }, async err => {
  //     console.log(err);
  //     Promise.reject(err);
  //   });
  //   return mainInstance;
  // } catch(err) {
  //   console.log(err);
  // }
}
/*
const axiosMarketplaceServerInstance = axios.create();
// Request interceptor for API calls
axiosMarketplaceServerInstance.interceptors.request.use(
  async config => {
    const accessToken = config.ctx?config.ctx.req.session.get("access_token"):null;
    if (accessToken) {
      console.log('axiosMarketplaceServerInstance.interceptors ', accessToken.substr(-4));
      config.headers = { 
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }else{
      config.headers = { 
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

// Response interceptor for API calls
axiosMarketplaceServerInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry && error.config.ctx) {
    originalRequest._retry = true;//if this is true, it doesn't resend
    const access_token = await refreshEwalletAccessToken(originalRequest, error.response);        
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    const cookies = new ServerCookies(originalRequest.ctx.req,originalRequest.ctx.res);
    cookies.set('access-token-retoken', access_token);  
    return axiosMarketplaceServerInstance(originalRequest);
  }
  return Promise.reject(error);
});
const refreshEwalletAccessToken = async (req, res)=>{
  const request = req.ctx.req;//await applySession(req, res, sessionOptions);
  try {
    const accessToken = request.session.get("access_token");  
    const refreshToken = request.session.get("refresh_token");  
    const user = request.session.get("user");
    const post = {
      refreshToken:refreshToken,
      user_id:user.customer.user_id
    }
    const { data } = await httpEwalletServer('auth/refresh-token','POST',post,accessToken);
    if(data && data.refreshToken){
      request.session.set("access_token", data.accessToken);
      request.session.set("refresh_token", data.refreshToken);
      await request.session.save();
      setTimeout(()=>{
        const accessToken1 = request.session.get("access_token");  
        console.log("accessToken1",accessToken1);
      },100)
      const cookies = new ServerCookies(req.ctx.req,req.ctx.res);
      // cookies.set('access-token', data.accessToken);
      setCookie(req.ctx.res, 'access-token', data.accessToken,{path:'/'});
      setCookie(req.ctx.res, 'access-token-one', data.accessToken,{path:'/'});
      setCookie(req.ctx.res, 'access-token-two', 'data.accessToken',{path:'/'});
      // setCookie(req.ctx.res, 'access-token-success', 'yes');
      cookies.set('access-token-token', data.accessToken);  
      return data.accessToken;
    }else{
      return null;
    }
  }
  catch (e) {
    console.log('error',e.config.data, e.config.headers.Authorization);
    setCookie(req.ctx.res, 'access-token', '',{path:'/'});
    // setCookie(req.ctx.res, 'access-token-yes', 'failed');
    request.session.destroy();
    if(req.ctx.res){
      req.ctx.res.writeHead(302, { Location: '/' });
      req.ctx.res.end();      
    }
  }

  return null;
}; 
*/


// export const getServerSideProps = withSession(async function (ctx) {
//   const { req, res } = ctx;
//   const accessToken = req.session.get('access_token');
//   const response = await httpApiServer(`profile/${ctx.query.username}`,'GET',null,accessToken,ctx);
//   return { props: { entity:response.data } }
// })



// export function httpApiServer(path, method, data, accessToken, ctx) {
//   const config = {
//     method:'GET',
//     headers:{
//       "Content-Type": "application/json",
//     },
//   };
//   config.url = baseUrl(path);
//   if(method)config.method = method;
//   if(data) config.data = data;
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//     console.log('httpApiServer', accessToken.substr(-4));
//   }
//   if(ctx)config.ctx = ctx;
//   return axios(config);
//   // return axiosMarketplaceServerInstance(config)
//   // return axios.get(`http://127.0.0.8/api/profile/${path}`);  
// }
