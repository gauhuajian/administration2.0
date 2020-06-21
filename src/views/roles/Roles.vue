<template>
	<div>
		<!-- 添加角色 -->
		<add-roles @addRoles="addRoles" />
		<!-- 表格 -->
		<roles-table
			v-if="roles.length != 0"
			:roles="roles"
			@rolesClick="rolesClick"
			@DeleteRoles="DeleteRoles"
			@showEditRoles="showEditRoles"
		/>
		<!-- 分配权限 -->
		<roles-control
			v-if="rights.length != 0"
			:rights="rights"
			:keys="keys"
			:showControl="showControl"
			@outControl="outControl"
			@controlClick="controlClick"
		/>
		<!-- 编辑 -->
		<edit-roles :editForm="editForm" :showEidt="showEidt" @outEdit="outEdit" @editRoles="editRoles" />
	</div>
</template>
<script>
//网络请求
import { getRoles, getRights, accredit, addRolesData, deleteRolesData, editRolesData } from '@/network/roles';
//相关组件
import addRoles from './pages/AddRoles';
import rolesTable from './pages/RolesTable';
import rolesControl from './pages/RolesControl';
import editRoles from './pages/EditRoles';
export default {
	name: '',
	components: {
		addRoles,
		rolesTable,
		rolesControl,
		editRoles,
	},
	data() {
		return {
			roles: [{}],
			rights: [],
			showControl: false,
			keys: [],
			roleId: 0,
			editForm: {},
			showEidt: false,
		};
	},
	created() {
		this.loadroles();
		this.loadRights();
	},
	methods: {
		// 编辑角色
		async editRoles(data) {
			let res = await editRolesData(data.id, data.roleName, data.roleDesc);
			if (res.data.meta.status === 200) {
				this.showEidt = false;
				this.loadroles();
				this.$message({
					message: res.data.meta.msg,
					type: 'success',
				});
			}
		},
		// 退出角色
		outEdit() {
			this.showEidt = false;
		},
		// 显示编辑角色
		showEditRoles(row) {
			this.showEidt = true;
			this.editForm = row;
		},
		//删除角色
		DeleteRoles(row) {
			this.$confirm('删除角色, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					let res = await deleteRolesData(row.id);
					if (res.data.meta.status === 200) {
						this.loadroles();
						this.$message({
							type: 'success',
							message: '删除成功!',
						});
					}
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		//添加角色
		async addRoles(data) {
			let res = await addRolesData(data.roleName, data.roleDesc);
			if (res.data.meta.status === 201) {
				this.loadroles();
				this.$message({
					message: res.data.meta.msg,
					type: 'success',
				});
			}
		},
		// 退出分配权限
		outControl() {
			this.keys = [];
			this.showControl = false;
		},
		// 显示分配权限
		rolesClick(data) {
			this.showControl = true;
			data.children.forEach((item) => {
				item.children.forEach((item2) => {
					item2.children.forEach((item3) => {
						this.keys.push(item3.id);
					});
				});
			});
			this.roleId = data.id;
		},
		// 分配权限请求
		async controlClick(keys) {
			let res = await accredit(this.roleId, keys);
			if (res.data.meta.status === 200) {
				this.showControl = false;
				this.$message({
					message: res.data.meta.msg,
					type: 'success',
				});
			}
		},
		//分配权限原数据
		async loadRights() {
			let res = await getRights();
			this.rights = res.data.data;
		},
		// 表格数据
		async loadroles() {
			let res = await getRoles();
			this.roles = res.data.data;
		},
	},
};
</script>
<style lang="less" scoped></style>
