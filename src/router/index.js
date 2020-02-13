import VueRouter from 'vue-router'
import Vue from 'vue'

import store from '@/store.js'
import Dashboard from '@/components/Dashboard.vue'
import Home from '@/components/Home.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },{
            path: '/register',
            name: 'register',
            component: Register
        },{
            path: '/login',
            name: 'login',
            component: Login
        },{
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                auth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.auth)) {
        if (!store.getters.token) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if(to.matched.some(record => record.meta.is_admin)) {
                if(user.is_admin == 1){
                    next()
                }
                else{
                    next({ name: 'dashboard' })
                }
            }else {
                next()
            }
        }
    } else {
        next() 
    }
})

export default router