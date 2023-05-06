import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        children: [
            {
                path: '/index',
                name: 'index',
                component: () => import('../views/Index.vue')
            },
            {
                path: '/system_manger/menu',
                name: 'menu',
                component: () => import('../views/systemManger/Menu.vue')
            },
            {
                path: '/system_manger/role',
                name: 'role',
                component: () => import('../views/systemManger/Role.vue')
            },
            {
                path: '/system_manger/user',
                name: 'user',
                component: () => import('../views/systemManger/User.vue')
            },
            {
                path: '/system_setting/data_dict',
                name: 'data_dict',
                component: () => import('@/views/systemSetting/DataDict.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
