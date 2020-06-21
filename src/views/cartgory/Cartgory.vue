<template>
	<div>
		<!-- 添加 -->
		<el-button type="success" @click="showAddCart" plain>添加分类</el-button>
		<!-- 表格 -->
		<el-table :data="cartData" style="width: 100%">
			<el-table-tree-column
				file-icon="icon icon-file"
				folder-icon="icon icon-folder"
				tree-key="cat_id"
				parent-key="cat_pid"
				level-key="cat_level"
				:indent-size="20"
				prop="cat_name"
				label="分类名称"
				width="180"
			></el-table-tree-column>
			<el-table-column label="是否有效" width="180">
				<template slot-scope="scope">
					<div>
						{{ scope.row.cat_deleted ? '是' : '否' }}
					</div>
				</template>
			</el-table-column>
			<el-table-column label="层级">
				<template slot-scope="scope">
					<span v-if="scope.row.cat_level == 0">一级</span>
					<span v-if="scope.row.cat_level == 1">二级</span>
					<span v-if="scope.row.cat_level == 2">三级</span>
				</template>
			</el-table-column>
		</el-table>
		<!-- 添加分类弹窗 -->
		<el-dialog title="添加分类" :visible.sync="addCartFormVisible">
			<el-form :model="addCartform" label-width="80px">
				<el-form-item label="分类名称">
					<el-input v-model="addCartform.cat_name"></el-input>
				</el-form-item>
				<el-form-item label="父级名称">
					<el-cascader :options="options" :props="defaultProps" v-model="addCartform.cat_pid_arr">
						<template slot-scope="{ node, data }">
							<span>{{ data.cat_name }}</span>
							<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
						</template>
					</el-cascader>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addCartFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addCartgoryData">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
// 网络
import { getCartgory, addCartgory } from '@/network/cartgory';
// 插件
import Vue from 'vue';
var ElTreeGrid = require('element-tree-grid');
Vue.component(ElTreeGrid.name, ElTreeGrid);
export default {
	data() {
		return {
			cartData: [],
			addCartFormVisible: false,
			addCartform: {
				cat_name: '',
				cat_pid_arr: [],
			},
			options: [{}],
			defaultProps: {
				value: 'cat_id',
				label: 'cat_name',
			},
		};
	},
	created() {
		this.loadCartgoryData();
	},
	methods: {
		// 发送添加
		async addCartgoryData() {
			let { cat_name, cat_pid_arr } = this.addCartform;
			let res = await addCartgory(cat_name, cat_pid_arr);
			if (res.meta.status === 201) {
				this.addCartFormVisible = false;
				this.loadCartgoryData();
				this.$message({
					showClose: true,
					message: '添加成功',
					type: 'success',
				});
			}
		},
		// 显示弹出窗口
		async showAddCart() {
			this.addCartFormVisible = true;
			let res = await getCartgory(2);
			this.options = res.data;
		},
		// 表格数据
		async loadCartgoryData(type) {
			let res = await getCartgory(type);
			this.cartData = res.data.data;
		},
	},
};
</script>
<style lang="less" scoped></style>
