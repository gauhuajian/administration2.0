<template>
	<el-table :data="roles" style="width: 100%">
		<el-table-column type="expand">
			<template slot-scope="scope">
				<el-row v-for="item in scope.row.children" :key="item.id" class="row1">
					<el-col :span="4">
						<el-tag closable type=" "> {{ item.authName }} </el-tag><i class="el-icon-arrow-right"></i>
					</el-col>
					<el-col :span="20">
						<el-row v-for="item2 in item.children" :key="item2.id" class="row2">
							<el-col :span="4">
								<el-tag closable type="success"> {{ item2.authName }} </el-tag
								><i class="el-icon-arrow-right"></i>
							</el-col>
							<el-col :span="20">
								<span v-for="item3 in item2.children" :key="item3.id" class="row3">
									<el-tag closable type="warning"> {{ item3.authName }} </el-tag>
								</span>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</template>
		</el-table-column>
		<el-table-column type="index" @index="indexMethod" label="#" width="40"></el-table-column>
		<el-table-column prop="roleName" label="角色名称" width="180"> </el-table-column>
		<el-table-column prop="roleDesc" label="描述" width="180"> </el-table-column>
		<el-table-column prop="address" label="操作">
			<template slot-scope="scope">
				<el-button type="primary" icon="el-icon-edit" plain @click="showEditRoles(scope.row)"></el-button>
				<el-button type="danger" icon="el-icon-delete" plain @click="DeleteRoles(scope.row)"></el-button>
				<el-button type="success" icon="el-icon-check" plain @click="rolesClick(scope.row)">分配权限</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>
<script>
export default {
	props: ['roles'],
	methods: {
		showEditRoles(row) {
			this.$emit('showEditRoles', row);
		},
		DeleteRoles(row) {
			this.$emit('DeleteRoles', row);
		},
		rolesClick(row) {
			this.$emit('rolesClick', row);
		},
		indexMethod(index) {
			return index;
		},
	},
};
</script>
<style lang="less" scoped>
.row1 {
	border-bottom: 1px dashed #333;
	margin-top: 10px;
	&:last-child {
		border: none;
	}
}
.row2 {
	margin-bottom: 10px;
}
.row3 {
	margin: 0 3px;
}
</style>
