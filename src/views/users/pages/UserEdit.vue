<template>
	<el-dialog title="编辑用户" @close="outUserEdit" :visible.sync="show">
		<el-form :model="userEditForm" label-width="80px">
			<el-form-item label="用户">
				<el-tag disabled>{{ userEditForm.username }}</el-tag>
			</el-form-item>
			<el-form-item label="邮箱">
				<el-input v-model="userEditForm.email"></el-input>
			</el-form-item>
			<el-form-item label="手机">
				<el-input v-model="userEditForm.mobile"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="show = false">取 消</el-button>
			<el-button type="primary" @click="editUser">确 定</el-button>
		</div>
	</el-dialog>
</template>
<script>
export default {
	props: ['userEditForm', 'showEdit'],
	data() {
		return {
			show: this.showEdit,
		};
	},
	methods: {
		outUserEdit() {
			this.$emit('outUserEdit');
		},
		editUser() {
			this.$emit('editUser', this.userEditForm);
		},
	},
	watch: {
		showEdit(news, ol) {
			this.show = news;
		},
	},
};
</script>
<style lang="less" scoped></style>
