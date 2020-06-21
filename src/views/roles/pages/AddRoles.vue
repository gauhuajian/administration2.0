<template>
	<div>
		<el-button type="success" plain @click="showAddRoles">添加角色</el-button>
		<el-dialog title="添加角色" :visible.sync="addRolesmVisible">
			<el-form :model="addRolesForm" :rules="rules" label-width="80px">
				<el-form-item label="角色名称" prop="roleName">
					<el-input v-model="addRolesForm.roleName"></el-input>
				</el-form-item>
				<el-form-item label="角色描述">
					<el-input v-model="addRolesForm.roleDesc"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addRolesmVisible = false">取 消</el-button>
				<el-button type="primary" @click="addRoles">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: '',
	data() {
		return {
			addRolesForm: {},
			addRolesmVisible: false,
			rules: {
				roleName: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
				],
			},
		};
	},
	methods: {
		showAddRoles() {
			this.addRolesmVisible = true;
		},
		addRoles() {
			this.$emit('addRoles', this.addRolesForm);
			this.addRolesmVisible = false;
		},
	},
};
</script>
<style lang="less" scoped></style>
