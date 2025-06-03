import axios from 'axios';
import { hasToken, getToken, removeToken } from './storage';
import { history as customhistory } from './history'; // Assuming history is exported from history.js
import { message } from 'antd';

export const baseURL = "http://geek.itheima.net/v1_0/"

// 1.创建axios实例
const sevice = axios.create({
    baseURL: baseURL,
    timeout: 5000
});

// 2.请求拦截器
sevice.interceptors.request.use(
    config => {
        hasToken() && (config.headers.Authorization = `Bearer ${getToken()}`);
        !hasToken() && (customhistory.push('/login'));
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
        const mes = err?.response?.data?.message;
        const status = err?.response?.status;
        if (!status && status === 401) {
            removeToken();
            // 401: token过期
            message.error(mes, 2);
            // 组件外部使用history跳转
            customhistory.push('/login');
        }else if(mes){
            message.error(mes, 2);
        }else if(axios.isAxiosError(err)){
            message.error(err?.message);
        }else return Promise.reject(new Error(err))
    }
);


export default sevice;