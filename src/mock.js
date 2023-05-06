const Mock = require('mockjs');

// 获取随机对象
const Random = Mock.Random;

// 模拟返回数据结构
let result = {
    code: 200,
    msg: 'success',
    data: null
};

// 模拟请求
Mock.mock('/api/system/captcha', 'get', () => {
    result.code = 200;
    result.data = {
        key: Random.string(32),
        captchaImg: Random.dataImage('120x40', Random.string(5))
    };
    return result;
});

// 模拟登录请求
Mock.mock('/api/system/login', 'post', () => {
    result.code = 200;
    result.msg = "登录成功！";
    result.data = {
        token: Random.string(32)
    };
    return result;
});

// 模拟获取用户信息请求
Mock.mock('/api/system/userInfo', 'get', () => {
    result.code = 200;
    result.msg = "success";
    result.data = {
        username: Random.cname(),
        avatar: Random.image('100x100', Random.color(), Random.color(), Random.cword(1)),
        roles: ['admin']
    };
    return result;
});

// 模拟退出登录请求
Mock.mock('/api/system/logout', 'post', () => {
    result.code = 200;
    result.msg = "退出成功！";
    result.data = null;
    return result;
});
