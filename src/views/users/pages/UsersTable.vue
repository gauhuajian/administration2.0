<template>
	<el-table :data="userTableForm" style="width: 100%">
		<el-table-column prop="username" label="姓名" width="180"> </el-table-column>
		<el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
		<el-table-column prop="mobile" label="电话"> </el-table-column>
		<el-table-column label="用户状态">
			<template slot-scope="scope">
				<el-switch
					v-model="scope.row.mg_state"
					@change="stateClick(scope.row)"
					active-color="#13ce66"
					inactive-color="#ddd"
				>
				</el-switch>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
				<el-button
					size="mini"
					type="primary"
					icon="el-icon-edit"
					plain
					@click="editUserClick(scope.row)"
				></el-button>
				<el-button
					size="mini"
					type="danger"
					icon="el-icon-delete"
					plain
					@click="delUser(scope.row)"
				></el-button>
				<el-button size="mini" type="success" icon="el-icon-check" @click="assignClick(scope.row)">
					分配角色
				</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
export default {
	props: ['userTableForm'],
	methods: {
		assignClick(row) {
			this.$emit('assignClick', row);
		},
		editUserClick(row) {
			this.$emit('editUserClick', row);
		},
		stateClick(row) {
			this.$emit('stateClick', row);
		},
		delUser(row) {
			this.$emit('delUser', row);
		},
	},
};
</script>
