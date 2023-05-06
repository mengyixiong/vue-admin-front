<template>
    <div class="app-container">
        <div class="app-header">
            <!-- 顶部信息栏 -->
            <el-row>
                <el-col :span="12" style="text-align: right" :offset="12">
                    <div class="user-info">
                        <el-avatar :size="36" :src="userInfo.avatar"></el-avatar>
                        <span class="username">{{ userInfo.username }}</span>
                    </div>

                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                          <i class="el-icon-setting"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>个人信息</el-dropdown-item>
                            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </div>
        <div class="app-body">
            <div class="app-sidebar">
                <SideMenu></SideMenu>
            </div>
            <div class="app-content">
                <!-- 主体内容区域 -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import SideMenu from '@/components/SideMenu';

export default {
    name: 'App',
    components: {
        SideMenu,
    },
    data() {
        return {
            userInfo:{
                activeMenu: '',
                username: 'John Doe',
                avatar: '',
            }
        };
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        /**
         * 获取用户信息
         */
        getUserInfo() {
            this.$axios.get("/api/system/userInfo").then(res => {
                this.userInfo = res.data.data;
            })
        },

        /**
         * 退出登录
         */
        logout() {
            this.$axios.post("/api/system/logout").then(res => {
                this.$message({
                    duration:1000,
                    message: res.data.msg,
                    type: 'success',
                    onClose: () => {
                        localStorage.clear();
                        sessionStorage.clear();
                        this.$store.commit('SET_TOKEN', '');
                        this.$router.push('/login');
                    }
                })


            })
        }
    },
};
</script>

<style>
.app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.app-header {
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

}

.user-info {
    display: flex;
    align-items: center;
}

.username {
    margin-left: 10px;
}

.app-body {
    display: flex;
    flex-grow: 1;
}

.app-sidebar {
    background-color: #f5f7fa;
    width: 200px;
    padding: 20px;
}

.app-content {
    flex-grow: 1;
    padding: 20px;
}

.app-header > .el-row > .el-col {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.app-header > .el-row > .el-col > div {
    margin-left: 50px;
}
</style>
