<template>
	<div>
		<el-dialog title="编辑角色" @close="outEdit" :visible.sync="EditVisible">
			<el-form :model="editForm" label-width="80px">
				<el-form-item label="角色名称">
					<el-input v-model="editForm.roleName"></el-input>
				</el-form-item>
				<el-form-item label="角色描述">
					<el-input v-model="editForm.roleDesc"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="EditVisible = false">取 消</el-button>
				<el-button type="primary" @click="editRoles">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: '',
	props: ['editForm', 'showEidt'],
	data() {
		return {
			EditVisible: false,
		};
	},
	methods: {
		editRoles() {
			this.$emit('editRoles', this.editForm);
		},
		outEdit() {
			this.$emit('outEdit');
		},
	},
	watch: {
		showEidt(news) {
			this.EditVisible = news;
		},
	},
};
</script>
<style lang="less" scoped></style>
