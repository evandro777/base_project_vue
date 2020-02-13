import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        user: JSON.parse(localStorage.getItem('user') || '{}')
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, user){
            state.status = 'success'
            state.user = user
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
        }
    },
    actions: {
        logout({commit, state}){
            return new Promise((resolve) => {
                state.user.token = ''
                localStorage.setItem('user', JSON.stringify(state.user)) // update localStorage user

                commit('logout')
                delete axios.defaults.headers.common['Authorization']
                
                resolve()
            })
        }
    },
    getters : {
        token: state => state.user.token,
        authStatus: state => state.status,
    }
})