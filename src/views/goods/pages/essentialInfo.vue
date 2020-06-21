<template>
	<div>
		<el-form ref="form" :model="addGodsform" label-width="80px">
			<el-form-item label="商品名称">
				<el-input v-model="addGodsform.goods_name"></el-input>
			</el-form-item>
			<el-form-item label="商品价格">
				<el-input v-model="addGodsform.goods_price"></el-input>
			</el-form-item>
			<el-form-item label="商品重量">
				<el-input v-model="addGodsform.goods_number"></el-input>
			</el-form-item>
			<el-form-item label="商品数量">
				<el-input v-model="addGodsform.goods_weight"></el-input>
			</el-form-item>
			<el-form-item label="商品分类">
				<el-cascader
					v-model="addGodsform.goods_cat"
					:props="defaultProps"
					:options="options"
					clearable
				></el-cascader>
			</el-form-item>
			<el-form-item label="商品分类">
				<el-radio v-model="addGodsform.radio" :label="true">是</el-radio>
				<el-radio v-model="addGodsform.radio" :label="false">否</el-radio>
			</el-form-item>
		</el-form>
		<el-button @click="next" type="primary">下一步</el-button>
	</div>
</template>
<script>
export default {
	name: '',
	props: ['addGodsform', 'options'],
	data() {
		return {
			defaultProps: {
				value: 'cat_id',
				label: 'cat_name',
			},
		};
	},
	methods: {
		next() {
			this.$emit('next', this.addGodsform);
		},
	},
};
</script>
<style lang="less" scoped></style>
