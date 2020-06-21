<template>
	<div>
		<el-dialog title="编辑商品" :visible.sync="show">
			<el-form ref="form" :model="goodsEditForm" label-width="80px">
				<el-form-item label="商品名称">
					<el-input v-model="goodsEditForm.goods_name"></el-input>
				</el-form-item>
				<el-form-item label="商品价格">
					<el-input v-model="goodsEditForm.goods_price"></el-input>
				</el-form-item>
				<el-form-item label="商品重量">
					<el-input v-model="goodsEditForm.goods_number"></el-input>
				</el-form-item>
				<el-form-item label="商品数量">
					<el-input v-model="goodsEditForm.goods_weight"></el-input>
				</el-form-item>
				<el-form-item label="商品分类">
					<el-cascader
						v-model="goodsEditForm.goods_cat"
						:props="defaultProps"
						:options="options"
						clearable
					></el-cascader>
				</el-form-item>
				<el-form-item label="商品分类">
					<el-radio v-model="goodsEditForm.radio" :label="true">是</el-radio>
					<el-radio v-model="goodsEditForm.radio" :label="false">否</el-radio>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="show = false">取 消</el-button>
				<el-button type="primary" @click="editClick">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: '',
	props: ['showEdit', 'goodsEditForm', 'options'],
	data() {
		return {
			show: false,
			defaultProps: {
				value: 'cat_id',
				label: 'cat_name',
			},
		};
	},
	methods: {
		editClick() {
			this.$emit('editClick', this.goodsEditForm);
		},
	},
	watch: {
		showEdit(news) {
			this.show = news;
		},
	},
};
</script>
<style lang="less" scoped></style>
