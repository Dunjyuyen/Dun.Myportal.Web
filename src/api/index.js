import axios from './response.js';
import * as Cookies from "js-cookie"
//import axios from 'axios'
const req = function (method, base, url, params, isquery, isbody) {

    !params && (params = {});
    let config = {
        method: method,
        url: `${base}${url}`,
        dataType:"json", 
        headers:{'content-type': 'application/json',
        'Authorization':"Bearer "+Cookies.get('Abp.AuthToken')
        },
        timeout: 10000
    };

    // 定义传参方法
    method = method.toUpperCase();
    if (isbody) {
        config.data = params;
    } else if (method == 'GET' || method == 'DELETE' || isquery) {
        config.params = params;
    } else {
        config.data = params;
    };
    return axios(config);
}

export default req;