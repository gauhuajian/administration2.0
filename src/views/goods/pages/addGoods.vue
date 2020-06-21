<template>
	<div>
		<el-steps :active="activeIndex" finish-status="success">
			<el-step title="第一步" description="基本信息"></el-step>
			<el-step title="第二步" description="商品图片"></el-step>
			<el-step title="第三步" description="商品内容"></el-step>
		</el-steps>
		<el-tabs tab-position="left" v-model="activeName" @tab-click="activeClick">
			<el-tab-pane name="one">
				<essential-info :addGodsform="addGodsform" :options="options" @next="next" />
			</el-tab-pane>
			<el-tab-pane name="two">
				<goods-upload @nextThree="nextThree" @back="back(1, 'one')" />
			</el-tab-pane>
			<el-tab-pane name="therr">
				<Edit @addGoods="addGoods" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
// 网络
import { getCartgory, addGoodsData } from '@/network/goods';
// 相关组件
import essentialInfo from './essentialInfo';
import goodsUpload from './GoodsUpload';
import Edit from './Edit';
export default {
	name: '',
	components: {
		essentialInfo,
		goodsUpload,
		Edit,
	},
	data() {
		return {
			activeIndex: 1,
			activeName: 'one',
			addGodsform: {
				pics: [],
				goods_introduce: '',
			},
			options: [],
		};
	},
	created() {
		this.loadCartgory();
	},
	methods: {
		async addGoods(data) {
			this.addGodsform.goods_introduce = data;
			let res = await addGoodsData(this.addGodsform);
			if (res.data.meta.status === 201) {
				this.$router.push('/goods');
				this.$message({
					message: '创建成功',
					type: 'success',
				});
			}
		},
		back(index, name) {
			this.activeIndex = +index;
			this.activeName = name;
		},
		nextThree(data) {
			this.addGodsform.pics.push(data);
			this.activeIndex = 3;
			this.activeName = 'therr';
		},
		next(data) {
			this.addGodsform = data;
			this.activeIndex = 2;
			this.activeName = 'two';
		},
		activeClick(e) {
			this.activeIndex = +e.index + 1;
		},
		async loadCartgory() {
			let res = await getCartgory();
			this.options = res.data.data;
		},
	},
};
</script>
<style lang="less" scoped>
/deep/ .el-tabs--left .el-tabs__item.is-left,
.el-tabs--left .el-tabs__item.is-right,
.el-tabs--right .el-tabs__item.is-left,
.el-tabs--right .el-tabs__item.is-right {
	display: none;
}
</style>
