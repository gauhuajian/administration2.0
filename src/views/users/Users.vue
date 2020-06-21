<template>
	<div>
		<!-- 搜索 和 添加用户-->
		<user-search @searchClick="searchClick" @showUser="showUser" />
		<!-- 表格 -->
		<user-table
			v-if="Object.keys(userTableForm).length !== 0"
			:userTableForm="userTableForm"
			@stateClick="stateClick"
			@delUser="delUser"
			@editUserClick="editUserClick"
			@assignClick="assignClick"
		/>
		<!-- 分页 -->
		<user-page :total="total" :pagenum="pagenum" @userPage="userPage" v-if="total != 0" />
		<!-- 添加用户的表单 -->
		<user-add-data
			v-if="showUserAddForm != '0'"
			@addUser="addUser"
			:showUserAddForm="showUserAddForm"
			@outUserAddFrom="outUserAddFrom"
		/>
		<!-- 编辑用户 -->
		<user-edit
			v-if="Object.keys(userEditForm).length != 0"
			:userEditForm="userEditForm"
			:showEdit="showEdit"
			@outUserEdit="outUserEdit"
			@editUser="editUser"
		/>
		<!-- 分配角色 -->
		<user-assign
			:showUserAssign="showUserAssign"
			:assignForm="assignForm"
			:roles="roles"
			@outAssignFrom="outAssignFrom"
			@assignRole="assignRole"
			v-if="roles.length != 0"
		/>
	</div>
</template>
<script>
// 网络请求
import {
	userList,
	addUsers,
	updateState,
	deleteUsers,
	editUserData,
	getRoles,
	queryRid,
	assignRoleData,
} from '@/network/users';
// 相关组件
import userTable from './pages/UsersTable';
import userPage from './pages/Userpage';
import userSearch from './pages/UserSearch';
import userAddData from './pages/UserAddData';
import userEdit from './pages/UserEdit';
import userAssign from './pages/UserAssign';
export default {
	components: {
		userTable,
		userPage,
		userSearch,
		userAddData,
		userEdit,
		userAssign,
	},
	data() {
		return {
			userTableForm: {}, //表格数据
			total: 0, //总条数
			pagenum: 1, //第几页
			query: '', //搜索内容
			showUserAddForm: false,
			userEditForm: {},
			showEdit: false,
			showUserAssign: false,
			assignForm: {},
			roles: [],
		};
	},
	created() {
		// 请求表格数据
		this.loadUserData();
	},
	mounted() {
		this.loadRoles();
	},
	methods: {
		// 搜索
		searchClick(info) {
			this.query = info;
			this.loadUserData(this.query);
		},
		// 分页点击
		userPage(e) {
			this.loadUserData(this.query, e);
		},
		//显示分配角色
		async assignClick(row) {
			let { id } = row;
			let res = await queryRid(id);
			this.assignForm = res.data.data;
			this.showUserAssign = true;
		},
		// 请求角色
		async loadRoles() {
			let res = await getRoles();
			this.roles = res.data.data;
		},
		//退出分配角色
		outAssignFrom() {
			this.showUserAssign = false;
		},
		//分配角色请求
		async assignRole(data) {
			let { id, rid } = data;
			console.log(id, rid);

			let res = await assignRoleData(id, rid);
			if (res.data.meta.status === 200) {
				this.showUserAssign = false;
				this.loadUserData(this.query, this.pagenum);
				this.$message({
					message: res.data.meta.msg,
					type: 'success',
				});
			}
		},
		//显示添加用户表
		showUser() {
			this.showUserAddForm = true;
		},
		//退出添加用户表
		outUserAddFrom() {
			this.showUserAddForm = false;
		},
		//退出编辑
		outUserEdit() {
			this.showEdit = false;
		},
		// 编辑确定发送请求
		async editUser(data) {
			let res = await editUserData(data);
			if (res.data.meta.status === 200) {
				this.showEdit = false;
				this.loadUserData(this.query, this.pagenum);
				this.$message({
					message: res.data.meta.msg,
					type: 'success',
				});
			} else {
				this.$message({
					message: res.data.meta.msg,
					type: 'warning',
				});
			}
		},
		// 编辑原数据
		editUserClick(row) {
			this.userEditForm = row;
			this.showEdit = true;
		},
		//删除用户
		delUser(row) {
			this.$confirm('确定删除用户?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					let { id } = row;
					let res = await deleteUsers(id);
					if (res.data.meta.status === 200) {
						this.loadUserData();
						this.$message({
							message: res.data.meta.msg,
							type: 'success',
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
		//更新状态
		async stateClick(row) {
			let { id, mg_state } = row;
			let res = await updateState(id, mg_state);
			if (res.data.meta.status === 200) {
				this.$message({
					message: res.data.meta.msg,
					type: 'success',
				});
			}
		},
		// 添加用户
		async addUser(data) {
			let res = await addUsers(data);
			if (res.data.meta.status === 201) {
				this.loadUserData();
				this.outUserAddFrom();
				this.$message({
					message: '添加用户成功',
					type: 'success',
				});
			} else {
				this.$message({
					message: res.data.meta.msg,
					type: 'warning',
				});
			}
		},
		// 表格请求
		async loadUserData(query, pagenum, pagesize) {
			let res = await userList(query, pagenum, pagesize);
			this.total = res.data.data.total;
			this.pagenum = res.data.data.pagenum;
			this.userTableForm = res.data.data.users;
		},
	},
};
</script>
