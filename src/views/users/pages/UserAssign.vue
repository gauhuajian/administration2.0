<template>
	<div>
		<el-dialog title="分配角色" @close="outAssignFrom" :visible.sync="assignVisible">
			<el-form :model="assignForm" label-width="80px">
				<el-form-item label="用户">
					<el-tag type="primary">{{ assignForm.username }}</el-tag>
				</el-form-item>
				<el-form-item label="分配角色">
					<el-select v-model="assignForm.rid" placeholder="请选择角色">
						<el-option
							v-for="item in roles"
							:key="item.id"
							:label="item.roleName"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="assignVisible = false">取 消</el-button>
				<el-button type="primary" @click="assignRole">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: '',
	props: ['showUserAssign', 'assignForm', 'roles'],
	data() {
		return {
			assignVisible: this.showUserAssign,
		};
	},
	methods: {
		assignRole() {
			this.$emit('assignRole', this.assignForm);
		},
		outAssignFrom() {
			this.$emit('outAssignFrom');
		},
	},
	watch: {
		showUserAssign(news) {
			this.assignVisible = news;
		},
	},
};
</script>
<style lang="less" scoped></style>
