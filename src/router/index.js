import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
Vue.use(ElementUI)

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    const tokenstr = window.sessionStorage.getItem('token')
    if (!tokenstr) return next('login')
    next()
})
export default router