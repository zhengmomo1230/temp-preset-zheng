import axios from 'axios';
import { Modal, notification } from 'ant-design-vue'

let baseDomain = window._CONFIG['domianURL'];
let baseProject = baseDomain.substring(baseDomain.lastIndexOf("/"));

//自动设置后台服务 baseURL (也可以手工指定写死项目名字)
const service = axios.create({
    //baseURL: '/jeecg-boot',
    baseURL: baseProject, // api base_url
    timeout: 9000 // 请求超时时间
})

const err = (error) => {
    if (error.response) {
        let data = error.response.data
        let token_a = localStorage.getItem("ow_Token")
        console.log("------异常响应------", token_a)
        console.log("------异常响应------", error.response.status)
        switch (error.response.status) {
            case 403:
                notification.error({ message: '系统提示', description: '拒绝访问', duration: 4 })
                break
            case 500:
                //notification.error({ message: '系统提示', description:'Token失效，请重新登录!',duration: 4})
                if (token_a && data.message == "Token失效，请重新登录") {
                    Modal.error({
                        title: '登录已过期',
                        content: '很抱歉，登录已过期，请重新登录',
                        okText: '重新登录',
                        mask: false,
                        onOk: () => {

                        }
                    })
                    // update-end- --- author:scott ------ date:20190225 ---- for:Token失效采用弹框模式，不直接跳转----
                }
                break
            case 404:
                notification.error({ message: '系统提示', description: '很抱歉，资源未找到!', duration: 4 })
                break
            case 504:
                notification.error({ message: '系统提示', description: '网络超时' })
                break
            case 401:
                notification.error({ message: '系统提示', description: '未授权，请重新登录', duration: 4 })
                break
            default:
                notification.error({
                    message: '系统提示',
                    description: data.message,
                    duration: 4
                })
                break
        }
    }
    return Promise.reject(error)
};
// http request 拦截器
service.interceptors.request.use(
    config => {
        let token_a = localStorage.getItem("ow_Token")
        console.log(token_a)
        if (token_a) { //判断token是否存在
            config.headers['X-Access-Token'] = token_a;  //将token设置成请求头
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
service.interceptors.response.use((response) => {
    return response.data
}, err)
//当前的token的设置的返回值
// service.interceptors.response.use((request) => {
//     return response.data
// }, err)
export default service;
// export {
//     service as axios
// };
