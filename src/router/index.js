import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import login from '@/views/login/Login.vue'
//优化路由懒加载
const home = () => import('@/views/home/Home.vue')
const users = () => import('@/views/users/Users.vue')
const roles = () => import('@/views/roles/Roles.vue')
const rights = () => import('@/views/rights/Rights.vue')
const goods = () => import('@/views/goods/Goods.vue')
const addGoods = () => import('@/views/goods/pages/addGoods.vue')
const cartgory = () => import('@/views/cartgory/Cartgory.vue')

const routes = [

    {
        path: '',
        redirect: '/login'
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/home',
        component: home,
        children: [

            {
                path: '/users',
                component: users,
            },
            {
                path: '/roles',
                component: roles,
            },
            {
                path: '/Rights',
                component: rights,
            },
            {
                path: '/goods',
                component: goods,
            },
            {
                path: '/addgoods',
                component: addGoods,
            },
            {
                path: '/categories',
                component: cartgory,
            }
        ]
    }

]

const router = new Router({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        next()
    } else {
        localStorage.token ? next() : next('/login')
    }
})

export default router