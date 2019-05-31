import axios from 'axios'
axios.defaults.retry = 3;
axios.defaults.retryDelay = 500;
axios.interceptors.response.use(
  response => {
    //登录失效的时候重定向为登录页面
    if (response.data.code == -11) {
      loginOut(2)
      return response
    } else if (response.data.code == 21 || response.data.code == -21 || response.data.code == 22) {
      // 21:更换jwt
      if (response.data.code == 21) {
        if (response.data.data) {
          //localStorage.setItem('jwt', response.data.data)
        }
      }
      //22:F5刷新缓冲
      if (response.data.code == 22) {
        if (response.data.data) {
          //localStorage.setItem('jwt', response.data.data)
        }
      }
      // 判断是否配置了重试      
      var config = response.config
      if (!config || !config.retry) return response;
      // 设置重置次数，默认为0      
      config.__retryCount = config.__retryCount || 0;
      // 判断是否超过了重试次数      
      if (config.__retryCount >= config.retry) {
        loginOut(1)
        return response
      }
      config.__retryCount += 1;
      // 延时
      var backoff = new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, config.retryDelay || 1);
      });

      //重新发起axios请求              
      return backoff.then(function () {
        // var jwt = localStorage.getItem('jwt')
        // if (jwt) {
        //   config.headers.authorization = localStorage.getItem('jwt')
        // }
        return axios(config);
      });
    }
    else {
      return response
    }
  },
  function axiosRetryInterceptor(error) {
    var config = error.config;
    // 判断是否配置了重试
    if (!config || !config.retry) return Promise.reject(error);

    // 设置重置次数，默认为0
    config.__retryCount = config.__retryCount || 0;

    // 判断是否超过了重试次数
    if (config.__retryCount >= config.retry) {
      loginOut(0)
      return Promise.reject(error);
    }
    //重试次数自增
    config.__retryCount += 1;
    //延时处理
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config.retryDelay || 1);
    });
    //重新发起axios请求
    return backoff.then(function () {
      return axios(config);
    });
  }
)

var loginOut = function (val) {
//   if (val > 0) {
//     router.push({
//       name: 'login',
//       path: '/login',
//       params: {
//         flag: val
//       }
//     });
//   } else {
//     router.push("/login");
//   }
//   store.state.options = [];
}

export default axios

