<template>
    <div class="main login-main" id="main">
        <el-container>
            <el-row :gutter="24" class="main-row" justify="center" type="flex">
                <el-col :md="4" :xs="20">
                    <h1>登录</h1>
                    <el-form ref="form" class="auth-form" :model="loginForm" label-position="top">
                        <el-form-item label="用户名">
                            <el-input v-model="loginForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="loginForm.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button id="login-button" type="primary" @click="login">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-container>
    </div>
</template>

<script>
    import '../assets/less/views/auth.less'
    import '../assets/less/main.less'
    import api from '../config/api'

    export default {
        name: 'Login',
        data () {
            return {
                loginForm: {
                }
            }
        },
        methods: {
            async login () {
                let result = await this.$http.post(api.auth.login, this.loginForm)

                if (result.data.success) {
                    this.$message({ // 登录成功，显示提示语
                        type: 'success',
                        message: '登录成功'
                    })
                    localStorage.setItem('user-token', result.data.token)
                } else {
                    this.$message({
                        type: 'error',
                        message: result.data.error
                    })
                }
                console.log(result)
            }
        }
    }
</script>

<style scoped>

</style>
