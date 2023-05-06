<template>
    <div class="login-container">
        <el-card class="login-box">
            <h3 class="login-title">后台管理系统</h3>
            <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules" label-width="80px" class="login-form">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="captcha" label="验证码">
                    <div class="captcha">
                        <el-input type="captcha" v-model="loginForm.captcha" placeholder="请输入验证码"></el-input>
                        <el-image title="看不清? 换一张" :src="captchaImg" @click="refreshCaptcha"></el-image>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-button" @click="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            captchaImg: '',
            loginForm: {
                username: '',
                password: '',
                captcha: '',
                key: '', // 验证码key
            },
            loginFormRules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ],
                captcha: [
                    {required: true, message: '请输入验证码', trigger: 'blur'}
                ]
            }
        }
    },
    created() {
        this.refreshCaptcha();
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (!valid) {
                    return false;
                }

                this.$axios.post('/api/system/login', this.loginForm).then(res => {

                    this.$message({
                        duration:1000,
                        message: res.data.msg,
                        type: 'success',
                        onClose: () => {
                            const token = res.data.data.token;
                            this.$store.commit('SET_TOKEN', token);
                            this.$router.push('/');
                        }
                    })
                });
            })
        },

        /**
         * 刷新验证码
         */
        refreshCaptcha() {
            this.$axios.get('/api/system/captcha').then(res => {
                this.captchaImg = res.data.data.captchaImg;
                this.loginForm.key = res.data.data.key;
            });
        }
    }
}
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('@/assets/bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.login-box {
    width: 500px;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
}

.login-form {
    margin-top: 20px;
}

.login-button {
    width: 100%;
}

.captcha {
    display: flex;
}

.captcha > .el-image {
    margin-left: 5px;
    border-radius: 4px;
    width: 120px;
}
</style>
