<template>
	<div>
		<el-table :data="rights" style="width: 100%">
			<el-table-column type="index" label="#" :index="indexMethod" width="50"> </el-table-column>
			<el-table-column prop="authName" label="权限名称" width="180"> </el-table-column>
			<el-table-column prop="path" label="路径" width="180"> </el-table-column>
			<el-table-column prop="level" label="等级">
				<template slot-scope="scope">
					<div v-if="scope.row.level == 0">一级</div>
					<div v-if="scope.row.level == 1">二级</div>
					<div v-if="scope.row.level == 2">三级</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
import { getRights } from '@/network/rights';
export default {
	name: '',
	data() {
		return {
			rights: [],
		};
	},
	created() {
		this.loadRights();
	},
	methods: {
		async loadRights() {
			let res = await getRights();
			this.rights = res.data.data;
		},
		indexMethod(index) {
			return index;
		},
	},
};
</script>
<style lang="less" scoped></style>
