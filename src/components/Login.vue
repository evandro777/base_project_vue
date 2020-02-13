<template>
    <div>
        <div class="alert alert-danger" v-if="error">
            <p>There was a problem accessing with those credentials, verify your email and password</p>
        </div>
        <form autocomplete="off" @submit.prevent="login" method="post">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control" v-model="password" required>
            </div>
            <button type="submit" class="btn btn-default">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            email: null,
            password: null,
            error: false
        }
    },
    methods: {
        login(){
            const Vue = this
            const { email, password } = this

            if (password.length > 0) {
                this.axios.post('/login', {
                    email: email,
                    password: password
                })
                .then(response => {
                    // this.$store.dispatch('login', { email, password })
                    localStorage.setItem('user', JSON.stringify(response.data.content))
                    if(Vue.$route.params.nextUrl != null){
                        Vue.$router.push(this.$route.params.nextUrl)
                    }
                    else{
                        Vue.$router.push('dashboard')
                    }
                })
                .catch(error => {
                    if(error && error.response.status == 401 && error.response.data && error.response.data.content == "Unauthorised"){
                        alert('Invalid email or password!')
                    }
                    else{
                        alert('There was a problem authenticating!')
                        console.log(error.response)
                        console.log(error)
                    }
                })
            }
        },
    }
} 
</script>