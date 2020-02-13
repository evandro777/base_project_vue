<template>
    <div>
        <div class="alert alert-danger" v-if="error && !success">
            <p>There was an error and it was not possible to complete the registration</p>
        </div>
        <div class="alert alert-success" v-if="success">
            <p>Registration complete. You can now <router-link :to="{name:'login'}">login.</router-link></p>
        </div>
        <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">
            <div class="form-group" v-bind:class="{ 'has-error': error && errors.name }">
                <label for="name">Name</label>
                <input type="text" id="name" class="form-control" v-model="name" required>
                <span class="help-block" v-if="error && errors.name">{{ errors.name[0] }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': error && errors.email }">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email" required>
                <span class="help-block" v-if="error && errors.email">{{ errors.email[0] }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': error && errors.password }">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control" v-model="password" required>
                <span class="help-block" v-if="error && errors.password">{{ errors.password[0] }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': error && errors.c_password }">
                <label for="c_password">Confirm password</label>
                <input type="password" id="c_password" class="form-control" v-model="c_password" required>
                <span class="help-block" v-if="error && errors.c_password">{{ errors.c_password[0] }}</span>
            </div>
            <button type="submit" class="btn btn-default">Enviar</button>
        </form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                name: '',
                email: '',
                password: '',
                c_password: '',
                error: false,
                errors: {},
                success: false
            }
        },

        methods: {
            register(){
                const {
                    name,
                    email,
                    password,
                    c_password
                } = this

                this.axios.post('/register', {
                    name,
                    email,
                    password,
                    c_password
                })
                .then(response => { // eslint-disable-line
                    // console.log(response)
                    this.success = true
                    // this.$router.push('login')
                })
                .catch(error => {
                    this.error = true
                    console.log(error.response.data)
                    this.errors = error.response.data
                })
            }
        }
    }
</script>