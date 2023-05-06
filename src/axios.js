import axios from "axios";
import Element from 'element-ui'
import router from "./router";

// axios.defaults.baseURL = "http://localhost:8081";
axios.defaults.baseURL = "";
const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("token") // 请求头带上token
    return config
})

request.interceptors.response.use(
    /**
     * 判断后端自定义返回码
     * @param response
     * @returns {Promise<axios.AxiosResponse<any, any>>|axios.AxiosResponse}
     */
    response => {
        let res = response.data;

        if (res.code === 200) {
            return response
        } else {
            Element.Message.error(!res.msg ? res.msg : '系统异常！', {duration: 3 * 1000})
            return Promise.reject(response.data.msg)
        }
    },

    /**
     * 判断后端http状态码
     * @param error
     * @returns {Promise<never>}
     */
    error => {

        if (error.response.data) {
            error.message = error.response.data.msg
        }

        if (error.response.status === 401) {
            router.push("/login")
        }

        Element.Message.error(error.message, {duration: 3 * 1000})
        return Promise.reject(error)
    }
)
export default request