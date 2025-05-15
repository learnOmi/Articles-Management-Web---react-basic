import axios from 'axios';

// 1.创建axios实例
const sevice = axios.create({
    baseURL: "http://geek.itheima.net/v1_0/",
    timeout: 5000
});

// 2.请求拦截器
sevice.interceptors.request.use(
    config => {

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
        return Promise.reject(err);
    }
);


export default sevice;