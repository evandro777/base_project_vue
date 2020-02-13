import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import router from './router'
import App from './App.vue'
import store from './store.js'

import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VueAxios, axios)
Vue.use(store)

axios.defaults.baseURL = 'http://localhost:8000/api'

if (store.getters.token) {
    axios.defaults.headers.common = {'Authorization': `Bearer ${store.getters.token}`}
}

Vue.router = router
App.router = Vue.router

new Vue(App).$mount('#app')