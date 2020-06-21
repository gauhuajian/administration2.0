<template>
	<el-table :data="goodsForm" style="width: 100%">
		<el-table-column prop="goods_name" label="商品名称" width="180"> </el-table-column>
		<el-table-column prop="goods_price" label="商品价值" width="180"> </el-table-column>
		<el-table-column prop="goods_number" label="商品数量"> </el-table-column>
		<el-table-column label="创建时间">
			<template slot-scope="scope">
				<div>
					{{ scope.row.add_time | dateFilter }}
				</div>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
				<el-button type="primary" icon="el-icon-edit" plain @click="showEditGoods(scope.row)"></el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
import moment from 'moment';
export default {
	props: ['goodsForm'],
	data() {
		return {
			tableData: [],
		};
	},
	methods: {
		showEditGoods(row) {
			this.$emit('showEditGoods', row);
		},
	},
	filters: {
		dateFilter(res) {
			return moment(res).format('YYYY-MM-DD');
		},
	},
};
</script>
