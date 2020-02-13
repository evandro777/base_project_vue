<template>
    <div class="card">
        <div class="card-header">
            <nav>
                <ul class="list-inline">
                    <li class="list-inline-item">
                        <router-link :to="{ name: 'home' }">Home</router-link>
                    </li>
                    <li class="list-inline-item float-right">
                        <router-link :to="{ name: 'register' }">Register</router-link>
                    </li>
                    <li v-if="!isLoggedIn" class="list-inline-item float-right">
                        <router-link :to="{ name: 'login' }">Login</router-link>
                    </li>
                    <li v-if="isLoggedIn" class="list-inline-item float-right">
                        <a @click="logout" href="#">Logout</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="card-body">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import store from './store.js'

export default {
    computed: {
        isLoggedIn: () => !!store.getters.token
    },
    methods: {
        logout: function () {
            store.dispatch('logout')
                .then(() => {
                    this.$router.push('login')
                })
        }
    },
}
</script>