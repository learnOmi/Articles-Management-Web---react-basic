import axios from 'axios';
import { hasToken, getToken, removeToken } from './storage';
import { history as customhistory } from './history'; // Assuming history is exported from history.js
import { message } from 'antd';

// 1.创建axios实例
const sevice = axios.create({
    baseURL: "http://geek.itheima.net/v1_0/",
    timeout: 5000
});

// 2.请求拦截器
sevice.interceptors.request.use(
    config => {
        hasToken() && (config.headers.Authorization = `Bearer ${getToken()}`);
        return config;
    }, 
    err => {
        return Promise.reject(err);
    }
);

// 3.响应拦截器
sevice.interceptors.response.use(
    res => {
        return res.data;
    },
    err => {
        removeToken();
        if (err?.response?.status === 401) {
            // 401: token过期
            message.error(err?.response?.data?.message, 2);
            // 组件外部使用history跳转
            customhistory.push('/login');
        }else{
             return Promise.reject(err);
        }

    }
);


export default sevice;