<template>
	<el-dialog title="添加用户" @close="outUserAddFrom" :visible.sync="show">
		<el-form :model="addUserForm" :rules="rules" ref="addform" label-width="80px" class="demo-ruleForm">
			<el-form-item label="用户名称" prop="username">
				<el-input v-model="addUserForm.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="addUserForm.password"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="addUserForm.email"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="mobile">
				<el-input v-model="addUserForm.mobile"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="show = false">取 消</el-button>
			<el-button type="primary" @click="addUser">确 定</el-button>
		</div>
	</el-dialog>
</template>
<script>
export default {
	props: ['showUserAddForm'],
	data() {
		return {
			show: this.showUserAddForm,
			addUserForm: {},
			rules: {
				username: [
					{ required: true, message: '用户名不能为空', trigger: 'blur' },
					{ min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' },
				],
				password: [
					{ required: true, message: '密码不能为空', trigger: 'blur' },
					{ min: 3, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' },
				],
				email: [
					{ required: false, message: '密码不能为空', trigger: 'blur' },
					{
						pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
						message: '格式不正确',
						trigger: 'blur',
					},
				],
				mobile: [
					{ required: false, message: '密码不能为空', trigger: 'blur' },
					{ pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '格式不正确', trigger: 'blur' },
				],
			},
		};
	},
	methods: {
		outUserAddFrom() {
			this.$refs.addform.resetFields();
			this.$emit('outUserAddFrom');
		},
		addUser() {
			this.$emit('addUser', this.addUserForm);
		},
	},
};
</script>
