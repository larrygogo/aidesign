import utils from '~/assets/js/utils.js'

export default function ({route, req, res, redirect}) {
  let isClient = process.client;
  let isServer = process.server;
  let redirectURL = '/';
  let token, path;
  //在服务端
  if (isServer) {
    let cookies = utils.getcookiesInServer(req);
    path = req.originalUrl;
    token = cookies.token ? cookies.token : '';
  }
  //在客户端判读是否需要登陆
  if (isClient) {
    token = utils.getcookiesInClient('token');
    path = route.path;
  }
  if (path) {
    redirectURL = '/?ref=' + encodeURIComponent(path)
  }
  //需要进行权限判断的页面开头
  if (!token) {
    redirect(redirectURL)
  }
}
