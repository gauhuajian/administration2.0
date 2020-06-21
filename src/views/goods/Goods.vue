<template>
	<div>
		<el-button type="success" @click="toAddGoods">添加商品</el-button>
		<goods-table v-if="goodsForm.length != 0" :goodsForm="goodsForm" @showEditGoods="showEditGoods" />
		<goods-page :pagenum="pagenum" :total="total" @GoodsPage="GoodsPage" />
		<goods-edit :showEdit="showEdit" :goodsEditForm="goodsEditForm" :options="options" @editClick="editClick" />
	</div>
</template>
<script>
//网络请求
import { getGoods, getCartgory, editGoodsData } from '@/network/goods';
//相关组件
import goodsTable from './pages/GoodsTable';
import goodsPage from './pages/Goodspage';
import goodsEdit from './pages/GoodsEdit';
export default {
	name: '',
	components: {
		goodsTable,
		goodsPage,
		goodsEdit,
	},
	data() {
		return {
			goodsForm: [],
			total: 0,
			pagenum: 1,
			showEdit: false,
			goodsEditForm: {},
			options: [],
		};
	},
	created() {
		this.loadGoods();
		this.loadCartgory();
	},
	methods: {
		// 显示编辑
		showEditGoods(row) {
			this.goodsEditForm = row;
			this.showEdit = true;
		},
		//跳转到添加
		toAddGoods() {
			this.$router.push('/addgoods');
		},
		//分页
		GoodsPage(e) {
			this.loadGoods('', e);
		},
		//编辑商品
		async editClick(data) {
			let res = await editGoodsData(data);
			console.log(res);

			if (res.data.meta.status === 200) {
				this.showEdit = false;
				this.$message({
					message: '编辑成功',
					type: 'success',
				});
			}
		},
		//商品分类
		async loadCartgory() {
			let res = await getCartgory();
			this.options = res.data.data;
		},
		//请求表格
		async loadGoods(query, pagenum, pagesize) {
			let res = await getGoods(query, pagenum, pagesize);
			this.goodsForm = res.data.data.goods;
			this.total = res.data.data.total;
			this.pagenum = +res.data.data.pagenum;
		},
	},
};
</script>
<style lang="less" scoped></style>
