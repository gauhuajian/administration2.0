<template>
	<el-row type="flex" justify="center" align="middle">
		<el-col :span="8">
			<el-form ref="loginForm" :model="loginForm" label-width="80px">
				<el-form-item label="用户名称">
					<el-input v-model="loginForm.username"></el-input>
				</el-form-item>
				<el-form-item label="用户密码">
					<el-input v-model="loginForm.password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">登录</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>
<script>
import { login } from '@/network/login';
export default {
	data() {
		return {
			loginForm: {
				username: 'admin',
				password: '123456',
			},
		};
	},
	methods: {
		//登录请求 保存token 跳转home
		async onSubmit() {
			let res = await login(this.loginForm);
			if (res.data.meta.status === 200) {
				localStorage.token = res.data.data.token;
				this.$router.push('/home');
				this.$message({
					message: '登录成功',
					type: 'success',
				});
			} else {
				this.$message({
					message: '登录失败',
					type: 'warning',
				});
			}
		},
	},
};
</script>
<style lang="less" scoped>
.el-row {
	height: 100%;
	background: #008b8b;
	.el-form {
		padding: 20px;
		border-radius: 10px;
		background: #fff;
	}
}
</style>
