<template>
  <!-- 左边菜单栏 -->
    <el-menu>
        <el-menu-item index="home">
            <template slot="title">
                <i class="el-icon-s-home"></i>
                <span>首页</span>
            </template>
        </el-menu-item>

        <el-submenu index="dashboard">
            <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span>系统管理</span>
            </template>
            <el-menu-item index="dashboard1">
                <template slot="title">
                    <i class="el-icon-user-solid"></i>
                    <span>用户管理</span>
                </template>
            </el-menu-item>
            <el-menu-item index="dashboard2">
                <template slot="title">
                    <i class="el-icon-rank"></i>
                    <span>角色管理</span>
                </template>
            </el-menu-item>
            <el-menu-item index="dashboard3" route="/system_manger/menu">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>菜单管理</span>
                </template>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="user">
            <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>系统工具</span>
            </template>
            <el-menu-item index="user1">
                <template slot="title">
                    <i class="el-icon-s-order"></i>
                    <span>数字字典</span>
                </template>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: "SideMenu"
}
</script>

<style scoped>

</style>